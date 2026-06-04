import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { getAssetPath } from '../utils/getAssetPath';
import { DURATION, EASE } from '../lib/motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(false);

    // Se non siamo sulla homepage, naviga prima alla homepage
    if (router.pathname !== '/') {
      router.push('/' + href);
      return;
    }

    // Se siamo già sulla homepage, scrolla usando scrollIntoView
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        const navbarHeight = 90;
        const currentScroll = window.scrollY;
        window.scrollTo({
          top: currentScroll - navbarHeight,
          behavior: 'auto'
        });
      }, 100);
    }
  };

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const headerHeight = window.innerHeight;
          const shouldBeScrolled = window.pageYOffset > headerHeight - 100;

          if (shouldBeScrolled !== lastScrolled) {
            setIsScrolled(shouldBeScrolled);
            lastScrolled = shouldBeScrolled;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // B4 — Escape key chiude il menu e riporta il focus all'hamburger
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // B4 — Sposta il focus al primo elemento del menu quando si apre
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
      firstFocusable?.focus();
    }
  }, [isOpen]);

  // B4 — Focus trap: Tab cicla solo tra gli elementi del menu aperto
  const handleMenuKeyDown = (e) => {
    if (!menuRef.current || e.key !== 'Tab') return;
    const focusable = menuRef.current.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const menuItems = [
    { href: '#header', label: 'HOME' },
    { href: '#services', label: 'TECNICA' },
    { href: '#services-gallery-section', label: 'SERVIZI' },
    { href: '#blog', label: 'BLOG' },
    { href: '#contact', label: 'CONTATTI' },
  ];

  const socialLinks = [
    // TODO: sostituire href="" con URL profilo reale e rimuovere pointerEvents:none, tabIndex:-1, aria-hidden
    { src: 'instagram logo.png', alt: 'instagram', label: 'Seguici su Instagram', href: '' },
    { src: 'facebook logo.png',  alt: 'facebook',  label: 'Seguici su Facebook',  href: '' },
    { src: 'linkedin logo.png',  alt: 'linkedin',  label: 'Seguici su LinkedIn',  href: '' },
    { src: 'twitter logo.png',   alt: 'twitter',   label: 'Seguici su Twitter / X', href: '' },
  ];

  return (
    <>
      {/* Mobile Logo */}
      <motion.a
        href="#header"
        className="mobile-nav-logo"
        onClick={(e) => handleAnchorClick(e, '#header')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img src={getAssetPath('/gde.webp')} alt="GD Events" width={100} height={48} />
      </motion.a>

      {/* Desktop Menu Bar */}
      <motion.div
        id="navigation-bar"
        className={isScrolled ? 'scrolled' : ''}
        initial={{ y: prefersReducedMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : DURATION.normal, ease: EASE.out }}
      >
        <div className="nav-container">
          <motion.div
            className="nav-col nav-col-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#services"
              className="menu-link"
              onClick={(e) => handleAnchorClick(e, '#services')}
            >
              TECNICA
            </a>
          </motion.div>
          <motion.div
            className="nav-col nav-col-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#services-gallery-section"
              className="menu-link"
              onClick={(e) => handleAnchorClick(e, '#services-gallery-section')}
            >
              SERVIZI
            </a>
          </motion.div>
          <motion.div
            className="nav-col nav-col-3"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href="#header"
              className="logo-center"
              onClick={(e) => handleAnchorClick(e, '#header')}
            >
              <img src={getAssetPath('/gde.webp')} alt="GD Events — torna all'inizio" className="nav-logo" width={100} height={48} />
            </a>
          </motion.div>
          <motion.div
            className="nav-col nav-col-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#blog"
              className="menu-link"
              onClick={(e) => handleAnchorClick(e, '#blog')}
            >
              BLOG
            </a>
          </motion.div>
          <motion.div
            className="nav-col nav-col-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#contact"
              className="menu-link"
              onClick={(e) => handleAnchorClick(e, '#contact')}
            >
              CONTATTI
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Toggle Button — A3: motion.button con aria-label e aria-expanded */}
      <motion.button
        ref={hamburgerRef}
        id="navigation-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${isScrolled ? 'scrolled' : ''} ${isOpen ? 'open' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        aria-label="Apri menu"
        aria-expanded={isOpen}
        aria-controls="fullscreen-nav"
      >
        <div className="navigation-icon">
          <div className="navigation-icon-line"></div>
          <div className="navigation-icon-line"></div>
          <div className="navigation-icon-line"></div>
        </div>
      </motion.button>

      {/* Fullscreen Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="fullscreen-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            initial={{ y: prefersReducedMotion ? 0 : '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: prefersReducedMotion ? 0 : '-100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : DURATION.normal, ease: EASE.inOut }}
            onKeyDown={handleMenuKeyDown}
          >
            {/* A3: motion.button con aria-label */}
            <motion.button
              type="button"
              className="navigation-close"
              onClick={() => { setIsOpen(false); hamburgerRef.current?.focus(); }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Chiudi menu"
            >
              <span className="close-first"></span>
              <span className="close-second"></span>
            </motion.button>
            <div className="navigation-links">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  data-text={item.label}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  whileHover={{ x: 20, color: '#00d4ff' }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            {/* Social Icons in Fullscreen Navigation */}
            <div className="navigation-social">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.alt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
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
                    <img src={getAssetPath(social.src)} alt="" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
