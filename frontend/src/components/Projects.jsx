import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '../data/mock';

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

  // Modal / carousel state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState(null); // 'left' or 'right'
  const [nextIndex, setNextIndex] = useState(null);

  function openModal(i) {
    setModalIndex(i);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function prev() {
    const ni = (modalIndex - 1 + projects.length) % projects.length;
    setNextIndex(ni);
    setSlideDir('right');
    setIsSliding(true);
    setTimeout(() => {
      setModalIndex(ni);
      setIsSliding(false);
      setSlideDir(null);
      setNextIndex(null);
    }, 300);
  }

  function next() {
    const ni = (modalIndex + 1) % projects.length;
    setNextIndex(ni);
    setSlideDir('left');
    setIsSliding(true);
    setTimeout(() => {
      setModalIndex(ni);
      setIsSliding(false);
      setSlideDir(null);
      setNextIndex(null);
    }, 300);
  }

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen]);

  const renderTags = (tags) => {
    return tags.map((tag, i) => (
      <span key={i} className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full">
        {tag}
      </span>
    ));
  };

  const renderProject = (project, index) => {
    const isHovered = hoveredId === project.id;
    return (
      <div
        key={project.id}
        className={`group relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 card-hover transition-shadow duration-300 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredId(project.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => openModal(index)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {renderTags(project.tags)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 grid-pattern opacity-30" />
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
          {projects.map(renderProject)}
        </div>
        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <button onClick={() => openModal(0)} className="btn-secondary">Ver Todos os Projetos</button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overlay-enter">
            <div className="relative w-full max-w-4xl mx-4 bg-[#0b0b0b] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 modal-enter">
              <button onClick={closeModal} className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex items-center">
                <button onClick={prev} className="p-4 pl-6 pr-6 text-white/90 hover:text-white">
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex-1 p-6">
                  <div className="w-full h-80 sm:h-96 bg-black rounded-lg overflow-hidden relative">
                    {!isSliding && (
                      <img
                        src={projects[modalIndex].image}
                        alt={projects[modalIndex].title}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {isSliding && (
                      <>
                        <img
                          src={projects[modalIndex].image}
                          alt={projects[modalIndex].title}
                          className={`w-full h-full object-cover absolute inset-0 ${slideDir === 'left' ? 'slide-out-left' : 'slide-out-right'}`}
                        />
                        <img
                          src={projects[nextIndex].image}
                          alt={projects[nextIndex].title}
                          className={`w-full h-full object-cover absolute inset-0 ${slideDir === 'left' ? 'slide-in-right' : 'slide-in-left'}`}
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-display text-2xl text-white font-bold">{projects[modalIndex].title}</h3>
                    <p className="text-gray-400 mt-2">{projects[modalIndex].description}</p>
                  </div>
                </div>

                <button onClick={next} className="p-4 pl-6 pr-6 text-white/90 hover:text-white">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
