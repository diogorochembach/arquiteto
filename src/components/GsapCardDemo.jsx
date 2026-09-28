import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw, ArrowRight, Layers, Clock, Sparkles, Activity, Zap, Compass } from 'lucide-react';

/**
 * GsapCardDemo - Demonstração de Física de Movimento, Easing e Hierarquia Visual no GSAP.
 */
export default function GsapCardDemo() {
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const infoRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const [activeStep, setActiveStep] = useState('fluid');
  const [logMessage, setLogMessage] = useState('Clique nas opções abaixo para comparar o movimento Mecânico (Linear) com a Física Fluida (Easing + Hierarquia).');

  const ctxRef = useRef(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {}, containerRef);
    return () => ctxRef.current && ctxRef.current.revert();
  }, []);

  // Restaura todos os elementos para o estado natural limpo
  const resetCard = () => {
    if (!cardRef.current) return;
    const elements = [cardRef.current, badgeRef.current, titleRef.current, textRef.current, infoRef.current, buttonRef.current];
    gsap.killTweensOf(elements);
    gsap.set(elements, { clearProps: 'all' });
    setActiveStep('idle');
    setLogMessage('Card resetado para o estado CSS original.');
  };

  // =========================================================================
  // 1. MOVIMENTO MECÂNICO (LINEAR) - Sem Easing, Sem Hierarquia
  // =========================================================================
  const handleLinearAnimation = () => {
    resetCard();
    setActiveStep('linear');
    setLogMessage('❌ MOVIMENTO MECÂNICO (ease: "none"): Todos os elementos se movem com velocidade constante e ao mesmo tempo. Não há sensação de peso, aceleração ou foco visual.');

    const elements = [cardRef.current, badgeRef.current, titleRef.current, textRef.current, infoRef.current, buttonRef.current];

    // Todos os elementos entram juntos, de forma linear (robotizada)
    gsap.from(elements, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'none' // Curva linear pura
    });
  };

  // =========================================================================
  // 2. MOVIMENTO FLUIDO REFINADO (FÍSICA + HIERARQUIA + EASING)
  // =========================================================================
  const handleFluidAnimation = () => {
    resetCard();
    setActiveStep('fluid');
    setLogMessage('✨ MOVIMENTO FLUIDO (power3.out + back.out + Hierarchy): O Card âncora lidera com desaceleração exponencial (sensação de peso). Elementos secundários entram em cascata ritmada (stagger + overlap).');

    const tl = gsap.timeline({
      defaults: { duration: 0.8 },
      onComplete: () => setLogMessage('Animação concluída com sucesso! Observe a desaceleração orgânica e a leitura fluida sem disputa visual.')
    });

    /**
     * PASSO 1: Elemento Âncora (Contêiner Card)
     * Easing: 'expo.out' ou 'power3.out'
     * Raciocínio: O card tem a maior área/massa visual. Uma curva exponencial ou cúbica de saída
     * (out) simula uma arrancada rápida que desacelera suavemente por causa da fricção do ar.
     */
    tl.from(cardRef.current, {
      y: 90,
      opacity: 0,
      scale: 0.96,
      duration: 1.1,
      ease: 'expo.out' // Início rápido, desaceleração ultra suave (massa pesada)
    })

    /**
     * PASSO 2: Badge de Identificação (Hierarquia Secundária - Topo)
     * Easing: 'back.out(1.4)'
     * Position Parameter: '-=0.6' (Inicia durante a desaceleração final do Card)
     * Raciocínio: Elemento pequeno e leve. Um leve efeito overshoot ('back.out') confere
     * uma resposta elástica agradável sem sobressaltos exagerados.
     */
    .from(badgeRef.current, {
      y: -15,
      opacity: 0,
      scale: 0.85,
      duration: 0.5,
      ease: 'back.out(1.4)' // Leve mola/inércia para elemento leve
    }, '-=0.6')

    /**
     * PASSO 3: Bloco de Conteúdo (Título + Parágrafo + Info)
     * Easing: 'power2.out'
     * Position Parameter: '-=0.35' com stagger de 0.08s
     * Raciocínio: Encadeamento cascateado guiando o olhar do usuário do topo para o centro.
     */
    .from([titleRef.current, textRef.current, infoRef.current], {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08, // Micro-delay cascateado entre título, texto e info
      ease: 'power2.out' // Desaceleração quadrática limpa e legível
    }, '-=0.35')

    /**
     * PASSO 4: Botão de Ação CTA (Ponto Focal de Conversão)
     * Easing: 'back.out(1.7)'
     * Position Parameter: '-=0.2'
     * Raciocínio: O botão é o encerramento da jornada visual. Um pop elástico foca a atenção
     * final do usuário para a interação.
     */
    .from(buttonRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.2');
  };

  // =========================================================================
  // 3. ANIMAÇÃO DE HOVER ORGÂNICO (SINE.INOUT)
  // =========================================================================
  const handleFloatingEffect = () => {
    resetCard();
    setActiveStep('floating');
    setLogMessage('🌊 FLUTUAÇÃO RESPIRATÓRIA (sine.inOut): Movimento suave senoidal para efeitos de respiro contínuo e micro-interações sem rigidez.');

    gsap.to(cardRef.current, {
      y: -12,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 3,
      boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25)',
      borderColor: 'rgba(212, 175, 55, 0.5)'
    });
  };

  // Métodos rápidos individuais para a masterclass
  const handleFrom = () => {
    resetCard();
    setActiveStep('from');
    setLogMessage('gsap.from(): Anima a partir de estado customizado (y: -80, opacity: 0) com ease: "power2.out".');
    gsap.from(cardRef.current, { y: -80, opacity: 0, scale: 0.9, duration: 1, ease: 'power2.out' });
  };

  const handleTo = () => {
    setActiveStep('to');
    setLogMessage('gsap.to(): Anima do estado atual para novos valores (x: 80px, rotate: 2deg) com ease: "power3.out".');
    gsap.to(cardRef.current, { x: 80, scale: 1.04, rotation: 2, duration: 0.9, ease: 'power3.out' });
  };

  const handleFromTo = () => {
    setActiveStep('fromTo');
    setLogMessage('gsap.fromTo(): Força ponto inicial e ponto final exatos com ease: "back.out(1.5)".');
    gsap.fromTo(cardRef.current,
      { x: -100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.5)' }
    );
  };

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-[#0d0f14] border border-white/10 rounded-2xl shadow-2xl text-white font-sans">
      {/* Header explicativo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Laboratório de Física & Hierarquia GSAP
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
            Refinamento de Física e Ritmo de Movimento
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Compare o movimento linear (mecânico) com a física orgânica calculada por curvas de easing (<code className="text-[#D4AF37] font-mono">expo.out</code>, <code className="text-[#D4AF37] font-mono">back.out</code>, <code className="text-[#D4AF37] font-mono">sine.inOut</code>).
          </p>
        </div>

        <button
          onClick={resetCard}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-xs font-mono transition-colors text-gray-300 hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" /> Resetar Posição
        </button>
      </div>

      {/* Painel Principal: Controles + Palco do Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch">
        
        {/* Painel de Controles e Modos */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-mono block mb-3">
              1. Comparativo de Física & Sensação:
            </span>

            {/* Botão de Animação Fluida (Recomendada) */}
            <button
              onClick={handleFluidAnimation}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 mb-3 group ${
                activeStep === 'fluid'
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                  : 'bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#D4AF37] flex items-center gap-2">
                  <Activity className="w-4 h-4" /> ✨ Movimento Fluido & Orgânico
                </span>
                <Play className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                Física com pesagem natural (<code className="text-[#D4AF37] font-mono">expo.out</code>), hierarquia de leitura e micro-delays cascateados.
              </p>
            </button>

            {/* Botão de Animação Linear (Mecânica) */}
            <button
              onClick={handleLinearAnimation}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 mb-3 group ${
                activeStep === 'linear' ? 'bg-red-500/15 border-red-500/60' : 'bg-white/5 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-400" /> ❌ Movimento Mecânico (Linear)
                </span>
                <Play className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                Sem curva de desaceleração (<code className="font-mono">ease: "none"</code>). Velocidade constante, robótica e sem percepção de peso.
              </p>
            </button>

            {/* Flutuação Orgânica (Sine) */}
            <button
              onClick={handleFloatingEffect}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                activeStep === 'floating' ? 'bg-cyan-500/15 border-cyan-400' : 'bg-white/5 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <Compass className="w-4 h-4" /> 🌊 Flutuação Senoidal (sine.inOut)
                </span>
                <Play className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                Movimento de respiração contínuo e suave sem impactos nas pontas.
              </p>
            </button>
          </div>

          {/* Sub-métodos fundamentais */}
          <div className="pt-4 border-t border-white/10">
            <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono block mb-2">
              2. Métodos GSAP Básicos:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleFrom}
                className={`py-2 px-3 rounded-lg border font-mono text-xs text-center transition-colors ${
                  activeStep === 'from' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
                }`}
              >
                .from()
              </button>
              <button
                onClick={handleTo}
                className={`py-2 px-3 rounded-lg border font-mono text-xs text-center transition-colors ${
                  activeStep === 'to' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
                }`}
              >
                .to()
              </button>
              <button
                onClick={handleFromTo}
                className={`py-2 px-3 rounded-lg border font-mono text-xs text-center transition-colors ${
                  activeStep === 'fromTo' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
                }`}
              >
                .fromTo()
              </button>
            </div>
          </div>
        </div>

        {/* Palco de Animação do Card */}
        <div className="lg:col-span-7 flex justify-center items-center p-8 bg-[#07080b] border border-white/5 rounded-2xl min-h-[380px] overflow-hidden relative">
          {/* Grid background decorativo */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* O Card Animado */}
          <div
            ref={cardRef}
            className="w-full max-w-sm bg-[#12151c]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative z-10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                ref={badgeRef}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
              >
                PROJETO DESTAQUE
              </span>
              <span className="text-xs text-gray-500 font-mono">Residência Horizon</span>
            </div>

            <h3 ref={titleRef} className="text-xl font-serif font-bold text-white mb-2">
              Villa Contemporânea
            </h3>

            <p ref={textRef} className="text-xs text-gray-400 leading-relaxed mb-6">
              Integração harmoniosa de concreto aparente, lâminas de vidro duplo e elementos de madeira nobre.
            </p>

            <div ref={infoRef} className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="block text-[10px] text-gray-500 uppercase font-mono">Área Construída</span>
                <span className="text-sm font-semibold text-white">650 m²</span>
              </div>
              <button
                ref={buttonRef}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#c4a02f] text-[#090b0e] font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                Ver Detalhes <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Caixa de Log & Explicação Física */}
      <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl flex items-start gap-3.5">
        <Clock className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] block mb-1">
            Análise do Especialista em Animação UI
          </span>
          <p className="text-xs text-gray-300 leading-relaxed">
            {logMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
