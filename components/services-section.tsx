"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart3,
  Target,
  Globe,
  TrendingUp,
  CheckCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const services = [
  {
    icon: BarChart3,
    title: "Political Polling",
    description:
      "Election forecasting, voter behavior & policy approval ratings with precision targeting and coalition modeling.",
    features: ["Exit Polls", "Candidate Favorability", "Coalition Modeling"],
    gradient: "from-yellow-500/10 to-amber-500/10",
    borderColor: "border-yellow-200/50",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    detailedDescription:
      "Our political polling services provide comprehensive insights into electoral dynamics across African nations. We employ advanced statistical models and culturally-sensitive methodologies to deliver accurate forecasts and deep understanding of voter behavior.",
    additionalFeatures: [
      "Real-time election monitoring",
      "Demographic segmentation analysis",
      "Policy approval tracking",
      "Voter sentiment analysis",
      "Electoral trend forecasting",
    ],
    useCases: [
      "Political parties planning campaign strategies",
      "NGOs monitoring electoral integrity",
      "International observers assessing election processes",
      "Media organizations reporting on elections",
    ],
  },
  {
    icon: TrendingUp,
    title: "Socio-Economic Research",
    description:
      "Public perception on poverty, governance, climate, and inclusion with SDG progress tracking.",
    features: ["Development Indicators", "Gender Equity", "Service Delivery"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-200/50",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    detailedDescription:
      "Comprehensive socio-economic research that tracks development progress and public perceptions across key sectors. Our research helps organizations understand complex social dynamics and measure impact effectively.",
    additionalFeatures: [
      "SDG progress monitoring",
      "Poverty and inequality analysis",
      "Climate change perception studies",
      "Governance and accountability tracking",
      "Social inclusion metrics",
    ],
    useCases: [
      "Development agencies measuring program impact",
      "Government ministries planning social programs",
      "International organizations tracking development goals",
      "Research institutions studying social trends",
    ],
  },
  {
    icon: Target,
    title: "Strategic Advisory",
    description:
      "Evidence-based campaigns, policy design, and risk mitigation with custom solutions.",
    features: ["Campaign Optimization", "Message Testing", "Risk Forecasting"],
    gradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-200/50",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600 dark:text-green-400",
    detailedDescription:
      "Strategic advisory services that transform data into actionable insights. We help organizations navigate complex political and business landscapes with evidence-based strategies and risk-mitigation approaches.",
    additionalFeatures: [
      "Political risk assessment",
      "Stakeholder mapping and engagement",
      "Policy impact analysis",
      "Crisis communication planning",
      "Strategic messaging development",
    ],
    useCases: [
      "Corporations entering new African markets",
      "Political campaigns optimizing outreach",
      "Government agencies designing policies",
      "Non-profits advocating for change",
    ],
  },
  {
    icon: Globe,
    title: "Consumer Insights",
    description:
      "Deep understanding of consumer behaviors, preferences, and motivations across diverse markets.",
    features: ["Behavioral Trends", "Purchase Drivers", "Market Segmentation"],
    gradient: "from-purple-500/10 to-violet-500/10",
    borderColor: "border-purple-200/50",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    detailedDescription:
      "Deep-dive consumer insights that reveal the motivations, preferences, and behaviors driving markets across Africa. Our research helps businesses understand and connect with diverse consumer segments.",
    additionalFeatures: [
      "Consumer journey mapping",
      "Brand perception studies",
      "Market entry feasibility",
      "Product adoption research",
      "Cultural context analysis",
    ],
    useCases: [
      "Multinational corporations expanding in Africa",
      "Local businesses optimizing product offerings",
      "Startups validating market opportunities",
      "Marketing agencies developing campaigns",
    ],
  },
];

export function ServicesSection() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-pretty">
            Comprehensive research and advisory services designed to navigate
            Africa's complex political and economic landscape with precision and
            cultural sensitivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 border-l-4 ${service.borderColor} bg-gradient-to-br ${service.gradient} hover:scale-105 hover:shadow-2xl cursor-pointer`}
            >
              <CardHeader className="text-center pb-4 space-y-4">
                <div
                  className={`mx-auto p-4 rounded-2xl ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-sm cursor-pointer font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors group-hover:underline">
                        Learn More →
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                      <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-4 mb-4">
                          <div
                            className={`p-3 rounded-xl ${service.iconBg} flex-shrink-0`}
                          >
                            <service.icon
                              className={`h-8 w-8 ${service.iconColor}`}
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white truncate">
                              {service.title}
                            </DialogTitle>
                          </div>
                        </div>
                        <DialogDescription className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                          {service.detailedDescription}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex-1 w-full overflow-y-auto px-6 py-4 ">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                              <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                              Key Features
                            </h3>
                            <ul className="space-y-3">
                              {service.features
                                .concat(service.additionalFeatures)
                                .map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-slate-700 dark:text-slate-300"
                                  >
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                    <span className="leading-relaxed">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                              <Target className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                              Ideal For
                            </h3>
                            <ul className="space-y-3">
                              {service.useCases.map((useCase, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start text-slate-700 dark:text-slate-300"
                                >
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  <span className="leading-relaxed">
                                    {useCase}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                            Request Proposal
                          </button>
                          <button className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                            Download Brochure
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r border-2 border-black  from-yellow-500 to-amber-500 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Strategy?
            </h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Partner with us to leverage data-driven insights for your
              political or business objectives across African markets.
            </p>
            <button
              onClick={() => {
                toast.info("Get Started feature is not available yet.");
              }}
              className="bg-white border-1 border-black  text-yellow-600 hover:bg-slate-100 font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
