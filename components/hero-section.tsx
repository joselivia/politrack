"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  ArrowRight,
  MapPin,
  Target,
  Clock,
  Vote,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { baseURL } from "@/config/baseUrl";
import useSWR from "swr";

// Interface for poll data
interface PollData {
  id: number;
  title: string;
  presidential: string;
  category: string;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  total_votes: number;
  spoiled_votes: number;
  published: boolean;
  voting_expires_at: string;
  created_at: string;
}

// Interface for candidate data in charts
interface ChartData {
  name: string;
  value: number;
  votes?: number;
  percentage?: number;
  color?: string;
  count?: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-accent-foreground">
          {payload[0].value}% {payload[0].payload.description || "support"}
        </p>
      </div>
    );
  }
  return null;
};

// Loading component for charts
const ChartLoading = ({
  message = "Loading data...",
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center h-full space-y-3 text-muted-foreground">
    <Loader2 className="h-8 w-8 animate-spin" />
    <p className="text-sm font-medium">{message}</p>
  </div>
);

// Skeleton loader for stats
const StatsSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="text-center group">
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="p-2 sm:p-3 bg-muted/50 rounded-xl sm:rounded-2xl animate-pulse">
            <div className="h-4 w-4 sm:h-6 sm:w-6 bg-muted rounded" />
          </div>
        </div>
        <div className="h-6 sm:h-8 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-muted/70 rounded animate-pulse mb-1"></div>
        <div className="h-3 bg-muted/50 rounded animate-pulse"></div>
      </div>
    ))}
  </div>
);

