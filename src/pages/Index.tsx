import { Phone, Shield, Clock, Award, ThumbsUp, Wrench, Thermometer, Fan, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-hvac.jpg";
import acRepairImg from "@/assets/ac-repair.jpg";
import acInstallImg from "@/assets/ac-install.jpg";
import heatingImg from "@/assets/heating-repair.jpg";
import maintenanceImg from "@/assets/maintenance.jpg";
import QuoteForm from "@/components/QuoteForm";
import EmergencyBanner from "@/components/EmergencyBanner";

const services = [
  { title: "AC Repair", desc: "Fast, reliable air conditioning repairs to keep you cool.", icon: Wrench, img: acRepairImg, to: "/ac-repair" },
  { title: "AC Installation", desc: "Expert installation of energy-efficient cooling systems.", icon: Fan, img: acInstallImg, to: "/ac-installation" },
  { title: "Heating Repair", desc: "Keep your home warm with professional heating repairs.", icon: Thermometer, img: heatingImg, to: "/heating-repair" },
  { title: "HVAC Maintenance", desc: "Preventive maintenance to extend your system's lifespan.", icon: Settings, img: maintenanceImg, to: "/hvac-maintenance" },
];

const whyUs = [
  { icon: Clock, title: "24/7 Availability", desc: "Emergency service around the clock, 365 days a year." },
  { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed, bonded, and insured for your peace of mind." },
  { icon: Award, title: "20+ Years Experience", desc: "Trusted by thousands of Dallas homeowners since 2005." },
  { icon: ThumbsUp, title: "100% Satisfaction", desc: "We stand behind every job with our satisfaction guarantee." },
];

const testimonials = [
  { name: "Sarah M.", text: "Dallas Air Experts saved us during a summer heatwave. They arrived within an hour and had our AC running perfectly. Highly recommend!", rating: 5 },
  { name: "James T.", text: "Professional, punctual, and affordable. They installed a new system and the difference is night and day. Our energy bills dropped significantly.", rating: 5 },
  { name: "Maria L.", text: "Best HVAC company in Dallas hands down. They've maintained our system for 5 years and it runs like new. Excellent customer service.", rating: 5 },
];

const areas = ["Dallas", "Plano", "Frisco", "McKinney", "Allen", "Richardson", "Garland", "Mesquite", "Irving", "Arlington", "Grand Prairie", "Carrollton"];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="HVAC Service Dallas" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative container py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">Trusted HVAC Professionals</p>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-navy-foreground leading-tight mb-6">
                24/7 Emergency HVAC Service in Dallas
              </h1>
              <p className="text-navy-foreground/80 text-lg mb-8 max-w-lg">
                Expert heating, cooling, and air quality solutions for homes and businesses across the Dallas-Fort Worth metroplex.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+12145551234"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-5 h-5" />
                  (214) 555-1234
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-secondary">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Services</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
              Professional HVAC Solutions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-xl p-8 border border-border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-heading font-bold text-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Service Areas</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
              Proudly Serving the DFW Metroplex
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {areas.map((area) => (
              <div key={area} className="bg-card rounded-lg px-4 py-3 text-center border border-border shadow-sm">
                <span className="text-foreground font-medium text-sm">{area}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/service-areas" className="text-primary font-semibold hover:underline">
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Quote Form */}
      <section className="lg:hidden bg-muted py-16">
        <div className="container max-w-xl">
          <QuoteForm />
        </div>
      </section>

      <EmergencyBanner />
    </>
  );
};

export default Index;
