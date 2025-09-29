import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe } from "lucide-react";
import Image from "next/image";

const offices = [
  {
    country: "Kenya",
    city: "Nairobi",
    flag: "kenya.png",
    type: "Headquarters",
    address: "Westlands Business District",
  },
  {
    country: "Ghana",
    city: "Accra",
    flag: "ghana.png",
    type: "Regional Office",
    address: "Airport City",
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    flag: "south_africa.png",
    type: "Regional Office",
    address: "Sandton Central",
  },
  {
    country: "Senegal",
    city: "Dakar",
    flag: "senegal.png",
    type: "Regional Office",
    address: "Almadies District",
  },
];

const services = [
  "Political Polling",
  "Socio-Economic Research",
  "Strategic Advisory",
  "Consumer Insights",
  "Market Intelligence",
  "Policy Analysis",
];

const companyLinks = [
  "About Us",
  "Our Methodology",
  "Case Studies",
  "Careers",
  "News & Updates",
  "Contact Us",
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div>
                <Image
                  src="/politrack_dark.png"
                  alt="Politrack Africa"
                  width={160}
                  height={40}
                  className="h-18 w-auto object-contain "
                />
                <div className="text-xs text-yellow-400 font-medium mt-1">
                  Data-Driven African Insights
                </div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Where Numbers Meet Narrative. Empowering Africa's future through
              data-driven political and socio-economic insights. Trusted by
              leaders, policymakers, and businesses across the continent.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-yellow-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg mb-4">
              Our Offices
            </h3>
            <div className="grid gap-4">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 group hover:bg-slate-800/50 p-2 rounded-lg transition-all duration-200"
                >
                  <div className="text-2xl flex-shrink-0 mt-1">
                    <Image
                      src={`/flags/${office.flag}`}
                      alt="Office Location Flag"
                      width={40}
                      height={40}
                      className="h-6 w-auto object-contain "
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium text-sm">
                        {office.city}
                      </span>
                      {office.type === "Headquarters" && (
                        <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
                          HQ
                        </span>
                      )}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {office.country}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      {office.address}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg mb-4">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group hover:bg-slate-800/50 p-2 rounded-lg transition-all duration-200">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Email</div>
                  <div className="text-slate-400 text-sm">
                    insights@politrack.africa
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 group hover:bg-slate-800/50 p-2 rounded-lg transition-all duration-200">
                <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Phone</div>
                  <div className="text-slate-400 text-sm">+254 700 123 456</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 group hover:bg-slate-800/50 p-2 rounded-lg transition-all duration-200">
                <div className="p-2 rounded-lg bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">
                    Headquarters
                  </div>
                  <div className="text-slate-400 text-sm">Nairobi, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-slate-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © 2025 Politrack Africa. All rights reserved.
            <span className="text-slate-500 ml-2">
              Empowering African decisions with data.
            </span>
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-slate-400 hover:text-yellow-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-yellow-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-yellow-400 transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-slate-800">
          <div className="text-slate-500 text-xs font-medium">TRUSTED BY</div>
          <div className="flex items-center space-x-6">
            <div className="text-slate-400 text-sm">
              <Image
                src="/trusts/au_logo.png"
                alt="African Union"
                width={160}
                height={40}
                className="h-10 w-auto object-contain "
              />
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="text-slate-400 text-sm">
              <Image
                src="/trusts/UNDP_africa.png"
                alt="UNDP Africa"
                width={160}
                height={40}
                className="h-8 w-auto object-contain "
              />
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="text-slate-400 text-sm">
              <Image
                src="/trusts/nairobi_county.gif"
                alt="Nairobi County Government"
                width={160}
                height={40}
                className="h-10 w-auto object-contain "
              />
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="text-slate-400 text-sm">Fortune 500 Companies</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
