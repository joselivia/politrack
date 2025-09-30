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
} from "lucide-react";

const pollData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 68 },
  { name: "Apr", value: 75 },
  { name: "May", value: 82 },
  { name: "Jun", value: 78 },
];

const regionData = [
  { name: "East Africa", value: 35, color: "#F6D207" },
  { name: "West Africa", value: 30, color: "#000000" },
  { name: "Southern Africa", value: 20, color: "#4B5563" },
  { name: "Central Africa", value: 15, color: "#9CA3AF" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-accent-foreground">
          {payload[0].value}% prioritize economy
        </p>
      </div>
    );
  }
  return null;
};

export function HeroSection() {
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
                  Trusted by Global Leaders
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
              Politrack Africa empowers leaders with cutting-edge opinion
              polling, research, and strategic advisory services tailored to
              Africa&apos;s complex political and socio-economic landscape.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Download Free Report
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-2 border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground font-semibold bg-background/80 backdrop-blur-sm transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>

            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              {[
                {
                  icon: Globe,
                  value: "25+",
                  label: "Countries",
                  description: "African coverage",
                },
                {
                  icon: Users,
                  value: "90%",
                  label: "Africa-Based",
                  description: "Local expertise",
                },
                {
                  icon: BarChart3,
                  value: "7/7",
                  label: "Predictions",
                  description: "Election accuracy",
                },
                {
                  icon: TrendingUp,
                  value: "92%",
                  label: "Approval",
                  description: "Client satisfaction",
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
          </div>

          {/* Right Side - Enhanced Infographics */}
          <div className="space-y-6 sm:space-y-8">
            {/* Enhanced Bar Chart Card */}
            <Card className="p-4 sm:p-6 lg:p-8 border border-border/50 shadow-xl sm:shadow-2xl hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Youth Economic Priorities
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Monthly trend analysis 2024
                  </p>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-accent-foreground bg-accent/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  +12% YoY
                </div>
              </div>
              <div className="h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pollData}
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
              </div>
            </Card>

            {/* Enhanced Pie Chart Card */}
            <Card className="p-4 sm:p-6 lg:p-8 border border-border/50 shadow-xl sm:shadow-2xl hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Regional Coverage
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Active research operations
                  </p>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-muted-foreground bg-muted/50 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  25 Countries
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                <div className="h-40 w-40 sm:h-48 sm:w-48">
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
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 sm:space-y-4 flex-1 lg:pl-4 xl:pl-8 w-full">
                  {regionData.map((item, index) => (
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
                      <span className="text-base sm:text-lg font-bold text-foreground">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
