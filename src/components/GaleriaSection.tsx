import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Maximize2, X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "O beijo", className: "md:col-span-2 md:row-span-2", speed: 0.1 },
  { src: gallery2, alt: "Alianças", className: "md:col-span-1 md:row-span-1", speed: 0.2 },
  { src: gallery3, alt: "Felicidade", className: "md:col-span-1 md:row-span-2", speed: 0.15 },
  { src: gallery4, alt: "Pôr do sol", className: "md:col-span-2 md:row-span-1", speed: 0.05 },
];

const GaleriaSection = () => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Efeito Parallax para a grade de imagens
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="galeria" ref={containerRef} className="py-24 md:py-40 bg-background relative overflow-hidden">
      
      {/* Background Decor - Pétalas/Corações desfocados */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-[5%] text-primary"
        >
          <Heart size={120} fill="currentColor" className="blur-xl" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label">MEMÓRIAS</span>
          <h2 className="section-title mt-4 italic">Nossos Momentos</h2>
          <div className="section-divider">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <p className="mt-6 text-muted-foreground italic font-serif text-xl max-w-2xl mx-auto">
            "Cada fotografia é um segundo que se tornou eterno. Capturas de uma vida que agora se torna uma só."
          </p>
        </motion.div>

        {/* Bento Grid Layout com Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {images.map((img, i) => {
            // Cada imagem tem um deslocamento vertical baseado no scroll (Parallax)
            const y = useTransform(scrollYProgress, [0, 1], [0, -100 * img.speed * 5]);

            return (
              <motion.div
                key={i}
                style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? y : 0 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`${img.className} group cursor-pointer photo-frame`}
                onClick={() => setSelectedImage(i)}
              >
                {/* Overlay de Zoom e Ícone */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/20 backdrop-blur-[2px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl"
                  >
                    <Maximize2 size={24} />
                  </motion.div>
                </div>

                {/* Efeito de Brilho (CSS) */}
                <div className="photo-shine z-30" />

                <motion.img
                  src={img.src}
                  alt={img.alt}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Legenda Flutuante */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-serif italic text-lg">{img.alt}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Cinematográfico */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="lightbox-close z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>

            <motion.div
              layoutId={`img-${selectedImage}`}
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25 }}
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-12 text-center"
              >
                <p className="text-white/60 font-sans tracking-[0.2em] text-xs uppercase mb-1">Momento Eternizado</p>
                <h4 className="text-white font-serif text-2xl italic">{images[selectedImage].alt}</h4>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GaleriaSection;