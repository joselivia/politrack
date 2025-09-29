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
  Target,
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
      className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(246,210,7,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Target className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-semibold text-accent-foreground uppercase tracking-wide">
              Data-Driven Intelligence
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground font-[family-name:var(--font-jost)]">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Stay informed with our cutting-edge research and analysis on African
            political and economic trends, backed by rigorous data collection
            and expert interpretation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Enhanced Insights Cards - Retaining original structure */}
          <div className="lg:col-span-2 space-y-6">
            {insights.map((insight) => {
              const IconComponent = insight.icon;
              return (
                <Card
                  key={insight.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-l-4 ${insight.borderColor} bg-gradient-to-r ${insight.color} hover:scale-[1.02] bg-card/80 backdrop-blur-sm`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{insight.date}</span>
                          <span>•</span>
                          <IconComponent className="h-4 w-4" />
                          <span className="text-foreground font-medium">
                            {insight.type}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors font-[family-name:var(--font-jost)]">
                          {insight.title}
                        </CardTitle>
                      </div>
                      {insight.featured && (
                        <div className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full border border-accent/30">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
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
                        className="border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Link href={`/insights/${insight.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
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

          {/* Enhanced Sidebar - Retaining original sizes */}
          <div className="space-y-6">
            {/* Enhanced Economic Indicators Card */}
            <Card className="bg-card border-border/50 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground font-[family-name:var(--font-jost)]">
                  Economic Indicators
                </CardTitle>
                <CardDescription className="text-muted-foreground">
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
                        tick={{ fill: "currentColor" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
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
                <div className="flex items-center justify-between mt-4 text-sm text-foreground">
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

            {/* Subscribe Card - Retaining original blue color scheme */}
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-white font-[family-name:var(--font-jost)]">
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
                  className="w-full cursor-pointer bg-white hover:bg-slate-100 text-blue-600 font-semibold transition-colors"
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-jost)]">
                Need Custom Research?
              </h3>
              <p className="text-muted-foreground text-sm">
                Commission tailored research and analysis specific to your
                organizational needs.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
