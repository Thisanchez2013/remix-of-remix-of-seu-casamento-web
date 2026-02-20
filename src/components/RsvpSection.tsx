import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Heart, Check, Send, Users, Sparkles } from "lucide-react";

interface RsvpFormData {
  name: string;
  email: string;
  guests: string;
  message: string;
}

const RsvpSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RsvpFormData>();

  const onSubmit = async (data: RsvpFormData) => {
    setIsLoading(true);
    // Tempo estratégico para o convidado sentir o feedback visual do envio
    await new Promise(resolve => setTimeout(resolve, 1800)); 
    console.log("Dados recebidos:", data);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 md:py-44 bg-[#F8F9FB] relative overflow-hidden">
      
      {/* Elementos Etéreos de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-20 text-primary/5 animate-float-slow"
          style={{ filter: "blur(4px)" }}
        >
          <Heart size={350} />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 -right-20 text-primary/5 animate-float-slow"
          style={{ filter: "blur(5px)", animationDelay: "3s" }}
        >
          <Sparkles size={280} />
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho de Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label">R.S.V.P</span>
          <h2 className="section-title">Presença Confirmada?</h2>
          <div className="section-divider">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <Heart className="w-5 h-5 text-primary/30 fill-primary/5" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          </div>
          <p className="mt-4 text-slate-500 font-serif italic text-lg">
            Será uma honra imensa ter você ao nosso lado.
          </p>
        </motion.div>

        {/* Container do Formulário com Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-container p-8 md:p-16 lg:p-20"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                  
                  {/* Nome Completo */}
                  <div className="md:col-span-2 group">
                    <label className="input-label group-focus-within:text-primary transition-colors">
                      Nome Completo
                    </label>
                    <input
                      {...register("name", { required: true })}
                      placeholder="Como está no convite?"
                      className={`rsvp-input ${errors.name ? "border-red-200 bg-red-50/30" : ""}`}
                    />
                    {errors.name && <span className="text-[10px] text-red-400 mt-2 ml-2 block">Por favor, preencha seu nome.</span>}
                  </div>

                  {/* E-mail */}
                  <div className="group">
                    <label className="input-label group-focus-within:text-primary transition-colors">
                      E-mail
                    </label>
                    <input
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="seu@email.com"
                      className="rsvp-input"
                    />
                  </div>

                  {/* Acompanhantes */}
                  <div className="group">
                    <label className="input-label group-focus-within:text-primary transition-colors">
                      Acompanhantes
                    </label>
                    <div className="relative">
                      <select {...register("guests")} className="rsvp-input appearance-none cursor-pointer">
                        <option value="0">Irei sozinho(a)</option>
                        <option value="1">Vou com +1 pessoa</option>
                        <option value="2">Vou com +2 pessoas</option>
                        <option value="3">Vou com +3 pessoas</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Users size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Mensagem Carinhosa */}
                  <div className="md:col-span-2 group">
                    <label className="input-label group-focus-within:text-primary transition-colors">
                      Mensagem Carinhosa
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Alguma restrição alimentar ou um recado para nós?"
                      className="rsvp-input resize-none"
                    />
                  </div>
                </div>

                {/* Botão de Confirmação */}
                <div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="btn-soft w-full md:w-auto min-w-[280px]"
                  >
                    {isLoading ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                      />
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        Confirmar Presença <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              /* Sucesso Pós-Envio */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner"
                >
                  <Check size={48} strokeWidth={2} />
                </motion.div>
                
                <h3 className="font-serif text-4xl md:text-5xl mb-6 italic text-slate-900">
                  Esperamos por você!
                </h3>
                
                <p className="text-slate-600 font-light leading-relaxed max-w-sm mx-auto text-base">
                  Sua confirmação foi registrada com sucesso. Preparamos tudo com muito amor para esse dia ser inesquecível.
                </p>

                <motion.button 
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  className="mt-12 text-[10px] font-bold tracking-[0.4em] uppercase text-primary/50 hover:text-primary transition-colors border-b border-primary/20 pb-1"
                >
                  Editar informações
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpSection;