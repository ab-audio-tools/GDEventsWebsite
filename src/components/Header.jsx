/**
 * Header.jsx — Hero section della homepage
 * -----------------------------------------------
 * Scopo: prima sezione visiva con video background, logo animato,
 *        subtitle, CTA e link contatti/social. Gestisce parallasse
 *        del video al movimento del mouse.
 * Dipendenze: framer-motion, getAssetPath
 * Esporta: default Header
 * Note SEO:
 *   - h1.visually-hidden: testo "Service Audio Video Luci a Milano — GD Events"
 *     visibile solo ai crawler (display:none alternativo escluderebbe i crawler).
 *     Il logo animato "GD EVENTS" NON è testo machine-readable.
 *   - span.visually-hidden "Service audio video luci professionale dal 2013":
 *     segnale E-E-A-T (esperienza) leggibile da crawler e screen reader
 *     senza alterare l'estetica del subtitle visivo.
 *   - video preload="none": il video background NON viene scaricato
 *     al caricamento iniziale della pagina — impatto diretto su LCP.
 *     Il poster (thumbnail.PNG) viene mostrato finché il video non parte.
 */
import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getAssetPath } from '../utils/getAssetPath';

const Header = ({ navigateTo }) => {
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Animazione neon per ogni lettera
    const letters = document.querySelectorAll('.neon-letter');
    letters.forEach((letter) => {
      const randomDelay = Math.random() * 1.5;
      letter.style.animationDelay = `${randomDelay}s`;
    });

    const headerElement = document.getElementById('header');
    let ticking = false;
    let isMouseInHeader = false;

    const handleMouseEnter = () => {
      isMouseInHeader = true;
    };

    const handleMouseLeave = () => {
      isMouseInHeader = false;
      // Reset parallasse al mouse leave
      if (videoRef.current) {
        videoRef.current.style.setProperty('--video-offset-x', '0px');
        videoRef.current.style.setProperty('--video-offset-y', '0px');
      }
    };

    const handleMouseMove = (e) => {
      if (!isMouseInHeader || !ticking) {
        window.requestAnimationFrame(() => {
          if (isMouseInHeader && headerElement && videoRef.current) {
            const rect = headerElement.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Normalizza le coordinate (-1 a 1)
            const xPercent = (mouseX / rect.width - 0.5) * 2;
            const yPercent = (mouseY / rect.height - 0.5) * 2;
            
            // Applica parallasse (max 30px di movimento)
            const offsetX = xPercent * 30;
            const offsetY = yPercent * 30;

            videoRef.current.style.setProperty('--video-offset-x', `${offsetX}px`);
            videoRef.current.style.setProperty('--video-offset-y', `${offsetY}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (headerElement) {
      headerElement.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      headerElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (headerElement) {
        headerElement.removeEventListener('mouseenter', handleMouseEnter);
        headerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.4, ease: 'easeOut' },
    },
  };

  const socialLinks = [
    { src: 'instagram logo.png', alt: 'instagram' },
    { src: 'facebook logo.png', alt: 'facebook' },
    { src: 'linkedin logo.png', alt: 'linkedin' },
    { src: 'twitter logo.png', alt: 'twitter' },
  ];

  return (
    <div id="header">
      <div className="video-overlay"></div>
      <video
        ref={videoRef}
        id="video-background"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={getAssetPath('thumbnail.PNG')}
      >
        <source src={getAssetPath('videobg.mp4')} type="video/mp4" />
      </video>

      {/* Contact Icons - Left Side */}
      <motion.div
        className="contact-links"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.a
          href="tel:+390249452872"
          className="contact-link"
          data-label="+39 02 49452872"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          title="Chiama"
        >
          <img src={getAssetPath('/call.png')} alt="phone" className="contactpic" />
        </motion.a>
        <motion.a
          href="mailto:info@gd-events.it"
          className="contact-link"
          data-label="info@gd-events.it"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          title="Email"
        >
          <img src={getAssetPath('/icon-email.png')} alt="email" className="contactpic" />
        </motion.a>
      </motion.div>

      {/* Social Media Links - Right Side */}
      <motion.div
        className="social-media-links"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {socialLinks.map((social) => (
          <motion.div
            key={social.alt}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="social-link-wrapper"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src={getAssetPath(social.src)} className="social-media" alt={social.alt} />
          </motion.div>
        ))}
      </motion.div>

      {/* Header Content - Centered */}
      <motion.div
        className="header-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="header-content-box">
          <h1 className="visually-hidden">Service Audio Video Luci a Milano — GD Events</h1>
          <motion.div className="main-title" variants={itemVariants}>
            <span style={{ display: 'inline-block' }}>
              {['G', 'D'].map((letter, index) => (
                <span key={index} className="neon-letter">
                  {letter}
                </span>
              ))}
            </span>
            <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}></span>
            <span style={{ display: 'inline-block' }}>
              {['E', 'V', 'E', 'N', 'T', 'S'].map((letter, index) => (
                <span key={index + 2} className="neon-letter">
                  {letter}
                </span>
              ))}
            </span>
          </motion.div>

          <span className="visually-hidden">Service audio video luci professionale dal 2013</span>
          <motion.div className="subtitle" variants={itemVariants}>
            La tua visione, eventi indimenticabili
          </motion.div>

          <motion.a
            className="cta-button"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('contact');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                  const currentPosition = window.pageYOffset;
                  window.scrollTo({ top: currentPosition - 90, behavior: 'auto' });
                }, 500);
                window.history.pushState(null, '', '#contact');
              }
            }}
          >
            <span className="button-text">INIZIA IL TUO PROGETTO</span>
            <motion.span
              className="button-arrow"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Contact Icons moved to right side */}
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
