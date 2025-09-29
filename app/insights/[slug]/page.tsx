"use client";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { insightsContent } from "@/content/insights-content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { toast } from "react-toastify";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function InsightPage({ params }: PageProps) {
  const insight = insightsContent.find((insight) => insight.id === params.slug);

  if (!insight) {
    notFound();
  }

  const IconComponent = insight.icon;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/#insights">
            <Button
              variant="ghost"
              className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Button>
          </Link>

          {/* Header */}
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <Calendar className="h-4 w-4" />
              <span>{insight.date}</span>
              <span>•</span>
              <IconComponent className="h-4 w-4" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {insight.type}
              </span>
              {insight.featured && (
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {insight.title}
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {insight.description}
            </p>

            {/* Download Button */}
            <div className="flex items-center space-x-4 mb-12">
              <Button
                onClick={() => {
                  toast.info("Download feature is not available yet.");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Full Report (PDF)
              </Button>
              <Button
                onClick={() => {
                  toast.info("Share feature is not available yet.");
                }}
                variant="outline"
                className="border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300"
              >
                Share Report
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-full mx-auto grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {insight.content.sections.map((section, index) => (
                <Card
                  key={index}
                  className="border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {section.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Key Findings */}
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Key Findings
                  </h3>
                  <ul className="space-y-3">
                    {insight.content.keyFindings.map((finding, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Report Details
                  </h4>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-slate-600 dark:text-slate-400">
                        Publication Date
                      </dt>
                      <dd className="text-slate-900 dark:text-white font-medium">
                        {insight.date}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 dark:text-slate-400">
                        Category
                      </dt>
                      <dd className="text-slate-900 dark:text-white font-medium">
                        {insight.type}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 dark:text-slate-400">
                        Pages
                      </dt>
                      <dd className="text-slate-900 dark:text-white font-medium">
                        {insight.content.pages}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 dark:text-slate-400">
                        Language
                      </dt>
                      <dd className="text-slate-900 dark:text-white font-medium">
                        {insight.content.language}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-white mb-2">
                    Subscribe for Updates
                  </h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get similar insights delivered to your inbox
                  </p>
                  <Button
                    onClick={() => {
                      toast.info("Subscribe feature is not available yet.");
                    }}
                    className="w-full cursor-pointer bg-white hover:bg-slate-100 text-blue-600 text-sm"
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
