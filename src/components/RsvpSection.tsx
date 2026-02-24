import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Heart, Check, Send, Users, Sparkles, UserPlus, CreditCard } from "lucide-react";

// Estrutura para cada acompanhante
interface Companion {
  name: string;
  cpf: string;
}

interface RsvpFormData {
  name: string;
  cpf: string;
  guests: string;
  companions: Companion[];
  message: string;
}

const RsvpSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // O useForm mantém os dados nos campos mesmo após o envio, 
  // permitindo a edição sem perda de informação.
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<RsvpFormData>({
    defaultValues: {
      guests: "0",
      companions: []
    }
  });

  // Função para aplicar a máscara de CPF (000.000.000-00)
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: any) => {
    const formattedValue = formatCPF(e.target.value);
    setValue(fieldName, formattedValue, { shouldValidate: true });
  };

  const guestCount = useWatch({
    control,
    name: "guests",
  });

  const onSubmit = async (data: RsvpFormData) => {
    setIsLoading(true);
    
    // URL da sua API do Google Apps Script
    const API_URL = "https://script.google.com/macros/s/AKfycbxIlHVYupU719qI2P_NB3wFB7CLCimJjdedq4xj7NHACkEN9JV8Y0D_k-Y0fRV7x0kb/exec";

    // Formatando os dados para as colunas da planilha (A a H)
    const payload = {
      name: data.name,
      cpf: data.cpf,
      qtdAcompanhantes: data.guests,
      message: data.message,
      // Mapeia acompanhantes para campos individuais. 
      // O Script do Google usará esses nomes de campos para preencher as colunas E, F e G.
      acomp1: data.companions?.[0] ? `${data.companions[0].name} - ${data.companions[0].cpf}` : "",
      acomp2: data.companions?.[1] ? `${data.companions[1].name} - ${data.companions[1].cpf}` : "",
      acomp3: data.companions?.[2] ? `${data.companions[2].name} - ${data.companions[2].cpf}` : "",
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Sucesso: a planilha agora atualiza a linha se o CPF já existir
      setIsSubmitted(true);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao salvar presença. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const guestFields = Array.from({ length: parseInt(guestCount) || 0 }, (_, i) => i);

  return (
    <section id="rsvp" className="py-24 md:py-44 bg-[#F8F9FB] relative overflow-hidden">
      
      {/* Elementos de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div className="absolute top-1/4 -left-20 text-primary/5 animate-float-slow" style={{ filter: "blur(4px)" }}><Heart size={350} /></motion.div>
        <motion.div className="absolute bottom-1/4 -right-20 text-primary/5 animate-float-slow" style={{ filter: "blur(5px)", animationDelay: "3s" }}><Sparkles size={280} /></motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label">R.S.V.P</span>
          <h2 className="section-title">Confirmar Presença</h2>
          <p className="mt-4 text-slate-500 font-serif italic text-lg">
            Sua presença é essencial para nós. Por favor, valide seus dados abaixo.
          </p>
        </motion.div>

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                  
                  <div className="md:col-span-2 group">
                    <label className="input-label">Nome Completo</label>
                    <input
                      {...register("name", { required: true })}
                      placeholder="Seu nome como no convite"
                      className={`rsvp-input ${errors.name ? "border-red-200" : ""}`}
                    />
                  </div>

                  <div className="group">
                    <label className="input-label flex items-center gap-2">
                      <CreditCard size={14} className="text-primary/60" /> CPF
                    </label>
                    <input
                      {...register("cpf", { 
                        required: true, 
                        pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ 
                      })}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      onChange={(e) => handleCpfChange(e, "cpf")}
                      className={`rsvp-input ${errors.cpf ? "border-red-200" : ""}`}
                    />
                  </div>

                  <div className="group">
                    <label className="input-label">Acompanhantes</label>
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

                  {/* Acompanhantes dinâmicos */}
                  <AnimatePresence>
                    {guestFields.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:col-span-2 space-y-8 overflow-hidden border-l-2 border-primary/10 pl-6 ml-2"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <UserPlus size={14} className="text-primary" />
                          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">Dados dos Acompanhantes</span>
                        </div>
                        
                        {guestFields.map((index) => (
                          <motion.div 
                            key={index}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100 last:border-0"
                          >
                            <div className="group">
                              <label className="input-label text-[10px]">Nome do {index + 1}º acompanhante</label>
                              <input
                                {...register(`companions.${index}.name` as const, { required: true })}
                                placeholder="Nome completo"
                                className="rsvp-input bg-white/50 focus:bg-white"
                              />
                            </div>
                            <div className="group">
                              <label className="input-label text-[10px]">CPF do {index + 1}º acompanhante</label>
                              <input
                                {...register(`companions.${index}.cpf` as const, { 
                                  required: true,
                                  pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
                                })}
                                placeholder="000.000.000-00"
                                maxLength={14}
                                onChange={(e) => handleCpfChange(e, `companions.${index}.cpf`)}
                                className="rsvp-input bg-white/50 focus:bg-white"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="md:col-span-2 group">
                    <label className="input-label">Recado para os noivos</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Restrições alimentares ou uma mensagem carinhosa..."
                      className="rsvp-input resize-none"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="btn-soft w-full md:w-auto min-w-[280px]"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                    ) : (
                      <span className="flex items-center justify-center gap-3">Confirmar Presença <Send size={14} /></span>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <Check size={48} />
                </div>
                <h3 className="font-serif text-4xl mb-6 italic text-slate-900">Confirmado!</h3>
                <p className="text-slate-600 max-w-sm mx-auto">Tudo certo! Sua presença foi confirmada. Se precisar alterar algo, clique abaixo para editar.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="mt-12 text-[10px] font-bold tracking-[0.4em] uppercase text-primary/50 hover:text-primary border-b border-primary/20 pb-1"
                >
                  Editar confirmação
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpSection;