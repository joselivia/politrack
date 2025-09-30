"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Target, TrendingUp, Award } from "lucide-react";
import { toast } from "react-toastify";

const caseStudies = [
  {
    title: "Electoral Turnaround in Nigeria (2023)",
    location: "Nigeria",
    challenge:
      "Client trailed by 15 points 6 months pre‑election with low engagement in key swing states.",
    solution:
      "Identified unaddressed grievances in 3 swing states via granular sentiment mapping and targeted grassroots strategy.",
    outcome:
      "Data‑driven grassroots strategy led to 8‑point swing and victory.",
    metrics: [
      { label: "Point Swing", value: "8 points", icon: TrendingUp },
      { label: "Swing States", value: "3/3 won", icon: Target },
      { label: "Accuracy", value: "Predicted", icon: Award },
    ],
    tags: ["Political Intelligence", "Campaign Strategy", "Sentiment Analysis"],
  },
  {
    title: "Gender Policy Reform in Rwanda",
    location: "Rwanda",
    challenge:
      "Government sought evidence to strengthen women's land rights with traditional leader resistance.",
    solution:
      "Nationwide perception study + traditional leader engagement analysis to build consensus.",
    outcome:
      "Informed legislation passed with 76% public support and broad stakeholder buy-in.",
    metrics: [
      { label: "Public Support", value: "76%", icon: TrendingUp },
      { label: "Leader Buy-in", value: "85%", icon: Target },
      { label: "Implementation", value: "Success", icon: Award },
    ],
    tags: ["Policy Research", "Stakeholder Analysis", "Gender Rights"],
  },
];

export default function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(246,210,7,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6">
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-accent-foreground" />
            <span className="text-xs sm:text-sm font-semibold text-accent-foreground uppercase tracking-wide">
              Proven Success Stories
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight">
            Our Impact:{" "}
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-pretty px-2 sm:px-0">
            Real results from our data-driven approach to political and policy
            challenges across Africa, demonstrating measurable impact and
            strategic success.
          </p>
        </div>

        {/* Enhanced Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {caseStudies.map((study, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:border-accent/30 transition-all duration-500 border border-border/50 bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="space-y-4 sm:space-y-6 relative z-10 p-4 sm:p-6 lg:p-8 pb-2 sm:pb-4">
                {/* Location and Tags */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground bg-muted/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full w-fit">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="font-medium">{study.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-start sm:justify-end">
                    {study.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
                  {study.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 sm:space-y-8 relative z-10 p-4 sm:p-6 lg:p-8 pt-2 sm:pt-4">
                {/* Content Sections */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Challenge */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                      <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                        Challenge
                      </h4>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground pl-3 sm:pl-4 border-l-2 border-red-400/20">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
                      <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                        Our Role
                      </h4>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground pl-3 sm:pl-4 border-l-2 border-blue-400/20">
                      {study.solution}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                      <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                        Outcome
                      </h4>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed font-semibold text-foreground pl-3 sm:pl-4 border-l-2 border-green-400/20">
                      {study.outcome}
                    </p>
                  </div>
                </div>

                {/* Enhanced Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl sm:rounded-2xl border border-accent/20">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center group/metric">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg sm:rounded-xl group-hover/metric:bg-accent/20 transition-colors">
                          <metric.icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent-foreground" />
                        </div>
                      </div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-black text-foreground mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <Button
                  onClick={() => {
                    toast.info("Feature to be added soon!");
                  }}
                  variant="outline"
                  className="w-full py-4 sm:py-6 border-2 border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn bg-background/50 backdrop-blur-sm rounded-lg sm:rounded-xl font-semibold"
                >
                  <span className="flex items-center justify-center">
                    Read Full Case Study
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Footer CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg w-full max-w-4xl">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Ready to See Similar Results?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Explore our complete portfolio of successful case studies and
                discover how we can help you achieve your goals.
              </p>
            </div>
            <Button
              onClick={() => {
                toast.info("Feature to be added soon!");
              }}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 sm:px-8 py-4 sm:py-6 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
            >
              View All Case Studies
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