export default function HeroSection() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [regionData, setRegionData] = useState<ChartData[]>([]);

  // Fetch published polls data with real-time updates
  const {
    data: pollsData,
    error,
    isLoading,
    mutate,
  } = useSWR<PollData[]>(
    `${baseURL}/api/aspirant/published`,
    fetcher,
    { refreshInterval: 5000 } // Update every 5 seconds
  );

  // Process data for charts when polls data changes
  useEffect(() => {
    if (pollsData) {
      setLastUpdated(new Date());

      // Process region data for pie chart
      const regionCount: { [key: string]: number } = {};
      pollsData.forEach((poll) => {
        regionCount[poll.region] = (regionCount[poll.region] || 0) + 1;
      });

      const colors = [
        "#F6D207",
        "#000000",
        "#4B5563",
        "#9CA3AF",
        "#EF4444",
        "#10B981",
        "#3B82F6",
      ];
      const processedRegionData = Object.entries(regionCount).map(
        ([region, count], index) => ({
          name: region.replace("_", " "),
          value: Math.round((count / pollsData.length) * 100),
          count,
          color: colors[index % colors.length],
        })
      );

      setRegionData(processedRegionData);
    }
  }, [pollsData]);

  // Process data for active polls bar chart
  const getActivePollsData = (): ChartData[] => {
    if (!pollsData) return [];

    // Last 6 months (with year to avoid clashes like Jan 2024 vs Jan 2025)
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`, // unique key (year + month)
        label: date.toLocaleString("en-US", { month: "short" }),
      };
    }).reverse();

    // Count polls per month
    const monthCounts = last6Months.map(({ key }) => {
      return pollsData.filter((poll: any) => {
        const d = new Date(poll.created_at);
        return `${d.getFullYear()}-${d.getMonth()}` === key;
      }).length;
    });

    // Find maximum count for normalization
    const maxCount = Math.max(...monthCounts, 1);

    // Build chart data
    return last6Months.map(({ label }, idx) => {
      const count = monthCounts[idx];
      return {
        name: label,
        value: (count / maxCount) * 100, // normalized percentage
        description: `${count} active polls`,
      };
    });
  };

  const activePollsData = getActivePollsData();
  const totalActivePolls = pollsData?.length || 0;
  const totalVotes =
    pollsData?.reduce((sum, poll) => sum + poll.total_votes, 0) || 0;
  const spoiledVotes =
    pollsData?.reduce((sum, poll) => sum + (poll.spoiled_votes || 0), 0) || 0;
  const validVotes = totalVotes - spoiledVotes;

  // Countdown for nearest expiring poll
  const getNearestCountdown = () => {
    if (!pollsData || pollsData.length === 0) return "No active polls";

    const now = new Date();
    const activePolls = pollsData.filter(
      (poll) => new Date(poll.voting_expires_at) > now
    );

    if (activePolls.length === 0) return "All polls closed";

    const nearest = activePolls.reduce((prev, current) =>
      new Date(prev.voting_expires_at) < new Date(current.voting_expires_at)
        ? prev
        : current
    );

    const diff = new Date(nearest.voting_expires_at).getTime() - now.getTime();
    if (diff <= 0) return "Closing soon";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-14 xl:py-24 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(246,210,7,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,0,0,0.03),transparent_50%)]"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Side - Enhanced Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-accent/10 border border-accent/20 mb-2 sm:mb-4">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-accent-foreground" />
                <span className="text-xs sm:text-sm font-semibold text-accent-foreground uppercase tracking-wide">
                  Live Polls Data
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-balance leading-tight tracking-tight">
                Decoding
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent block">
                  Africa&apos;s Pulse
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium text-pretty leading-relaxed">
                Data-Driven Insights for Political &amp; Socio-Economic Strategy
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl border-l-4 border-accent pl-4 sm:pl-6 py-1 sm:py-2">
              Politrack Africa provides real-time election data, live polling
              results, and comprehensive analytics from active elections across
              the continent.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => mutate()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    Refresh Data
                    <RefreshCw className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </Button>
              <Button
                onClick={() => (window.location.href = "/polls")}
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-2 border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground font-semibold bg-background/80 backdrop-blur-sm transition-all duration-300"
              >
                View All Polls
              </Button>
            </div>

            {/* Enhanced Stats Section */}
            {isLoading ? (
              <StatsSkeleton />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
                {[
                  {
                    icon: Globe,
                    value: totalActivePolls,
                    label: "Active Polls",
                    description: "Live elections",
                  },
                  {
                    icon: Users,
                    value: totalVotes.toLocaleString(),
                    label: "Total Votes",
                    description: "Cast so far",
                  },
                  {
                    icon: Vote,
                    value: validVotes.toLocaleString(),
                    label: "Valid Votes",
                    description: "Counted",
                  },
                  {
                    icon: Clock,
                    value: getNearestCountdown(),
                    label: "Next Close",
                    description: "Nearest poll",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-accent/10 rounded-xl sm:rounded-2xl group-hover:bg-accent/20 transition-colors duration-300">
                        <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Last Updated */}
            <div className="text-xs font-semibold text-green-600 flex items-center justify-center sm:justify-start">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
              {isLoading && <Loader2 className="h-3 w-3 ml-2 animate-spin" />}
            </div>
          </div>

          {/* Right Side - Enhanced Infographics */}
          <div className="space-y-6 sm:space-y-8">
            {/* Enhanced Active Polls Bar Chart */}
            <Card className="p-4 sm:p-6 lg:p-8 border border-border/50 shadow-xl sm:shadow-2xl hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Active Polls Trend
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Last 6 months - Live data
                  </p>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-accent-foreground bg-accent/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {totalActivePolls} Total
                </div>
              </div>
              <div className="h-48 sm:h-56">
                {isLoading || !pollsData ? (
                  <ChartLoading message="Loading poll trends..." />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activePollsData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                    >
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor", fontSize: 12 }}
                        domain={[0, 100]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="#F6D207"
                        radius={[8, 8, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>

            {/* Enhanced Regional Coverage Pie Chart */}
            <Card className="p-4 sm:p-6 lg:p-8 border border-border/50 shadow-xl sm:shadow-2xl hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Regional Distribution
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Active polls by region
                  </p>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-muted-foreground bg-muted/50 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {regionData.length} Regions
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                <div className="h-40 w-40 sm:h-48 sm:w-48">
                  {isLoading || !pollsData ? (
                    <ChartLoading message="Loading regions..." />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={65}
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {regionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="var(--background)"
                              strokeWidth={3}
                              className="hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(
                            value: number,
                            name: string,
                            props: any
                          ) => [
                            `${value}% (${props.payload.count} polls)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="space-y-3 sm:space-y-4 flex-1 lg:pl-4 xl:pl-8 w-full">
                  {isLoading || !pollsData ? (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-muted rounded-full animate-pulse"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-5 bg-muted rounded animate-pulse w-8 mb-1"></div>
                            <div className="h-3 bg-muted/70 rounded animate-pulse w-12"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    regionData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-base sm:text-lg font-bold text-foreground block">
                            {item.value}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.count} polls
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
