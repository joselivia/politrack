"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { baseURL } from "@/config/baseUrl";
import {
  countyConstituencyMap,
  countyAssemblyWardMap,
} from "@/app/Admin/dummyCreatePoll/createpoll/Places";

interface Competitor {
  id: number;
  name: string;
  party: string;
  profileImage: string | null;
}

interface Option {
  id: number;
  optionText: string;
}

interface Question {
  id: number;
  type:
    | "single-choice"
    | "multi-choice"
    | "open-ended"
    | "yes-no-notsure"
    | "rating"
    | "ranking";
  questionText: string;
  options?: Option[];
  isCompetitorQuestion?: boolean;
  scale?: number;
}

interface PollData {
  id: number;
  title: string;
  category: string;
  presidential: string | null;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  createdAt: string;
  competitors: Competitor[];
  questions: Question[];
}

interface BulkResponseData {
  [questionId: number]: {
    optionCounts?: { [optionId: number]: number };
    competitorCounts?: { [competitorId: number]: number };
    openEndedResponses?: string[];
    ratingValues?: number[];
    rankingCounts?: { [optionId: number]: { [rank: string]: number } };
    genderCounts?: { [gender: string]: number };
    ageRangeCounts?: { [range: string]: number };
  };
}

const AdminBulkResponsePage = () => {
  const params = useParams();
  const pollId = params.pollId as string;
  const router = useRouter();

  const [pollData, setPollData] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<{ [key: number]: boolean }>({});
  const [successMessage, setSuccessMessage] = useState<{ [key: number]: string }>({});
  const [savingDemographics, setSavingDemographics] = useState(false);
  const [demographicsMessage, setDemographicsMessage] = useState("");

  // Location filters
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");

  // Store bulk response data per question
  const [bulkData, setBulkData] = useState<BulkResponseData>({});

  // Store demographics data (separate from questions, applies to entire response set)
  const [demographics, setDemographics] = useState<{
    genderCounts: { [gender: string]: number };
    ageRangeCounts: { [range: string]: number };
  }>({ genderCounts: {}, ageRangeCounts: {} });

  // Derive constituencies and wards from poll data
  const constituencies = pollData?.county ? countyConstituencyMap[pollData.county] : [];
  const wards = constituency ? countyAssemblyWardMap[constituency] : [];

  useEffect(() => {
    if (!pollId) {
      setError("No poll ID provided.");
      setLoading(false);
      return;
    }

    const fetchPollData = async () => {
      try {
        // Fetch poll details
        const pollResponse = await fetch(`${baseURL}/api/polls/${pollId}`);
        if (!pollResponse.ok) {
          throw new Error("Failed to fetch poll data.");
        }
        const data: PollData = await pollResponse.json();
        setPollData(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPollData();
  }, [pollId]);

  // Fetch bulk responses when constituency or ward changes
  useEffect(() => {
    if (!pollId) return;

    const fetchBulkResponses = async () => {
      try {
        const query = new URLSearchParams();
        if (constituency) query.append("constituency", constituency);
        if (ward) query.append("ward", ward);

        const bulkResponse = await fetch(
          `${baseURL}/api/Opinions/${pollId}/admin-bulk-responses?${query.toString()}`
        );
        if (bulkResponse.ok) {
          const existingData = await bulkResponse.json();
          const formattedData: BulkResponseData = {};
          
          existingData.forEach((item: any) => {
            formattedData[item.question_id] = {
              optionCounts: item.option_counts || {},
              competitorCounts: item.competitor_counts || {},
              openEndedResponses: item.open_ended_responses || [],
              ratingValues: item.rating_values || [],
              rankingCounts: item.ranking_counts || {},
            };
          });
          
          setBulkData(formattedData);
        } else {
          // No data for this location yet, clear the form
          setBulkData({});
        }

        // Fetch demographics separately
        const demographicsResponse = await fetch(
          `${baseURL}/api/Opinions/${pollId}/admin-demographics?${query.toString()}`
        );
        if (demographicsResponse.ok) {
          const demographicsData = await demographicsResponse.json();
          if (demographicsData) {
            setDemographics({
              genderCounts: demographicsData.gender_counts || {},
              ageRangeCounts: demographicsData.age_range_counts || {},
            });
          } else {
            setDemographics({ genderCounts: {}, ageRangeCounts: {} });
          }
        } else {
          setDemographics({ genderCounts: {}, ageRangeCounts: {} });
        }
      } catch (err: any) {
        console.error("Error fetching bulk responses:", err);
      }
    };

    fetchBulkResponses();
  }, [pollId, constituency, ward]);

  const handleSaveDemographics = async () => {
    setSavingDemographics(true);
    setDemographicsMessage("");
    setError(null);

    try {
      // Save demographics to separate endpoint
      const response = await fetch(
        `${baseURL}/api/Opinions/${pollId}/admin-demographics`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            genderCounts: demographics.genderCounts || {},
            ageRangeCounts: demographics.ageRangeCounts || {},
            constituency: constituency || null,
            ward: ward || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save demographics.");
      }

      setDemographicsMessage("✅ Demographics saved successfully!");
      setTimeout(() => {
        setDemographicsMessage("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save demographics.");
    } finally {
      setSavingDemographics(false);
    }
  };

  const handleSaveQuestion = async (question: Question) => {
    setSaving((prev) => ({ ...prev, [question.id]: true }));
    setSuccessMessage((prev) => ({ ...prev, [question.id]: "" }));
    setError(null);

    const questionData = bulkData[question.id] || {};

    try {
      const response = await fetch(
        `${baseURL}/api/Opinions/${pollId}/admin-bulk-response`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: question.id,
            optionCounts: questionData.optionCounts || {},
            competitorCounts: questionData.competitorCounts || {},
            openEndedResponses: questionData.openEndedResponses || [],
            ratingValues: questionData.ratingValues || [],
            rankingCounts: questionData.rankingCounts || {},
            constituency: constituency || null,
            ward: ward || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save bulk response.");
      }

      setSuccessMessage((prev) => ({
        ...prev,
        [question.id]: "✅ Saved successfully!",
      }));

      setTimeout(() => {
        setSuccessMessage((prev) => ({ ...prev, [question.id]: "" }));
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving((prev) => ({ ...prev, [question.id]: false }));
    }
  };

  const updateBulkData = (
    questionId: number,
    field: keyof BulkResponseData[number],
    value: any
  ) => {
    setBulkData((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl text-gray-700">Loading poll...</p>
      </div>
    );
  }

  if (error && !pollData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-8 text-center">
        <AlertCircle className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Poll</h1>
        <p className="text-lg text-red-600 mb-8">{error}</p>
        <button
          onClick={() => router.push("/Admin")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Go to Admin
        </button>
      </div>
    );
  }

  if (!pollData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-xl text-gray-700">No poll data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-400 border border-gray-200 font-medium shadow-sm hover:bg-blue-500 mb-4 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          Admin Bulk Response Entry
        </h1>
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Poll: {pollData.title}
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Enter bulk responses for each question. Data is saved per question and can be
          updated at any time.
        </p>

        {/* Location Filters */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Select Location (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Filter bulk responses by constituency and/or ward. Leave empty for general poll-wide data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Constituency
              </label>
              <select
                value={constituency}
                onChange={(e) => {
                  setConstituency(e.target.value);
                  setWard(""); // Reset ward when constituency changes
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">All Constituencies</option>
                {constituencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ward
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                disabled={!constituency}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  !constituency ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              >
                <option value="">All Wards</option>
                {wards.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(constituency || ward) && (
            <div className="mt-3 p-2 bg-white rounded border border-blue-300">
              <p className="text-sm text-blue-800">
                <strong>Currently entering data for:</strong>{" "}
                {constituency || "All constituencies"}
                {ward && ` → ${ward}`}
              </p>
            </div>
          )}
        </div>

        {/* Demographics Section */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Demographics (Optional)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Enter demographic data for all respondents in this bulk entry. This data applies to the entire response set for the selected location.
              </p>
            </div>
            <button
              onClick={handleSaveDemographics}
              disabled={savingDemographics}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                savingDemographics
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {savingDemographics ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>

          {demographicsMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {demographicsMessage}
            </div>
          )}

          {/* Gender Counts */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Gender Distribution</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Male", "Female", "Other"].map((gender) => (
                <div key={gender}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {gender}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={demographics.genderCounts[gender] || 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setDemographics((prev) => ({
                        ...prev,
                        genderCounts: {
                          ...prev.genderCounts,
                          [gender]: value,
                        },
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 bg-white"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Age Range Counts */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Age Range Distribution</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"].map((range) => (
                <div key={range}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {range}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={demographics.ageRangeCounts[range] || 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setDemographics((prev) => ({
                        ...prev,
                        ageRangeCounts: {
                          ...prev.ageRangeCounts,
                          [range]: value,
                        },
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 bg-white"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded border border-green-300">
            <p className="text-sm text-green-800">
              <strong>Total respondents:</strong>{" "}
              {Math.max(
                Object.values(demographics.genderCounts).reduce((sum, count) => sum + count, 0),
                Object.values(demographics.ageRangeCounts).reduce((sum, count) => sum + count, 0)
              )}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {pollData.questions.map((question, index) => {
            const questionData = bulkData[question.id] || {};
            const isSaving = saving[question.id];
            const message = successMessage[question.id];

            return (
              <div
                key={question.id}
                className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {index + 1}. {question.questionText}
                    <span className="ml-3 text-sm font-normal text-gray-500">
                      ({question.type})
                    </span>
                  </h3>
                  <button
                    onClick={() => handleSaveQuestion(question)}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isSaving
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>

                {message && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {message}
                  </div>
                )}

                {/* COMPETITOR QUESTION */}
                {question.isCompetitorQuestion && pollData.competitors.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Enter the number of responses for each competitor:
                    </p>
                    {pollData.competitors.map((competitor) => (
                      <div key={competitor.id} className="flex items-center gap-4">
                        <label className="w-48 font-medium text-gray-700">
                          {competitor.name}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={
                            questionData.competitorCounts?.[competitor.id] || 0
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            updateBulkData(question.id, "competitorCounts", {
                              ...questionData.competitorCounts,
                              [competitor.id]: val,
                            });
                          }}
                          className="w-32 p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* SINGLE-CHOICE / YES-NO-NOTSURE */}
                {(question.type === "single-choice" ||
                  question.type === "yes-no-notsure") &&
                  question.options && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 mb-2">
                        Enter the number of responses for each option:
                      </p>
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-4">
                          <label className="w-48 font-medium text-gray-700">
                            {option.optionText}
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={questionData.optionCounts?.[option.id] || 0}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              updateBulkData(question.id, "optionCounts", {
                                ...questionData.optionCounts,
                                [option.id]: val,
                              });
                            }}
                            className="w-32 p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                {/* MULTI-CHOICE */}
                {question.type === "multi-choice" && question.options && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Enter the number of times each option was selected (users can
                      select multiple):
                    </p>
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-4">
                        <label className="w-48 font-medium text-gray-700">
                          {option.optionText}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={questionData.optionCounts?.[option.id] || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            updateBulkData(question.id, "optionCounts", {
                              ...questionData.optionCounts,
                              [option.id]: val,
                            });
                          }}
                          className="w-32 p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* OPEN-ENDED */}
                {question.type === "open-ended" && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Enter all responses (one per line):
                    </p>
                    <textarea
                      value={(questionData.openEndedResponses || []).join("\n")}
                      onChange={(e) => {
                        const responses = e.target.value.split("\n");
                        updateBulkData(
                          question.id,
                          "openEndedResponses",
                          responses
                        );
                      }}
                      rows={8}
                      placeholder="Enter each response on a new line..."
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}

                {/* RATING */}
                {question.type === "rating" && (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Enter the number of people who selected each rating:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { value: 1, label: "Very Poor" },
                        { value: 2, label: "Poor" },
                        { value: 3, label: "Fair" },
                        { value: 4, label: "Good" },
                        { value: 5, label: "Excellent" },
                      ].map((rating) => (
                        <div key={rating.value} className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700 mb-2">
                            {rating.label} ({rating.value})
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={(questionData.optionCounts as any)?.[rating.value] || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const newCounts = { ...(questionData.optionCounts || {}) };
                              newCounts[rating.value] = count;
                              updateBulkData(question.id, "optionCounts", newCounts);
                            }}
                            placeholder="0"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Total responses:</strong>{" "}
                        {Object.values((questionData.optionCounts as any) || {}).reduce(
                          (sum: number, count: any) => sum + (parseInt(count) || 0),
                          0
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* RANKING */}
                {question.type === "ranking" && question.options && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Enter how many times each option was ranked at each position:
                    </p>
                    {question.options.map((option) => (
                      <div key={option.id} className="border-l-4 border-blue-400 pl-4">
                        <p className="font-medium text-gray-700 mb-2">
                          {option.optionText}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Array.from(
                            { length: question.options!.length },
                            (_, i) => i + 1
                          ).map((rank) => (
                            <div key={rank} className="flex items-center gap-2">
                              <label className="text-sm text-gray-600">
                                Rank {rank}:
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={
                                  questionData.rankingCounts?.[option.id]?.[
                                    `rank_${rank}`
                                  ] || 0
                                }
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  updateBulkData(question.id, "rankingCounts", {
                                    ...questionData.rankingCounts,
                                    [option.id]: {
                                      ...questionData.rankingCounts?.[option.id],
                                      [`rank_${rank}`]: val,
                                    },
                                  });
                                }}
                                className="w-20 p-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminBulkResponsePage;
