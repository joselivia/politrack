"use client";

import { Button } from "@/components/ui/button";
import { Menu, Radio, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    // If we're not on the home page, navigate to home first with hash
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      // If we're already on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    // You can replace this with your actual get started logic
    console.log("Get Started clicked");
    // Example: scroll to contact section or open a modal
    setIsMobileMenuOpen(false);
  };

  const handleLivePollsClick = () => {
    router.push("/polls");
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
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <button
              onClick={handleLivePollsClick}
              className="flex items-center text-sm lg:text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-2 px-1 whitespace-nowrap"
            >
              <span className="flex items-center">
                <Radio className="w-4 h-4 inline-block mr-1 text-green-500 animate-pulse" />
                Live Polls
              </span>
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className="text-sm lg:text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-2 px-1 whitespace-nowrap"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("insights")}
              className="text-sm lg:text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-2 px-1 whitespace-nowrap"
            >
              Insights
            </button>
            <button
              onClick={() => handleNavClick("case-studies")}
              className="text-sm lg:text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-2 px-1 whitespace-nowrap"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-sm lg:text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-2 px-1 whitespace-nowrap"
            >
              About
            </button>
            <Button
              onClick={handleGetStartedClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 lg:px-6 text-sm lg:text-base whitespace-nowrap"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground cursor-pointer h-9 w-9"
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
                onClick={handleLivePollsClick}
                className="w-full flex items-center text-left text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                <Radio className="w-4 h-4 inline-block mr-2 text-green-500 animate-pulse" />
                Live Polls
              </button>
              <button
                onClick={() => handleNavClick("services")}
                className="w-full text-left text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("insights")}
                className="w-full text-left text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                Insights
              </button>
              <button
                onClick={() => handleNavClick("case-studies")}
                className="w-full text-left text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                Case Studies
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="w-full text-left text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
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
