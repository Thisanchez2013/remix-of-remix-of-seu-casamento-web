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
      className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center"
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
      {/* Glow central dourado */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(60,120,200,0.12)_0%,_transparent_70%)]" />

      {/* Scroll parallax extra overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[4] bg-black pointer-events-none"
      />

      {/* ── LAYER 3: Partículas Flutuantes ── */}
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

        {/* Partículas douradas maiores */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`gold-${i}`}
            className="absolute rounded-full"
            style={{
              width: 6 + i * 2,
              height: 6 + i * 2,
              left: `${15 + i * 17}%`,
              top: `${20 + i * 13}%`,
              background: `radial-gradient(circle, hsla(210,70%,70%,0.9) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -70, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 7 + i * 2,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── LAYER 4: Linhas decorativas diagonais ── */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              rgba(255,255,255,0.8) 0px,
              rgba(255,255,255,0.8) 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="flex items-center gap-4 mb-5">
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-white/60"
            />
            <Heart
              className="w-3 h-3 text-white/60 fill-white/30"
              aria-hidden
            />
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

        {/* Nome do Casal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: loaded ? 0 : 120, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="font-serif italic font-light leading-none text-white"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", textShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
          >
            Thiago
          </motion.h1>
        </div>

        {/* Separador "&" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.5 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 150 }}
          className="flex items-center justify-center gap-6 my-2 md:my-4"
        >
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/20" />
          <span
            className="font-serif italic text-white/80"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            &
          </span>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-white/40 to-white/20" />
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: loaded ? 0 : 120, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="font-serif italic font-light leading-none text-white"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", textShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
          >
            Rafaela
          </motion.h1>
        </div>

        {/* Data & Local */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6"
        >
          <span className="text-white/70 font-serif italic text-lg md:text-xl tracking-widest">
            15 de Novembro de 2025
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase font-medium">
            Espaço das Palmeiras · São Paulo
          </span>
        </motion.div>

        {/* ── COUNTDOWN PREMIUM ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex justify-center gap-3 md:gap-5 mb-8"
        >
          {[
            { value: timeLeft.days, label: "Dias" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Seg" },
          ].map((item, i) => (
            <div key={item.label} className="relative">
              {/* Card */}
              <div className="relative group overflow-hidden">
                <div
                  className="backdrop-blur-xl border border-white/15 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center px-3 py-3 md:px-6 md:py-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
                    minWidth: "clamp(60px, 14vw, 90px)",
                  }}
                >
                  {/* Brilho superior */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={item.value}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="block font-serif text-2xl md:text-4xl text-white font-light tabular-nums"
                      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>

                  <span className="text-[8px] md:text-[9px] text-white/50 tracking-[0.25em] uppercase mt-1 font-medium">
                    {item.label}
                  </span>

                  {/* Shimmer hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                </div>

                {/* Separador ":" */}
                {i < 3 && (
                  <div className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 z-10">
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-white/40 font-serif text-lg md:text-2xl"
                    >
                      :
                    </motion.span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative group px-10 md:px-14 py-4 md:py-5 rounded-full overflow-hidden font-bold text-[11px] tracking-[0.35em] uppercase text-white shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
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

          <motion.a
            href="#historia"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 md:px-14 py-4 md:py-5 rounded-full border border-white/30 text-white/80 font-medium text-[11px] tracking-[0.3em] uppercase backdrop-blur-sm hover:border-white/60 hover:text-white transition-all duration-300"
          >
            Nossa História
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

      {/* ── BORDAS DECORATIVAS DE CANTO ── */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 + i * 0.1, duration: 0.8 }}
          className={`absolute w-8 h-8 md:w-12 md:h-12 border-white/20 z-10 ${cls}`}
        />
      ))}
    </section>
  );
};

export default HeroSection;
