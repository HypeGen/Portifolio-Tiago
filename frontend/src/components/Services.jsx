import React, { useEffect, useRef, useState } from 'react';
import { Layout, Code, Sparkles, Palette, ArrowRight } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Layout: Layout,
  Code: Code,
  Sparkles: Sparkles,
  Palette: Palette,
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-gray-300 mb-6">
            Serviços
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            O que posso fazer
            <span className="text-gray-500"> por você</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluções completas para sua presença digital, desde o conceito até a implementação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={service.title}
                className={`group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className={`flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300`}>
                  <span className="text-sm font-medium">Saiba mais</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredService === index ? 'translate-x-1' : ''
                  }`} />
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-white/5 transform rotate-45 translate-x-5 -translate-y-5 group-hover:bg-white/10 transition-colors"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className={`mt-24 ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <h3 className="font-display text-2xl font-bold text-white text-center mb-12">
            Meu Processo de Trabalho
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Descoberta', desc: 'Entendo suas necessidades e objetivos' },
              { step: '02', title: 'Planejamento', desc: 'Crio a estrutura e wireframes' },
              { step: '03', title: 'Desenvolvimento', desc: 'Transformo o design em código' },
              { step: '04', title: 'Entrega', desc: 'Testes finais e lançamento' },
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-4">
                  <span className="font-display text-6xl font-bold text-white/10">
                    {item.step}
                  </span>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-12 w-8 h-px bg-white/20"></div>
                  )}
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;