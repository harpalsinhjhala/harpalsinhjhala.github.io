import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ImpactStrip } from "@/components/impact/ImpactStrip";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AiWorkflow } from "@/components/sections/AiWorkflow";
import { Contact } from "@/components/sections/Contact";
import { EnterpriseWork } from "@/components/sections/EnterpriseWork";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Recognition } from "@/components/sections/Recognition";
import { SkillsSchema } from "@/components/sections/SkillsSchema";

export default function Home() {
  return (
    <div className="bg-texture">
      <Navbar />
      <main id="main">
        <Hero />
        <ImpactStrip />
        <ProjectGrid />
        <EnterpriseWork />
        <ExperienceTimeline />
        <SkillsSchema />
        <AiWorkflow />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
