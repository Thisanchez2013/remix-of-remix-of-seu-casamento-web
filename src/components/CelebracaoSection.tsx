import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, MapPin, Clock, Heart, ExternalLink, Sparkles, Shirt } from "lucide-react";

const schedule = [
  {
    time: "17:00",
    event: "Cerimônia Religiosa",
    desc: "O início da nossa união eterna",
    icon: Heart,
  },
  {
    time: "18:30",
    event: "Recepção & Coquetel",
    desc: "Brindes, música e boas-vindas",
    icon: Sparkles,
  },
  {
    time: "20:00",
    event: "Jantar & Festa",
    desc: "Celebrando com muito amor e música",
    icon: Clock,
  },
];

const CelebracaoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      id="celebracao"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-28 md:py-40"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-20 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)" }}
        />
      </div>

      {/* Subtle top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="section-label">A CELEBRAÇÃO</span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-8xl italic font-light text-foreground leading-none"
            >
              Quando <span style={{ fontFamily: "'Great Vibes', cursive" }}>e</span> Onde
            </motion.h2>
          </div>

          <div className="section-divider">
            <Heart className="w-4 h-4 text-primary/30 fill-primary/15" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg font-light max-w-lg mx-auto italic"
          >
            Todos os detalhes do nosso grande dia, preparados com muito carinho para você.
          </motion.p>
        </motion.div>

        {/* Main info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Date Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.4 } }}
            className="group detail-card relative overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]"
              style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
            />
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/40 transition-all duration-700" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="icon-blob">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase font-semibold">
                  A Data
                </span>
              </div>

              <p className="font-serif text-foreground italic font-light leading-snug mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                15 de Novembro
              </p>
              <p className="font-serif text-primary/60 italic text-xl">de 2025</p>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm font-light italic flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary/40" />
                  Sábado · Um dia para lembrar para sempre
                </p>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.4 } }}
            className="group detail-card relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]"
              style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
            />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/40 transition-all duration-700" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="icon-blob">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase font-semibold">
                  O Local
                </span>
              </div>

              <p className="font-serif text-foreground italic font-light leading-snug mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Espaço das Palmeiras
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Av. das Flores, 1234 · Jardim Botânico<br />São Paulo — SP
              </p>

              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="mt-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs font-semibold tracking-[0.2em] uppercase"
              >
                Ver no Maps
                <ExternalLink size={11} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Dress Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="detail-card relative overflow-hidden mb-20 md:mb-28"
        >
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          <div className="absolute -right-4 -bottom-4 opacity-[0.04]">
            <Shirt size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="icon-blob flex-shrink-0">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-foreground italic mb-2">Traje: Passeio Completo</h4>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                Sua presença é o nosso maior presente. Para celebrarmos com elegância e conforto, sugerimos traje passeio completo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Schedule Section */}
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

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Central line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />

          <div className="space-y-6">
            {schedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative pl-20 md:pl-0"
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={{ scale: hoveredCard === index ? 1.3 : 1 }}
                    className="absolute left-[21px] md:left-1/2 md:-translate-x-1/2 top-8 w-14 h-14 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center z-10 shadow-soft"
                  >
                    <Icon className="w-5 h-5 text-primary/50" />
                  </motion.div>

                  {/* Card - alternate sides on desktop */}
                  <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="detail-card cursor-default"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 !== 0 ? 'md:flex-row' : ''}`}>
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
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Venue photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 relative h-72 md:h-96 rounded-[2rem] overflow-hidden group shadow-elegant"
        >
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1400"
            alt="Local do Casamento"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

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
    </section>
  );
};

export default CelebracaoSection;
