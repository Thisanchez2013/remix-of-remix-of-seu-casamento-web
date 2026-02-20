import WeddingNav from "@/components/WeddingNav";
import PresentesSection from "@/components/PresentesSection";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const PresentesPage = () => {
  return (
    <main className="overflow-x-hidden">
      <WeddingNav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20"
      >
        <PresentesSection />
      </motion.div>
      <FooterSection />
    </main>
  );
};

export default PresentesPage;
