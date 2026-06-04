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
 *     Il poster è rimosso (thumbnail non presente in /public/images/).
 */
import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getAssetPath } from '../utils/getAssetPath';
import { DURATION, EASE } from '../lib/motion';

// Generati una sola volta a livello di modulo — identici tra render lato server
// e hydration client (suppressHydrationWarning sui <span> per sicurezza)
const NEON_DELAYS = Array.from({ length: 8 }, () => Math.random() * 1.5);

const Header = ({ navigateTo }) => {
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const headerElement = document.getElementById('header');
    let rafId = null;
    let isMouseInHeader = false;
    // Legge rect una sola volta e la aggiorna solo al resize
    // evita getBoundingClientRect() in ogni mousemove (forced reflow)
    let cachedRect = null;

    const updateRect = () => {
      if (headerElement) cachedRect = headerElement.getBoundingClientRect();
    };
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });

    const handleMouseEnter = () => {
      isMouseInHeader = true;
      updateRect(); // aggiorna rect al momento dell'entrata
    };

    const handleMouseLeave = () => {
      isMouseInHeader = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      // Reset parallasse al mouse leave
      if (videoRef.current) {
        videoRef.current.style.setProperty('--video-offset-x', '0px');
        videoRef.current.style.setProperty('--video-offset-y', '0px');
      }
    };

    const handleMouseMove = (e) => {
      if (!isMouseInHeader) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        if (!isMouseInHeader || !cachedRect || !videoRef.current) return;
        const mouseX = e.clientX - cachedRect.left;
        const mouseY = e.clientY - cachedRect.top;
        // Normalizza le coordinate (-1 a 1)
        const xPercent = (mouseX / cachedRect.width - 0.5) * 2;
        const yPercent = (mouseY / cachedRect.height - 0.5) * 2;
        // Applica parallasse (max 30px di movimento)
        videoRef.current.style.setProperty('--video-offset-x', `${xPercent * 30}px`);
        videoRef.current.style.setProperty('--video-offset-y', `${yPercent * 30}px`);
        rafId = null;
      });
    };

    if (headerElement) {
      headerElement.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      headerElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (headerElement) {
        headerElement.removeEventListener('mouseenter', handleMouseEnter);
        headerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
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
      transition: { duration: prefersReducedMotion ? 0.01 : DURATION.normal, ease: EASE.out },
    },
  };

  const socialLinks = [
    // TODO: sostituire href="" con URL profilo reale e rimuovere pointerEvents:none, tabIndex:-1, aria-hidden
    { src: 'instagram logo.png', alt: 'instagram', label: 'Seguici su Instagram', href: '' },
    { src: 'facebook logo.png',  alt: 'facebook',  label: 'Seguici su Facebook',  href: '' },
    { src: 'linkedin logo.png',  alt: 'linkedin',  label: 'Seguici su LinkedIn',  href: '' },
    { src: 'twitter logo.png',   alt: 'twitter',   label: 'Seguici su Twitter / X', href: '' },
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
        aria-hidden="true"
        role="presentation"
      >
        <source src={getAssetPath('videobg.mp4')} type="video/mp4" />
      </video>

      {/* Contact Icons - Left Side */}
      <motion.div
        className="contact-links"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: DURATION.normal }}
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
        transition={{ delay: 0.25, duration: DURATION.normal }}
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
            {/* TODO: rimuovere pointerEvents:none, tabIndex:-1, aria-hidden quando href è valorizzato */}
            <a
              href={social.href}
              aria-label={social.label}
              data-social={social.alt}
              style={{ pointerEvents: 'none', cursor: 'default' }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <img src={getAssetPath(social.src)} className="social-media" alt="" />
            </a>
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
                <span key={index} className="neon-letter" style={{ animationDelay: `${NEON_DELAYS[index]}s` }} suppressHydrationWarning>
                  {letter}
                </span>
              ))}
            </span>
            <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}></span>
            <span style={{ display: 'inline-block' }}>
              {['E', 'V', 'E', 'N', 'T', 'S'].map((letter, index) => (
                <span key={index + 2} className="neon-letter" style={{ animationDelay: `${NEON_DELAYS[index + 2]}s` }} suppressHydrationWarning>
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
