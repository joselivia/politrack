import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/politrack.png"
              alt="Politrack Africa"
              width={160}
              height={40}
              className="h-12 w-auto object-contain rounded-sm"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-base font-semibold text-foreground hover:text-accent transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#insights"
              className="text-base font-semibold text-foreground hover:text-accent transition-colors duration-200"
            >
              Insights
            </a>
            <a
              href="#case-studies"
              className="text-base font-semibold text-foreground hover:text-accent transition-colors duration-200"
            >
              Case Studies
            </a>
            <a
              href="#about"
              className="text-base font-semibold text-foreground hover:text-accent transition-colors duration-200"
            >
              About
            </a>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
            >
              Get Started
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
