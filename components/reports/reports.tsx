"use client";

import React, { useState, useEffect } from "react";
import { baseURL } from "@/config/baseUrl"; 
import Link from "next/link";
import { Loader2, Frown, Radio } from "lucide-react";

export interface PollData {
  id: number;
  title: string;
 
}

const LiveReportsPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchAllPolls = async () => {
    try {
      const response = await fetch(`${baseURL}/api/aspirant/published`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch polls.");
      }
      const data: PollData[] = await response.json();
      setPolls(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while fetching polls.");
    } finally {
      setLoading(false);
    }
  };

  fetchAllPolls();
}, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        <p className="ml-4 text-xl text-gray-700">Loading polls...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Frown className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-red-700 font-semibold mb-2">Error:</p>
        <p className="text-lg text-red-600 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()} 
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className=" text-gray-800 font-inter antialiased">
        <ol className="space-y-4">
          {polls.map((poll) => (
            <li key={poll.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <Radio color="red" className="animate-ping"/><Link
                href={`https://politrackafrica.co.ke/fullvotes/${poll.id}`}
                className="rounded-lg  text-lg font-semibold text-indigo-700 hover:text-indigo-900 hover:underline"
              >
                {poll.title}
              </Link>
            </li>
          ))}
        </ol>
    </div>
  );
};

export default LiveReportsPage;
