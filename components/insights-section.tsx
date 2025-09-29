import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Download, ExternalLink, Calendar } from "lucide-react"

const economicData = [
  { month: "Jan", growth: 2.1, inflation: 8.5 },
  { month: "Feb", growth: 2.3, inflation: 8.2 },
  { month: "Mar", growth: 2.8, inflation: 7.9 },
  { month: "Apr", growth: 3.1, inflation: 7.6 },
  { month: "May", growth: 3.4, inflation: 7.3 },
  { month: "Jun", growth: 3.7, inflation: 7.1 },
]

const insights = [
  {
    title: "African Youth Political Engagement Report 2024",
    description:
      "78% of urban youth in 5 African nations show increased political participation, with digital platforms driving civic engagement.",
    date: "March 2024",
    type: "Research Report",
    featured: true,
  },
  {
    title: "Post-Election Analysis: Nigeria 2023",
    description:
      "Comprehensive analysis of voter behavior, turnout patterns, and demographic shifts in Nigeria's 2023 general elections.",
    date: "February 2024",
    type: "Case Study",
    featured: false,
  },
  {
    title: "Economic Sentiment Tracker Q1 2024",
    description: "Quarterly assessment of business confidence and consumer sentiment across East African markets.",
    date: "January 2024",
    type: "Market Intelligence",
    featured: false,
  },
]

export function InsightsSection() {
  return (
    <section id="insights" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Stay informed with our cutting-edge research and analysis on African political and economic trends, backed
            by rigorous data collection and expert interpretation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            {insights.map((insight, index) => (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-300 ${insight.featured ? "border-primary/20 bg-primary/5" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{insight.date}</span>
                        <span>•</span>
                        <span className="text-primary font-medium">{insight.type}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {insight.title}
                      </CardTitle>
                    </div>
                    {insight.featured && (
                      <div className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-base leading-relaxed">{insight.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Economic Indicators</CardTitle>
                <CardDescription>GDP Growth vs Inflation Trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={economicData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="inflation"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span>GDP Growth</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-chart-2 mr-2"></div>
                    <span>Inflation Rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Subscribe to Updates</CardTitle>
                <CardDescription>Get the latest insights delivered to your inbox monthly</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Subscribe Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
