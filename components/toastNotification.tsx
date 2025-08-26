"use client";
import { useEffect, useState } from "react";
import { Radio, X } from "lucide-react"; 
import { baseURL } from "@/config/baseUrl";
import { PollData } from "./reports";
import Link from "next/link";

export default function ToastCard() {
  const [show, setShow] = useState(true); 
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPoll = async () => {
      try {
        const response = await fetch(`${baseURL}/api/aspirant/published`);
        if (!response.ok) throw new Error("Failed to fetch polls.");

        const data: PollData[] = await response.json();

        if (data.length > 0) {
          setPoll(data[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPoll();
  }, []);

  if (!show || !poll) return null;

  return (
    <div className="fixed top-18 right-6 z-50">
      <div className="relative bg-white shadow-xl rounded-2xl p-2 border border-gray-200 animate-slide-in w-72">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <Radio color="red" className="inline-block mr-2 animate-ping" />
          <Link
            href={`http://politrackafrica.co.ke/fullvotes/${poll.id}`}
            className="text-lg font-semibold text-indigo-700 hover:underline"
          >
            {poll.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
