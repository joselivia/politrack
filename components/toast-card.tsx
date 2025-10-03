"use client";
import { useEffect, useState } from "react";
import {
  Radio,
  X,
  MapPin,
  Users,
  Clock,
  Crown,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { baseURL } from "@/config/baseUrl";
import Link from "next/link";

interface LeaderInfo {
  name: string;
  votes: number;
  percentage: number;
}

export default function ToastCard() {
  const [show, setShow] = useState(true);
  const [polls, setPolls] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaders, setLeaders] = useState<Map<string, LeaderInfo>>(new Map());

  useEffect(() => {
    const fetchLatestPolls = async () => {
      try {
        const response = await fetch(`${baseURL}/api/aspirant/published`);
        if (!response.ok) throw new Error("Failed to fetch polls.");

        const data: any[] = await response.json();

        // Get ALL live polls
        const livePolls = data.filter(
          (p) => new Date(p.voting_expires_at) > new Date()
        );

        if (livePolls.length > 0) {
          setPolls(livePolls);
          calculateAllLeaders(livePolls);
        } else {
          setPolls([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPolls();
  }, []);

  const calculateAllLeaders = (pollData: any[]) => {
    const leadersMap = new Map<string, LeaderInfo>();

    pollData.forEach((poll) => {
      if (!poll.candidates || poll.candidates.length === 0) {
        return;
      }

      const leadingCandidate = poll.candidates.reduce(
        (prev: any, current: any) =>
          prev.votes > current.votes ? prev : current
      );

      const percentage =
        poll.total_votes > 0
          ? Math.round((leadingCandidate.votes / poll.total_votes) * 100)
          : 0;

      leadersMap.set(poll.id, {
        name: leadingCandidate.name,
        votes: leadingCandidate.votes,
        percentage,
      });
    });

    setLeaders(leadersMap);
  };

  const nextPoll = () => {
    setCurrentIndex((prev) => (prev + 1) % polls.length);
  };

  const prevPoll = () => {
    setCurrentIndex((prev) => (prev - 1 + polls.length) % polls.length);
  };

  const goToPoll = (index: number) => {
    setCurrentIndex(index);
  };

  // Don't show if no live polls
  if (!show || polls.length === 0) return null;

  const currentPoll: any = polls[currentIndex];
  const currentLeader = leaders.get(currentPoll.id);
  const isLive = new Date(currentPoll.voting_expires_at) > new Date();

  return (
    <div className="fixed top-20 right-6 z-50 animate-slide-in">
      <div className="relative bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-xl border border-blue-200/50 w-80 backdrop-blur-sm">
        {/* Header with Navigation */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Radio className="w-4 h-4 text-white" />
                <div className="absolute inset-0 animate-ping">
                  <Radio className="w-4 h-4 text-red-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">LIVE POLLS</span>
                <span className="text-xs text-blue-200">
                  {currentIndex + 1} of {polls.length}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Navigation Arrows */}
              {polls.length > 1 && (
                <div className="flex items-center space-x-1 mr-2">
                  <button
                    onClick={prevPoll}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextPoll}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <button
                onClick={() => setShow(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Poll Title */}
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">
            {currentPoll.title}
          </h3>

          {/* Location Info */}
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="w-3 h-3 mr-1 text-blue-500" />
            <span className="truncate">
              {currentPoll.region.replace("_", " ")} • {currentPoll.county}
            </span>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Total Votes Card */}
            <div className="bg-white rounded-md p-3 border border-blue-100 shadow-sm">
              <div className="flex justify-between items-center gap-2">
                <Users className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-bold text-gray-700">
                  Total Votes
                </span>
                <div className="text-md font-bold text-gray-900">
                  {currentPoll.total_votes.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Spoiled Votes Card (if applicable) */}
            <div className="bg-white rounded-md p-3 border border-red-100 shadow-sm">
              <div className="flex justify-between items-center gap-2">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs font-medium text-gray-700">
                  Spoiled Votes
                </span>
                <div className="text-md font-bold text-red-700">
                  {currentPoll.spoiled_votes.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* View Details Link */}
          <Link
            href={`/polls/${currentPoll.id}`}
            className="block w-full bg-gradient-to-r from-accent to-slate-900 hover:from-slate-900 hover:to-accent text-white text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            View Full Results
          </Link>
        </div>

        {/* Footer with Dot Indicators */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Politrack Africa</span>

            {/* Dot Indicators */}
            {polls.length > 1 && (
              <div className="flex items-center space-x-1">
                {polls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPoll(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-700">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
