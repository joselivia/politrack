// components/insights-section.tsx
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
import {
  Download,
  ExternalLink,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

const economicData = [
  { month: "Jan", growth: 2.1, inflation: 8.5 },
  { month: "Feb", growth: 2.3, inflation: 8.2 },
  { month: "Mar", growth: 2.8, inflation: 7.9 },
  { month: "Apr", growth: 3.1, inflation: 7.6 },
  { month: "May", growth: 3.4, inflation: 7.3 },
  { month: "Jun", growth: 3.7, inflation: 7.1 },
];

const insights = [
  {
    id: "african-youth-political-engagement-2024",
    title: "African Youth Political Engagement Report 2024",
    description:
      "78% of urban youth in 5 African nations show increased political participation, with digital platforms driving civic engagement.",
    date: "March 2024",
    type: "Research Report",
    featured: true,
    icon: Users,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-200/50",
  },
  {
    id: "post-election-analysis-nigeria-2023",
    title: "Post-Election Analysis: Nigeria 2023",
    description:
      "Comprehensive analysis of voter behavior, turnout patterns, and demographic shifts in Nigeria's 2023 general elections.",
    date: "February 2024",
    type: "Case Study",
    featured: false,
    icon: BarChart3,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-200/50",
  },
  {
    id: "economic-sentiment-tracker-q1-2024",
    title: "Economic Sentiment Tracker Q1 2024",
    description:
      "Quarterly assessment of business confidence and consumer sentiment across East African markets.",
    date: "January 2024",
    type: "Market Intelligence",
    featured: false,
    icon: TrendingUp,
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-200/50",
  },
];

export function InsightsSection() {
  return (
    <section
      id="insights"
      className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-pretty">
            Stay informed with our cutting-edge research and analysis on African
            political and economic trends, backed by rigorous data collection
            and expert interpretation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            {insights.map((insight) => {
              const IconComponent = insight.icon;
              return (
                <Card
                  key={insight.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-l-4 ${insight.borderColor} bg-gradient-to-r ${insight.color} hover:scale-[1.02]`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>{insight.date}</span>
                          <span>•</span>
                          <IconComponent className="h-4 w-4" />
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {insight.type}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {insight.title}
                        </CardTitle>
                      </div>
                      {insight.featured && (
                        <div className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full shadow-sm">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {insight.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast.info("Download feature is not available yet.");
                        }}
                        size="sm"
                        className="border-blue-500 cursor-pointer text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Link href={`/insights/${insight.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-700 cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">
                  Economic Indicators
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  GDP Growth vs Inflation Trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={economicData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#f8fafc",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="inflation"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>GDP Growth (%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Inflation Rate (%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Subscribe to Updates
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Get the latest insights delivered to your inbox monthly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    toast.info("Subscribe feature is not available yet.");
                  }}
                  className="w-full cursor-pointer bg-white hover:bg-slate-100 text-blue-600 font-semibold"
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
