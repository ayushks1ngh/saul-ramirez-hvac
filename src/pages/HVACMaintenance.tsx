import ServicePageLayout from "@/components/ServicePageLayout";
import maintenanceImg from "@/assets/maintenance.jpg";

const HVACMaintenance = () => (
  <ServicePageLayout
    title="HVAC Maintenance Plans"
    subtitle="Preventive Maintenance"
    description="Regular maintenance extends the life of your HVAC system, improves efficiency, and prevents costly breakdowns. Join our maintenance plan and save."
    image={maintenanceImg}
    features={[
      "Comprehensive system inspection",
      "Filter replacement and cleaning",
      "Coil and drain line cleaning",
      "Electrical connection tightening",
      "Refrigerant level checks",
      "Performance efficiency testing",
    ]}
    benefits={[
      "Priority scheduling for plan members",
      "15% discount on all repairs",
      "Extended equipment lifespan",
      "Lower energy bills year-round",
      "Peace of mind with regular check-ups",
    ]}
  />
);

export default HVACMaintenance;
