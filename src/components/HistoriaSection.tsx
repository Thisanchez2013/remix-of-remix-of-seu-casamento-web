import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Camera, Star, Heart } from "lucide-react";

const events = [
  {
    date: "OUTONO DE 2019",
    title: "O Primeiro Olhar",
    description: "Tudo começou em uma tarde despretensiosa. Um café, uma conversa que parecia não ter fim e a certeza de que algo especial estava começando.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    date: "2021 - 2023",
    title: "Aventuras pelo Mundo",
    description: "Entre viagens, risos e desafios, construímos nossa base. Cada destino novo era uma página escrita no nosso livro favorito: o nosso.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    date: "DEZEMBRO DE 2024",
    title: "O 'Sim' mais importante",
    description: "Sob as estrelas, decidimos que uma vida inteira ainda seria pouco tempo ao seu lado. O pedido foi apenas o começo do nosso 'para sempre'.",
    icon: <Star className="w-6 h-6" />,
  },
];

const HistoriaSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Hook para monitorar o progresso do scroll na seção
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Transforma o progresso do scroll em escala para a linha central
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="historia" ref={containerRef} className="relative py-24 md:py-40 bg-background overflow-hidden">
      
      {/* Elementos Decorativos Flutuantes (Parallax) */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-20 left-[10%] opacity-10 pointer-events-none"
      >
        <Heart className="w-20 h-20 text-primary" />
      </motion.div>
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute bottom-40 right-[10%] opacity-10 pointer-events-none"
      >
        <Star className="w-16 h-16 text-primary" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-28"
        >
          <p className="section-label">NOSSA JORNADA</p>
          <h2 className="section-title mt-6 italic">
            Como tudo começou...
          </h2>
          <div className="section-divider">
            <Heart className="w-5 h-5 text-primary animate-pulse" />
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Linha de Fundo (Estática/Muda) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-primary/10 hidden md:block" />
          
          {/* Linha de Progresso (Ativa) */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-primary/40 via-primary to-primary/40 hidden md:block z-20"
          />

          {events.map((event, index) => (
            <div key={index} className="relative mb-24 last:mb-0">
              <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                {/* Lado do Conteúdo */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-full md:w-[45%]"
                >
                  <div className="group relative bg-white/40 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-white/60 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    
                    {/* Brilho Interno (Glow effect) */}
                    <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="relative text-primary font-semibold text-xs tracking-[0.2em] mb-4 block">
                      {event.date}
                    </span>
                    <h3 className="relative font-serif text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="relative text-muted-foreground italic leading-relaxed text-base md:text-lg">
                      "{event.description}"
                    </p>
                  </div>
                </motion.div>

                {/* Marcador Central (Ícone) */}
                <div className="flex items-center justify-center w-16 h-16 relative z-30 my-8 md:my-0">
                   <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-14 h-14 bg-background border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)] rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500"
                   >
                    {event.icon}
                   </motion.div>
                </div>

                {/* Lado Vazio (Spacer) */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem Final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-32"
        >
          <div className="inline-block p-4 rounded-full bg-primary/5 border border-primary/10">
             <Heart className="w-6 h-6 text-primary fill-primary/20" />
          </div>
          <p className="mt-4 font-serif italic text-xl text-muted-foreground">E o melhor ainda está por vir...</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HistoriaSection;