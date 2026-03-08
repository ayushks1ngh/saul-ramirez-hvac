import ServicePageLayout from "@/components/ServicePageLayout";
import heatingImg from "@/assets/heating-repair.jpg";

const HeatingRepair = () => (
  <ServicePageLayout
    title="Heating Repair Services in Dallas"
    subtitle="Furnace & Heating Repair"
    description="Don't let a broken heater leave you in the cold. Our heating experts repair furnaces, heat pumps, and all heating systems to keep your family warm and safe."
    image={heatingImg}
    features={[
      "Furnace and heat pump repair",
      "Pilot light and ignition system repair",
      "Heat exchanger inspection",
      "Blower motor and fan repairs",
      "Gas line safety inspections",
      "Carbon monoxide testing",
    ]}
    benefits={[
      "24/7 emergency heating repair service",
      "All brands and models serviced",
      "Safety-first approach with thorough inspections",
      "Transparent pricing before work begins",
      "Fast, same-day service available",
    ]}
  />
);

export default HeatingRepair;
