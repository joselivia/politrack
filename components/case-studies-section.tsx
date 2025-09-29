import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";

const caseStudies = [
  {
    title: "Electoral Turnaround in Nigeria (2023)",
    location: "Nigeria",
    challenge:
      "Client trailed by 15 points 6 months pre‑election with low engagement in key swing states.",
    solution:
      "Identified unaddressed grievances in 3 swing states via granular sentiment mapping and targeted grassroots strategy.",
    outcome:
      "Data‑driven grassroots strategy led to 8‑point swing and victory.",
    metrics: [
      { label: "Point Swing", value: "8 points" },
      { label: "Swing States", value: "3/3 won" },
      { label: "Accuracy", value: "Predicted" },
    ],
    tags: ["Political Intelligence", "Campaign Strategy", "Sentiment Analysis"],
  },
  {
    title: "Gender Policy Reform in Rwanda",
    location: "Rwanda",
    challenge:
      "Government sought evidence to strengthen women's land rights with traditional leader resistance.",
    solution:
      "Nationwide perception study + traditional leader engagement analysis to build consensus.",
    outcome:
      "Informed legislation passed with 76% public support and broad stakeholder buy-in.",
    metrics: [
      { label: "Public Support", value: "76%" },
      { label: "Leader Buy-in", value: "85%" },
      { label: "Implementation", value: "Success" },
    ],
    tags: ["Policy Research", "Stakeholder Analysis", "Gender Rights"],
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4 text-foreground"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Impact: Case Studies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Real results from our data-driven approach to political and policy
            challenges across Africa, demonstrating measurable impact and
            strategic success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl hover:border-accent/50 transition-all duration-300 border bg-background"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{study.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {study.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-card text-card-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors">
                  {study.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      CHALLENGE
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      OUR ROLE
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground">
                      {study.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      OUTCOME
                    </h4>
                    <p className="text-sm leading-relaxed font-medium text-foreground">
                      {study.outcome}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors text-foreground border-border bg-transparent"
                >
                  Read Full Case Study
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            View All Case Studies
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
