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
    role: "Madrinha da Noiva",
    image: anaImg,
    quote: "A confidente de todas as horas. Aquela que conhece meus silêncios e celebra minhas vitórias como se fossem dela.",
  },
  {
    name: "Felipe & Juliana",
    role: "Casal de Padrinhos",
    image: casalImg,
    quote: "Exemplos de amor e cumplicidade que queremos levar conosco para nossa nova jornada.",
  },
  {
    name: "Ricardo Almeida",
    role: "Padrinho do Noivo",
    image: ricardoImg,
    quote: "Aquele que esteve presente em cada capítulo da nossa história, sempre com um sorriso e um conselho sábio.",
  },
  {
    name: "Camila Ferreira",
    role: "Madrinha",
    image: camilaImg,
    quote: "Alegria contagiante e coração generoso. Cada festa fica mais bonita com ela presente.",
  },
  {
    name: "Lucas Mendes",
    role: "Padrinho",
    image: lucasImg,
    quote: "Amigo desde a infância, testemunha de cada sonho e cada conquista ao longo dos anos.",
  },
];

const AUTO_ROTATE_MS = 4500;

const PadrinhosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const total = padrinhos.length;

  const goTo = useCallback((index: number) => {
    const newIndex = ((index % total) + total) % total;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  }, [total, activeIndex]);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const active = padrinhos[activeIndex];

  return (
    <section
      id="padrinhos"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent)/0.25) 30%, hsl(var(--accent)/0.4) 50%, hsl(var(--accent)/0.25) 70%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)" }}
        />
        <div className="absolute top-10 left-20 w-2 h-2 rounded-full bg-primary/20 animate-float-slow" />
        <div className="absolute top-32 right-32 w-1.5 h-1.5 rounded-full bg-primary/15 animate-float-slow" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 rounded-full bg-primary/20 animate-float-slow" style={{ animationDelay: "6s" }} />
        <div className="absolute bottom-20 right-1/4 w-2 h-2 rounded-full bg-primary/10 animate-float-slow" style={{ animationDelay: "9s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.45em" } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="section-label"
          >
            NOSSA REDE DE AMOR
          </motion.p>

          <h2 className="section-title italic">
            Padrinhos{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "0.7em", opacity: 0.7 }}>&</span>{" "}
            Madrinhas
          </h2>

          <div className="section-divider">
            <svg className="w-5 h-5 text-primary/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl mx-auto text-muted-foreground italic font-serif text-lg leading-relaxed"
          >
            Pessoas que escolheram caminhar ao nosso lado e que guardam um lugar eterno em nossos corações.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards */}
          <div className="relative w-full flex items-center justify-center" style={{ height: "520px" }}>
            {padrinhos.map((person, i) => {
              const offset = getOffset(i);
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              if (absOffset > 2) return null;

              const xPos = offset * 240;
              const scale = isActive ? 1 : 0.58 - absOffset * 0.04;
              const opacity = isActive ? 1 : 0.4 - (absOffset - 1) * 0.15;
              const zIndex = 10 - absOffset;
              const rotateY = offset * -4;

              return (
                <motion.div
                  key={person.name}
                  className="absolute cursor-pointer"
                  animate={{
                    x: xPos,
                    scale,
                    opacity: Math.max(0.15, opacity),
                    rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 22,
                    mass: 1.2,
                  }}
                  style={{ zIndex, perspective: 1200 }}
                  onClick={() => !isActive && goTo(i)}
                >
                  <div
                    className={`relative overflow-hidden transition-all duration-700 ${
                      isActive
                        ? "rounded-[2rem] shadow-[0_40px_100px_-20px_hsl(var(--primary)/0.25),0_0_0_1px_hsl(var(--primary)/0.1)]"
                        : "rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
                    }`}
                    style={{ width: isActive ? 340 : 180 }}
                  >
                    {/* Photo */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: isActive ? 440 : 250, transition: "height 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                    >
                      <motion.img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover object-top"
                        animate={{
                          scale: isActive ? 1.02 : 1,
                          filter: isActive ? "grayscale(0%) brightness(1)" : "grayscale(50%) brightness(0.7)",
                        }}
                        transition={{ duration: 0.8 }}
                      />

                      {/* Overlay gradient */}
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          background: isActive
                            ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)"
                            : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)",
                        }}
                      />

                      {/* Soft glow on active */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "radial-gradient(ellipse at 50% 80%, hsl(var(--primary)/0.1) 0%, transparent 60%)",
                          }}
                        />
                      )}

                      {/* Role badge - only on active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="absolute top-5 left-0 right-0 flex justify-center"
                          >
                            <span
                              className="text-white/90 text-[9px] font-bold tracking-[0.4em] px-5 py-1.5 rounded-full uppercase backdrop-blur-md border border-white/15"
                              style={{ background: "hsla(var(--primary), 0.6)" }}
                            >
                              {person.role}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <AnimatePresence mode="wait">
                          {isActive ? (
                            <motion.div
                              key="active-name"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              <h3 className="font-serif text-white text-2xl italic font-medium leading-tight drop-shadow-lg">
                                {person.name}
                              </h3>
                            </motion.div>
                          ) : (
                            <motion.h3
                              key="inactive-name"
                              className="font-serif text-white/80 text-sm italic font-medium drop-shadow-md"
                            >
                              {person.name}
                            </motion.h3>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Quote panel - active only */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="relative px-6 py-5" style={{ background: "hsl(var(--card))" }}>
                            {/* Quote mark */}
                            <span
                              className="absolute top-3 left-4 font-serif text-3xl text-primary/15 leading-none select-none"
                              aria-hidden
                            >
                              "
                            </span>
                            <p className="text-muted-foreground text-[13px] italic leading-relaxed text-center font-serif pl-2">
                              {person.quote}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 mt-6">
            <button
              onClick={prev}
              className="group w-11 h-11 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 flex items-center justify-center hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/20"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              {padrinhos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative group/dot"
                  aria-label={`Ir para ${padrinhos[i].name}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 h-2 bg-primary shadow-md shadow-primary/30"
                        : "w-2 h-2 bg-primary/25 hover:bg-primary/50 hover:scale-125"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="group w-11 h-11 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 flex items-center justify-center hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/20"
              aria-label="Próximo"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile info card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-center md:hidden max-w-xs mx-auto"
            >
              <p className="text-primary/80 text-[10px] font-bold tracking-[0.4em] uppercase mb-1">
                {active.role}
              </p>
              <h3 className="font-serif text-2xl italic text-foreground">{active.name}</h3>
              <p className="text-muted-foreground text-sm italic mt-2 font-serif leading-relaxed">
                {active.quote}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px bg-primary/15" />
            <svg className="w-4 h-4 text-primary/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="w-12 h-px bg-primary/15" />
          </div>
          <p className="text-primary/40 text-[10px] font-bold tracking-[0.5em] uppercase">
            Com amor e gratidão
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PadrinhosSection;
