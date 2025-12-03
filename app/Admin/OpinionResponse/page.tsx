"use client";

import React, { useState, useEffect } from "react";
import { baseURL } from "@/config/baseUrl";
import Link from "next/link";
import {
  Loader2,
  Frown,
  List,
  CalendarDays,
  MapPin,
  EllipsisVertical,
  Trash2,
  PencilLine,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PollSummary {
  id: number;
  title: string;
  category: string;
  presidential: string | null;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  created_at: string;
}

const AllPollsPage = () => {
  const [polls, setPolls] = useState<PollSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setMounted(true);
  }, []);

  const handleDelete = async (pollId: number) => {
    if (!confirm("Are you sure you want to delete this poll?")) return;

    setDeletingId(pollId);
    try {
      const res = await fetch(`${baseURL}/api/Opinions/${pollId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete poll.");
      }

      // Remove deleted poll from state
      setPolls((prev) => prev.filter((p) => p.id !== pollId));
      setMenuOpenId(null);
    } catch (err: any) {
      alert(err.message || "Error deleting poll");
    } finally {
      setDeletingId(null);
    }
  };

const handleEdit = (id: number) => {
  setMenuOpenId(null);
  //alert("Coming Soon");
router.push(`/Admin/dummyCreatePoll/CreateQuiz/EditQuiz/${id}`);

};
  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const response = await fetch(`${baseURL}/api/polls`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch polls.");
        }
        const data: PollSummary[] = await response.json();
        setPolls(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred while fetching polls.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolls();
  }, []);

  // ---------- UI STATES ----------
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

  // ---------- MAIN RENDER ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-3 lg:p-3 font-inter">

      <div className="mx-auto p-3 sm:p-5 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
          <List className="mr-3 text-blue-600 w-10 h-10" /> Opinion Responses
        </h1>

        {polls.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No polls available yet. Create one!</p>
            {mounted && isAdmin && (
              <Link
                href="/Admin/dummyCreatePoll/createpoll"
                className="mt-6 inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
              >
                Create New Poll
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {polls.map((poll) => (
              <div
                key={poll.id}
                className="relative p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
              >
                {/* Menu Button */}
                {mounted && isAdmin && (
                  <>
                    <button
                      onClick={() =>
                        setMenuOpenId(menuOpenId === poll.id ? null : poll.id)
                      }
                      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                    >
                      <EllipsisVertical className="text-gray-600 w-6 h-6" />
                    </button>

                    {menuOpenId === poll.id && (
                      <div className="absolute top-10 right-3 w-40 bg-white rounded-lg shadow-lg flex flex-col p-2 z-50 border">
                        <button
                          onClick={() => handleEdit(poll.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-200 rounded text-left"
                        >
                          <PencilLine className="w-4 h-4 text-blue-600" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(poll.id)}
                          disabled={deletingId === poll.id}
                          className={`flex items-center gap-2 px-3 py-2 text-sm rounded text-left ${
                            deletingId === poll.id
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {deletingId === poll.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Poll Info */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                    {poll.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">{poll.category}</span>
                    {poll.presidential && ` | ${poll.presidential}`}
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                 County: {poll.county}
                    </p>
                    <p className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                      Created: {new Date(poll.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/PollVotingResults/${poll.id}`}
                    className="block text-indigo-600 font-semibold hover:underline flex-grow text-center py-2 px-3 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    View Responses
                  </Link>

                    <Link
                      href={{ pathname: `/PollVoting/${poll.id}`, query: { region: poll.region, county: poll.county } }}
                      className="block text-blue-600 font-semibold hover:underline flex-grow text-center py-2 px-3 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      View Poll & Vote
                    </Link>
  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPollsPage;
