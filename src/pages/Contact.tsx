import { Phone, Mail, MapPin, Clock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

const Contact = () => (
  <>
    <section className="bg-secondary py-16 md:py-24">
      <div className="container text-center">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Get In Touch</p>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-6">
          Contact Dallas Air Experts
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ready to schedule service or have questions? Reach out by phone, email, or fill out the form below.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Contact Information</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "(214) 555-1234", href: "tel:+12145551234" },
                { icon: Mail, label: "Email", value: "info@dallasairexperts.com", href: "mailto:info@dallasairexperts.com" },
                { icon: MapPin, label: "Location", value: "Dallas, Texas", href: undefined },
                { icon: Clock, label: "Hours", value: "24/7 Emergency Service Available", href: undefined },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-foreground hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-semibold text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Monday – Friday</span><span className="font-medium text-foreground">7:00 AM – 8:00 PM</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Saturday</span><span className="font-medium text-foreground">8:00 AM – 5:00 PM</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Sunday</span><span className="font-medium text-foreground">Emergency Only</span></div>
              </div>
            </div>
          </div>

          <QuoteForm />
        </div>
      </div>
    </section>
  </>
);

export default Contact;
