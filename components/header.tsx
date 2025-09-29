import { Button } from "@/components/ui/button"
import { Menu, Plane } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Plane className="h-6 w-6 text-white rotate-45" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">Politrack Africa</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#insights"
              className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              Insights
            </a>
            <a
              href="#case-studies"
              className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              Case Studies
            </a>
            <a
              href="#about"
              className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              About
            </a>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6">
              Get Started
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
