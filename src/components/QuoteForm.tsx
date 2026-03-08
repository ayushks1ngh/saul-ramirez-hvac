import { useState } from "react";
import { Phone } from "lucide-react";

const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-secondary rounded-xl p-8 text-center">
        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">We'll get back to you within 30 minutes during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg p-8 border border-border">
      <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Get a Free Quote</h3>
      <p className="text-muted-foreground text-sm mb-6">Fill out the form or call us directly.</p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          maxLength={100}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          maxLength={20}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          maxLength={255}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          required
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select Service</option>
          <option>AC Repair</option>
          <option>AC Installation</option>
          <option>Heating Repair</option>
          <option>HVAC Maintenance</option>
          <option>Other</option>
        </select>
        <textarea
          placeholder="Describe your issue..."
          rows={3}
          maxLength={1000}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <button
          type="submit"
          className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Request Free Quote
        </button>
      </div>
      <div className="mt-4 text-center">
        <span className="text-muted-foreground text-xs">Or call now: </span>
        <a href="tel:+12145551234" className="text-primary font-semibold text-sm inline-flex items-center gap-1">
          <Phone className="w-3.5 h-3.5" /> (214) 555-1234
        </a>
      </div>
    </form>
  );
};

export default QuoteForm;
