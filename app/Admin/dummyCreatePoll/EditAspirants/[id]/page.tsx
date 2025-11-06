"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { baseURL } from "@/config/baseUrl";
import { Send } from "lucide-react";
import { PollData } from "@/app/Admin/components/AllAspirantPoll";
import {
  countyAssemblyWardMap,
  countyConstituencyMap,
} from "../../createpoll/Places";

export default function EditPollPage() {
  const { id } = useParams();
  const router = useRouter();
  const [editingPoll, setEditingPoll] = useState<PollData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Local states for dynamic selects
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");

  const constituencies =
    selectedCounty && countyConstituencyMap[selectedCounty]
      ? countyConstituencyMap[selectedCounty]
      : [];
  const wards =
    selectedConstituency && countyAssemblyWardMap[selectedConstituency]
      ? countyAssemblyWardMap[selectedConstituency]
      : [];

  // ✅ Fetch poll details
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await fetch(`${baseURL}/api/aspirant/${id}`);
        if (!res.ok) throw new Error("Failed to fetch poll");
        const data = await res.json();

        // Fetch competitor questions (if any)
        let competitorQ = null;
        try {
          const qRes = await fetch(`${baseURL}/api/votes/${id}/questions`);
          if (qRes.ok) {
            const qData = await qRes.json();
            competitorQ = qData.find((q: any) => q.is_competitor_question);
          }
        } catch (err) {
          console.error("Error fetching competitor question:", err);
        }

        setEditingPoll({
          ...data,
          competitors:
            data.competitors?.map((comp: any) => ({
              ...comp,
              profile: comp.profile || null,
            })) || [],
          questions: competitorQ
            ? [
                {
                  id: competitorQ.id,
                  question_text: competitorQ.question_text,
                  type: competitorQ.type || "text",
                  is_competitor_question: true,
                },
              ]
            : [],
        });

        // Set dropdown selections
        setSelectedCounty(data.county || "");
        setSelectedConstituency(data.constituency || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchPoll();
  }, [id]);

  // ✅ Handle poll update
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPoll) return;

    setSubmitting(true);
    try {
      let expiryValue = editingPoll.voting_expires_at;
      if (/^\d+$/.test(expiryValue)) {
        const hours = parseInt(expiryValue, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + hours);
        expiryValue = expiryDate.toISOString();
      }

      const formData = new FormData();
      formData.append("title", editingPoll.title);
      formData.append("presidential", editingPoll.presidential || "");
      formData.append("category", editingPoll.category || "");
      formData.append("region", editingPoll.region || "");
      formData.append("county", selectedCounty || "");
      formData.append("constituency", selectedConstituency || "");
      formData.append("ward", editingPoll.ward || "");
      formData.append("voting_expires_at", expiryValue || "");

      editingPoll.questions?.forEach((q, i) => {
        formData.append(`questions[${i}][id]`, q.id ? String(q.id) : "");
        formData.append(`questions[${i}][question_text]`, q.question_text || "");
        formData.append(`questions[${i}][type]`, q.type || "text");
        formData.append(
          `questions[${i}][is_competitor_question]`,
          q.is_competitor_question ? "true" : "false"
        );
      });

      editingPoll.competitors?.forEach((comp, i) => {
        formData.append(`competitors[${i}][id]`, comp.id ? String(comp.id) : "");
        formData.append(`competitors[${i}][name]`, comp.name || "");
        formData.append(`competitors[${i}][party]`, comp.party || "");
        if (comp.profile instanceof File) {
          formData.append(`competitors[${i}][profile]`, comp.profile);
        }
      });

      const res = await fetch(`${baseURL}/api/aspirant/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update poll");

      alert("Poll updated successfully!");
      router.push("/Admin/Reports");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!editingPoll) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading poll details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4">
          Edit Poll Details
        </h2>

        <form onSubmit={handleEditSubmit} className="space-y-6">
          {/* --- Poll Info --- */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poll Title
                </label>
                <input
                  type="text"
                  value={editingPoll.title}
                  onChange={(e) =>
                    setEditingPoll({ ...editingPoll, title: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingPoll.category || ""}
                  onChange={(e) =>
                    setEditingPoll({ ...editingPoll, category: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Presidential
              </label>
              <input
                type="text"
                value={editingPoll.presidential || ""}
                onChange={(e) =>
                  setEditingPoll({
                    ...editingPoll,
                    presidential: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* --- Location --- */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Geographic Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* --- County --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  County
                </label>
                <select
                  value={selectedCounty}
                  onChange={(e) => {
                    setSelectedCounty(e.target.value);
                    setSelectedConstituency("");
                    setEditingPoll({
                      ...editingPoll,
                      county: e.target.value,
                      constituency: "",
                      ward: "",
                    });
                  }}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select County</option>
                  {Object.keys(countyConstituencyMap).map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </div>

              {/* --- Constituency --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Constituency
                </label>
                <select
                  value={selectedConstituency}
                  onChange={(e) => {
                    setSelectedConstituency(e.target.value);
                    setEditingPoll({
                      ...editingPoll,
                      constituency: e.target.value,
                      ward: "",
                    });
                  }}
                  disabled={!selectedCounty}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Constituency</option>
                  {constituencies?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* --- Ward --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ward
                </label>
                <select
                  value={editingPoll.ward || ""}
                  onChange={(e) =>
                    setEditingPoll({
                      ...editingPoll,
                      ward: e.target.value,
                    })
                  }
                  disabled={!selectedConstituency}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Ward</option>
                  {wards?.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* --- Expiry --- */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voting Expiry (in hours)
            </label>
            <input
              type="number"
              value={editingPoll.voting_expires_at || ""}
              onChange={(e) =>
                setEditingPoll({
                  ...editingPoll,
                  voting_expires_at: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., 24"
            />
          </div>

          {/* --- Competitor Question --- */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Competitor Question
            </h3>
            {editingPoll.questions?.map((q, i) => (
              <input
                key={i}
                type="text"
                value={q.question_text || ""}
                onChange={(e) => {
                  const newQ = [...(editingPoll.questions || [])];
                  newQ[i].question_text = e.target.value;
                  setEditingPoll({ ...editingPoll, questions: newQ });
                }}
                className="w-full p-3 border rounded-lg mb-2"
                placeholder="Enter competitor question"
              />
            ))}
          </div>

          {/* --- Competitors --- */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Competitors
            </h3>

            {editingPoll.competitors?.map((comp, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-4 p-4 mb-3 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={comp.name || ""}
                    onChange={(e) => {
                      const newC = [...(editingPoll.competitors || [])];
                      newC[i].name = e.target.value;
                      setEditingPoll({ ...editingPoll, competitors: newC });
                    }}
                    placeholder="Candidate Name"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    value={comp.party || ""}
                    onChange={(e) => {
                      const newC = [...(editingPoll.competitors || [])];
                      newC[i].party = e.target.value;
                      setEditingPoll({ ...editingPoll, competitors: newC });
                    }}
                    placeholder="Party Affiliation"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const newC = [...(editingPoll.competitors || [])];
                        newC[i].profile = file;
                        setEditingPoll({
                          ...editingPoll,
                          competitors: newC,
                        });
                      }
                    }}
                  />
                  {comp.profile && (
                    <img
                      src={
                        comp.profile instanceof File
                          ? URL.createObjectURL(comp.profile)
                          : `data:image/jpeg;base64,${comp.profile}`
                      }
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingPoll({
                      ...editingPoll,
                      competitors: editingPoll.competitors?.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setEditingPoll({
                  ...editingPoll,
                  competitors: [
                    ...(editingPoll.competitors || []),
                    { name: "", party: "", profile: null },
                  ],
                })
              }
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              + Add Competitor
            </button>
          </div>

          {/* --- Actions --- */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.push("/Admin/Reports")}
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-8 py-3 rounded-lg text-white font-semibold flex items-center justify-center ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? (
                "Updating..."
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Update Poll
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
