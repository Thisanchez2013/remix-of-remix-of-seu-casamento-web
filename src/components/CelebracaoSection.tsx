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
  
  // Link direto para o Villa Vezzane em Mairiporã
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Villa+Vezzane+Mairipora";

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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-20 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Card de Data */}
          <motion.div
            className="group detail-card relative overflow-hidden"
            whileHover={{ y: -8 }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="icon-blob flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-muted-foreground text-sm tracking-[0.25em] uppercase font-semibold">Data</span>
              </div>
              <p className="font-serif text-foreground italic font-light text-5xl mb-2">04 de Junho</p>
              <p className="font-serif text-primary/60 italic text-xl">de 2027</p>
            </div>
          </motion.div>

          {/* Card de Local - ATUALIZADO */}
          <motion.div
            className="group detail-card relative overflow-hidden"
            whileHover={{ y: -8 }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="icon-blob flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-muted-foreground text-sm tracking-[0.25em] uppercase font-semibold">Local</span>
              </div>
              <p className="font-serif text-foreground italic font-light text-5xl mb-2">Villa Vezzane</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Estrada do Itapetinga, 1700 · Mairiporã — SP
              </p>
              <motion.a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="mt-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs font-semibold tracking-[0.2em] uppercase"
              >
                Traçar Rota no Maps
                <ExternalLink size={11} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Traje */}
        <motion.div className="detail-card relative overflow-hidden mb-20 md:mb-28">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="icon-blob flex-shrink-0 flex items-center justify-center">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-foreground italic mb-2">Traje: Esporte fino</h4>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                Para celebrarmos com elegância, sugerimos traje esporte fino.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Foto do Local - ATUALIZADA */}
        <motion.div className="mt-20 relative h-72 md:h-96 rounded-[2rem] overflow-hidden group shadow-elegant">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1400"
            alt="Villa Vezzane"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex items-end justify-between">
            <div>
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-1">Mairiporã</p>
              <p className="font-serif text-white text-2xl md:text-3xl italic font-light">Villa Vezzane</p>
            </div>
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-foreground px-5 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-xl"
            >
              <MapPin size={12} />
              Abrir Mapa
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CelebracaoSection;