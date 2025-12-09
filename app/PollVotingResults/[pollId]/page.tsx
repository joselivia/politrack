"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { baseURL } from "@/config/baseUrl";
import {
  Loader2,
  Frown,
  BarChart,
  PieChart as PieChartIcon,
  MessageSquareText,
  Users,
  Scale,
  ArrowLeft,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import domtoimage from "dom-to-image-more";
import { PDFDocument, rgb } from "pdf-lib";
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
  type: "single-choice" | "multi-choice" | "open-ended" | "yes-no-notsure" | "rating" | "ranking";
  questionText: string;
  options?: Option[];
  isCompetitorQuestion?: boolean;
  scale?: number;
}

interface locationData {
  region: string;
  county: string;
  constituency: string;
  ward: string;
}

interface PollData {
  id: number;
  title: string;
  category: string;
  presidential: string | null;
  createdAt: string;
  competitors: Competitor[];
  questions: Question[];
}
interface RankingOption {
  id: number;
  label: string;
  count: number;
}

interface RankingPosition {
  position: number;
  options: RankingOption[];
}
interface AggregatedResponse {
  questionId: number;
  questionText: string;
  type: "single-choice" | "multi-choice" | "open-ended" | "yes-no-notsure" | "rating" | "ranking";
  isCompetitorQuestion?: boolean;
  totalResponses: number;
  choices?: {
    id: number | string;
    label: string;
    count: number;
    percentage: number;
  }[];
  openEndedResponses?: string[];
  totalSelections?: number;
  scale?: number;
  averageRating?: number;
  ratingCount?: number;
  rankingData?:RankingPosition[];
}

interface DemographicsData {
  gender: { label: string; count: number; percentage: number }[];
  ageRanges: { label: string; count: number; percentage: number }[];
  totalRespondents: number;
}

interface PollResultsData {
  poll: PollData;
  location: locationData[];
  aggregatedResponses: AggregatedResponse[];
  demographics: DemographicsData;
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6B6B",
];

