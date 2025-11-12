"use client";

import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import InsightsSection from "@/components/insights-section";
import CaseStudiesSection from "@/components/case-studies-section";
import AboutSection from "@/components/about-section";
import ToastCard from "@/components/toast-card";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <InsightsSection />
      <CaseStudiesSection />
      <AboutSection />
      <ToastCard />
    </main>
  );
}
