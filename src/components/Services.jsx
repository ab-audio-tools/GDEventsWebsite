import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaWarehouse, FaCalendarDays, FaAward } from 'react-icons/fa6';
import { HiLightBulb } from 'react-icons/hi';

const Services = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: FaWarehouse,
      title: '1800 m²',
      description: '1800 m² di magazzino a Settimo Milanese: attrezzatura audio, video e luci sempre disponibile, crew pronta, logistica risolta.',
    },
    {
      icon: FaCalendarDays,
      title: 'Dal 2013',
      description: 'Dal 2013 al servizio di eventi professionali a Milano e in tutta la Lombardia. Stesso team, stessi valori, stesso obiettivo: far funzionare gli eventi.',
    },
    {
      icon: HiLightBulb,
      title: '180.000W',
      description: '180.000W di potenza luci con fixture professionali, tra cui ETC, ARRI e Clay Paky. Pronti a illuminare qualsiasi spazio, qualsiasi concept.',
      glow: true,
    },
    {
      icon: FaAward,
      title: '200+ eventi',
      description: '200+ eventi realizzati: dai palchi ai matrimoni, dalle fiere ai musei. Ogni progetto con la stessa cura tecnica.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      id="services"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.div className="services-heading" variants={itemVariants}>
        <span className="color">Tecnica</span>
      </motion.div>

      <motion.div className="services-content" variants={containerVariants}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`service-${['one', 'two', 'three', 'four'][index]} service`}
            variants={itemVariants}
          >
            <motion.div
              className="service-img"
              whileHover={service.glow ? { scale: 1.2, rotate: [0, -5, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <service.icon
                size={index === 2 ? 80 : 60}
                color="#ffffff"
                className={service.glow ? 'lightbulb-glow' : ''}
              />
            </motion.div>
            <div className="service-description">
              <motion.h2
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
              >
                {service.title}
              </motion.h2>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
