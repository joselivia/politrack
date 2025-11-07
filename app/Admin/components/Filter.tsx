"use client";
import React, { useState, useEffect } from "react";
import { PollData } from "@/config/poll";

interface Props {
  allPolls: PollData[];
  setFilteredPolls: React.Dispatch<React.SetStateAction<PollData[]>>;
}

export default function FilterPollsPage({ allPolls, setFilteredPolls }: Props) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [county, setCounty] = useState("");
  const [category, setCategory] = useState("");
  const [pollstatus, setPollstatus] = useState("");

useEffect(() => {
  const filtered = allPolls.filter((poll) => {
    const now=new Date();
    const expire=new Date(poll.voting_expires_at);
    const istLive=expire>now;
    const status=istLive?"Live":"Ended";
    return (
      (search === "" ||
        (poll.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (poll.presidential?.toLowerCase() || "").includes(search.toLowerCase())|| (poll.category?.toLowerCase() || "").includes(search.toLowerCase()) ) &&
      (region === "" || poll.region === region) &&
      (county === "" || poll.county === county) &&
      (pollstatus === "" || status === pollstatus)
    
    );
  });
  setFilteredPolls(filtered);
}, [search, region, county, category,pollstatus, allPolls, setFilteredPolls]);


  const clearFilters = () => {
    setSearch("");
    setRegion("");
    setCounty("");
    setCategory("");
    setPollstatus("");
    setFilteredPolls(allPolls);
  };

  return (
    <div className="mb-5 flex flex-wrap justify-center  gap-3 items-center ">
      <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg flex-grow max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent p-2 focus:outline-none"
          placeholder="Search poll title or presidential name..."
        />
      </div>
     <select
        value={pollstatus}
        onChange={(e) => setPollstatus(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 bg-white"
      >
        <option value="" className="text-gray-400">Poll Status</option>
        {["Live", "Ended",
        ].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 bg-white"
      >
        <option value="" className="text-gray-400">All Regions</option>
        {["National",
          "Central",
          "Coast",
          "Eastern",
          "Nairobi",
          "North Eastern",
          "Nyanza",
          "Rift Valley",
          "Western",
        ].map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <select
        value={county}
        onChange={(e) => setCounty(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 bg-white"
      >
        <option value="">All Counties</option>
        {[
          "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu",
          "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
          "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
          "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
          "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru", "Nandi",
          "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",
          "Taita Taveta", "Tana River", "Tharaka Nithi", "Trans Nzoia",
          "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
        ].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button
        onClick={clearFilters}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>
  );
}