const PollVotingResultsPage = () => {
  const params = useParams();
  const pollId = params?.pollId as string | undefined;
  const [results, setResults] = useState<PollResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const prefilledCounty = searchParams.get("county") || "";
  const [county, setCounty] = useState(prefilledCounty);
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const route = useRouter();
const [pdfLoading, setPdfLoading] = useState(false);

  const constituencies = results
    ? [
        ...new Set(
          results.location
            .filter((loc) => !county || loc.county === county)
            .map((loc) => loc.constituency)
        ),
      ]
    : [];

  const wards = results
    ? [
        ...new Set(
          results.location
            .filter((loc) => !constituency || loc.constituency === constituency)
            .map((loc) => loc.ward)
        ),
      ]
    : [];

  useEffect(() => {
    if (!pollId) {
      setError("No poll ID provided.");
      setLoading(false);
      return;
    }

    const fetchPollResults = async () => {
      setLoading(true);
      const query = new URLSearchParams();
      if (county) query.append("county", county);
      if (constituency) query.append("constituency", constituency);
      if (ward) query.append("ward", ward);

      try {
        const response = await fetch(
          `${baseURL}/api/Opinions/${pollId}/results?${query.toString()}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch poll results.");
        }
        const data: PollResultsData = await response.json();
        setResults(data);
      } catch (err: any) {
        console.error("Error fetching poll results:", err);
        setError(
          err.message || "An unknown error occurred while fetching results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPollResults();
  }, [pollId, county, constituency, ward]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
const generatePDF = async () => {
if (!results) return;
try {
 setPdfLoading(true); 
 const pdf = await PDFDocument.create();
 const sections = document.querySelectorAll('.export-section');

 for (const section of sections) {
 const el = section as HTMLElement;

 const originalMaxHeight = el.style.maxHeight;
const originalOverflow = el.style.overflow;

el.style.maxHeight = 'none';
 el.style.overflow = 'visible';

const clone = el.cloneNode(true) as HTMLElement;

 // Remove all borders and shadows for cleaner PDF
 clone.style.border = 'none';
 clone.style.boxShadow = 'none';

 // Remove borders and shadows from all child elements
 const allElements = clone.querySelectorAll('*');
 allElements.forEach((elem) => {
   const htmlElem = elem as HTMLElement;
   htmlElem.style.border = 'none';
   htmlElem.style.boxShadow = 'none';
   htmlElem.style.outline = 'none';
 });

 const openEndedContainers = clone.querySelectorAll('.max-h-80.overflow-y-auto');

      openEndedContainers.forEach(container => {
        const div = container as HTMLElement;
        div.style.maxHeight = 'none';
        div.style.overflow = 'visible';

        div.classList.remove('max-h-80', 'overflow-y-auto');
      });

      const offscreen = document.createElement('div');
      offscreen.style.position = 'fixed';
      offscreen.style.top = '-9999px';
      offscreen.style.left = '-9999px';
      offscreen.style.width = '1200px'; // Fixed width for consistent layout
      offscreen.style.backgroundColor = 'white';
      offscreen.appendChild(clone);
      document.body.appendChild(offscreen);

      const pngData = await domtoimage.toPng(clone, { 
        quality: 1,
        bgcolor: 'white',
        style: {
          border: 'none',
          boxShadow: 'none'
        }
      });
      const pngBytes = await (await fetch(pngData)).arrayBuffer();
      const img = await pdf.embedPng(pngBytes);
      
      // Scale image to fit A4 page width (595 points)
      const maxWidth = 595;
      const scale = Math.min(1, maxWidth / img.width);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      const page = pdf.addPage([scaledWidth + 40, scaledHeight + 40]); // Add padding
      page.drawImage(img, { 
        x: 20, 
        y: 20, 
        width: scaledWidth, 
        height: scaledHeight 
      });      document.body.removeChild(offscreen);

      el.style.maxHeight = originalMaxHeight;
      el.style.overflow = originalOverflow;
    }

    const pdfBytes = await pdf.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poll-report.pdf';
    a.click();
    URL.revokeObjectURL(url);

  } catch (err) {
    console.error('PDF generation failed', err);
  } finally {
    setPdfLoading(false); 
  }
};



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#e0e7ff]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl text-gray-700">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fef2f8] to-[#fce7f3] p-8 text-center">
        <Frown className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Error Loading Results
        </h1>
        <p className="text-lg text-red-600 mb-8">{error}</p>
      </div>
    );
  }

  if (!results || !results.poll) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#e0e7ff] p-8">
        <p className="text-xl text-gray-700">
          No results data available for this poll yet.
        </p>
      </div>
    );
  }

  const { poll, aggregatedResponses = [], demographics = {} as any } = results;
  const loc = results.location?.[0] || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9ff] to-[#eef2ff] p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => route.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium shadow-sm hover:bg-blue-600 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
<button
  onClick={generatePDF}
  disabled={!results || loading || pdfLoading}
  className={`inline-flex items-center gap-2 cursor-pointer px-6 py-2 rounded-xl font-semibold shadow-md transition-all
  ${
    !results || loading || pdfLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 text-white hover:bg-green-700"
  }`}
>
  {pdfLoading ? (

      "Generating PDF..."
 
  ) : (
    "Download PDF Report"
  )}
</button>

      </div>

      <div className="export-section bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
          <BarChart className="mr-3 text-blue-600 w-10 h-10" />
          Poll Results: {poll.title}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 py-4 text-lg text-gray-600">
          <span>
            Category: <strong>{poll.category}</strong>
          </span>
          {poll.category === "Presidential" && poll.presidential && (
            <span>
              | Presidential: <strong>{poll.presidential}</strong>
            </span>
          )}
          {loc && (
            <>
              <span>
                | Region: <strong>{loc.region || "N/A"}</strong>
              </span>
              <span>
                | County: <strong>{loc.county}</strong>
              </span>
            </>
          )}
          {loc && (
            <div className="flex gap-3 mt-2">
              <select
                value={constituency}
                onChange={(e) => {
                  setConstituency(e.target.value);
                  setWard("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">All Constituencies</option>
                {constituencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                disabled={!constituency}
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
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
          )}
        </div>

        {/* Demographics */}
        {demographics && demographics.totalRespondents > 0 ? (
          <div className="mb-10 p-6 bg-[#f9fafb] rounded-xl break-inside-avoid">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-7 h-7 mr-3 text-gray-600" /> Respondent
              Demographics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="chart-wrapper"
                style={{ width: "100%", height: "auto" }}
              >
                <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2 text-purple-500" />{" "}
                  Gender Distribution
                </h4>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={demographics.gender}
                      dataKey="count"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {demographics.gender.map((_: any, i: number) => (
                        <Cell
                          key={`gender-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div
                className="chart-wrapper"
                style={{ width: "100%", height: "auto" }}
              >
                <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-green-500" /> Age
                  Distribution
                </h4>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBarChart data={demographics.ageRanges}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-10 p-6 bg-[#f9fafb] rounded-xl text-center text-gray-600">
            No demographic data available yet.
          </div>
        )}

        {/* Question Results */}
{Array.isArray(aggregatedResponses) && aggregatedResponses.length > 0 ? (
  <div className="space-y-10">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
      <Scale className="w-7 h-7 mr-3 text-gray-600" /> Question-wise Results
    </h3>

    {aggregatedResponses.map((questionResult, index) => {
      const normalizedChoices = questionResult.choices
        ?.map((c) => ({
          ...c,
          label: c.label.length > 15 ? c.label.slice(0, 15) + "..." : c.label,
        }))
        .sort((a, b) => b.percentage - a.percentage);

      return (
        <div
          key={questionResult.questionId}
          className="bg-white p-6 rounded-xl break-inside-avoid mb-6"
        >
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            {index + 1}. {questionResult.questionText}
          </h4>

          {/* RATING DISPLAY */}
          {questionResult.type === "rating" && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-lg font-semibold text-blue-700">
                Average Rating:
                <span className="text-2xl font-bold">
                  {questionResult.averageRating?.toFixed(2) ?? "N/A"}
                </span>
              </p>
            </div>
          )}

          {/* === RANKING QUESTION – NEW BEAUTIFUL DISPLAY === */}
          {questionResult.type === "ranking" && questionResult.rankingData ? (
            <div className="mt-6">
              <h5 className="text-2xl font-bold text-gray-800 mb-6">
                Ranking Results (First Preference Leaderboard)
              </h5>

              {questionResult.rankingData.map((rankGroup) => {
                const isFirst = rankGroup.position === 1;
                const topOption = rankGroup.options[0];

                return (
                  <div
                    key={rankGroup.position}
                    className={`mb-6 p-5 rounded-xl ${
                      isFirst
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h6 className={`text-lg font-bold ${isFirst ? "text-amber-700" : "text-gray-700"}`}>
                        {rankGroup.position === 1 && "1st Choice"}
                        {rankGroup.position === 2 && "2nd Choice"}
                        {rankGroup.position === 3 && "3rd Choice"}
                        {rankGroup.position > 3 && `${rankGroup.position}th Choice`}
                      </h6>
                      {isFirst && topOption && (
                        <div className="text-3xl font-extrabold text-amber-600">
                          {topOption.label}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {rankGroup.options.map((opt, idx) => (
                        <div
                          key={opt.id}
                          className={`flex justify-between items-center p-4 rounded-lg font-medium ${
                            idx === 0 && isFirst
                              ? "bg-white text-amber-800"
                              : "bg-white/80"
                          }`}
                        >
                          <span>
                            {idx + 1}. {opt.label}
                          </span>
                          <span className={`text-lg font-bold ${isFirst ? "text-amber-600" : "text-blue-600"}`}>
                            {opt.count} {opt.count === 1 ? "vote" : "votes"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : questionResult.type !== "ranking" && normalizedChoices && normalizedChoices.length > 0 ? (
        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div className="chart-wrapper" style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={normalizedChoices}
                      dataKey="count"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {normalizedChoices.map((_, i) => (
                        <Cell key={`pie-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-wrapper" style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={normalizedChoices}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" angle={-25} textAnchor="end" interval={0} height={120} />
                    <YAxis />
                    <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                    <Bar dataKey="percentage" maxBarSize={50}>
                      {normalizedChoices.map((_, i) => (
                        <Cell key={`bar-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : null}

          {/* OPEN-ENDED RESPONSES */}
          {questionResult.openEndedResponses?.length ? (
            <div className="mt-6 p-5 bg-gray-50 rounded-lg max-h-80 overflow-y-auto">
              <h5 className="font-bold text-gray-700 mb-3">Open-Ended Responses:</h5>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {questionResult.openEndedResponses.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      );
    })}
  </div>
) : (
  <div className="mt-10 p-8 bg-[#eef2ff] rounded-xl text-center">
    <MessageSquareText className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
    <p className="text-xl text-indigo-700">
      No responses have been recorded for this poll yet.
    </p>
  </div>
)}
        
      </div>
    </div>
  );
};

export default PollVotingResultsPage;
