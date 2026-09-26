import React from 'react';
import { ArrowUpRight, Award, Compass, ShieldCheck, Sparkles, MapPin, Layers, Ruler } from 'lucide-react';

export default function HeroSection({ onOpenConsultation }) {
  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-consultation'));
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Tagline Badge */}
        <div className="flex justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E6C875]">
              Estúdio de Arquitetura Autoral & Conceitual
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
              Arquitetura que transforma{' '}
              <span className="italic font-normal gold-gradient-text">espaço em emoção</span> e luz em estrutura.
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              Projetamos residências exclusivas de alto padrão, edifícios icônicos e interiores contemporâneos com biofilia, sustentabilidade e rigor executivo.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpenConsultation}
                className="group px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#e6c875] text-[#090b0e] text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-xl shadow-[#D4AF37]/25 flex items-center gap-2"
              >
                Iniciar Projeto
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href="#portfolio"
                className="px-6 py-3.5 rounded-full glass-panel text-white hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.15em] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                Explorar Obras
              </a>
            </div>
          </div>
        </div>

        {/* Hero Image Canvas - Dobra 1 Showcase */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl group">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src="/images/hero-architecture.jpg"
              alt="Residência Horizon — Projeto Autoral VERVE Arquitetura"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-transparent to-black/30" />

            {/* Floating Glassmorphism Badge inside Hero Image */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:max-w-md p-6 rounded-2xl glass-panel-gold backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl animate-float">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Obra Premiada 2025
                </span>
                <span className="text-[10px] font-mono text-gray-400">01 / 140</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-1">
                Residência Horizon
              </h3>
              <p className="text-xs text-gray-300 font-light mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Trancoso, Bahia • 1.250 m²
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-[11px] text-gray-400 font-sans">Estrutura Volumétrica & Biofilia</span>
                <a
                  href="#portfolio"
                  className="text-xs font-semibold text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                >
                  Ver Detalhes <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Fold 1 Metrics / Trust Bar */}
        <div id="metricas" className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-serif text-3xl font-light text-white">15+</span>
            </div>
            <p className="text-xs font-medium text-gray-300 uppercase tracking-wider">Anos de Excelência</p>
            <p className="text-[11px] text-gray-400 mt-1">Projetos contemporâneos de alta complexidade.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                <Ruler className="w-5 h-5" />
              </div>
              <span className="font-serif text-3xl font-light text-white">140+</span>
            </div>
            <p className="text-xs font-medium text-gray-300 uppercase tracking-wider">Obras Concluídas</p>
            <p className="text-[11px] text-gray-400 mt-1">Residências, vilas e edifícios corporativos.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-serif text-3xl font-light text-white">12</span>
            </div>
            <p className="text-xs font-medium text-gray-300 uppercase tracking-wider">Prêmios Nacionais</p>
            <p className="text-[11px] text-gray-400 mt-1">Reconhecimento pela ArchDaily e Instituto de Arquitetos.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-serif text-3xl font-light text-white">100%</span>
            </div>
            <p className="text-xs font-medium text-gray-300 uppercase tracking-wider">Garantia Executiva</p>
            <p className="text-[11px] text-gray-400 mt-1">Acompanhamento de obra com fidelidade ao projeto.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
