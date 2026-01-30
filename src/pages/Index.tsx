import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { MissionSection } from "@/components/home/MissionSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProgramsSection />
      <MissionSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
