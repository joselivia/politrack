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

const AllApirantPollPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const router = useRouter();
  const [filteredPolls, setFilteredPolls] = useState<PollData[]>([]);

  useEffect(() => {
    fetchAllPolls();
  }, []);

  const fetchAllPolls = async () => {
    try {
      const response = await fetch(`${baseURL}/api/aspirant`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch polls.");
      }
      const data: PollData[] = await response.json();
      setPolls(data);
      setFilteredPolls(data);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred while fetching polls."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPolls();
  }, []);

  // ✅ Delete poll
  const handleDelete = async (pollId: number) => {
    if (!confirm("Are you sure you want to delete this poll?")) return;
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${pollId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete poll.");
      }
      setPolls((prev) => prev.filter((p) => p.id !== pollId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const isPollActive = (expiresAt: string) => {
    try {
      return new Date(expiresAt) > new Date();
    } catch {
      return false;
    }
  };
  const togglePublish = async (id: number, published: boolean) => {
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
    } catch (err: any) {
      alert(err.message || "Failed to toggle publish status");
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-3 lg:p-3 font-inter">
      <FilterPollsPage allPolls={polls} setFilteredPolls={setFilteredPolls} />

      <div className="mx-auto rounded-2xl p-3 sm:p-5 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
          <List className="mr-3 text-blue-600 w-10 h-10" /> Available Aspirant
          Polls
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => (
            <div
              key={poll.id}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 group flex flex-col justify-between relative"
            >
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
                      onClick={() => togglePublish(poll.id, poll.published)}
                      className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-200 rounded text-left"
                    >
                      {poll.published ? "Unpublish" : "Publish"}
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
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>

              <div>
<div className="flex items-center gap-3 mb-2">
  {/* Status Indicator */}
  <div className="flex items-center gap-2">
    <Radio
      className={`w-5 h-5 ${
        isPollActive(poll.voting_expires_at)
          ? "text-green-500 animate-pulse"
          : "text-gray-400"
      }`}
    />
  </div>

  {/* Poll Title */}
  <h2 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
    {poll.title}
  </h2>
</div>


                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">{poll.category}</span>
                  {poll.presidential && ` | ${poll.presidential}`}
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    Ward: {poll.ward || "All" }, Const:{" "}
                    {poll.constituency ||"All" }, County: {poll.county || "All" }
                  </p>
                  <p className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                    Created: {new Date(poll.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
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
                  Aspirant results
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApirantPollPage;
