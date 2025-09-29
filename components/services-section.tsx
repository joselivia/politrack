import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Target,
  Globe,
  TrendingUp,
  Shield,
  CheckCircle,
} from "lucide-react";

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
  },
];

export function ServicesSection() {
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
                  <button className="w-full text-sm font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Strategy?
            </h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Partner with us to leverage data-driven insights for your
              political or business objectives across African markets.
            </p>
            <button className="bg-white text-yellow-600 hover:bg-slate-100 font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
