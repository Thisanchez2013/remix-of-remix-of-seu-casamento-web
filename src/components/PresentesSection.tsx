import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Gift, Sparkles, ArrowRight, Info, MapPin } from "lucide-react";

import imgPanelas from "@/assets/gift-panelas.jpg";
import imgCama from "@/assets/gift-cama.jpg";
import imgCafe from "@/assets/gift-cafe.jpg";
import imgRobo from "@/assets/gift-robo.jpg";
import imgTacas from "@/assets/gift-tacas.jpg";
import imgLua from "@/assets/gift-lua-de-mel.jpg";
import imgJantar from "@/assets/gift-jantar.jpg";
import imgTv from "@/assets/gift-tv.jpg";

const gifts = [
  {
    image: imgCafe,
    name: "Estação de Café Barista",
    category: "Cotidiano",
    desc: "Para que cada manhã comece com o aroma de um novo dia e a energia necessária para construirmos nossa vida juntos.",
    impact: "Presente nas nossas manhãs",
    price: "R$ 650,00",
  },
  {
    image: imgRobo,
    name: "Tecnologia e Conforto",
    category: "Lar",
    desc: "O cuidado com o nosso futuro lar. Praticidade para que tenhamos mais tempo um para o outro.",
    impact: "Zelo pelo nosso ninho",
    price: "R$ 1.200,00",
  },
  {
    image: imgTacas,
    name: "Brinde às Conquistas",
    category: "Celebração",
    desc: "Taças de cristal para os momentos de comemoração. Cada brinde será uma lembrança do seu carinho.",
    impact: "Celebrando nossas vitórias",
    price: "R$ 320,00",
  },
  {
    image: imgJantar,
    name: "Aparelho de Jantar Imperial",
    category: "Recepção",
    desc: "Para recebermos amigos e família com a elegância e o acolhimento que vocês merecem.",
    impact: "Encontros inesquecíveis",
    price: "R$ 580,00",
  },
  {
    image: imgPanelas,
    name: "Gastronomia a Dois",
    category: "Culinária",
    desc: "O prazer de cozinhar juntos e nutrir o nosso amor através de novas receitas e sabores.",
    impact: "Nutrindo nossa união",
    price: "R$ 450,00",
  },
  {
    image: imgCama,
    name: "Enxoval Premium King",
    category: "Conforto",
    desc: "O repouso e a tranquilidade em um ambiente de puro conforto e elegância.",
    impact: "Nosso descanso diário",
    price: "R$ 380,00",
  },
  {
    image: imgTv,
    name: "Cinema Particular",
    category: "Lazer",
    desc: "Noites de filmes e séries que fortalecem nossa parceria e momentos de descontração.",
    impact: "Nossos momentos de lazer",
    price: "R$ 2.800,00",
  },
];

const GiftCard = ({ gift, index, inView }: { gift: any; index: number; inView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <motion.img
          src={gift.image}
          alt={gift.name}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-neutral-900/20 transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-20'}`} />

        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <motion.div animate={{ y: isHovered ? -5 : 0 }}>
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1 block opacity-80 text-wedding-gold">
              {gift.category}
            </span>
            <h3 className="font-serif text-xl italic mb-2">{gift.name}</h3>
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-3"
              >
                <p className="text-xs font-light leading-relaxed opacity-90 line-clamp-2">
                  {gift.desc}
                </p>
                <div className="pt-3 flex items-center justify-between border-t border-white/20">
                  <span className="text-base font-serif italic">{gift.price}</span>
                  <button className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase bg-white text-black px-4 py-2 rounded-full hover:bg-wedding-gold hover:text-white transition-colors">
                    Presentear
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const PresentesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="presentes" className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Profissional */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-wedding-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
            Lista de Desejos
          </span>
          <h2 className="font-serif text-4xl md:text-6xl italic text-neutral-800 mb-6">
            Lista de presentes
          </h2>
          <div className="w-16 h-[1px] bg-wedding-gold/40 mx-auto mb-6" />
          <p className="max-w-xl mx-auto text-neutral-500 font-light leading-relaxed italic">
            Sua presença é o que mais importa. Mas se desejar nos presentear, 
            aqui estão algumas sugestões que tornarão nosso começo ainda mais especial.
          </p>
        </motion.div>

        {/* --- DESTAQUE: LUA DE MEL (HORIZONTAL) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] mb-12 group overflow-hidden shadow-2xl"
        >
          <motion.img
            src={imgLua}
            alt="Lua de Mel"
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 10 }} // Movimento bem lento e luxuoso
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl text-white">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-wedding-gold mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Destino dos Sonhos</span>
              </div>
              <h3 className="font-serif text-5xl md:text-7xl italic mb-6">Lua de Mel</h3>
              <p className="text-lg font-light leading-relaxed mb-8 opacity-90 italic">
                "O início da nossa jornada como um só. Sua contribuição nos ajudará a colecionar 
                momentos inesquecíveis em nosso primeiro destino oficial."
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="text-2xl font-serif italic text-wedding-gold">
                  Contribuição Livre
                </div>
                <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-wedding-gold hover:text-white transition-all duration-300 shadow-xl">
                  Realizar este sonho <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Badge flutuante de Impacto */}
          <div className="absolute top-8 right-8 hidden md:block">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-wedding-gold/20 flex items-center justify-center text-wedding-gold">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <p className="text-[8px] tracking-[0.2em] uppercase text-white/60">Experiência</p>
                <p className="text-xs text-white font-medium">Memórias Eternas</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid de Presentes (Outros Itens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift, i) => (
            <GiftCard key={i} gift={gift} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer da Seção */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mt-20 text-center border-t border-neutral-200 pt-12"
        >
          <div className="inline-flex items-center gap-3 text-neutral-400">
            <Info className="w-4 h-4" />
            <p className="text-[10px] tracking-widest uppercase font-light">
              Itens simbólicos que serão convertidos em experiências para o casal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresentesSection;