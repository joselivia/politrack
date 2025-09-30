"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    // You can replace this with your actual get started logic
    console.log("Get Started clicked");
    // Example: scroll to contact section or open a modal
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/politrack.png"
              alt="Politrack Africa"
              width={160}
              height={40}
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain rounded-sm"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => handleNavClick("services")}
              className="text-sm lg:text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-2 px-1"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("insights")}
              className="text-sm lg:text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-2 px-1"
            >
              Insights
            </button>
            <button
              onClick={() => handleNavClick("case-studies")}
              className="text-sm lg:text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-2 px-1"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-sm lg:text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-2 px-1"
            >
              About
            </button>
            <Button
              onClick={handleGetStartedClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 lg:px-6 text-sm lg:text-base"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg">
            <nav className="container mx-auto px-4 sm:px-6 py-4 space-y-3">
              <button
                onClick={() => handleNavClick("services")}
                className="w-full text-left text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("insights")}
                className="w-full text-left text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                Insights
              </button>
              <button
                onClick={() => handleNavClick("case-studies")}
                className="w-full text-left text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                Case Studies
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="w-full text-left text-base font-semibold text-foreground hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                About
              </button>
              <Button
                onClick={handleGetStartedClick}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 mt-2"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
