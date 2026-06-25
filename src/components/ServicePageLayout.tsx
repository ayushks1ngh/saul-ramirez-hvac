import { Phone, CheckCircle } from "lucide-react";
import QuoteForm from "./QuoteForm";
import EmergencyBanner from "./EmergencyBanner";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
}

const ServicePageLayout = ({ title, subtitle, description, image, features, benefits }: ServicePageLayoutProps) => (
  <>
    {/* Hero */}
    <section className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{subtitle}</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-6 leading-tight">{title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+14694500614"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Free Quote
              </a>
            </div>
          </div>
          <div>
            <img src={image} alt={title} className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">What We Offer</h2>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">Why Saul Ramirez Heating & A/C?</h2>
            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Quote form */}
    <section className="bg-muted py-16">
      <div className="container max-w-xl">
        <QuoteForm />
      </div>
    </section>

    <EmergencyBanner />
  </>
);

export default ServicePageLayout;
