"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Cookie, Settings, Monitor } from "lucide-react";
import Link from "next/link";

export default function CookiePolicy() {
  const sections = [
    {
      title: "What Are Cookies?",
      content: [
        "Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.",
        "Cookies can be 'persistent' or 'session' cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.",
      ],
    },
    {
      title: "How We Use Cookies",
      content: [
        "We use cookies for various purposes, including: authenticating you when you log into your account, remembering your preferences and settings, analyzing how you use our website to improve our services, and personalizing your experience.",
        "The information collected through cookies helps us understand user behavior, track the effectiveness of our content, and make improvements to our website's functionality and user experience.",
      ],
    },
    {
      title: "Types of Cookies We Use",
      content: [
        "Essential Cookies: These are necessary for the website to function properly and cannot be switched off. They enable basic functions like page navigation and access to secure areas.",
        "Analytics Cookies: These allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
        "Preference Cookies: These enable the website to remember information that changes the way the site behaves or looks, like your preferred language or region.",
        "Marketing Cookies: These may be set through our site by our advertising partners to build a profile of your interests.",
      ],
    },
    {
      title: "Third-Party Cookies",
      content: [
        "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.",
        "These third-party services may include Google Analytics, social media platforms, and advertising networks. These companies may use information about your visits to this and other websites to provide relevant advertisements.",
        "We do not have control over these third-party cookies, and their use is governed by their respective privacy policies.",
      ],
    },
    {
      title: "Your Cookie Choices",
      content: [
        "You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in our cookie banner or by configuring your browser settings.",
        "Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.",
        "You can also manage your cookie preferences through our cookie consent tool, which allows you to select which categories of cookies you accept or reject.",
      ],
    },
    {
      title: "Cookie Duration",
      content: [
        "Session Cookies: These are temporary cookies that remain on your device until you close your browser. They are used to maintain your session state and are automatically deleted when you close the browser.",
        "Persistent Cookies: These remain on your device for a set period specified in the cookie. They are activated each time you visit the website that created that particular cookie.",
        "The specific duration of each cookie varies. Some may expire after a few minutes, while others may remain for several years unless manually deleted.",
      ],
    },
    {
      title: "Updates to This Policy",
      content: [
        "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We encourage you to check this page periodically for the latest information on our cookie practices.",
        "Significant changes to this policy will be communicated through our website or via email where appropriate. The 'last updated' date at the top of this policy indicates when it was last revised.",
      ],
    },
  ];

  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Required for basic site functionality",
      duration: "Session/Persistent",
      mandatory: true,
    },
    {
      name: "Analytics Cookies",
      purpose: "Help us understand how visitors interact",
      duration: "Up to 2 years",
      mandatory: false,
    },
    {
      name: "Preference Cookies",
      purpose: "Remember your settings and preferences",
      duration: "Up to 1 year",
      mandatory: false,
    },
    {
      name: "Marketing Cookies",
      purpose: "Track advertising effectiveness",
      duration: "Up to 1 year",
      mandatory: false,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <Cookie className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Cookie Policy
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              This Cookie Policy explains how PoliTrack Africa uses cookies and
              similar technologies to recognize you when you visit our website.
              It explains what these technologies are and why we use them, as
              well as your rights to control our use of them.
            </p>

            <div className="max-w-full mx-auto grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                {sections.map((section, index) => (
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

                <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      Types of Cookies We Use
                    </h3>
                    <div className="space-y-4">
                      {cookieTypes.map((cookie, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between p-4 bg-white dark:bg-slate-800 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              {cookie.name}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {cookie.purpose}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs">
                              <span className="text-slate-500 dark:text-slate-400">
                                Duration: {cookie.duration}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full ${
                                  cookie.mandatory
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                }`}
                              >
                                {cookie.mandatory ? "Required" : "Optional"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                      Cookie Settings
                    </h4>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          Policy Version
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          1.0
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          Last Reviewed
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          {new Date().toLocaleDateString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          Compliance
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          GDPR, Kenya DPA
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-white mb-2">
                      Manage Your Preferences
                    </h4>
                    <p className="text-blue-100 text-sm mb-4">
                      Control your cookie settings
                    </p>
                    <Button
                      onClick={() => {
                        // This would typically trigger your cookie consent manager
                        if (
                          typeof window !== "undefined" &&
                          (window as any).displayPreferenceModal
                        ) {
                          (window as any).displayPreferenceModal();
                        }
                      }}
                      className="w-full bg-white hover:bg-slate-100 text-blue-600 text-sm"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Cookie Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Browser Controls
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      You can control cookies through your browser settings:
                    </p>
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                      <p>• Chrome: Settings → Privacy and Security → Cookies</p>
                      <p>• Firefox: Options → Privacy & Security → Cookies</p>
                      <p>• Safari: Preferences → Privacy → Cookies</p>
                      <p>• Edge: Settings → Privacy and Services → Cookies</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
