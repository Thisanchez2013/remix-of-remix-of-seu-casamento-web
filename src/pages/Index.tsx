import WeddingNav from "@/components/WeddingNav";
import HeroSection from "@/components/HeroSection";
import HistoriaSection from "@/components/HistoriaSection";
import CelebracaoSection from "@/components/CelebracaoSection";
import GaleriaSection from "@/components/GaleriaSection";
import RsvpSection from "@/components/RsvpSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <WeddingNav />
      <HeroSection />
      <HistoriaSection />
      <CelebracaoSection />
      <GaleriaSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
};

export default Index;
