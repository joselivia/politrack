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
  Radio,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FilterPollsPage from "./Filter";
import { PollData } from "@/config/poll";

const AllAspirantPollPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const router = useRouter();

  // ✅ Fetch all polls once
  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const res = await fetch(`${baseURL}/api/aspirant`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch polls.");
        }
        const data: PollData[] = await res.json();
        setPolls(data);
        setFilteredPolls(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching polls.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPolls();
  }, []);

  // ✅ Delete poll
  const handleDelete = async (pollId: number) => {
    if (!confirm("Are you sure you want to delete this poll?")) return;
    setUpdatingId(pollId);
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${pollId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete poll.");
      }
      setPolls((prev) => prev.filter((p) => p.id !== pollId));
      setFilteredPolls((prev) => prev.filter((p) => p.id !== pollId));
      setMenuOpenId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ Toggle publish status
  const togglePublish = async (id: number, published: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${id}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (!res.ok) throw new Error("Failed to update publish status");

      const updated = await res.json();
      setPolls((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, published: updated.published } : p
        )
      );
      setFilteredPolls((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, published: updated.published } : p
        )
      );
      setMenuOpenId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const isPollActive = (expiresAt: string) => {
    try {
      return new Date(expiresAt) > new Date();
    } catch {
      return false;
    }
  };

  // ✅ Loading and Error UI
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

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-5 font-inter">
      <FilterPollsPage allPolls={polls} setFilteredPolls={setFilteredPolls} />

      <div className="mx-auto rounded-2xl p-5 border border-gray-200 bg-white/70 backdrop-blur-sm shadow-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
          <List className="mr-3 text-blue-600 w-9 h-9" /> Aspirant Polls
        </h1>

        {filteredPolls.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-10">
            No polls found. Try adjusting filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolls.map((poll) => {
              const active = isPollActive(poll.voting_expires_at);
              return (
                <div
                  key={poll.id}
                  className="relative p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Dropdown Menu */}
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === poll.id ? null : poll.id)
                    }
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                  >
                    <EllipsisVertical className="text-gray-600 w-6 h-6" />
                  </button>

                  {menuOpenId === poll.id && (
                    <div className="absolute top-10 right-3 w-44 bg-white rounded-lg shadow-lg flex flex-col p-2 z-50 border animate-in fade-in slide-in-from-top-2">
                      <button
                        onClick={() => togglePublish(poll.id, poll.published)}
                        disabled={updatingId === poll.id}
                        className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-200 rounded flex items-center justify-between"
                      >
                        {poll.published ? "Unpublish" : "Publish"}
                        {updatingId === poll.id && (
                          <Loader2 className="w-4 h-4 animate-spin ml-1" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            `/Admin/dummyCreatePoll/EditAspirants/${poll.id}`
                          )
                        }
                        className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-200 rounded text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(poll.id)}
                        disabled={updatingId === poll.id}
                        className={`px-3 py-2 text-sm text-left rounded ${
                          updatingId === poll.id
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-100"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Radio
                        className={`w-5 h-5 ${
                          active
                            ? "text-green-500 animate-pulse"
                            : "text-gray-400"
                        }`}
                      />
                      <h2 className="text-lg font-semibold text-gray-800">
                        {poll.title}
                      </h2>     <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        poll.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {poll.published ? "Published" : " "}
                    </span>
                    </div>
                                 </div>

                  {/* Poll Info */}
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">{poll.category}</span>
                    {poll.presidential && ` • ${poll.presidential}`}
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      Ward: {poll.ward || "All"}, Const:{" "}
                      {poll.constituency || "All"}, County: {poll.county || "All"}
                    </p>
                    <p className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                      Created: {new Date(poll.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={{
                        pathname: `/Admin/vote/${poll.id}`,
                        query: { region: poll.region, county: poll.county },
                      }}
                      className="block text-blue-600 font-semibold hover:underline flex-grow text-center py-2 px-3 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Vote
                    </Link>

                    <Link
                      href={`/Admin/fullvotes/${poll.id}`}
                      className="block text-indigo-600 font-semibold hover:underline flex-grow text-center py-2 px-3 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                      Results
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAspirantPollPage;
