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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePDFDownload } from "@/hooks/use-pdf-download";

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
    content: {
      pages: 24,
      language: "English",
      sections: [
        {
          title: "Executive Summary",
          content: [
            "This comprehensive study examines the political engagement patterns of African youth across five major nations. Our research reveals a significant shift towards digital platforms for civic participation.",
            "The data indicates that 78% of urban youth aged 18-35 are actively engaged in political discourse through social media and digital platforms.",
          ],
        },
        {
          title: "Methodology",
          content: [
            "The study employed a mixed-methods approach, combining quantitative surveys with qualitative interviews across urban centers in Nigeria, Kenya, Ghana, South Africa, and Egypt.",
            "Sample size: 5,000 respondents with balanced gender representation and age distribution.",
          ],
        },
      ],
      keyFindings: [
        "78% increase in youth political participation through digital platforms",
        "Social media emerged as the primary channel for political discourse",
        "Youth prefer issue-based politics over traditional party affiliations",
        "Mobile technology accessibility correlates with higher engagement rates",
      ],
    },
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
    content: {
      pages: 18,
      language: "English",
      sections: [
        {
          title: "Election Overview",
          content: [
            "Analysis of the 2023 Nigerian general elections reveals significant shifts in voter behavior and regional voting patterns.",
            "Turnout rates varied significantly across regions, with notable increases in youth participation.",
          ],
        },
      ],
      keyFindings: [
        "Youth voter turnout increased by 15% compared to 2019 elections",
        "Digital campaign strategies influenced urban voting patterns",
        "Regional disparities in voter access and participation persist",
      ],
    },
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
    content: {
      pages: 12,
      language: "English",
      sections: [
        {
          title: "Economic Indicators",
          content: [
            "This quarterly tracker analyzes business confidence and consumer sentiment across key East African markets including Kenya, Tanzania, Uganda, and Rwanda.",
            "Data collected from 2,000 businesses and 5,000 consumers across the region.",
          ],
        },
      ],
      keyFindings: [
        "Business confidence index shows 5% improvement quarter-over-quarter",
        "Consumer spending patterns indicate cautious optimism",
        "Service sector shows strongest growth sentiment",
        "Inflation concerns remain the primary economic worry",
      ],
    },
  },
];

export default function InsightsSection() {
  const { downloadPDF, isGenerating } = usePDFDownload();
  const router = useRouter();

  const handleDownloadClick = async (insight: any) => {
    try {
      await downloadPDF(insight);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleSubscribeClick = () => {
    toast.info("Subscribe feature is not available yet.");
  };

  const handleContactTeamClick = () => {
    // You can replace this with actual contact logic
    console.log("Contact team clicked");
    toast.info("Contact feature to be implemented soon!");
  };

  const handleReadMoreClick = (insightId: string) => {
    // Use Next.js router for client-side navigation
    router.push(`/insights/${insightId}`);
  };

  return (
    <section
      id="insights"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(246,210,7,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6">
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-accent-foreground" />
            <span className="text-xs sm:text-sm font-semibold text-accent-foreground uppercase tracking-wide">
              Data-Driven Intelligence
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground font-[family-name:var(--font-jost)]">
            Latest Insights
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty px-2 sm:px-0">
            Stay informed with our cutting-edge research and analysis on African
            political and economic trends, backed by rigorous data collection
            and expert interpretation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Enhanced Insights Cards */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {insights.map((insight) => {
              const IconComponent = insight.icon;
              return (
                <Card
                  key={insight.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-l-4 ${insight.borderColor} bg-gradient-to-r ${insight.color} hover:scale-[1.02] bg-card/80 backdrop-blur-sm`}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{insight.date}</span>
                          <span>•</span>
                          <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-foreground font-medium">
                            {insight.type}
                          </span>
                        </div>
                        <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-accent transition-colors font-[family-name:var(--font-jost)] leading-tight">
                          {insight.title}
                        </CardTitle>
                      </div>
                      {insight.featured && (
                        <div className="px-2 sm:px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full border border-accent/30 ml-2 flex-shrink-0">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground mt-2">
                      {insight.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleDownloadClick(insight)}
                        disabled={isGenerating}
                        size="sm"
                        className="border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        )}
                        {isGenerating ? "Generating..." : "Download PDF"}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleReadMoreClick(insight.id)}
                        size="sm"
                        className="text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Enhanced Economic Indicators Card */}
            <Card className="bg-card border-border/50 shadow-lg backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg text-foreground font-[family-name:var(--font-jost)]">
                  Economic Indicators
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base">
                  GDP Growth vs Inflation Trends
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="h-40 sm:h-48">
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-3 sm:mt-4 text-xs sm:text-sm text-foreground">
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>GDP Growth (%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Inflation Rate (%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscribe Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg text-white font-[family-name:var(--font-jost)]">
                  Subscribe to Updates
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm sm:text-base">
                  Get the latest insights delivered to your inbox monthly
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button
                  onClick={handleSubscribeClick}
                  className="w-full cursor-pointer bg-white hover:bg-slate-100 text-blue-600 font-semibold transition-colors text-sm sm:text-base py-2 sm:py-3"
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-4xl">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-jost)]">
                Need Custom Research?
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Commission tailored research and analysis specific to your
                organizational needs.
              </p>
            </div>
            <Button
              onClick={handleContactTeamClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 sm:px-6 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap w-full sm:w-auto text-sm sm:text-base"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
