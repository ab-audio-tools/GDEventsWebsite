import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Verifica se particlesJS è disponibile
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-container', {
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 0,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false,
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      });
    } else {
      // Fallback: crea particelle CSS semplici
      createCSSParticles();
    }
  }, []);

  const createCSSParticles = () => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'css-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${5 + Math.random() * 10}s`;
      container.appendChild(particle);
    }
  };

  return (
    <div
      id="particles-container"
      ref={particlesRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
};

export default Particles;
