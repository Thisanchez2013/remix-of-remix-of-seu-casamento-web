import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, ExternalLink, Gift, Sparkles } from "lucide-react";

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
    image: imgPanelas,
    emoji: "🍳",
    name: "Jogo de Panelas",
    funnyTitle: "O Kit 'Agora Você Cozinha'",
    desc: "Conjunto completo de panelas antiaderentes. Porque pedir delivery todo dia é lindo, mas o cartão chora.",
    funnyNote: "Ideal para tentar a receita que viu no TikTok às 23h.",
    price: "R$ 450,00",
    tag: "🔥 Hot",
    color: "from-orange-400/20 to-red-400/20",
    border: "border-orange-300/30",
    glow: "shadow-orange-200/50",
  },
  {
    image: imgCama,
    emoji: "😴",
    name: "Jogo de Cama King",
    funnyTitle: "O Ninho dos Sonhos",
    desc: "Algodão egípcio 400 fios. Tão macio que acordar vai ser o maior desafio do casamento.",
    funnyNote: "Aviso: cônjuge pode desaparecer embaixo das cobertas por horas.",
    price: "R$ 380,00",
    tag: "💤 Zen",
    color: "from-blue-300/20 to-indigo-300/20",
    border: "border-blue-300/30",
    glow: "shadow-blue-200/50",
  },
  {
    image: imgCafe,
    emoji: "☕",
    name: "Cafeteira Expresso",
    funnyTitle: "A Sobrevivência do Casal",
    desc: "Café barista em casa. Necessário para as manhãs de segunda, pós-briga, e toda vez que alguém deixou a tampa do banheiro aberta.",
    funnyNote: "Testado e aprovado para crises existenciais matinais.",
    price: "R$ 650,00",
    tag: "⚡ Must Have",
    color: "from-amber-400/20 to-yellow-300/20",
    border: "border-amber-300/30",
    glow: "shadow-amber-200/50",
  },
  {
    image: imgRobo,
    emoji: "🤖",
    name: "Aspirador Robô",
    funnyTitle: "O Terceiro Integrante",
    desc: "Um robô que limpa a casa enquanto vocês discutem quem vai lavar a louça. Ele não tem opinião, mas tem eficiência.",
    funnyNote: "Cuidado: ele vai adotar um nome e virar mascote.",
    price: "R$ 1.200,00",
    tag: "🏆 Premium",
    color: "from-slate-400/20 to-zinc-300/20",
    border: "border-slate-300/30",
    glow: "shadow-slate-200/50",
  },
  {
    image: imgTacas,
    emoji: "🥂",
    name: "Kit Taças de Cristal",
    funnyTitle: "Para Comemorar Tudo",
    desc: "6 taças de cristal para vinho e espumante. Porque cada pequena vitória do casamento merece um brinde.",
    funnyNote: "'Achei as chaves!' 🥂 'Acabei o netflix!' 🥂 'Quinta-feira!' 🥂",
    price: "R$ 320,00",
    tag: "✨ Luxo",
    color: "from-purple-300/20 to-pink-300/20",
    border: "border-purple-300/30",
    glow: "shadow-purple-200/50",
  },
  {
    image: imgLua,
    emoji: "🏝️",
    name: "Lua de Mel",
    funnyTitle: "Fuga Autorizada",
    desc: "Contribua para a viagem dos sonhos do casal! Qualquer valor é bem-vindo — mesmo que seja o preço de um sundae.",
    funnyNote: "O casal promete mandar foto. E fingir que não checaram o e-mail.",
    price: "Qualquer valor 💛",
    tag: "🌟 Especial",
    color: "from-cyan-400/20 to-teal-300/20",
    border: "border-cyan-300/30",
    glow: "shadow-cyan-200/50",
    featured: true,
  },
  {
    image: imgJantar,
    emoji: "🍽️",
    name: "Aparelho de Jantar",
    funnyTitle: "O Jantar de Domingo",
    desc: "42 peças de porcelana fina. Para os jantares que começam elegantes e terminam com a família inteira na sala assistindo futebol.",
    funnyNote: "A sogra vai amar. Garantido.",
    price: "R$ 580,00",
    tag: "🫶 Família",
    color: "from-rose-300/20 to-pink-300/20",
    border: "border-rose-300/30",
    glow: "shadow-rose-200/50",
  },
  {
    image: imgTv,
    emoji: "📺",
    name: 'Smart TV 55"',
    funnyTitle: "O Cinema Particular",
    desc: "Para as noites de filme que começam às 20h e terminam às 3h porque 'só mais um episódio'.",
    funnyNote: "O controle remoto SERÁ motivo de negociação permanente.",
    price: "R$ 2.800,00",
    tag: "🎬 Cinema",
    color: "from-violet-400/20 to-purple-400/20",
    border: "border-violet-300/30",
    glow: "shadow-violet-200/50",
  },
];

