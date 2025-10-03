"use client";

import React, { useState, useEffect } from "react";
import { baseURL, websocketURL } from "@/config/baseUrl";
import Link from "next/link";
import {
  Loader2,
  Frown,
  Radio,
  MapPin,
  Calendar,
  Vote,
  CheckCircle,
} from "lucide-react";

export interface PollData {
  id: number;
  title: string;
  presidential: string;
  category: string;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  total_votes: number;
  spoiled_votes: number;
  published: boolean;
  voting_expires_at: string;
  created_at: string;
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
        setError(
          err.message || "An unknown error occurred while fetching polls."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolls();
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if poll is active
  const isPollActive = (expiresAt: string) => {
    return new Date(expiresAt) > new Date();
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Live Polls & Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time election data and polling results from across Kenya. Track
            live updates and voter statistics.
          </p>
        </div>

        {/* Polls Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Poll Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-5 h-5 animate-pulse" />
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isPollActive(poll.voting_expires_at)
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {isPollActive(poll.voting_expires_at) ? "LIVE" : "ENDED"}
                    </span>
                  </div>
                  {poll.presidential === "yeap" && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      PRESIDENTIAL
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold truncate">{poll.title}</h3>
                <p className="text-blue-100 text-sm mt-1">{poll.category}</p>
              </div>

              {/* Poll Details */}
              <div className="p-4">
                {/* Location Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">
                      {poll.region.replace("_", " ")} → {poll.county} →{" "}
                      {poll.constituency.replace("_", " ")} →{" "}
                      {poll.ward.replace("_", " ")}
                    </span>
                  </div>

                  {/* Voting Period */}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">
                      Ends: {formatDate(poll.voting_expires_at)}
                    </span>
                  </div>
                </div>

                {/* Vote Statistics */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-gray-700">
                      <Vote className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm font-semibold">
                        Vote Statistics
                      </span>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center bg-white rounded p-2 shadow-sm">
                      <div className="font-bold text-blue-700">
                        {poll.total_votes}
                      </div>
                      <div className="text-gray-500">Total Votes</div>
                    </div>
                    <div className="text-center bg-white rounded p-2 shadow-sm">
                      <div className="font-bold text-red-600">
                        {poll.spoiled_votes}
                      </div>
                      <div className="text-gray-500">Spoiled Votes</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`${websocketURL}/fullvotes/${poll.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  View Detailed Results
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {polls.length === 0 && (
          <div className="text-center py-12">
            <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Active Polls
            </h3>
            <p className="text-gray-500">
              There are currently no published polls available.
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Data updates in real-time • Politrack Africa ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveReportsPage;
