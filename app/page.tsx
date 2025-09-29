"use client"

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { InsightsSection } from "@/components/insights-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
     <ServicesSection />
      <InsightsSection />
      <CaseStudiesSection />
      <AboutSection />
      <Footer />  
    </main>
  );
}
