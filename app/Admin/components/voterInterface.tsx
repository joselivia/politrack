"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/baseUrl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  regionCountyMap,
  countyConstituencyMap,
  countyAssemblyWardMap,
} from "../dummyCreatePoll/createpoll/Places";

interface Candidate {
  id: number;
  name: string;
}
interface PollData {
  title: string;
  results: Candidate[];
  voting_expires_at: string;
  voting_id: string;
  created_at: Date | string;
  allow_multiple_votes?: boolean;
 
}

const VoteInterface = ({ id }: { id: number }) => {
  const router = useRouter();
  const [data, setData] = useState<PollData | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [competitorQuestion, setCompetitorQuestion] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [voterId, setVoterId] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localAllowMultipleVotes, setLocalAllowMultipleVotes] = useState<boolean | null>(null);
const searchParams = useSearchParams();
const prefilledRegion = searchParams.get("region") || "";
const prefilledCounty = searchParams.get("county") || "";

  // 🧍‍♂️ Voter detail states
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
const [region, setRegion] = useState(prefilledRegion);
const [county, setCounty] = useState(prefilledCounty);
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");

  const constituencies = county ? countyConstituencyMap[county] : [];
  const wards = constituency ? countyAssemblyWardMap[constituency] : [];

  // --- Handle Mount ---
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("voter_id");
    if (!storedId) {
      const pollId = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("voter_id", pollId );
      setVoterId(pollId);
    } else {
      setVoterId(storedId);
    }
  }, []);

  // --- Fetch Data ---
  useEffect(() => {
    if (!voterId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/aspirant/${id}`);
        const fetchedData = res.data as PollData;
        setData((prev) => ({
          ...fetchedData,
          allow_multiple_votes:
            localAllowMultipleVotes !== null
              ? localAllowMultipleVotes
              : fetchedData.allow_multiple_votes,
        }));
      } catch (err) {
        console.error("Error fetching poll data:", err);
      }
    };

    const fetchCompetitorQuestion = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/votes/${id}/questions`);
        const question = res.data.find((q: any) => q.is_competitor_question);
        setCompetitorQuestion(question?.question_text || null);
      } catch (err) {
        console.error("Error fetching competitor question:", err);
      }
    };
    const checkIfVoted = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/votes/status`, {
          params: { pollId: id, voter_id: voterId },
        });

        if (res.data.alreadyVoted && !data?.allow_multiple_votes) {
          setMessage("You have already voted in this poll.");
        }
      } catch (err) {
        console.error("Error checking vote status:", err);
      }
    };
    fetchData();
    fetchCompetitorQuestion();
  if (!data?.allow_multiple_votes) {
      checkIfVoted();
    }
    const interval = setInterval(() => {
      fetchData();
      fetchCompetitorQuestion();
    }, 5000);

    return () => clearInterval(interval);
  }, [id, voterId, data?.allow_multiple_votes, localAllowMultipleVotes]);

  // --- Countdown Timer ---
  useEffect(() => {
    if (!data?.voting_expires_at) return;

    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(data.voting_expires_at);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Voting closed");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.voting_expires_at]);

  // --- Voting Logic ---
  const handleVote = async () => {
    if (!selectedCandidateId || !data || !voterId) return;

  if (!name || !gender || !region) {
  setMessage("❌ Please fill in your voter details before voting.");
  return;
}

if (region !== "National" && (!county || !constituency || !ward)) {
  setMessage("❌ Please complete your location details before voting.");
  return;
}


    setIsVoting(true);
    setMessage(null);

    try {
      const response = await axios.post(`${baseURL}/api/votes`, {
        id,
        competitorId: selectedCandidateId,
        voter_id: voterId,
        name,
        gender,
        region,
        county,
        constituency,
        ward,
      });

      if (response.status === 200) {
        setMessage("✅ Vote recorded successfully!");
        setSelectedCandidateId(null);
        setName("");
        setGender("");
        setConstituency("");
        setWard("");
        if (!isAdmin) {
          setTimeout(() => router.replace("/Thankyou"), 1000);
        }
      }
    } catch (error: any) {
      if (!isAdmin && axios.isAxiosError(error) && error.response?.status === 403) {
        setMessage("⚠️ You have already voted in this poll.");
      } else {
        console.error("Error voting:", error);
        setMessage("❌ Failed to record vote. Please try again.");
      }
    } finally {
      setIsVoting(false);
    }
  };
  const toggleMultipleVoting = async () => {
    if (!data) return;
    try {
      const updated = !data.allow_multiple_votes;
      await axios.patch(`${baseURL}/api/votes/${id}/allow-multiple`, {
        allow_multiple_votes: updated,
      });
      setLocalAllowMultipleVotes(updated);
      setData({ ...data, allow_multiple_votes: updated });
      setMessage(
        updated ? "Multiple voting enabled" : "Multiple voting disabled"
      );
    } catch (err) {
      console.error("Error toggling multiple voting:", err);
      setMessage("Failed to update voting mode.");
    }
  };
  if (!data)
    return <p className="text-center p-4 text-gray-600">Loading poll data...</p>;

  const isVotingClosed = countdown === "Voting closed";
if (isVotingClosed) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">🕒 Voting Closed</h1>
      <p className="text-gray-600 text-sm">
        The voting period for this poll has ended.
      </p>
    </div>
  );
}   const hasVoted =
    !data.allow_multiple_votes &&
    message === "You have already voted in this poll.";
  return (
    <div className="max-w-lg mx-auto p-4 min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{data.title || "Cast Your Vote"}</h1>
        <p className="text-sm text-red-600 mt-2">
          Voting closes in: {countdown || "Not Set"}
        </p>
        {mounted && isAdmin && (
          <button
            onClick={toggleMultipleVoting}
            className={`mt-3 px-4 py-2 rounded-full text-white text-sm ${
              data.allow_multiple_votes ? "bg-blue-600" : "bg-gray-500"
            }`}
          >
            {data.allow_multiple_votes ? "Disable Call Centre" : "Enable Call Centre"}
          </button>
        )}
      </div>
{hasVoted ? (
  <div className="bg-white mt-6 p-4 rounded-lg shadow-md flex justify-center items-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
  </div>
) : (
       <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
        <h1 className="text-lg font-semibold mb-4">Enter Your Details.</h1>
            {/* 🧍‍♂️ Voter Details Section */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Prefer not to say</option>
          </select>


<div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
  {region}
</div>

{region !== "National" && (
  <>
<div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
  {county}
</div>
    <select
      value={constituency}
      onChange={(e) => {
        setConstituency(e.target.value);
        setWard("");
      }}
      disabled={!county}
      className="w-full p-3 border border-gray-300 rounded-lg"
    >
      <option value="">Select Constituency</option>
      {constituencies.map((cst) => (
        <option key={cst} value={cst}>
          {cst}
        </option>
      ))}
    </select>

    <select
      value={ward}
      onChange={(e) => setWard(e.target.value)}
      disabled={!constituency}
      className="w-full p-3 border border-gray-300 rounded-lg"
    >
      <option value="">Select Ward</option>
      {wards.map((w) => (
        <option key={w} value={w}>
          {w}
        </option>
      ))}
    </select>
  </>
)}

        </div>

        {/* 🗳️ Candidate Selection */}
        <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {competitorQuestion || "Select Your Candidate"}
        </h2>
          {data.results.map((candidate) => (
            <label key={candidate.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="candidate"
                value={candidate.id}
                checked={selectedCandidateId === candidate.id}
                onChange={() => setSelectedCandidateId(candidate.id)}
                className="text-indigo-600 focus:ring-indigo-500"
                disabled={isVoting || isVotingClosed}
              />
              <span>{candidate.name}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleVote}
          disabled={isVoting || !selectedCandidateId || isVotingClosed}
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isVoting ? "Voting..." : "Submit Vote"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
)}
    </div>
  );
};

export default VoteInterface;
