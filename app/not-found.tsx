"use client";

// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import {
  ArrowLeft,
  Search,
  BarChart3,
  Globe,
  Users,
  FileText,
} from "lucide-react";
import Footer from "@/components/footer";

export default function NotFound() {
  const popularInsights = [
    {
      title: "African Youth Political Engagement",
      href: "/insights/african-youth-political-engagement-2024",
      description: "78% of urban youth show increased political participation",
    },
    {
      title: "Post-Election Analysis: Nigeria 2023",
      href: "/insights/post-election-analysis-nigeria-2023",
      description: "Comprehensive analysis of voter behavior patterns",
    },
    {
      title: "Economic Sentiment Tracker Q1 2024",
      href: "/insights/economic-sentiment-tracker-q1-2024",
      description: "Business confidence across East African markets",
    },
  ];

  const quickLinks = [
    { name: "Our Services", href: "/#services", icon: BarChart3 },
    { name: "Latest Insights", href: "/#insights", icon: FileText },
    { name: "About Us", href: "/#about", icon: Users },
    { name: "Contact", href: "/#contact", icon: Globe },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Main 404 Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="mb-8">
              <div className="text-9xl font-black text-slate-200 dark:text-slate-800 mb-4">
                404
              </div>
              <div className="relative inline-flex mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg blur opacity-25"></div>
                <h1 className="relative text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-6 py-3 rounded-lg">
                  Insight Not Found
                </h1>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                The research insight you're looking for seems to have moved or
                doesn't exist. Don't worry—we have plenty of other data-driven
                analyses waiting for you.
              </p>
            </div>

            {/* Search CTA */}
            <Card className="max-w-2xl mx-auto mb-12 border-slate-200 dark:border-slate-700 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-yellow-500/10">
                    <Search className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Can't find what you're looking for?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Contact our research team for custom insights tailored to
                      your needs.
                    </p>
                  </div>
                  <Link href="/#contact">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Contact Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Insights Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Popular Insights
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Explore our most sought-after research reports and analyses from
                across Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {popularInsights.map((insight, index) => (
                <Card
                  key={index}
                  className="group border-slate-200 dark:border-slate-700 hover:border-yellow-500/50 hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                      {insight.description}
                    </p>
                    <Link href={insight.href}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        Read Report
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <Link key={index} href={link.href}>
                      <Card className="group border-slate-200 dark:border-slate-700 hover:border-yellow-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                        <CardContent className="p-6 text-center">
                          <div className="flex justify-center mb-3">
                            <div className="p-3 rounded-xl bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                              <IconComponent className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {link.name}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Stats Reassurance */}
            <Card className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-yellow-500 to-amber-500 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Trusted Research Across Africa
                </h3>
                <div className="grid grid-cols-3 gap-8 text-white">
                  <div>
                    <div className="text-3xl font-black mb-1">25+</div>
                    <div className="text-sm opacity-90">Countries Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black mb-1">500K+</div>
                    <div className="text-sm opacity-90">Annual Respondents</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black mb-1">92%</div>
                    <div className="text-sm opacity-90">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
