import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "O Beijo", subtitle: "Onde tudo faz sentido", speed: 0.1 },
  { src: gallery2, alt: "Alianças", subtitle: "A promessa de uma vida inteira", speed: 0.2 },
  { src: gallery3, alt: "Felicidade", subtitle: "Sorrisos que não cabem no rosto", speed: 0.15 },
  { src: gallery4, alt: "Pôr do Sol", subtitle: "O nosso lugar favorito no mundo", speed: 0.05 },
];

const GaleriaSection = () => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  // Auto-rotate featured image
  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredImage === null) {
        setActiveFeature((prev) => (prev + 1) % images.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [hoveredImage]);

  const navigateLightbox = (direction: number) => {
    if (selectedImage === null) return;
    const next = (selectedImage + direction + images.length) % images.length;
    setSelectedImage(next);
  };

  return (
    <section
      id="galeria"
      ref={containerRef}
      className="py-24 md:py-40 bg-background relative overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30 + i * 10, 0],
              x: [0, 15 - i * 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="section-label !mb-0">CONHEÇA O CASAL</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <h2 className="section-title mt-4 italic">Nossos Momentos</h2>
          <div className="section-divider">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <p className="mt-6 text-muted-foreground italic font-serif text-xl max-w-2xl mx-auto">
            "Cada fotografia é um segundo que se tornou eterno."
          </p>
        </motion.div>

        {/* Featured Image Showcase */}
        <div className="mb-16">
          <motion.div
            layout
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer"
            onClick={() => setSelectedImage(activeFeature)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFeature}
                src={images[activeFeature].src}
                alt={images[activeFeature].alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10"
              >
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-medium mb-2">
                  {String(activeFeature + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </p>
                <h3 className="text-white font-serif text-3xl md:text-5xl italic mb-2">
                  {images[activeFeature].alt}
                </h3>
                <p className="text-white/70 font-serif italic text-lg">
                  {images[activeFeature].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Zoom icon */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
              >
                <Maximize2 size={20} />
              </motion.div>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-3 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFeature(i);
                  }}
                  className="relative group/dot"
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      i === activeFeature
                        ? "bg-white scale-100"
                        : "bg-white/40 scale-75 hover:bg-white/70"
                    }`}
                  />
                  {i === activeFeature && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute -inset-1.5 rounded-full border border-white/50"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => {
            const isActive = i === activeFeature;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => {
                  setHoveredImage(i);
                  setActiveFeature(i);
                }}
                onHoverEnd={() => setHoveredImage(null)}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ${
                  isActive
                    ? "ring-2 ring-primary ring-offset-4 ring-offset-background shadow-xl shadow-primary/20"
                    : "shadow-md hover:shadow-xl"
                }`}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-serif italic text-lg">{img.alt}</p>
                  <p className="text-white/70 text-sm mt-1">{img.subtitle}</p>
                </div>

                {/* Number badge */}
                <div
                  className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-white/80 backdrop-blur-sm text-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={22} />
            </motion.button>

            {/* Nav arrows */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-4 md:left-8 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-4 md:right-8 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25 }}
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl mx-auto shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                />
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-8"
              >
                <p className="text-white/40 font-sans tracking-[0.3em] text-xs uppercase mb-2">
                  {String(selectedImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </p>
                <h4 className="text-white font-serif text-3xl italic">
                  {images[selectedImage].alt}
                </h4>
                <p className="text-white/50 font-serif italic mt-2">
                  {images[selectedImage].subtitle}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GaleriaSection;
