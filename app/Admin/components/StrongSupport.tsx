"use client";
import { useEffect, useState } from "react";
import { baseURL } from "@/config/baseUrl";
import { Loader2 } from "lucide-react";
import { countyConstituencyMap, countyAssemblyWardMap } from "../dummyCreatePoll/createpoll/Places";
import React from "react";

interface Stronghold {
  county: string;
  constituency: string;
  ward: string;
  candidate_name: string;
  total_votes: number;
}

export default function StrongholdsTable({ pollId }: { pollId: number }) {
  const [data, setData] = useState<Stronghold[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pollId) return;
    setLoading(true);
    fetch(`${baseURL}/api/votes/${pollId}/strongholds`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to load strongholds.");
      })
      .finally(() => setLoading(false));
  }, [pollId]);

  if (loading)
    return (
      <div className="p-6 bg-white rounded-2xl border shadow">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl">
        <p className="font-semibold">Error loading data</p>
        <p className="text-sm">{error}</p>
      </div>
    );

  if (!data.length)
    return (
      <div className="bg-white rounded-2xl border shadow p-8 text-center text-gray-600">
        No stronghold data yet.
      </div>
    );

  const validCounty = data.find((d) => d.county && d.county.trim())?.county;
  if (!validCounty) return null;

  const countyData = data.filter((d) => d.county === validCounty);
  const candidates = Array.from(new Set(countyData.map((d) => d.candidate_name)));
  const allConstituencies = countyConstituencyMap[validCounty] || [];
  const constituenciesWithData = allConstituencies.filter((consti) =>
    countyData.some((d) => d.constituency === consti)
  );
  return (
    <div className="overflow-x-auto rounded-2xl  border-8 shadow bg-white">
      <div className="p-4">
        <h2 className="text-lg font-bold text-blue-700 mb-2">
          {validCounty} County
        </h2>
        <table className="min-w-full text-sm border-collapse">
   <thead>
  <tr className="bg-blue-100 text-blue-800">
    <th className="p-2 border border-blue-200">Area</th>
    {candidates.map((cand) => (
      <th
        key={cand}
        className="p-2 border border-blue-200 max-w-[120px] truncate"
        title={cand.trim()} // hover shows full name
      >
        {cand.trim().length > 15 ? cand.trim().slice(0, 15) + "..." : cand.trim()}
      </th>
    ))}
  </tr>
</thead>

          <tbody>
            {constituenciesWithData.map((consti, idx) => {
          const wardsWithData = (countyAssemblyWardMap[consti] || []).filter((ward) =>
                countyData.some((d) => d.ward === ward)
              );
              if(!wardsWithData.length) return null;
              const constituencyRows = wardsWithData.map((ward) => (
                <tr key={ward} className="hover:bg-blue-50">
                  <td className="pl-6 p-2 border text-gray-700">{ward}</td>
                  {candidates.map((cand) => {
                    const match = countyData.find(
                      (d) => d.ward === ward && d.candidate_name === cand
                    );
                    return (
                      <td key={cand} className="p-2 border text-center">
                        {match ? match.total_votes : "-"}
                      </td>
                    );
                  })}
                </tr>
              ));

  return (
    <React.Fragment key={consti || idx}>
      <tr className="bg-blue-50 font-semibold">
        <td
          colSpan={candidates.length + 1}
          className="p-2 border text-left text-blue-700"
        >
          {consti} Constituency
        </td>
      </tr>
      {constituencyRows}
    </React.Fragment>
  );
})}
          </tbody>
        </table>
      </div>
    </div>
  );
}
