import ServicePageLayout from "@/components/ServicePageLayout";
import acRepairImg from "@/assets/ac-repair.jpg";

const ACRepair = () => (
  <ServicePageLayout
    title="AC Repair Services in Dallas"
    subtitle="Air Conditioning Repair"
    description="Is your AC blowing warm air or making strange noises? Our certified technicians diagnose and fix all makes and models quickly, getting your home cool again fast."
    image={acRepairImg}
    features={[
      "Same-day and emergency AC repair service",
      "All major AC brands serviced",
      "Refrigerant leak detection and repair",
      "Compressor and fan motor replacement",
      "Thermostat diagnostics and repair",
      "Ductwork inspection and sealing",
    ]}
    benefits={[
      "Upfront, transparent pricing with no hidden fees",
      "EPA-certified technicians",
      "90-day repair warranty on all work",
      "Available 24/7 including weekends and holidays",
      "Fast response times — typically under 60 minutes",
    ]}
  />
);

export default ACRepair;
