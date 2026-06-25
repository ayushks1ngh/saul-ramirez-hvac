import { useState } from "react";
import { Phone } from "lucide-react";
import { api } from "@/lib/api";

const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await api.createLead({
        name: data.get("name") as string,
        phone: data.get("phone") as string,
        email: data.get("email") as string,
        service: data.get("service") as string,
        message: (data.get("message") as string) || undefined,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-secondary rounded-xl p-6 md:p-8 text-center h-full flex flex-col justify-center">
        <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Thank You!</h3>
        <p className="text-muted-foreground">We'll get back to you within 30 minutes during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg p-6 md:p-8 border border-border h-full flex flex-col">
      <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Get a Free Quote</h3>
      <p className="text-muted-foreground text-sm mb-10">Fill out the form or call us directly.</p>
      {error && <p className="text-destructive text-sm mb-4">{error}</p>}
      <div className="space-y-4 flex-grow">
        <input name="name" type="text" placeholder="Full Name" aria-label="Full Name" required maxLength={100} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input name="phone" type="tel" placeholder="Phone Number" aria-label="Phone Number" required maxLength={20} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input name="email" type="email" placeholder="Email Address" aria-label="Email Address" required maxLength={255} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <select name="service" title="Select Service" aria-label="Select Service" required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="">Select Service</option>
          <option>AC Repair</option>
          <option>AC Installation</option>
          <option>Heating Repair</option>
          <option>HVAC Maintenance</option>
          <option>Other</option>
        </select>
        <textarea name="message" placeholder="Describe your issue..." aria-label="Describe your issue" rows={3} maxLength={1000} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? "Submitting..." : "Request Free Quote"}
        </button>
      </div>
      <div className="mt-4 text-center">
        <span className="text-muted-foreground text-xs">Or call now: </span>
        <a href="tel:+14694500614" className="text-primary font-semibold text-sm inline-flex items-center gap-1">
          <Phone className="w-3.5 h-3.5" /> (469) 450-0614
        </a>
      </div>
    </form>
  );
};

export default QuoteForm;
