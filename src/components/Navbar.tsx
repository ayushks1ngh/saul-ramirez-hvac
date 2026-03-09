import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "AC Repair", to: "/ac-repair" },
  { label: "AC Installation", to: "/ac-installation" },
  { label: "Heating Repair", to: "/heating-repair" },
  { label: "HVAC Maintenance", to: "/hvac-maintenance" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-navy-foreground text-sm py-2">
        <div className="container flex items-center justify-between">
          <span>Serving Dallas & Surrounding Areas</span>
          <a href="tel:+14694500614" className="flex items-center gap-1.5 font-semibold hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            (469) 450-0614
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Saul Ramirez Heating & A/C" className="h-10 w-10" />
            <div className="font-heading font-bold text-lg leading-tight">
              <span className="text-primary">Saul Ramirez</span>
              <br className="hidden sm:block" />
              <span className="text-foreground"> Heating & A/C</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-secondary"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="tel:+14694500614"
            className="hidden lg:flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-background border-t border-border pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-secondary"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-3">
              <a
                href="tel:+14694500614"
                className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-lg font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                (469) 450-0614
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
