import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Target, Globe, TrendingUp, Shield } from "lucide-react"

const services = [
  {
    icon: BarChart3,
    title: "Political Polling",
    description:
      "Election forecasting, voter behavior & policy approval ratings with precision targeting and coalition modeling.",
    features: ["Exit Polls", "Candidate Favorability", "Coalition Modeling"],
  },
  {
    icon: TrendingUp,
    title: "Socio-Economic Research",
    description: "Public perception on poverty, governance, climate, and inclusion with SDG progress tracking.",
    features: ["Development Indicators", "Gender Equity", "Service Delivery"],
  },
  {
    icon: Target,
    title: "Strategic Advisory",
    description: "Evidence-based campaigns, policy design, and risk mitigation with custom solutions.",
    features: ["Campaign Optimization", "Message Testing", "Risk Forecasting"],
  },
  {
    icon: Globe,
    title: "Pan‑African Coverage",
    description: "Fieldwork across 25+ countries with local-language capabilities and cultural understanding.",
    features: ["30+ Languages", "Local Expertise", "Cultural Context"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive research and advisory services designed to navigate Africa's complex political and economic
            landscape with precision and cultural sensitivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <Shield className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
