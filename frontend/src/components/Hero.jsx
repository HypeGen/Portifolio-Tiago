import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Code, Layout } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Web Developer';

  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20"></div>
        <div className="absolute bottom-0 left-1/4 w-px h-48 bg-gradient-to-t from-transparent to-white/10"></div>
        <div className="absolute bottom-0 right-1/3 w-px h-64 bg-gradient-to-t from-transparent to-white/10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-gray-300">Disponível para projetos</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {personalInfo.name.split(' ')[0]}
                <br />
                <span className="text-gray-500">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-gray-400" />
                <span className="font-display text-2xl md:text-3xl text-white">
                  {typedText}
                  <span className="inline-block w-0.5 h-8 bg-white ml-1 animate-pulse"></span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-white">2+</div>
                <div className="text-sm text-gray-500 mt-1">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-white">20+</div>
                <div className="text-sm text-gray-500 mt-1">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-500 mt-1">Clientes Satisfeitos</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={scrollToProjects} className="btn-primary">
                <Layout className="w-4 h-4" />
                Ver Projetos
              </button>
              <a
                href={`https://wa.me/${personalInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Fale Comigo
              </a>
            </div>
          </div>

          {/* Right Content - Photo */}
          <div className={`relative ${isVisible ? 'animate-fade-in-right delay-300' : 'opacity-0'}`}>
            {/* Photo Container */}
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-white/10 rounded-3xl transform rotate-3"></div>
              <div className="absolute -inset-4 border border-white/5 rounded-3xl transform -rotate-3"></div>
              
              {/* Main Photo */}
              <div className="relative rounded-2xl overflow-hidden animate-pulse-glow">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full aspect-[4/5] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 animate-hero"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white">Pronto para novos projetos</span>
                  </div>
                </div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center animate-float">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                <Layout className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5 text-gray-500" />
      </div>
    </section>
  );
};

export default Hero;