"use client";

import React, { useState, useEffect } from "react";
import { baseURL } from "@/config/baseUrl";
import Link from "next/link";
import {
  Loader2,
  Frown,
  Radio,
  MapPin,
  Calendar,
  Vote,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  Server,
  WifiOff,
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

const LivePolls = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAllPolls = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseURL}/api/aspirant/published`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;

        // Handle specific HTTP status codes
        switch (response.status) {
          case 404:
            errorMessage =
              "Polls data not found. The endpoint may have changed.";
            break;
          case 500:
            errorMessage =
              "Server is experiencing issues. Please try again later.";
            break;
          case 503:
            errorMessage =
              "Service temporarily unavailable. Please try again shortly.";
            break;
          default:
            try {
              const errorData = await response.json();
              errorMessage =
                errorData.message ||
                errorData.error ||
                `Error ${response.status}: ${response.statusText}`;
            } catch {
              errorMessage = `Error ${response.status}: ${response.statusText}`;
            }
        }

        console.log(errorMessage);
      }

      const data: PollData[] = await response.json();

      // Validate response data structure
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }

      setPolls(data);
      setRetryCount(0); // Reset retry count on success
    } catch (err: any) {
      console.error("Fetch error:", err);

      // Handle different error types
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError(
          "Network error: Unable to connect to server. Please check your internet connection."
        );
      } else if (err.name === "SyntaxError") {
        setError("Data format error: Invalid response from server.");
      } else {
        setError(
          err.message || "An unexpected error occurred while fetching polls."
        );
      }

      setRetryCount((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Check if poll is active
  const isPollActive = (expiresAt: string) => {
    try {
      return new Date(expiresAt) > new Date();
    } catch {
      return false;
    }
  };

  // Get appropriate error icon based on error type
  const getErrorIcon = () => {
    const errorLower = error?.toLowerCase() || "";
    if (
      errorLower.includes("network") ||
      errorLower.includes("internet") ||
      errorLower.includes("connect")
    ) {
      return <WifiOff className="w-16 h-16 text-orange-500 mb-4" />;
    } else if (
      errorLower.includes("server") ||
      errorLower.includes("service")
    ) {
      return <Server className="w-16 h-16 text-red-500 mb-4" />;
    } else {
      return <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />;
    }
  };

  // Enhanced loading component
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="text-center space-y-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            <Radio className="w-8 h-8 text-blue-400 absolute top-4 left-4 animate-pulse" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Loading Live Polls
            </h2>
            <p className="text-gray-600 max-w-md">
              Fetching the latest election data and polling results...
            </p>
          </div>

          {/* Loading skeleton for polls */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="mt-4 h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Enhanced error component
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md text-center space-y-6">
          {getErrorIcon()}

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Unable to Load Polls
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">{error}</p>
              {retryCount > 0 && (
                <p className="text-red-600 text-sm mt-2">
                  Attempt {retryCount} of 3
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={fetchAllPolls}
              disabled={retryCount >= 3}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {retryCount >= 3 ? "Max Retries Reached" : "Try Again"}
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
            >
              Reload Page
            </button>
          </div>

          {retryCount >= 3 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 text-sm">
                <strong>Still having issues?</strong> This might be a temporary
                server problem. Please check back in a few minutes or contact
                support if the problem persists.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Radio className="w-8 h-8 text-blue-600 mr-3 animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Live Polls & Results
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time election data and polling results from across Kenya.
              Track live updates and voter statistics.
            </p>

            {/* Refresh button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={fetchAllPolls}
                className="flex items-center px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>

          {/* Polls Count */}
          {polls.length > 0 && (
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-bold text-blue-600">{polls.length}</span>{" "}
                active poll{polls.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Polls Grid - Centered */}
          <div className="flex justify-center">
            {polls.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
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
                            {isPollActive(poll.voting_expires_at)
                              ? "LIVE"
                              : "ENDED"}
                          </span>
                        </div>
                        {poll.presidential === "yeap" && (
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            PRESIDENTIAL
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold truncate">
                        {poll.title}
                      </h3>
                      <p className="text-blue-100 text-sm mt-1">
                        {poll.category}
                      </p>
                    </div>

                    {/* Poll Details */}
                    <div className="p-4">
                      {/* Location Information */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm">
                            {poll.region?.replace(/_/g, " ") || "Unknown"} →{" "}
                            {poll.county || "Unknown"} →{" "}
                            {poll.constituency?.replace(/_/g, " ") || "Unknown"}{" "}
                            → {poll.ward?.replace(/_/g, " ") || "Unknown"}
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
                              {poll.total_votes?.toLocaleString() || 0}
                            </div>
                            <div className="text-gray-500">Total Votes</div>
                          </div>
                          <div className="text-center bg-white rounded p-2 shadow-sm">
                            <div className="font-bold text-red-600">
                              {poll.spoiled_votes?.toLocaleString() || 0}
                            </div>
                            <div className="text-gray-500">Spoiled Votes</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/polls/${poll.id}`}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                      >
                        View Detailed Results
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty state when no polls but no error
              <div className="text-center py-12 max-w-md">
                <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Active Polls Available
                </h3>
                <p className="text-gray-500 mb-6">
                  There are currently no published polls. Check back later for
                  new election data.
                </p>
                <button
                  onClick={fetchAllPolls}
                  className="flex items-center justify-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Note - Always at bottom */}
      <div className="py-4 bg-gradient-to-br from-blue-50 to-indigo-100 mt-auto border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-sm text-gray-700">
            <p className="flex items-center justify-center space-x-2">
              <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>
                Data updates in real-time • Politrack Africa ©{" "}
                {new Date().getFullYear()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePolls;
