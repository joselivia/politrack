"use client";

import { Button } from "@/components/ui/button";
import { Menu, Radio, X, Home, Twitter, Facebook } from "lucide-react";
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

  const handleHomeClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
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
              onClick={handleHomeClick}
              src="/politrack.png"
              alt="Politrack Africa"
              width={160}
              height={40}
              className="h-8 sm:h-10 lg:h-12 cursor-pointer w-auto object-contain rounded-sm"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {/* <button className="flex items-center text-sm lg:text-base font-semibold text-foreground  hover:text-accent transition-colors duration-200 py-2 px-1 whitespace-nowrap">
              <span className="flex items-center">
                <Home className="w-4 h-4 inline-block mr-1" />
                Home
              </span>
            </button> */}
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

            {/* Social Media Buttons - Desktop */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                onClick={() =>
                  window.open(
                    "https://x.com/polytrackk?t=rrnHBdUYdyhjWyrP4n7iQQ&s=08",
                    "_blank"
                  )
                }
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg h-8 w-8 sm:h-10 sm:w-10"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/share/1AukUMyo61/",
                    "_blank"
                  )
                }
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg h-8 w-8 sm:h-10 sm:w-10"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* <Button
              onClick={handleGetStartedClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 lg:px-6 text-sm lg:text-base whitespace-nowrap"
            >
              Get Started
            </Button> */}
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
              {/* <button
                onClick={handleHomeClick}
                className="w-full flex items-center text-left text-base font-semibold text-foreground cursor-pointer hover:text-accent transition-colors duration-200 py-3 px-2 border-b border-border/50"
              >
                <Home className="w-4 h-4 inline-block mr-2" />
                Home
              </button> */}
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

              {/* Social Media Buttons - Mobile */}
              <div className="flex justify-center space-x-4 py-4 border-b border-border/50">
                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      "https://x.com/polytrackk?t=rrnHBdUYdyhjWyrP4n7iQQ&s=08",
                      "_blank"
                    )
                  }
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg h-10 w-10"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/share/1AukUMyo61/",
                      "_blank"
                    )
                  }
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg h-10 w-10"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              </div>

              {/* <Button
                onClick={handleGetStartedClick}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 mt-2"
              >
                Get Started
              </Button> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
