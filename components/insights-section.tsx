"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Target, MessageSquare, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePDFDownload } from "@/hooks/use-pdf-download";
import BlogListPage from "@/app/BlogList/page";

const economicData = [
  { month: "Jan", growth: 2.1, inflation: 8.5 },
  { month: "Feb", growth: 2.3, inflation: 8.2 },
  { month: "Mar", growth: 2.8, inflation: 7.9 },
  { month: "Apr", growth: 3.1, inflation: 7.6 },
  { month: "May", growth: 3.4, inflation: 7.3 },
  { month: "Jun", growth: 3.7, inflation: 7.1 },
];

export default function InsightsSection() {
  const { downloadPDF } = usePDFDownload();
  const router = useRouter();

  const handleSubscribeClick = () =>
    toast.info("Subscribe feature is not available yet.");

  const handleContactTeamClick = () =>
    toast.info("Contact feature coming soon!");

  return (
    <section
      id="insights"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(246,210,7,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Target className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-semibold text-accent-foreground uppercase tracking-wide">
              Data-Driven Intelligence
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-foreground font-[family-name:var(--font-jost)]">
            Latest Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed with our latest research on African political and
            economic trends.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Blog List (Scrollable) */}
<div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 h-[520px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  <BlogListPage />
</div>


          {/* Sidebar */}
          <div className="w-full md:w-80 flex flex-col gap-6">
            {/* Economic Indicators */}
            <Card className="flex-1 bg-card border-border/50 shadow-lg backdrop-blur-sm h-[520px]">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">
                  Economic Indicators
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  GDP Growth vs Inflation Trends
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex flex-col h-full">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={economicData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="inflation"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between text-xs mt-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span>GDP Growth (%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <span>Inflation Rate (%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscribe */}
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-xl">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-white">
                  Subscribe to Updates
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm">
                  Get the latest insights delivered monthly
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button
                  onClick={handleSubscribeClick}
                  className="w-full bg-white hover:bg-slate-100 text-blue-600 font-semibold transition-colors text-sm py-2"
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Need Custom Research?
              </h3>
              <p className="text-muted-foreground text-sm">
                Commission tailored research for your organization.
              </p>
            </div>
            <Button
              onClick={handleContactTeamClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
