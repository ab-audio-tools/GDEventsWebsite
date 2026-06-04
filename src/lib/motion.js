/**
 * motion.js — Token system per animazioni (Framer Motion)
 * -----------------------------------------------
 * Importa questi token in tutti i componenti
 * invece di usare valori hardcoded.
 * Coerente con le linee guida di motion.md.
 */

export const DURATION = {
  fast:   0.15,  // feedback immediato (hover, click)
  normal: 0.35,  // transizioni UI standard
  slow:   0.6,   // entrance animations
  slower: 0.8,   // elementi hero o decorativi
};

export const EASE = {
  out:    [0.0, 0.0, 0.2, 1],    // decelera: naturale per entrata
  in:     [0.4, 0.0, 1.0, 1],    // accelera: naturale per uscita
  inOut:  [0.4, 0.0, 0.2, 1],    // standard Material
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  bounce: { type: 'spring', stiffness: 400, damping: 20 },
};

export const VARIANTS = {
  fadeUp: {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.08 } },
  },
};
