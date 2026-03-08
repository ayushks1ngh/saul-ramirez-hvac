import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Dallas Air Experts</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted HVAC partner in Dallas, TX. Licensed, insured, and committed to your comfort since 2005.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/ac-repair" className="hover:opacity-100 transition-opacity">AC Repair</Link></li>
              <li><Link to="/ac-installation" className="hover:opacity-100 transition-opacity">AC Installation</Link></li>
              <li><Link to="/heating-repair" className="hover:opacity-100 transition-opacity">Heating Repair</Link></li>
              <li><Link to="/hvac-maintenance" className="hover:opacity-100 transition-opacity">HVAC Maintenance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/service-areas" className="hover:opacity-100 transition-opacity">Service Areas</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="tel:+12145551234" className="hover:opacity-100">(214) 555-1234</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:info@dallasairexperts.com" className="hover:opacity-100">info@dallasairexperts.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Dallas, Texas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-muted-foreground/20">
        <div className="container py-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Dallas Air Experts. All rights reserved. Licensed & Insured.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
