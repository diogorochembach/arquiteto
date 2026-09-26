import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Maximize2, Sparkles, Filter, X, CheckCircle, Calendar, UserCheck } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 'horizon',
    title: 'Residência Horizon',
    category: 'Residencial Luxo',
    location: 'Trancoso, Bahia',
    area: '1.250 m²',
    year: '2025',
    image: '/images/hero-architecture.jpg',
    architect: 'Arthur Vance & Equipe VERVE',
    description:
      'Uma obra-prima integrada à falésia com vista panorâmica para o Atlântico. Estrutura em concreto aparente, madeira de reuso e brises móbiles que regulam a ventilação natural.',
    highlights: ['Piscina com borda infinita de 30m', 'Automação residencial completa', 'Painéis solares fotovoltaicos', 'Certificação LEED Gold']
  },
  {
    id: 'travertino',
    title: 'Casa Travertino',
    category: 'Design de Interiores',
    location: 'Jardins, São Paulo',
    area: '850 m²',
    year: '2024',
    image: '/images/project-interior.jpg',
    architect: 'Marina Lins & Arthur Vance',
    description:
      'Projeto de interiores minimalista focado na pureza da pedra Travertino Navona e marcenaria autoral em Nogueira. Pé-direito duplo com iluminação cenográfica pontual.',
    highlights: ['Lareira ecológica integrada', 'Mobiliário assinado por designers italianos', 'Cozinha gourmet oculta', 'Revestimento acústico natural']
  },
  {
    id: 'lumiere',
    title: 'Torre Paramétrica Lumière',
    category: 'Corporativo & Fachadas',
    location: 'Av. Faria Lima, SP',
    area: '14.000 m²',
    year: '2025',
    image: '/images/project-facade.jpg',
    architect: 'Arthur Vance',
    description:
      'Edifício corporativo contemporâneo com fachada dinâmica paramétrica inspirada nas ondulações orgânicas. Otimização bioclimática e eficiência energética máxima.',
    highlights: ['Fachada de vidro duplo termoacústico', 'Rooftop verde com heliponto', 'Lobby com pé-direito de 12m', 'Sustentabilidade Net Zero']
  }
];

export default function PortfolioSection({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-consultation'));
    }
  };

  const categories = ['Todos', 'Residencial Luxo', 'Design de Interiores', 'Corporativo & Fachadas'];

  const filteredProjects =
    activeTab === 'Todos'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-24 bg-[#090b0e] overflow-hidden border-t border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* DOBRA 2: Architectural Manifesto Banner */}
        <div id="manifesto" className="mb-20 p-8 md:p-12 rounded-3xl glass-panel-gold relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-9xl text-[#D4AF37] select-none pointer-events-none">
            “
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3 block">
              — Filosofia & Manifesto VERVE
            </span>
            <blockquote className="font-serif text-2xl md:text-4xl text-white font-light leading-relaxed mb-6">
              “A verdadeira arquitetura não busca apenas ocupar a paisagem, mas dialogar com ela. Criamos santuários tridimensionais onde a luz natural desenha a vida diária.”
            </blockquote>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] overflow-hidden bg-gray-800">
                <img src="/images/project-interior.jpg" alt="Arq. Arthur Vance" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white font-medium">Arq. Arthur Vance</h4>
                <p className="text-xs text-[#D4AF37] font-sans">Sócio-Fundador & Diretor de Arquitetura</p>
              </div>
            </div>
          </div>
        </div>

        {/* DOBRA 2: Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
              Portfolio Selecionado
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Obras & <span className="italic gold-gradient-text">Projetos Emblemáticos</span>
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full glass-panel border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-[#D4AF37] text-[#090b0e] font-bold shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* DOBRA 2: Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#090b0e]/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Expand Icon Hover Badge */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#090b0e]/70 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {project.location}
                  </span>
                  <span className="font-mono text-[#E6C875]">{project.area}</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium group-hover:text-[#D4AF37] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 font-light leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-[#D4AF37]">
                  <span>Explorar Obra</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-gold border border-[#D4AF37]/40 shadow-2xl p-6 md:p-10 text-white">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-white/10">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> {selectedProject.architect}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Entrega: {selectedProject.year}
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 inline-block mb-3">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-serif text-3xl font-normal text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs text-[#D4AF37] mb-4 font-mono flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {selectedProject.location} • {selectedProject.area}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed font-light mb-6">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Destaques do Projeto
                  </h4>
                  <ul className="space-y-2 mb-8">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    handleOpenConsultation();
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#D4AF37] hover:bg-[#e6c875] text-[#090b0e] text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Solicitar Projeto Semelhante
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
