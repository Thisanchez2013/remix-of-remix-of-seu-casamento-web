import WeddingNav from "@/components/WeddingNav";
import PadrinhosSection from "@/components/PadrinhosSection";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const PadrinhosPage = () => {
  return (
    <main className="overflow-x-hidden">
      <WeddingNav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20"
      >
        <PadrinhosSection />
      </motion.div>
      <FooterSection />
    </main>
  );
};

export default PadrinhosPage;
