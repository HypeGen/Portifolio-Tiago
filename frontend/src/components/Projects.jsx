import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import { projects } from '../data/mock';

const ProjectCard = ({ project, index, isVisible, onHover, isHovered }) => (
  <div
    className={`group relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 card-hover ${
      isVisible ? 'animate-fade-in-up' : 'opacity-0'
    }`}
    style={{ animationDelay: `${index * 100}ms` }}
    onMouseEnter={() => onHover(project.id)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60"></div>
      <div className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <Eye className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${
      isHovered ? 'border-white/20' : 'border-white/0'
    }`}></div>
  </div>
);

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-gray-300 mb-6">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Projetos em<span className="text-gray-500"> Destaque</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Uma seleção dos meus melhores trabalhos em landing pages e desenvolvimento web.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              onHover={setHoveredId}
              isHovered={hoveredId === project.id}
            />
          ))}
        </div>
        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <button className="btn-secondary">Ver Todos os Projetos</button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
