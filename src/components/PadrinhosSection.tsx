import { motion, useInView, AnimatePresence } from "framer-motion";
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
  },
  {
    name: "Felipe & Juliana",
    role: "CASAL DE PADRINHOS",
    image: casalImg,
    description: "Exemplos de amor e cumplicidade que queremos levar conosco para nossa nova jornada.",
  },
  {
    name: "Ricardo Almeida",
    role: "PADRINHO DO NOIVO",
    image: ricardoImg,
    description: "Aquele que esteve presente em cada capítulo da nossa história, sempre com um sorriso e um conselho sábio.",
  },
  {
    name: "Camila Ferreira",
    role: "MADRINHA",
    image: camilaImg,
    description: "Alegria contagiante e coração generoso. Cada festa fica mais bonita com ela presente.",
  },
  {
    name: "Lucas Mendes",
    role: "PADRINHO",
    image: lucasImg,
    description: "Amigo desde a infância, testemunha de cada sonho e cada conquista ao longo dos anos.",
  },
];

const AUTO_ROTATE_MS = 3000;

const PadrinhosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = padrinhos.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  // Calculate position offset from active for each card
  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    // Normalize to range [-floor(total/2), ceil(total/2)]
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
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

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards row */}
          <div className="relative w-full flex items-center justify-center" style={{ height: "460px" }}>
            {padrinhos.map((person, i) => {
              const offset = getOffset(i);
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              // Only show cards within 2 positions of active
              if (absOffset > 2) return null;

              const xPos = offset * 220;
              const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
              const opacity = isActive ? 1 : 0.5 - (absOffset - 1) * 0.15;
              const zIndex = 10 - absOffset;

              return (
                <motion.div
                  key={person.name}
                  className="absolute cursor-pointer"
                  animate={{
                    x: xPos,
                    scale,
                    opacity: Math.max(0.2, opacity),
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{ zIndex }}
                  onClick={() => goTo(i)}
                >
                  <div
                    className={`relative rounded-3xl overflow-hidden transition-shadow duration-500 ${
                      isActive
                        ? "shadow-[0_40px_100px_-20px_hsl(var(--primary)/0.4)] ring-2 ring-primary/30"
                        : "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
                    }`}
                    style={{ width: isActive ? 260 : 180 }}
                  >
                    {/* Photo */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: isActive ? 320 : 220, transition: "height 0.4s ease" }}
                    >
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover object-top transition-all duration-500"
                        style={{ filter: isActive ? "none" : "grayscale(40%) brightness(0.8)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Role badge */}
                      <div className="absolute top-4 left-0 right-0 flex justify-center">
                        <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[9px] font-bold tracking-[0.3em] px-4 py-1.5 rounded-full uppercase">
                          {person.role}
                        </span>
                      </div>

                      {/* Name */}
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

          {/* Controls */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-primary/30 bg-white/80 backdrop-blur-sm text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {padrinhos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-primary/30 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-primary/30 bg-white/80 backdrop-blur-sm text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile info */}
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
