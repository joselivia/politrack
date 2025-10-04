"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Mail, Database } from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "PoliTrack Africa collects information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and professional details.",
        "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.",
        "We may also collect information from third-party sources and public records to enhance our political tracking services.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our political tracking services and insights",
        "To communicate with you about updates, new features, and relevant political developments",
        "To personalize your experience and provide content relevant to your interests",
        "To analyze usage patterns and improve our website functionality",
        "To comply with legal obligations and protect our rights",
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell your personal information to third parties.",
        "We may share information with trusted service providers who assist us in operating our website and services, subject to strict confidentiality agreements.",
        "We may disclose information if required by law or to protect our rights, property, or safety, or that of our users or others.",
        "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure.",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        "You can access, update, or delete your personal information through your account settings",
        "You may opt-out of marketing communications at any time by using the unsubscribe link in our emails",
        "You can disable cookies through your browser settings, though this may affect website functionality",
        "You have the right to request information about the personal data we hold about you",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.",
        "When we no longer need to use your information, we will remove it from our systems and records or take steps to anonymize it.",
      ],
    },
    {
      title: "International Data Transfers",
      content: [
        "As PoliTrack Africa operates in Kenya, your data may be processed and stored in Kenya.",
        "We ensure that appropriate safeguards are in place to protect your personal data when transferred across borders, in compliance with applicable data protection laws.",
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
        "We will notify you of any material changes by posting the new policy on our website and updating the effective date.",
        "Your continued use of our services after any changes indicates your acceptance of the updated policy.",
      ],
    },
  ];

  const keyPrinciples = [
    "We are transparent about what data we collect and how we use it",
    "We collect only the data necessary to provide our services",
    "We protect your data with appropriate security measures",
    "We respect your privacy choices and rights",
    "We comply with applicable data protection regulations",
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
              <Shield className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Privacy Policy
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              At PoliTrack Africa, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              policy explains how we collect, use, and safeguard your data when
              you use our services.
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

                <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      Our Privacy Principles
                    </h3>
                    <ul className="space-y-3">
                      {keyPrinciples.map((principle, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{principle}</span>
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
                      Policy Details
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
                          Version
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          1.0
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-600 dark:text-slate-400">
                          Applicable Laws
                        </dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                          Kenya Data Protection Act
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-white mb-2">
                      Contact Our Privacy Team
                    </h4>
                    <p className="text-blue-100 text-sm mb-4">
                      Have questions about your privacy?
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-white hover:bg-slate-100 text-blue-600 text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Us
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
