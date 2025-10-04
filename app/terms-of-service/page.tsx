"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Scale, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using PoliTrack Africa (politrackafrica.co.ke), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
        "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.",
      ],
    },
    {
      title: "Description of Service",
      content: [
        "PoliTrack Africa provides political tracking services, insights, and analysis focused on African political landscapes. Our services include but are not limited to: political data aggregation, analysis reports, trend monitoring, and related informational services.",
        "We strive to provide accurate and timely information, but we cannot guarantee the completeness, accuracy, or reliability of any information provided through our services.",
      ],
    },
    {
      title: "User Accounts and Registration",
      content: [
        "Some features of our service may require user registration. You agree to provide accurate and complete information during registration and to keep this information updated.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        "You must be at least 18 years old to create an account and use our services.",
      ],
    },
    {
      title: "User Conduct and Responsibilities",
      content: [
        "You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services.",
        "You will not attempt to gain unauthorized access to any part of our services, other accounts, or computer systems connected to our services.",
        "You agree not to use automated systems, including spiders, robots, or data mining tools, to access or collect data from our services without our express written permission.",
      ],
    },
    {
      title: "Intellectual Property Rights",
      content: [
        "All content, features, and functionality on PoliTrack Africa, including but not limited to text, graphics, logos, images, and software, are the exclusive property of PoliTrack Africa and are protected by copyright, trademark, and other intellectual property laws.",
        "You may access and use our content for personal, non-commercial purposes. Any commercial use, reproduction, or distribution of our content requires prior written permission.",
        "You retain ownership of any content you submit to us, but by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content in connection with our services.",
      ],
    },
    {
      title: "Disclaimer of Warranties",
      content: [
        "Our services are provided 'as is' and 'as available' without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
        "We do not warrant that our services will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.",
        "The political insights and analysis provided are for informational purposes only and should not be considered as professional advice.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "To the fullest extent permitted by law, PoliTrack Africa shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising from your use of our services.",
        "Our total liability to you for any claims arising from these terms or your use of our services shall not exceed the amount you have paid to us for the services in the past six months.",
      ],
    },
    {
      title: "Termination",
      content: [
        "We may suspend or terminate your access to our services at any time, with or without cause, and with or without notice.",
        "You may terminate your account at any time by contacting us or through your account settings.",
        "Upon termination, all provisions of these terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.",
      ],
    },
    {
      title: "Governing Law and Dispute Resolution",
      content: [
        "These Terms of Service shall be governed by and construed in accordance with the laws of Kenya.",
        "Any disputes arising from these terms or your use of our services shall be resolved through arbitration in Nairobi, Kenya, in accordance with the Arbitration Act of Kenya.",
        "You agree to submit to the exclusive jurisdiction of the courts located in Kenya for the resolution of any legal disputes.",
      ],
    },
  ];

  const prohibitedActivities = [
    "Using our services for any illegal or unauthorized purpose",
    "Violating any laws in your jurisdiction",
    "Infringing upon our intellectual property rights",
    "Attempting to interfere with or compromise system integrity",
    "Collecting user information without consent",
    "Transmitting viruses or malicious code",
    "Spamming or sending unsolicited communications",
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
              <FileText className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Terms of Service
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Welcome to PoliTrack Africa. These Terms of Service govern your
              use of our website and services. Please read them carefully before
              using our platform.
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

                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      Prohibited Activities
                    </h3>
                    <ul className="space-y-3">
                      {prohibitedActivities.map((activity, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                      Terms Overview
                    </h4>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          Effective Date
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          {new Date().toLocaleDateString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          Governing Law
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          Kenya Law
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          User Age Requirement
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          18+ Years
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-white mb-2">
                      Questions About Terms?
                    </h4>
                    <p className="text-blue-100 text-sm mb-4">
                      Contact us for clarification
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-white hover:bg-slate-100 text-blue-600 text-sm">
                        <Scale className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </Link>
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
