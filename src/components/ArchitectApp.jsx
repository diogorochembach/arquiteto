import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import PortfolioSection from './PortfolioSection';
import ConsultationModal from './ConsultationModal';

export default function ArchitectApp() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090b0e] text-white selection:bg-[#D4AF37] selection:text-[#090b0e]">
      {/* Dobra 1: Sticky Navigation Header */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Dobra 1: Hero Section & Metrics */}
      <HeroSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Dobra 2: Manifesto, Portfolio Showcase & Filterable Grid */}
      <PortfolioSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Footer Minimalista de Encerramento das Duas Dobras */}
      <footer className="py-8 bg-[#060709] border-t border-white/5 text-center text-xs text-gray-500 font-light">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg text-white font-medium tracking-widest">VERVE</span>
            <span className="text-[10px] uppercase text-[#D4AF37] font-mono">| Arquitetura & Interior Design</span>
          </div>
          <p>© 2026 VERVE Arquitetura Autoral. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 text-[11px] text-gray-400">
            <a href="#hero" className="hover:text-[#D4AF37]">Início</a>
            <a href="#portfolio" className="hover:text-[#D4AF37]">Portfólio</a>
            <a href="#manifesto" className="hover:text-[#D4AF37]">Filosofia</a>
          </div>
        </div>
      </footer>

      {/* Modal de Agendamento */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
