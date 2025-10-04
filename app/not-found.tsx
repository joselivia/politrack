"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Search,
  BarChart3,
  Globe,
  Users,
  FileText,
  Home,
  Compass,
} from "lucide-react";

export default function NotFound() {
  const popularPages = [
    {
      title: "Latest Insights",
      href: "/#insights",
      description: "Explore our data-driven research and analysis",
      icon: FileText,
    },
    {
      title: "Our Services",
      href: "/#services",
      description: "Discover our political tracking solutions",
      icon: BarChart3,
    },
    {
      title: "About PoliTrack",
      href: "/#about",
      description: "Learn about our mission and methodology",
      icon: Users,
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/#services", icon: BarChart3 },
    { name: "Insights", href: "/#insights", icon: FileText },
    { name: "About", href: "/#about", icon: Users },
    { name: "Contact", href: "/#contact", icon: Globe },
    { name: "Methodology", href: "/#methodology", icon: Compass },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 p-3">
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
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-25"></div>
                <h1 className="relative text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-6 py-3 rounded-lg">
                  Page Not Found
                </h1>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for doesn't exist or may have been
                moved. Let us help you find what you need on PoliTrack Africa.
              </p>
            </div>

            {/* Search & Help CTA */}
            <Card className="max-w-2xl mx-auto mb-12 border-slate-200 dark:border-slate-700 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Need help finding something?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Our team is here to assist you with any questions about
                      our research and data.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/#contact">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
                        Contact Support
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" className="whitespace-nowrap">
                        Go Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Pages Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Popular Pages
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Start exploring our political tracking platform and data
                insights.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {popularPages.map((page, index) => {
                const IconComponent = page.icon;
                return (
                  <Card
                    key={index}
                    className="group border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                        {page.description}
                      </p>
                      <Link href={page.href}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Explore
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Navigation */}
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <Link key={index} href={link.href}>
                      <Card className="group border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                        <CardContent className="p-4 text-center">
                          <div className="flex justify-center mb-2">
                            <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                              <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {link.name}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Help Section */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Report an Issue
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Found a broken link or missing content? Let us know so we
                    can fix it.
                  </p>
                  <Link href="/#contact">
                    <Button variant="outline" size="sm" className="w-full">
                      Report Problem
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Search Our Site
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Can't find what you're looking for? Try searching our entire
                    platform.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      // This would trigger a search modal in a real implementation
                      console.log("Search functionality to be implemented");
                    }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Site
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats Reassurance */}
            <Card className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-500 to-cyan-500 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Trusted Political Intelligence Across Africa
                </h3>
                <div className="grid grid-cols-3 gap-8 text-white">
                  <div>
                    <div className="text-3xl font-black mb-1">25+</div>
                    <div className="text-sm opacity-90">Countries Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black mb-1">500K+</div>
                    <div className="text-sm opacity-90">Data Points</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black mb-1">92%</div>
                    <div className="text-sm opacity-90">Accuracy Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
