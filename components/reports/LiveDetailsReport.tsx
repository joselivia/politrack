"use client";
import React, { useState } from "react";
import { baseURL } from "@/config/baseUrl";
import { BarChart2 } from "lucide-react";
import useSWR from "swr";

export interface Candidate {
  id: number;
  name: string;
  profile?: string;
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
  results: Candidate[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LiveDetailsReport = ({
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

  if (isLoading) return <p className="text-gray-500 text-sm">Loading...</p>;
  if (error) return <p className="text-red-500 text-sm">Failed to load poll</p>;
  if (!data) return <p className="text-gray-400 text-sm">No data</p>;

  const chartData = data.results.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    percentage: parseFloat(candidate.percentage),
    profile: candidate.profile,

  }));

  if (compact) {
    const visibleCandidates = showAll ? chartData : chartData.slice(0, 3);

    return (
      <div className="text-sm text-gray-800">
        <p className="font-bold mb-2">{data.title}</p>

        {chartData.length === 0 ? (
          <p className="text-gray-500">No votes yet.</p>
        ) : (
          <div className="space-y-1">
            {visibleCandidates.map((c) => (
              <div key={c.id} className="flex justify-between items-center">
                <span className="font-medium">{c.name}</span>
                <span className="text-gray-600">
                 ({c.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}

            {chartData.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                {showAll
                  ? "Show less"
                  : `Show ${chartData.length - 3} more candidates`}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // ✅ fallback for full view (if needed)
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2 flex items-center">
        <BarChart2 className="w-4 h-4 text-blue-600 mr-1" /> {data.title}
      </h2>
      <p className="text-sm text-gray-500">Full view coming soon…</p>
    </div>
  );
};

export default LiveDetailsReport;
