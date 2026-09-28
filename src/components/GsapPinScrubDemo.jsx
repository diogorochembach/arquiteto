import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, Sliders, Layers, Sparkles, Building2, Eye, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapPinScrubDemo() {
  const pinSectionRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const progressBarRef = useRef(null);

  const [scrubValue, setScrubValue] = useState(1); // 1 segundo de suavização (smooth lag)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().filter(t => t.vars.id === 'PinStorytelling').forEach(t => t.kill());

      if (!pinSectionRef.current) return;

      // TIMELINE NARRATIVA COM PINNING E SCRUB
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current, // Elemento a ser travado (pin)
          pin: true,                      // Trava o elemento na tela durante o scroll
          start: 'top top',              // Inicia quando o topo da seção toca o topo da viewport
          end: '+=1400',                 // Duração do scroll: 1400px de rolagem até destravar
          scrub: scrubValue === true ? true : Number(scrubValue), // Vínculo com a barra de rolagem (true vs valor numérico em segundos)
          markers: true,                 // Visualização dos pontos de ativação
          id: 'PinStorytelling'
        }
      });

      // ETAPA 1 -> ETAPA 2 (Revelação da Estrutura 3D)
      tl.to(progressBarRef.current, { scaleX: 0.5, ease: 'none' })
        .to(step1Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 1 }, 0)
        .fromTo(step2Ref.current, 
          { opacity: 0, y: 50, scale: 1.05 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }, 0.4
        )

      // ETAPA 2 -> ETAPA 3 (Acabamento & Iluminação de Luxo)
        .to(progressBarRef.current, { scaleX: 1, ease: 'none' }, 1)
        .to(step2Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 1 }, 1)
        .fromTo(step3Ref.current,
          { opacity: 0, y: 50, scale: 1.05 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }, 1.4
        );

    }, pinSectionRef);

    return () => ctx.revert();
  }, [scrubValue]);

  return (
    <div className="w-full max-w-5xl mx-auto font-sans mt-16">
      
      {/* Controles de Scrub Demo */}
      <div className="p-6 bg-[#0d0f14] border border-white/10 rounded-2xl shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-1">
              <Anchor className="w-3.5 h-3.5" /> GSAP Pinning & Scrub Masterclass
            </div>
            <h2 className="text-xl font-serif font-bold text-white">
              Seção Travada na Tela com Narrativa de Scroll (Pin + Scrub)
            </h2>
          </div>

          {/* Seletor de Resposta de Scrub */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <span className="text-gray-400 px-2 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" /> Suavização:
            </span>
            <button
              onClick={() => setScrubValue(true)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scrubValue === true ? 'bg-[#D4AF37] text-[#090b0e] font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              scrub: true (Direto 1:1)
            </button>
            <button
              onClick={() => setScrubValue(1)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scrubValue === 1 ? 'bg-[#D4AF37] text-[#090b0e] font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              scrub: 1 (Smooth Lag 1s)
            </button>
            <button
              onClick={() => setScrubValue(2)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scrubValue === 2 ? 'bg-[#D4AF37] text-[#090b0e] font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              scrub: 2 (Inércia 2s)
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
          <strong className="text-[#D4AF37]">`pin: true`</strong> fixa a tela enquanto você rola a página por 1400px (<code className="text-[#D4AF37] font-mono">end: "+=1400"</code>). O parâmetro <strong className="text-[#D4AF37]">`scrub`</strong> amarra o progresso da animação diretamente ao Scrollbar.
        </p>
      </div>

      {/* PALCO FIXADO (PINNED CONTAINER) */}
      <div
        ref={pinSectionRef}
        className="w-full h-[520px] bg-[#080a0e] border border-[#D4AF37]/30 rounded-2xl relative overflow-hidden flex flex-col justify-between p-8 md:p-12 shadow-2xl"
      >
        {/* Barra de Progresso Narrativo */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-6">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-200 origin-left scale-x-[0.2] transition-transform duration-75"
          />
        </div>

        {/* Indicador de Status Pinned */}
        <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono flex items-center gap-1.5 z-20">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" /> SEÇÃO TRAVADA (PINNED)
        </div>

        {/* ÁREA NARRATIVA DAS ETAPAS */}
        <div className="relative flex-1 flex items-center justify-center">

          {/* ETAPA 1: Esboço Arquitetônico Conceitual */}
          <div
            ref={step1Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4 text-[#D4AF37]">
              <Layers className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-1">Fase 01 de 03 — Estudo Preliminar</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Geometria & Conceito Autoral
            </h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Desenvolvimento da volumetria, análise de orientação solar e alinhamento topográfico da fundação.
            </p>
          </div>

          {/* ETAPA 2: Modelagem 3D & Estrutura */}
          <div
            ref={step2Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-xl mx-auto opacity-0 pointer-events-none"
          >
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4 text-cyan-400">
              <Building2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Fase 02 de 03 — Engenharia de Estrutura</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Vãos Livres & Concreto Protendido
            </h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Integração de vigas metálicas contínuas permitindo panos de vidro de 12 metros sem pilares intermediários.
            </p>
          </div>

          {/* ETAPA 3: Acabamentos Especiais & Iluminação */}
          <div
            ref={step3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-xl mx-auto opacity-0 pointer-events-none"
          >
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-4 text-emerald-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">Fase 03 de 03 — Design de Interiores</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Sensorialidade & Iluminação Natural
            </h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Painéis em madeira nogueira e mármore levigado com automação de luz cenográfica personalizável.
            </p>
          </div>

        </div>

        {/* Rodapé da Seção Pinned */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-500 border-t border-white/10 pt-4">
          <span>Escopo do Scroll: <code className="text-[#D4AF37]">end: "+=1400"</code></span>
          <span className="flex items-center gap-1 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Animação 100% controlada pelo Scroll
          </span>
        </div>
      </div>

    </div>
  );
}
