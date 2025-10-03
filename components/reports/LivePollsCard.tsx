"use client";
import React, { useState } from "react";
import { baseURL } from "@/config/baseUrl";
import {
  BarChart2,
  ChevronDown,
  ChevronUp,
  UserCircle2,
  MapPin,
  Building2,
  Users,
  Clock,
  Award,
} from "lucide-react";
import useSWR from "swr";

export interface Candidate {
  id: number;
  name: string;
  profile?: string;
  percentage: string;
  party?: string;
  voteCount?: number;
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
  totalVotes?: number;
  total_votes?: number;
  spoiled_votes?: number;
  results: Candidate[];
  voting_expires_at?: string;
  created_at?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LivePollsCard = ({
  id,
  compact = false,
}: {
  id?: number;
  compact?: boolean;
}) => {
  const { data, error, isLoading } = useSWR<PollData>(
    id ? `${baseURL}/api/aspirant/${id}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading poll data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-sm font-medium">
          Failed to load poll data
        </p>
        <p className="text-red-600 text-xs mt-1">Please try again later</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-sm">No poll data available</p>
      </div>
    );
  }

  const chartData = data.results.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    percentage: parseFloat(candidate.percentage),
    profile: candidate.profile,
    party: candidate.party,
    votes: candidate.voteCount || 0,
  }));

  const totalVotes = data.totalVotes || data.total_votes || 0;
  const isPollActive = data.voting_expires_at
    ? new Date(data.voting_expires_at) > new Date()
    : false;

  if (compact) {
    const visibleCandidates = showAll ? chartData : chartData.slice(0, 3);
    const leadingCandidate = chartData.length > 0 ? chartData[0] : null;

    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center">
              <BarChart2 className="w-4 h-4 text-blue-600 mr-2" />
              {data.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                isPollActive
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {isPollActive ? "LIVE" : "ENDED"}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">
              {data.region.replace("_", " ")} • {data.county}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Leading Candidate Highlight */}
          {leadingCandidate && (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-3 mb-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">Current Leader</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {leadingCandidate.percentage.toFixed(1)}%
                  </div>
                  <div className="text-xs opacity-90">
                    {leadingCandidate.name}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vote Statistics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center bg-gray-50 rounded-lg p-2">
              <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="font-bold text-gray-900 text-sm">
                {totalVotes.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Total Votes</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-2">
              <Clock className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <div className="font-bold text-gray-900 text-sm">
                {chartData.length}
              </div>
              <div className="text-xs text-gray-500">Candidates</div>
            </div>
          </div>

          {/* Candidates List */}
          {chartData.length === 0 ? (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">No votes recorded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleCandidates.map((candidate, index) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="relative">
                      {candidate.profile ? (
                        <img
                          src={candidate.profile}
                          alt={candidate.name}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        />
                      ) : (
                        <UserCircle2 className="w-8 h-8 text-gray-400" />
                      )}
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {candidate.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {candidate.party || "Independent"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-sm">
                      {candidate.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {candidate.votes.toLocaleString()} votes
                    </div>
                  </div>
                </div>
              ))}

              {/* Show More/Less Toggle */}
              {chartData.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center justify-center w-full py-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show {chartData.length - 3} More Candidates
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Progress Bars */}
          {chartData.length > 0 && (
            <div className="mt-4 space-y-2">
              {visibleCandidates.map((candidate, index) => (
                <div key={candidate.id} className="flex items-center space-x-3">
                  <div className="w-16 text-xs text-gray-600 font-medium truncate">
                    {candidate.name.split(" ")[0]}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${candidate.percentage}%`,
                        backgroundColor: index === 0 ? "#10B981" : "#3B82F6",
                        opacity: index === 0 ? 1 : 0.8,
                      }}
                    />
                  </div>
                  <div className="w-10 text-xs font-bold text-gray-700 text-right">
                    {candidate.percentage.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full View (Enhanced)
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <BarChart2 className="w-5 h-5 text-blue-600 mr-2" />
          {data.title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isPollActive
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-gray-100 text-gray-800 border border-gray-200"
          }`}
        >
          {isPollActive ? "LIVE POLL" : "POLL ENDED"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {totalVotes.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Votes</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {chartData.length > 0
              ? `${chartData[0].percentage.toFixed(1)}%`
              : "0%"}
          </div>
          <div className="text-sm text-gray-600">Leading Candidate</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {chartData.length}
          </div>
          <div className="text-sm text-gray-600">Candidates</div>
        </div>
      </div>

      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">
          Full detailed view available
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Click to explore comprehensive poll analytics
        </p>
      </div>
    </div>
  );
};

export default LivePollsCard;
