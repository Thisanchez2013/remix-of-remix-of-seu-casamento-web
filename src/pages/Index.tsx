import WeddingNav from "@/components/WeddingNav";
import HeroSection from "@/components/HeroSection";
import CelebracaoSection from "@/components/CelebracaoSection";
import GaleriaSection from "@/components/GaleriaSection";
import RsvpSection from "@/components/RsvpSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <WeddingNav />
      <HeroSection />
      <CelebracaoSection />
      <CelebracaoSection />
      <GaleriaSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
};

export default Index;
