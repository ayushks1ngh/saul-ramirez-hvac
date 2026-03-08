import { MapPin, Phone } from "lucide-react";
import EmergencyBanner from "@/components/EmergencyBanner";

const areas = [
  "Dallas", "Plano", "Frisco", "McKinney", "Allen", "Richardson",
  "Garland", "Mesquite", "Irving", "Arlington", "Grand Prairie", "Carrollton",
  "Lewisville", "Flower Mound", "Coppell", "Addison", "Farmers Branch", "Rowlett",
  "Wylie", "Sachse", "Murphy", "The Colony", "Little Elm", "Prosper",
  "Cedar Hill", "DeSoto", "Duncanville", "Lancaster", "Mansfield", "Euless",
];

const ServiceAreas = () => (
  <>
    <section className="bg-secondary py-16 md:py-24">
      <div className="container text-center">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Where We Serve</p>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-6">
          HVAC Service Areas in Dallas-Fort Worth
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dallas Air Experts proudly provides heating, cooling, and air quality services throughout the DFW metroplex. If you don't see your city listed, give us a call — we likely serve your area too.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {areas.map((area) => (
            <div key={area} className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3 border border-border">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-foreground font-medium text-sm">{area}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Don't see your area? Call us to check availability.</p>
          <a
            href="tel:+12145551234"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" /> (214) 555-1234
          </a>
        </div>
      </div>
    </section>

    <EmergencyBanner />
  </>
);

export default ServiceAreas;
