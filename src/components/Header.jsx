import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Compass, Sparkles, PhoneCall } from 'lucide-react';

export default function Header({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-consultation'));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#090b0e]/85 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-3 text-decoration-none">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all duration-300">
            <Compass className="w-5 h-5 text-[#D4AF37] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
              VERVE
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-gray-400 font-sans font-medium -mt-1">
              ARQUITETURA
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2.5 rounded-full border border-white/10 shadow-inner">
          <a
            href="#hero"
            className="text-xs uppercase tracking-[0.15em] text-gray-300 hover:text-[#D4AF37] transition-colors font-medium"
          >
            Início
          </a>
          <a
            href="#portfolio"
            className="text-xs uppercase tracking-[0.15em] text-gray-300 hover:text-[#D4AF37] transition-colors font-medium"
          >
            Obras Destacadas
          </a>
          <a
            href="#manifesto"
            className="text-xs uppercase tracking-[0.15em] text-gray-300 hover:text-[#D4AF37] transition-colors font-medium"
          >
            Filosofia
          </a>
          <a
            href="#metricas"
            className="text-xs uppercase tracking-[0.15em] text-gray-300 hover:text-[#D4AF37] transition-colors font-medium"
          >
            Diferenciais
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleOpenConsultation}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#090b0e] bg-[#D4AF37] hover:bg-[#e6c875] rounded-full overflow-hidden shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Solicitar Projeto
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg glass-panel focus:outline-none"
          aria-label="Alternar Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#090b0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.2em] text-gray-200 hover:text-[#D4AF37]"
          >
            Início
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.2em] text-gray-200 hover:text-[#D4AF37]"
          >
            Obras Destacadas
          </a>
          <a
            href="#manifesto"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.2em] text-gray-200 hover:text-[#D4AF37]"
          >
            Filosofia
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleOpenConsultation();
            }}
            className="w-full py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#090b0e] bg-[#D4AF37] rounded-full shadow-lg flex items-center justify-center gap-2"
          >
            Solicitar Projeto
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
