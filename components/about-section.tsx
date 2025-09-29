import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

import {
  CheckCircle,
  Award,
  Globe,
  Users,
  Target,
  BarChart3,
  Shield,
} from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Local Expertise",
    description:
      "80% of our researchers are Africa-based, with deep contextual understanding of local dynamics and cultural nuances.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Award,
    title: "Methodological Rigor",
    description:
      "Mixed-method approaches combining quantitative and qualitative research, adapted to local realities with precision.",
    gradient: "from-yellow-500/20 to-amber-500/20",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    icon: Shield,
    title: "Non-Partisan Integrity",
    description:
      "ISO 20252 certified. Independent, truth-driven analysis committed to objectivity and ethical standards.",
    gradient: "from-green-500/20 to-emerald-500/20",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: Globe,
    title: "Innovation Hub",
    description:
      "AI-driven sentiment analysis, geospatial polling, and real-time data dashboards for cutting-edge insights.",
    gradient: "from-purple-500/20 to-violet-500/20",
    color: "text-purple-600 dark:text-purple-400",
  },
];

const certifications = [
  { name: "ISO 20252 Certified", icon: Award },
  { name: "ESOMAR Member", icon: Globe },
  { name: "Independent Research", icon: Shield },
  { name: "30+ African Languages", icon: Users },
  { name: "95% Confidence Level", icon: BarChart3 },
  { name: "Real-time Analytics", icon: Target },
];

const stats = [
  {
    value: "500K+",
    label: "Annual Respondents",
    description: "Sample sizes: 1,200 - 5,000 respondents per national study",
    footnote: "Margin of Error: ±3% at 95% confidence level",
    gradient: "from-yellow-500 to-amber-500",
    icon: Users,
  },
  {
    value: "30+",
    label: "Languages Supported",
    description: "Comprehensive coverage across diverse linguistic landscapes",
    footnote: "Culturally-aware research methodologies",
    gradient: "from-blue-500 to-cyan-500",
    icon: Globe,
  },
  {
    value: "45+",
    label: "African Nations",
    description: "Extensive reach across the continent's diverse markets",
    footnote: "Local partnerships in every region",
    gradient: "from-green-500 to-emerald-500",
    icon: Target,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
              Trusted Across Africa
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 max-w-4xl mx-auto leading-tight">
            African Insights, By Africans,{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              For Africa
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our mission is to amplify Africa's voices through rigorous, ethical
            research that drives informed decision-making and democratic
            progress across the continent.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-12">
            {/* Core Values */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Why Choose Politrack?
                </h3>
              </div>

              <div className="grid gap-6">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${highlight.gradient} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${highlight.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            {highlight.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Quality Assurance
                </h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <div
                      key={index}
                      className="group p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-yellow-500/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-yellow-500/10">
                          <IconComponent className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {cert.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Stats & Quote */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={index}
                    className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                                {stat.value}
                              </div>
                              <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                              {stat.description}
                            </p>
                            <p className="text-slate-500 dark:text-slate-500 text-xs">
                              {stat.footnote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Testimonial Quote */}
            <Card className="border-0 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20">
                    <span className="text-2xl">"</span>
                  </div>
                  <blockquote>
                    <p className="text-lg italic text-slate-200 leading-relaxed mb-6">
                      "In a continent of diverse voices and rapid change, we
                      turn nuanced public sentiment into actionable
                      intelligence. Trust alone is not enough; Africa's future
                      needs confidence built on rigorous, locally-grounded
                      research."
                    </p>
                    <footer className="space-y-2">
                      <div className="font-semibold text-white">
                        Politrack Africa Research Team
                      </div>
                      <div className="text-sm text-slate-300">
                        Leading African Insights Since 2020
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </CardContent>
            </Card>

            {/* CTA Badge */}
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-lg cursor-pointer">
                <span className="text-sm font-semibold text-white mr-3">
                  Explore Our Methodology
                </span>
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this import at the top with other Lucide icons
