import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  useEffect(() => {
    // Blocca scroll durante il loader
    document.body.style.overflow = 'hidden';
    return () => {
      // Ripristina scroll quando il loader scompare
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      id="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="color">GD</span>EVENTS
      </motion.span>
    </motion.div>
  );
};

export default Loader;
