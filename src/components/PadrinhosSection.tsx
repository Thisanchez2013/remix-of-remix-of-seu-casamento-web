import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

import casalImg from "@/assets/padrinhos-casal.jpg";
import ricardoImg from "@/assets/padrinho-ricardo.jpg";
import camilaImg from "@/assets/padrinha-camila.jpg";
import lucasImg from "@/assets/padrinho-lucas.jpg";
import anaImg from "@/assets/padrinha-ana.jpg";

const padrinhos = [
  {
    name: "Mariana Santos",
    role: "MADRINHA DA NOIVA",
    image: anaImg,
    description: "A confidente de todas as horas. Aquela que conhece meus silêncios e celebra minhas vitórias como se fossem dela.",
    color: "from-rose-200/40 to-pink-100/20",
  },
  {
    name: "Felipe & Juliana",
    role: "CASAL DE PADRINHOS",
    image: casalImg,
    description: "Exemplos de amor e cumplicidade que queremos levar conosco para nossa nova jornada.",
    color: "from-amber-200/40 to-yellow-100/20",
  },
  {
    name: "Ricardo Almeida",
    role: "PADRINHO DO NOIVO",
    image: ricardoImg,
    description: "Aquele que esteve presente em cada capítulo da nossa história, sempre com um sorriso e um conselho sábio.",
    color: "from-slate-200/40 to-zinc-100/20",
  },
  {
    name: "Camila Ferreira",
    role: "MADRINHA",
    image: camilaImg,
    description: "Alegria contagiante e coração generoso. Cada festa fica mais bonita com ela presente.",
    color: "from-emerald-200/40 to-teal-100/20",
  },
  {
    name: "Lucas Mendes",
    role: "PADRINHO",
    image: lucasImg,
    description: "Amigo desde a infância, testemunha de cada sonho e cada conquista ao longo dos anos.",
    color: "from-orange-200/40 to-amber-100/20",
  },
];

const RADIUS = 320;
const AUTO_ROTATE_MS = 3000;

const PadrinhosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const total = padrinhos.length;
  const angleStep = 360 / total;
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rotate = useCallback((dir: 1 | -1) => {
    setAngle(prev => prev + dir * angleStep);
    setActiveIndex(prev => (prev - dir + total) % total);
  }, [angleStep, total]);

  useEffect(() => {
    if (isPaused) return;
    autoRef.current = setInterval(() => rotate(1), AUTO_ROTATE_MS);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [rotate, isPaused]);

  const getCardStyle = (i: number) => {
    const cardAngle = (i * angleStep - angle) * (Math.PI / 180);
    const x = Math.sin(cardAngle) * RADIUS;
    const z = Math.cos(cardAngle) * RADIUS;
    const normalizedZ = (z + RADIUS) / (2 * RADIUS); // 0 to 1
    const scale = 0.55 + normalizedZ * 0.55;
    const opacity = 0.25 + normalizedZ * 0.75;
    const isActive = i === activeIndex;
    return { x, z, scale, opacity, isActive, normalizedZ };
  };

  const active = padrinhos[activeIndex];

  return (
    <section
      id="padrinhos"
      className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--accent)/0.3)] to-[hsl(var(--background))]"
    >
      {/* Decorative background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/8 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="section-label">NOSSA REDE DE AMOR</p>
          <h2 className="section-title italic">Padrinhos & Madrinhas</h2>
          <div className="section-divider">
            <svg className="w-5 h-5 text-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p className="max-w-2xl mx-auto text-muted-foreground italic font-serif text-lg">
            "Existem amigos que se tornam família. Pessoas que escolheram caminhar ao nosso lado e que hoje guardam um lugar eterno em nossos corações."
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 3D Stage */}
          <div
            className="relative w-full"
            style={{ height: "480px", perspective: "1200px" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {padrinhos.map((person, i) => {
                const { x, z, scale, opacity, isActive, normalizedZ } = getCardStyle(i);
                return (
                  <motion.div
                    key={person.name}
                    className="absolute cursor-pointer"
                    animate={{
                      x,
                      z,
                      scale,
                      opacity,
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    style={{
                      zIndex: Math.round(normalizedZ * 100),
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => {
                      const diff = i - activeIndex;
                      const normalizedDiff = ((diff % total) + total) % total;
                      if (normalizedDiff <= total / 2) {
                        setAngle(prev => prev + normalizedDiff * angleStep);
                        setActiveIndex(i);
                      } else {
                        const steps = total - normalizedDiff;
                        setAngle(prev => prev - steps * angleStep);
                        setActiveIndex(i);
                      }
                    }}
                  >
                    {/* Card */}
                    <div
                      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                        isActive
                          ? "shadow-[0_40px_100px_-20px_hsl(var(--primary)/0.5)] ring-2 ring-primary/40"
                          : "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
                      }`}
                      style={{ width: isActive ? "260px" : "200px", transition: "width 0.4s ease" }}
                    >
                      {/* Photo */}
                      <div className="relative overflow-hidden" style={{ height: isActive ? "320px" : "240px", transition: "height 0.4s ease" }}>
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover object-top"
                          style={{ filter: isActive ? "none" : "grayscale(30%) brightness(0.85)" }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Role badge */}
                        <div className="absolute top-4 left-0 right-0 flex justify-center">
                          <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[9px] font-bold tracking-[0.3em] px-4 py-1.5 rounded-full uppercase">
                            {person.role}
                          </span>
                        </div>

                        {/* Name on image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-serif text-white text-xl italic font-medium leading-tight drop-shadow-lg">
                            {person.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description (only active) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="bg-white/95 backdrop-blur-sm px-5 py-4"
                          >
                            <p className="text-muted-foreground text-xs italic leading-relaxed text-center font-serif">
                              {person.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={() => rotate(-1)}
              className="w-12 h-12 rounded-full border border-primary/30 bg-white/80 backdrop-blur-sm text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {padrinhos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const diff = i - activeIndex;
                    const normalizedDiff = ((diff % total) + total) % total;
                    if (normalizedDiff <= total / 2) {
                      setAngle(prev => prev + normalizedDiff * angleStep);
                    } else {
                      setAngle(prev => prev - (total - normalizedDiff) * angleStep);
                    }
                    setActiveIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-primary/30 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => rotate(1)}
              className="w-12 h-12 rounded-full border border-primary/30 bg-white/80 backdrop-blur-sm text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Active card info below on mobile */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-6 text-center md:hidden"
            >
              <p className="section-label text-xs">{active.role}</p>
              <h3 className="font-serif text-2xl italic">{active.name}</h3>
              <p className="text-muted-foreground text-sm italic mt-2 max-w-xs mx-auto">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-primary/60 text-xs font-bold tracking-[0.5em] uppercase">
            ✦ &nbsp; Com amor &amp; gratidão &nbsp; ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PadrinhosSection;