const GiftCard = ({ gift, index, inView }: { gift: typeof gifts[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.07, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group rounded-3xl overflow-hidden border ${gift.border} bg-card shadow-lg ${gift.featured ? "md:col-span-2" : ""} cursor-pointer`}
      style={{
        boxShadow: hovered ? `0 25px 60px -10px var(--shadow-color, rgba(0,0,0,0.15))` : undefined,
        transition: "all 0.4s ease",
      }}
    >
      {/* Tag badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border ${gift.border} text-foreground/80`}>
          {gift.tag}
        </span>
      </div>

      {/* Like button */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${liked ? "fill-red-400 text-red-400 scale-125" : "text-muted-foreground"}`}
        />
      </button>

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={gift.image}
          alt={gift.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gift.color} to-transparent`} />
        {/* Emoji overlay */}
        <motion.div
          className="absolute bottom-4 right-4 text-4xl"
          animate={{ scale: hovered ? 1.3 : 1, rotate: hovered ? 15 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          {gift.emoji}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-1">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/70">{gift.name}</p>
          <h3 className="font-serif text-xl italic font-semibold text-foreground leading-snug mt-1">
            {gift.funnyTitle}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mt-3">{gift.desc}</p>

        {/* Funny note */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={`mt-3 rounded-xl px-4 py-3 bg-gradient-to-r ${gift.color} border ${gift.border}`}
            >
              <p className="text-xs text-foreground/70 italic">💬 {gift.funnyNote}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/40">
          <span className="font-bold text-primary text-base">{gift.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-full bg-gradient-to-r ${gift.color} border ${gift.border} text-foreground/80 hover:text-foreground transition-all duration-300`}
          >
            <Gift className="w-3.5 h-3.5" />
            Presentear
            <ExternalLink className="w-3 h-3 opacity-60" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const PresentesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="presentes" className="py-24 md:py-36 bg-background relative overflow-hidden">

      {/* Background decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 mx-auto"
          >
            <Sparkles className="w-7 h-7" />
          </motion.div>

          <p className="section-label">COM MUITO CARINHO (E CRIATIVIDADE)</p>
          <h2 className="section-title mt-4">Lista de Presentes</h2>

          <div className="section-divider">
            <Gift className="w-5 h-5 text-primary/50" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed"
          >
            Sua presença já é o presente que o coração pede. 🥹<br />
            <span className="text-foreground/80 font-medium">Mas... se quiser nos mimar um pouquinho, preparamos uma lista com muito amor e julgamento zero.</span>
          </motion.p>

          {/* Fun stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10"
          >
            {[
              { num: "8", label: "presentes disponíveis" },
              { num: "100%", label: "curadoria do casal" },
              { num: "∞", label: "gratidão garantida" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-center">
                  <p className="font-serif text-3xl italic font-bold text-primary">{stat.num}</p>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">{stat.label}</p>
                </div>
                {i < 2 && <div className="w-px h-10 bg-border/60 hidden sm:block" />}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gifts.map((gift, i) => (
            <GiftCard key={i} gift={gift} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-card border border-border/50 rounded-3xl px-10 py-8 shadow-sm max-w-lg mx-auto">
            <p className="text-2xl mb-2">🎁</p>
            <p className="font-serif text-xl italic text-foreground mb-2">Acima de tudo...</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A sua presença neste dia especial já é o maior presente que poderíamos receber.{" "}
              <span className="text-primary font-medium">Obrigado por fazer parte da nossa história!</span> ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresentesSection;
