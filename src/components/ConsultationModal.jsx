import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export default function ConsultationModal({ isOpen: externalIsOpen, onClose: externalOnClose }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoProjeto: 'Residencial Luxo',
    area: '',
    mensagem: ''
  });

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener('open-consultation', handleOpen);
    return () => window.removeEventListener('open-consultation', handleOpen);
  }, []);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    setInternalIsOpen(false);
    if (externalOnClose) {
      externalOnClose();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // reset after 4s if needed
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-gold border border-[#D4AF37]/40 shadow-2xl p-6 md:p-8 text-white">
        <button
          onClick={() => {
            setSubmitted(false);
            handleClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-3xl text-white font-medium mb-2">
              Solicitação Recebida
            </h3>
            <p className="text-xs text-gray-300 max-w-sm font-light leading-relaxed mb-6">
              Agradecemos seu interesse na VERVE Arquitetura. Nosso diretor de projetos entrará em contato em até 24 horas úteis.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                handleClose();
              }}
              className="px-8 py-3 rounded-full bg-[#D4AF37] text-[#090b0e] text-xs font-bold uppercase tracking-wider"
            >
              Fechar Janela
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Atendimento Exclusivo
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-white">
                Iniciar Novo <span className="italic gold-gradient-text">Projeto Autoral</span>
              </h3>
              <p className="text-xs text-gray-300 mt-1 font-light">
                Preencha os dados abaixo para agendarmos uma reunião diagnóstica presencial ou virtual.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-300 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dr. Roberto Almeida"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-300 mb-1">
                    E-mail Corporativo / Pessoal *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="roberto@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-300 mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-8888"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-300 mb-1">
                    Tipo de Obra
                  </label>
                  <select
                    value={formData.tipoProjeto}
                    onChange={(e) => setFormData({ ...formData, tipoProjeto: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Residencial Luxo">Residencial Luxo</option>
                    <option value="Design de Interiores">Design de Interiores</option>
                    <option value="Corporativo">Corporativo / Comercial</option>
                    <option value="Consultoria Arquitetônica">Consultoria Arquitetônica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-300 mb-1">
                    Área Estimada (m²)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 600m²"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-300 mb-1">
                  Resumo do Desejo / Terreno
                </label>
                <textarea
                  rows="3"
                  placeholder="Conte-nos brevemente sobre a localização do terreno, estilo desejado e expectativas..."
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#D4AF37] hover:bg-[#e6c875] text-[#090b0e] text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Solicitação de Projeto
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-2">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" /> Seus dados estão sob sigilo profissional absoluto.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
