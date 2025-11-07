"use client";
import React, { useState, useEffect } from "react";
import { baseURL } from "@/config/baseUrl";
import {
  BarChart2,
  PieChart as PieChartIcon,
  Info,
  Users,
  Clock,
  MapPin,
  Map,
  Building2,
  X,
  ListChecks,
  UserCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useSWR from "swr";
import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import { useParams } from "next/navigation";
import CommentSection from "@/components/CommentSection";


export interface Candidate {
  id: number;
  name: string;
  profile?: string;
  party?: string;
  voteCount: number;
  percentage: string;
}

export interface PollData {
  id: number;
  title: string;
  presidential: string;
  category?: string;
  region: string;
  county?: string;
  constituency?: string;
  ward?: string;
  totalVotes: number;
  spoiled_votes?: number;
  results: Candidate[];
  created_at: Date | string;
  voting_expires_at: string;
}
const COLORS = [
  "#1e40af",
  "#9333ea",
  "#059669",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ca8a04",
  "#be123c",
  "#16a34a",
];
export interface VoteHistoryPoint {
  time: string;
  [candidateName: string]: string | number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LiveDetailsReport = ({ compact = false }: any) => {
  const params = useParams();
  const pollId = params.id as string;

  const { data, error, isLoading } = useSWR<PollData>(
    pollId ? `${baseURL}/api/aspirant/${pollId}` : null,
    fetcher,
    { refreshInterval: 1000 } 
  );

  const [showAll, setShowAll] = useState(false);
  const [countdown, setCountdown] = useState<string>("");
  const [voteHistory, setVoteHistory] = useState<VoteHistoryPoint[]>([]);
const [timeInterval, setTimeInterval] = useState("15m");

useEffect(() => {
  if (!pollId) return;

  const fetchInitialHistory = async () => {
    const res = await fetch(`${baseURL}/api/live-votes/history/${pollId}?interval=${timeInterval}`);
    const rows = await res.json();

    const grouped: VoteHistoryPoint[] = [];

    rows.forEach((row: any) => {
      const time = new Date(row.recorded_time).toLocaleTimeString("en-KE", {
        hour: "2-digit",
        minute: "2-digit",
      });

      let point = grouped.find(p => p.time === time);
      if (!point) {
        point = { time };
        grouped.push(point);
      }

      const candidate = data?.results.find(c => c.id === row.competitor_id);
      if (candidate) {
        point[candidate.name] = Number(row.cumulative_votes ?? 0);
      }
    });

    setVoteHistory(grouped);
  };

  fetchInitialHistory();

  // --- SSE for live updates ---
  const evtSource = new EventSource(`${baseURL}/api/live-votes/live-stream/${pollId}?interval=${timeInterval}`);

  evtSource.onmessage = (event) => {
    const newVotes = JSON.parse(event.data);
    if (!Array.isArray(newVotes)) return;

    const timestamp = new Date().toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newEntry: any = { time: timestamp };

    data?.results.forEach((candidate) => {
      const found = newVotes.find((v: any) => v.competitor_id === candidate.id);
      newEntry[candidate.name] = Number(found?.cumulative_votes ?? 0);
    });

    setVoteHistory((prev) => {
      const exists = prev.some((p) => p.time === newEntry.time);
      if (exists) {
        return prev.map((p) => (p.time === newEntry.time ? newEntry : p));
      } else {
        return [...prev, newEntry].slice(-1500);
      }
    });
  };

  evtSource.onerror = (e) => {
    console.error("SSE error:", e);
    evtSource.close();
  };

  return () => evtSource.close();
}, [pollId, timeInterval, data]);
  // Countdown timer for voting expiration
  useEffect(() => {
    if (!data?.voting_expires_at) return;

    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(data.voting_expires_at);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Voting closed");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.voting_expires_at]);

  // Show loading state when no poll ID is available yet
  if (!pollId) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-gray-500 text-sm">No poll ID provided</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-gray-500 text-sm">Loading poll data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
        Failed to load poll data
      </p>
    );
  }

  if (!data) {
    return <p className="text-gray-400 text-sm p-2">No poll data available</p>;
  }

  const chartData = data.results.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    votes: candidate.voteCount,
    percentage: parseFloat(candidate.percentage),
    profile: candidate.profile,
    party: candidate.party,
  }));

  const totalValidVotes = chartData.reduce((sum, c) => sum + c.votes, 0);
  const totalSpoiledVotes = data.spoiled_votes || 0;
  const totalAllVotes = totalValidVotes + totalSpoiledVotes;
  const turnoutPercentage =
    data.totalVotes > 0
      ? ((totalAllVotes / data.totalVotes) * 100).toFixed(2)
      : "0.00";

  if (compact) {
    const visibleCandidates = showAll ? chartData : chartData.slice(0, 3);

    return (
      <div className="text-sm text-gray-800 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-base flex items-center">
            <BarChart2 className="w-4 h-4 mr-2 text-blue-600" />
            {data.title}
          </p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              countdown !== "Voting closed"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            {countdown || "Loading..."}
          </span>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-1 gap-1 mb-3 text-xs text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>
              {data.region.replace("_", " ")} → {data.county}
            </span>
          </div>
          <div className="flex items-center">
            <Building2 className="w-3 h-3 mr-1" />
            <span>
              {data.constituency?.replace("_", " ") || "N/A"} →{" "}
              {data.ward || "N/A"}
            </span>
          </div>
        </div>


        {/* Candidates List */}
        {chartData.length === 0 ? (
          <p className="text-gray-500 text-center py-2">
            No votes recorded yet
          </p>
        ) : (
          <div className="space-y-2">
            {visibleCandidates.map((c, index) => (
              <div
                key={c.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-2 flex-1">
                  {c.profile ? (
                    <img
                      src={c.profile}
                      alt="Profile"
                      className="h-6 w-6 rounded-full border object-cover"
                    />
                  ) : (
                    <UserCircle2 size={20} className="text-gray-400" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {c.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {c.party || "Independent"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {c.percentage.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {c.votes.toLocaleString()} votes
                  </div>
                </div>
              </div>
            ))}

            {chartData.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center justify-center w-full py-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    Show {chartData.length - 3} more candidates
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Mini Progress Bars */}
        {chartData.length > 0 && (
          <div className="mt-3 space-y-1">
            {visibleCandidates.map((c, index) => (
              <div key={c.id} className="flex items-center space-x-2">
                <div className="w-16 text-xs text-gray-600 truncate">
                  {c.name.split(" ")[0]}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${c.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
                <div className="w-10 text-xs text-gray-700 text-right">
                  {c.percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white mx-auto  rounded-xl shadow-lg border border-gray-200 p-6 my-3">
      {/* Header Section */}
      <div className="text-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-center mb-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              countdown !== "Voting closed"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            <Clock className="w-3 h-3 inline mr-1" />
            {countdown || "Loading..."}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
          <BarChart2 className="mr-2 text-blue-600 w-6 h-6" />
          {data.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
          <p className="text-gray-600 flex items-center justify-center">
            <Info className="w-4 h-4 mr-1 text-gray-500" />
            Presidential:{" "}
            <span className="font-semibold ml-1">{data.presidential}</span>
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <Info className="w-4 h-4 mr-1 text-gray-500" />
            Category:{" "}
            <span className="font-semibold ml-1">{data.category || "N/A"}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3 text-xs">
          <p className="text-gray-600 flex items-center justify-center">
            <MapPin className="w-3 h-3 mr-1 text-gray-500" />
            {data.region.replace("_", " ")}
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <Map className="w-3 h-3 mr-1 text-gray-500" />
            {data.county || "N/A"}
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <Building2 className="w-3 h-3 mr-1 text-gray-500" />
            {data.constituency?.replace("_", " ") || "N/A"}
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <Building2 className="w-3 h-3 mr-1 text-gray-500" />
            {data.ward || "N/A"}
          </p>
        </div>
      </div>

      {/* Vote Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="text-center bg-blue-50 rounded-lg p-3 border border-blue-100">
          <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="font-bold text-blue-700 text-lg">
          n=({data.totalVotes.toLocaleString()})
          </div>
          <div className="text-gray-600 text-sm">Sample Size</div>
        </div>
        <div className="text-center bg-green-50 rounded-lg p-3 border border-green-100">
          <ListChecks className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="font-bold text-green-700 text-lg">
            n=({totalValidVotes.toLocaleString()})
          </div>
          <div className="text-gray-600 text-sm">Sample Size</div>
        </div>
        <div className="text-center bg-red-50 rounded-lg p-3 border border-red-100">
          <X className="w-5 h-5 text-red-600 mx-auto mb-1" />
          <div className="font-bold text-red-700 text-lg">
            {totalSpoiledVotes.toLocaleString()}
          </div>
          <div className="text-gray-600 text-sm">Spoiled Votes</div>
        </div>
        <div className="text-center bg-purple-50 rounded-lg p-3 border border-purple-100">
          <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="font-bold text-purple-700 text-lg">
            {turnoutPercentage}%
          </div>
          <div className="text-gray-600 text-sm">Turnout</div>
        </div>
      </div>

      {/* Show message if no results yet */}
      {data.results.length === 0 ? (
        <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
          <p className="text-lg">
            No votes have been recorded yet for this poll.
          </p>
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
<div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8">
 
       <div className="flex justify-end mb-4">
  <select
    value={timeInterval}
    onChange={(e) => setTimeInterval(e.target.value)}
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
  >
    <option value="15m">Last 15 minutes</option>
    <option value="1h">Last 1 hour</option>
    <option value="1d">Last 1 day</option>
  </select>
</div>
  <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
    <BarChart2 className="w-5 h-5 mr-2 text-blue-600" />
    Live Vote Tracker
  </h2>
   <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
  <ResponsiveContainer width="100%"   height={Math.max(chartData.length * 40, 300)}>
    <LineChart data={voteHistory}>
      <XAxis dataKey="time" />
      <YAxis allowDecimals={false}/>
      <Tooltip />
       <Legend />
      {data?.results.map((c, index) => (
        <Line
          key={c.id}
          type="monotone"
          dataKey={c.name}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={2.5}
          dot={false}
          isAnimationActive={true}
          animationDuration={700}
        animationEasing="ease-in-out"
        />
      ))}
    </LineChart>
  </ResponsiveContainer></div>
</div>

            {/* Bar Chart */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <BarChart2 className="w-5 h-5 mr-2 text-green-600" />
                Votes by Candidate
              </h2>
    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
  <ResponsiveContainer width="100%" height={Math.max(chartData.length * 40, 300)}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={120}
                    tickFormatter={(name)=>
                      name.length > 15 ? name.substring(0,15) + "..":name
                    }
                  />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => v.toLocaleString()}
               
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      `${value.toLocaleString()} votes`
                    }
                  />
                  <Bar dataKey="votes" barSize={20} radius={[0, 5, 5, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`bar-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer></div>
            </div>
          </div>

          {/* Results Table */}
          <div className="rounded-lg border border-gray-200 flex flex-col md:flex-row overflow-hidden">
           <div className="w-full md:w-3/4 overflow-x-auto">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-semibold text-left text-xs">
                    Candidate
                  </th>
                  <th className="py-3 px-4 font-semibold text-left text-xs">
                    Party
                  </th>
                  <th className="py-3 px-4 font-semibold text-left text-xs">
                    % Chance
                  </th>
                  <th className="py-3 px-4 font-semibold text-left text-xs">
                    Progress
                  </th>
                  <th className="py-3 px-4 font-semibold text-left text-xs">
                    Votes
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((c, index) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        {c.profile ? (
                          <img
                            src={c.profile}
                            alt="Profile"
                            className="h-8 w-8 rounded-full border object-cover"
                          />
                        ) : (
                          <UserCircle2 size={28} className="text-gray-400" />
                        )}
                        <span className="font-medium text-gray-900">
                          {c.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {c.party || "Independent"}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {c.percentage.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${c.percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {c.votes.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
<div className="w-full md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 p-4 bg-gray-50 h-[500px]">
  <CommentSection pollId={data.id} />
</div>

          </div>
        </>
      )}

      {/* Last Updated */}
      <div className="mt-4 w-full self-center mx-auto text-xs text-gray-500 flex items-center">
        <Clock className="w-3 h-3 mr-1" />
        Last Updated: {new Date(data.created_at).toLocaleString("en-KE")}
      </div>
    </div>
  );
};

export default LiveDetailsReport;
