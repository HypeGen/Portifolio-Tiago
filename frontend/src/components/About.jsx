import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Zap, Code, Sparkles, Award } from 'lucide-react';
import { personalInfo, skills } from '../data/mock';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with delay
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills((prev) => [...prev, skill.name]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Calendar,
      label: 'Idade',
      value: `${personalInfo.age} anos`,
    },
    {
      icon: Zap,
      label: 'Experiência',
      value: personalInfo.experience,
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Recife, PE',
    },
    {
      icon: Award,
      label: 'Projetos',
      value: '20+ concluídos',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-gray-300 mb-6">
            Sobre Mim
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transformando ideias em
            <br />
            <span className="text-gray-500">experiências digitais</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-left delay-200' : 'opacity-0'}`}>
            {/* Bio Card */}
            <div className="glass rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {personalInfo.name}
                  </h3>
                  <p className="text-gray-400">{personalInfo.title}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Sou um desenvolvedor web apaixonado por criar experiências digitais 
                únicas e memoráveis. Com especialização em Landing Pages de alta conversão, 
                combino design moderno com tecnologias de ponta para entregar resultados 
                que superam expectativas.
              </p>

              <p className="text-gray-400 leading-relaxed">
                Utilizo Inteligência Artificial como aliada no desenvolvimento, 
                otimizando processos e criando soluções inovadoras. Cada projeto é uma 
                oportunidade de demonstrar que idade não define capacidade — dedicação e 
                paixão sim.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                      <div className="text-sm font-medium text-white">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'Tailwind', 'HTML5', 'CSS3', 'Git'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-right delay-400' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-white" />
              <h3 className="font-display text-2xl font-bold text-white">Habilidades</h3>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: animatedSkills.includes(skill.name) ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5">
              <h4 className="font-display text-lg font-bold text-white mb-3">
                Por que trabalhar comigo?
              </h4>
              <ul className="space-y-3">
                {[
                  'Comunicação clara e transparente',
                  'Entregas dentro do prazo',
                  'Código limpo e documentado',
                  'Suporte pós-entrega incluído',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;