import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { getAssetPath } from '../utils/getAssetPath';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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
      // Usa scrollIntoView che gestisce meglio l'overflow
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Aggiusta per l'altezza della navbar dopo lo scroll
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

  React.useEffect(() => {
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

  const menuItems = [
    { href: '#header', label: 'HOME' },
    { href: '#services', label: 'SKILL' },
    { href: '#services-gallery-section', label: 'SERVIZI' },
    { href: '#blog', label: 'BLOG' },
    { href: '#contact', label: 'CONTATTI' },
  ];

  const socialLinks = [
    { src: 'instagram logo.png', alt: 'instagram' },
    { src: 'facebook logo.png', alt: 'facebook' },
    { src: 'linkedin logo.png', alt: 'linkedin' },
    { src: 'twitter logo.png', alt: 'twitter' },
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
        <img src={getAssetPath('/gde.png')} alt="logo" />
      </motion.a>

      {/* Desktop Menu Bar */}
      <motion.div
        id="navigation-bar"
        className={isScrolled ? 'scrolled' : ''}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
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
              SKILL
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
              <img src={getAssetPath('/gde.png')} alt="logo" className="nav-logo" />
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

      {/* Navigation Toggle Button */}
      <motion.div
        id="navigation-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${isScrolled ? 'scrolled' : ''} ${isOpen ? 'open' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="navigation-icon">
          <div className="navigation-icon-line"></div>
          <div className="navigation-icon-line"></div>
          <div className="navigation-icon-line"></div>
        </div>
      </motion.div>

      {/* Fullscreen Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="navigation-content"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div
              className="navigation-close"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="close-first"></span>
              <span className="close-second"></span>
            </motion.div>
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
                  <img src={getAssetPath(social.src)} alt={social.alt} />
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
