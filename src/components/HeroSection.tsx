import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-wedding.jpg";
import { useEffect, useState, useRef } from "react";
import { Heart, ChevronDown } from "lucide-react";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.4 + 0.1,
}));

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevSeconds, setPrevSeconds] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.4]);
  const contentY = useTransform(scrollY, [0, 500], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const weddingDate = new Date("2025-11-15T17:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, weddingDate - now);
      const newSeconds = Math.floor((diff / 1000) % 60);
      if (newSeconds !== prevSeconds) setPrevSeconds(newSeconds);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: newSeconds,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [prevSeconds]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20 md:py-24"
    >
      {/* ── LAYER 1: Imagem Parallax ── */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 will-change-transform">
        <div
          className="w-full h-[130%] -mt-[15%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      </motion.div>

      {/* ── LAYER 2: Overlays Multicamada ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(60,120,200,0.12)_0%,_transparent_70%)]" />

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[4] bg-black pointer-events-none"
      />

      {/* ── LAYER 3: Partículas ── */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(p.id) * 20, 0],
              opacity: [p.opacity, p.opacity * 2.5, p.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="flex items-center gap-4 mb-5">
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-white/60"
            />
            <Heart className="w-3 h-3 text-white/60 fill-white/30" />
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-white/60"
            />
          </div>
          <span className="text-white/70 text-[10px] md:text-xs font-semibold tracking-[0.6em] uppercase">
            A Celebração do Nosso Amor
          </span>
        </motion.div>

        {/* Nome Thiago - Ajustado padding e overflow para não cortar o 'g' */}
        <div className="mb-2">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: loaded ? 0 : 120, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="font-serif italic font-light text-white pb-2 px-4"
            style={{ 
              fontSize: "clamp(2.8rem, 10vw, 9rem)", 
              textShadow: "0 4px 40px rgba(0,0,0,0.4)",
              lineHeight: "1.2" 
            }}
          >
            Thiago
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.5 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 150 }}
          className="flex items-center justify-center gap-6 my-1 md:my-2"
        >
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/20" />
          <span
            className="text-white/80"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "'Great Vibes', cursive" }}
          >
            e
          </span>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-white/40 to-white/20" />
        </motion.div>

        {/* Nome Rafaela - Ajustado padding e overflow para não cortar o 'f' */}
        <div className="mb-4 md:mb-6">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: loaded ? 0 : 120, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="font-serif italic font-light text-white pb-2 px-4"
            style={{ 
              fontSize: "clamp(2.8rem, 10vw, 9rem)", 
              textShadow: "0 4px 40px rgba(0,0,0,0.4)",
              lineHeight: "1.2"
            }}
          >
            Rafaela
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-6 md:mb-8"
        >
          <span className="text-white/70 font-serif italic text-lg md:text-xl tracking-widest">
            15 de Novembro de 2025
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase font-medium">
            Espaço das Palmeiras · São Paulo
          </span>
        </motion.div>

        {/* ── BOTÃO (Apenas Confirmar Presença) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex justify-center"
        >
          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative group px-8 sm:px-12 md:px-16 py-3.5 sm:py-4 md:py-5 rounded-full overflow-hidden font-bold text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-white shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            style={{
              background: "linear-gradient(135deg, hsl(210,60%,48%) 0%, hsl(220,70%,58%) 100%)",
            }}
          >
            <span className="relative z-10">Confirmar Presença</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/30 text-[8px] tracking-[0.4em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;