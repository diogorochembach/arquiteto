import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, ScrollText, CheckCircle2, Sliders, ArrowDown, RotateCcw } from 'lucide-react';

// 1. Registro Seguro do Plugin para Ambientes com SSR (Astro/Next/React)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapScrollTriggerDemo() {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const [showMarkers, setShowMarkers] = useState(true);
  const [toggleActionChoice, setToggleActionChoice] = useState('play none none reverse');

  useEffect(() => {
    // Escopo do gsap.context garante cleanup de todos os ScrollTriggers no React/Astro
    const ctx = gsap.context(() => {
      // Limpa instâncias existentes antes de recriar
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Card 1: Trigger básico com markers e toggleActions configuráveis
      if (card1Ref.current) {
        gsap.from(card1Ref.current, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 80%',     // Quando o TOPO do card atinge 80% da altura da Viewport
            end: 'bottom 30%',    // Quando a BASE do card atinge 30% da altura da Viewport
            markers: showMarkers, // Marcadores visuais de debug no browser
            toggleActions: toggleActionChoice, // Ações nos 4 estados de rolagem
            id: 'Card-1-Trigger'
          }
        });
      }

      // Card 2: Exemplo de Scrub + Stagger acionado por Scroll
      if (card2Ref.current) {
        gsap.from(card2Ref.current.children, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top 85%',
            end: 'top 40%',
            markers: showMarkers,
            toggleActions: 'play none none reverse',
            id: 'Card-2-Trigger'
          }
        });
      }

      // Card 3: Exemplo com Timeline encadeada no ScrollTrigger
      if (card3Ref.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card3Ref.current,
            start: 'top 75%',
            end: 'bottom 20%',
            markers: showMarkers,
            toggleActions: 'play none none reverse',
            id: 'Card-3-Timeline'
          }
        });

        tl.from(card3Ref.current, { y: 80, opacity: 0, duration: 0.9, ease: 'expo.out' })
          .from(card3Ref.current.querySelector('.badge-st'), { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.4')
          .from(card3Ref.current.querySelector('.title-st'), { x: -30, opacity: 0, duration: 0.5 }, '-=0.2');
      }

      // Atualiza o layout do ScrollTrigger
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [showMarkers, toggleActionChoice]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-[#0d0f14] border border-white/10 rounded-2xl shadow-2xl text-white font-sans mt-12">
      {/* Header explicativo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-2">
            <ScrollText className="w-3.5 h-3.5" /> GSAP ScrollTrigger Masterclass
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
            Animação Acionada por Scroll (ScrollTrigger)
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Role a página para ver os gatilhos de viewport ativando as animações em tempo real.
          </p>
        </div>

        {/* Controles do ScrollTrigger */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
              showMarkers ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/15 text-gray-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Marcadores (markers: {showMarkers ? 'true' : 'false'})
          </button>
        </div>
      </div>

      {/* Seletor de toggleActions */}
      <div className="my-6 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4" /> Configuração de Comportamento (toggleActions):
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'play none none reverse', desc: 'Rola para baixo (Toca) | Rola para cima (Reverte)' },
            { label: 'play pause resume reset', desc: 'Pausa quando sai | Reinicia ao voltar' },
            { label: 'play once none none', desc: 'Dispara apenas 1 vez (não reverte)' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setToggleActionChoice(item.label)}
              className={`p-3 rounded-lg border text-left font-mono text-xs transition-all ${
                toggleActionChoice === item.label
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white'
                  : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400'
              }`}
            >
              <div className="font-bold text-[#D4AF37]">{item.label}</div>
              <div className="text-[11px] text-gray-400 mt-1">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Área com rolagem demonstrativa */}
      <div className="space-y-24 py-8">

        {/* Indicador para rolar */}
        <div className="text-center py-6 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
          <ArrowDown className="w-5 h-5 text-[#D4AF37] mx-auto animate-bounce mb-2" />
          <p className="text-xs font-mono text-gray-400">Role para baixo para cruzar as linhas de gatilho do ScrollTrigger</p>
        </div>

        {/* Card 1: Trigger Básico */}
        <div className="flex justify-center">
          <div
            ref={card1Ref}
            className="w-full max-w-md bg-[#12151c] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl relative"
          >
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
              CARD 1: GATILHO BÁSICO
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-3 mb-2">
              Disparo em Viewport (`top 80%`)
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Inicia a animação quando o topo deste card atinge <code className="text-[#D4AF37] font-mono">80%</code> da altura do seu navegador.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> toggleActions: "{toggleActionChoice}"
            </div>
          </div>
        </div>

        {/* Card 2: Elementos Internos Cascateados */}
        <div className="flex justify-center">
          <div
            ref={card2Ref}
            className="w-full max-w-md bg-[#12151c] border border-white/15 rounded-2xl p-6 shadow-2xl relative"
          >
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CARD 2: STAGGER COM SCROLL
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-3 mb-2">
              Entrada em Cascata
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Cada filho deste container anima com micro-delays sincronizados com o scroll da página.
            </p>
            <div className="px-3 py-2 bg-white/5 rounded-lg text-xs font-mono text-cyan-300 border border-white/5">
              Gatilho: `start: "top 85%"`
            </div>
          </div>
        </div>

        {/* Card 3: Timeline + ScrollTrigger */}
        <div className="flex justify-center">
          <div
            ref={card3Ref}
            className="w-full max-w-md bg-[#12151c] border border-white/15 rounded-2xl p-6 shadow-2xl relative"
          >
            <span className="badge-st px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
              CARD 3: TIMELINE + SCROLLTRIGGER
            </span>
            <h3 className="title-st text-xl font-serif font-bold text-white mt-3 mb-2">
              Orquestração Completa
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Timeline de múltiplos passos sincronizada perfeitamente ao viewport do usuário.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
