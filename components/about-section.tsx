import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Globe, Users } from "lucide-react"

const highlights = [
  {
    icon: Users,
    title: "Local Expertise",
    description: "80% of our researchers are Africa-based, with deep contextual understanding",
  },
  {
    icon: Award,
    title: "Methodological Rigor",
    description: "Mixed-method approaches (CAP), bias-free, mobile surveys adapted to local realities",
  },
  {
    icon: CheckCircle,
    title: "Non-Partisan Integrity",
    description: "ISO 20252 certified. Independent, truth-driven analysis, not political advocacy",
  },
  {
    icon: Globe,
    title: "Innovation Hub",
    description: "AI-driven sentiment analysis, geospatial polling, and real-time data dashboards",
  },
]

const certifications = [
  "ISO 20252 Certified",
  "ESOMAR Member",
  "Independent Research",
  "30+ African Languages",
  "95% Confidence Level",
  "Real-time Analytics",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                African Insights, By Africans, For Africa
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Our mission is to amplify Africa's voices through rigorous, ethical research that drives informed
                decision-making and democratic progress.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Why Politrack?</h3>
                <div className="grid gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                        <highlight.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{highlight.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Methodology Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">500K+</div>
                  <div className="text-lg font-medium">Sample sizes: 1,200 - 5,000 respondents per national study</div>
                  <div className="text-sm text-muted-foreground">Margin of Error: ±3% at 95% confidence level</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-chart-2">30+</div>
                  <div className="text-lg font-medium">Languages: 30+ African languages supported</div>
                  <div className="text-sm text-muted-foreground">Culturally-aware research methodologies</div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 p-6 rounded-lg">
              <blockquote className="text-center">
                <p className="text-lg italic text-muted-foreground mb-4">
                  "In a continent of diverse voices and rapid change, we turn nuanced public sentiment into actionable
                  intelligence. Trust alone is not enough; Africa's future needs confidence."
                </p>
                <footer className="text-sm font-medium text-foreground">— Politrack Africa Research Team</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
