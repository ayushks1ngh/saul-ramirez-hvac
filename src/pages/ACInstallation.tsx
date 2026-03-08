import ServicePageLayout from "@/components/ServicePageLayout";
import acInstallImg from "@/assets/ac-install.jpg";

const ACInstallation = () => (
  <ServicePageLayout
    title="AC Installation & Replacement"
    subtitle="New AC Systems"
    description="Upgrade to a modern, energy-efficient air conditioning system. We help you choose the right size and model for your home, and handle everything from removal to installation."
    image={acInstallImg}
    features={[
      "Free in-home consultation and estimate",
      "Energy-efficient system recommendations",
      "Professional load calculations",
      "Complete removal of old equipment",
      "Expert installation by certified technicians",
      "Financing options available",
    ]}
    benefits={[
      "Top-rated AC brands at competitive prices",
      "10-year manufacturer warranty support",
      "Reduced energy bills with high-SEER units",
      "Clean, professional installation crews",
      "Post-installation system optimization",
    ]}
  />
);

export default ACInstallation;
