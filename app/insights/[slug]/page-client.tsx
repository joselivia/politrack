// app/insights/[slug]/page-client.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Calendar,
  ArrowLeft,
  AlertCircle,
  FileText,
  Loader2,
  RefreshCw,
  Users,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

interface SerializableInsight {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  featured: boolean;
  iconName?: string;
  content: {
    pages: number;
    language: string;
    sections: {
      title: string;
      content: string[];
    }[];
    keyFindings: string[];
  };
}

interface InsightPageClientProps {
  insight: SerializableInsight | undefined;
}

// Icon mapping for client component
const iconComponents = {
  Users: Users,
  BarChart3: BarChart3,
  TrendingUp: TrendingUp,
  FileText: FileText,
};

export default function InsightPageClient({ insight }: InsightPageClientProps) {
  const [isLoading, setIsLoading] = React.useState(!insight);
  const [error, setError] = React.useState<string | null>(null);

  // Get the appropriate icon component
  const IconComponent = insight?.iconName
    ? iconComponents[insight.iconName as keyof typeof iconComponents]
    : FileText;

  React.useEffect(() => {
    if (!insight) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setError(
          "Insight not found. The requested insight may have been moved or deleted."
        );
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setError(null);
    }
  }, [insight]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      setError(
        "Failed to load insight. Please check your connection and try again."
      );
    }, 1500);
  };

  // Loading State (keep your existing loading JSX)
  if (isLoading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/#insights">
              <Button
                variant="ghost"
                className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Insights
              </Button>
            </Link>

            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                  <FileText className="h-6 w-6 text-blue-400 absolute top-3 left-3" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Loading Insight
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md">
                    We're gathering the latest political analysis and insights
                    for you...
                  </p>
                </div>
                <div className="flex space-x-4 pt-4">
                  <div className="animate-pulse flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skeleton Loader */}
              <div className="w-full max-w-4xl mt-12 space-y-8">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 animate-pulse"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-5/6 animate-pulse"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card
                      key={i}
                      className="border-slate-200 dark:border-slate-700"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 animate-pulse"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 animate-pulse"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error State (keep your existing error JSX)
  if (error || !insight) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/#insights">
              <Button
                variant="ghost"
                className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Insights
              </Button>
            </Link>

            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-6 mb-6">
                <AlertCircle className="h-16 w-16 text-red-500" />
              </div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Unable to Load Insight
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                {error || "The insight you're looking for isn't available."}
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-500 mb-8 max-w-md">
                This could be due to a temporary network issue or the insight
                may have been removed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRetry}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>

                <Link href="/#insights">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300"
                  >
                    Browse All Insights
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>

              {/* Additional helpful links */}
              <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Need immediate assistance?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Contact our support team
                  </Link>
                  <Link
                    href="/help"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Visit help center
                  </Link>
                  <Link
                    href="/#insights"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Explore latest insights
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Success State - Updated to use IconComponent
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#insights">
            <Button
              variant="ghost"
              className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Button>
          </Link>

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

          <div className="max-w-full mx-auto grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {insight.content.sections.map((section: any, index: any) => (
                <Card
                  key={index}
                  className="border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {section.content.map((paragraph: any, pIndex: any) => (
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

              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Key Findings
                  </h3>
                  <ul className="space-y-3">
                    {insight.content.keyFindings.map(
                      (finding: any, index: any) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

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
    </>
  );
}
