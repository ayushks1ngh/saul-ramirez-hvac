import { Shield, Users, Award, Heart } from "lucide-react";
import EmergencyBanner from "@/components/EmergencyBanner";
import heroImg from "@/assets/hero-hvac.jpg";

const values = [
  { icon: Shield, title: "Integrity", desc: "Honest assessments and transparent pricing on every job." },
  { icon: Users, title: "Customer First", desc: "Your comfort and satisfaction drive everything we do." },
  { icon: Award, title: "Excellence", desc: "Ongoing training ensures our team delivers top-quality work." },
  { icon: Heart, title: "Community", desc: "Proud to serve the Dallas community we call home." },
];

const About = () => (
  <>
    <section className="bg-secondary py-20 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">About Us</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-6 leading-tight">
              Saul Ramirez Heating & A/C
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Saul Ramirez Heating & A/C provides professional heating and air conditioning services in the Dallas area. The company offers fast response HVAC repair, installation, and maintenance services for residential customers.
            </p>
          </div>
          <img src={heroImg} alt="Saul Ramirez Heating & A/C" className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" />
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center p-6 h-full flex flex-col">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 shrink-0">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-muted py-20 md:py-24">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "20+", label: "Years Experience" },
            { num: "15,000+", label: "Homes Served" },
            { num: "4.9★", label: "Google Rating" },
            { num: "100%", label: "Satisfaction Rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-heading font-extrabold text-4xl text-primary mb-2">{s.num}</div>
              <div className="text-muted-foreground text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <EmergencyBanner />
  </>
);

export default About;
