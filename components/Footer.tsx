import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-bold">Politrack Africa</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where Numbers Meet Narrative. Empowering Africa's future through data-driven political and socio-economic
              insights.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Political Polling
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Socio-Economic Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Strategic Advisory
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pan‑African Coverage
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Our Offices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium">Headquarters:</span> Nairobi, Kenya
              </li>
              <li>Accra, Ghana</li>
              <li>Johannesburg, South Africa</li>
              <li>Dakar, Senegal</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Get In Touch</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>insights@politrack.africa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© 2025 Politrack Africa. All rights reserved.</div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
