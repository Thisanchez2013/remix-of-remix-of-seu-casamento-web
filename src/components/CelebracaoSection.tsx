import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Clock, Info, Heart, ExternalLink, Sparkles } from "lucide-react";

const schedule = [
  {
    time: "17:00",
    event: "Cerimônia Religiosa",
    desc: "O início da nossa união eterna",
    icon: Heart,
    color: "from-rose-400/20 to-pink-300/10",
    accent: "bg-rose-400",
  },
  {
    time: "18:30",
    event: "Recepção & Coquetel",
    desc: "Brindes, música e boas-vindas",
    icon: Sparkles,
    color: "from-amber-400/20 to-yellow-300/10",
    accent: "bg-amber-400",
  },
  {
    time: "20:00",
    event: "Jantar & Festa",
    desc: "Celebrando com muito amor e música",
    icon: Clock,
    color: "from-primary/20 to-primary/5",
    accent: "bg-primary",
  },
];

const CelebracaoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="celebracao"
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      {/* ── BLOCO SUPERIOR: Fundo Escuro com Impacto ── */}
      <div className="relative py-28 md:py-44 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(220,30%,10%) 0%, hsl(24,40%,12%) 50%, hsl(220,30%,8%) 100%)",
        }}
      >
        {/* Textura de grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Glow central */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsla(24,80%,55%,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Linhas decorativas horizontais */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Orbs flutuantes */}
        {[
          { x: "10%", y: "20%", size: 300, color: "hsla(24,80%,55%,0.06)" },
          { x: "80%", y: "60%", size: 250, color: "hsla(220,80%,60%,0.04)" },
          { x: "50%", y: "80%", size: 200, color: "hsla(350,60%,60%,0.04)" },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Cabeçalho com parallax */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-center mb-20 md:mb-28"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.45em" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="text-white/40 text-[10px] font-bold tracking-[0.45em] uppercase mb-6 block"
            >
              A CELEBRAÇÃO
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-5xl md:text-8xl italic font-light text-white leading-none"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
              >
                Quando & Onde
              </motion.h2>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="flex items-center justify-center gap-5 mt-8"
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20" />
              <Heart className="w-4 h-4 text-white/20 fill-white/10" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
          </motion.div>

          {/* ── GRID DE DESTAQUE: Data + Local ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Card: Data */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2rem] p-8 md:p-10 cursor-default"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]"
                style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(24,80%,55%,0.12) 0%, transparent 70%)" }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-white/30 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Calendar className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">
                    A Data
                  </span>
                </div>

                <p className="font-serif text-white italic font-light leading-snug mb-3"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                >
                  15 de Novembro
                </p>
                <p className="font-serif text-white/50 italic text-xl">de 2025</p>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-white/30 text-sm font-light italic">
                    Sábado · Um dia para lembrar para sempre
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card: Local */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2rem] p-8 md:p-10 cursor-default"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]"
                style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(220,80%,60%,0.1) 0%, transparent 70%)" }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-white/30 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <MapPin className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">
                    O Local
                  </span>
                </div>

                <p className="font-serif text-white italic font-light leading-snug mb-3"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                >
                  Espaço das Palmeiras
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  Av. das Flores, 1234 · Jardim Botânico<br />São Paulo — SP
                </p>

                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="mt-6 inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs font-semibold tracking-[0.2em] uppercase"
                >
                  Ver no Maps
                  <ExternalLink size={11} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Card: Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 group"
            style={{
              background: "linear-gradient(135deg, hsla(24,60%,48%,0.25) 0%, hsla(24,60%,48%,0.08) 100%)",
              border: "1px solid hsla(24,60%,55%,0.2)",
            }}
          >
            <div className="absolute -right-6 -bottom-6 opacity-[0.07]">
              <Info size={140} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsla(24,80%,60%,0.2)", border: "1px solid hsla(24,80%,60%,0.3)" }}
              >
                <Info className="w-6 h-6 text-white/70" />
              </div>
              <div>
                <h4 className="font-serif text-2xl text-white italic mb-2">Traje: Passeio Completo</h4>
                <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                  Sua presença é o nosso maior presente. Para celebrarmos com elegância e conforto, sugerimos traje passeio completo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BLOCO INFERIOR: Agenda (Fundo claro, alto contraste) ── */}
      <div
        className="relative py-24 md:py-36 overflow-hidden"
        style={{ background: "hsl(var(--background))" }}
      >
        {/* Elemento de transição sutil */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label">PROGRAMAÇÃO</span>
            <h3 className="font-serif text-4xl md:text-6xl italic text-foreground font-light">
              Agenda do Grande Dia
            </h3>
          </motion.div>

          {/* Timeline visual premium */}
          <div className="relative">
            {/* Linha central em desktop */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary)/0.2) 20%, hsl(var(--primary)/0.2) 80%, transparent)" }}
            />

            <div className="space-y-8 md:space-y-0">
              {schedule.map((item, index) => {
                const Icon = item.icon;
                const isRight = index % 2 === 0;

                return (
                  <div key={index} className="relative md:grid md:grid-cols-2 md:gap-16 md:mb-12">
                    {/* Marcador Central */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-12 h-12 rounded-full items-center justify-center z-10 shadow-lg"
                      style={{
                        background: "hsl(var(--background))",
                        border: "2px solid hsl(var(--primary)/0.3)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-primary/60" />
                    </motion.div>

                    {/* Conteúdo esquerdo (índice par) ou espaço */}
                    <div className={isRight ? "md:text-right" : "md:col-start-2"}>
                      <motion.div
                        initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.02 }}
                        className="group relative rounded-[1.5rem] p-6 md:p-8 overflow-hidden cursor-default"
                        style={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
                        }}
                      >
                        {/* Gradient bg sutil */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem]`} />

                        {/* Barra de acento */}
                        <div className={`absolute top-0 ${isRight ? "right-0" : "left-0"} w-1 h-full ${item.accent} opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full`} />

                        <div className="relative z-10">
                          {/* Horário */}
                          <div className={`flex items-center gap-3 mb-4 ${isRight ? "md:justify-end" : ""}`}>
                            <span className="text-primary font-bold text-2xl font-sans tracking-tight">
                              {item.time}
                            </span>
                          </div>

                          <h4 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                            {item.event}
                          </h4>
                          <p className="text-muted-foreground italic text-base font-light">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Foto do local */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-20 relative h-72 md:h-96 rounded-[2rem] overflow-hidden group shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]"
          >
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1400"
              alt="Local do Casamento"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
            {/* Overlay duplo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex items-end justify-between">
              <div>
                <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-1">Local</p>
                <p className="font-serif text-white text-2xl md:text-3xl italic font-light">Espaço das Palmeiras</p>
              </div>
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-foreground px-5 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-xl hover:bg-white transition-colors"
              >
                <MapPin size={12} />
                Ver no Maps
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CelebracaoSection;
