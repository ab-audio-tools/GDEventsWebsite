import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/getAssetPath';

const ServicePage = ({ service, slug }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div id="service-page" className="service-page not-found">
        <div className="service-page-inner">
          <h1>Servizio non trovato</h1>
          <p>Il servizio che stai cercando non esiste o è stato spostato.</p>
          <button className="service-back-button" onClick={() => router.push('/')}>
            Torna alla homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="service-page" className="service-page">
      {/* Hero */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="service-hero-grid">
            <motion.div
              className="service-hero-text"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="service-category">{service.category}</p>
              <h1>{service.name}</h1>
              <p className="service-hero-lead">{service.shortDescription}</p>
              <p className="service-hero-overview">{service.overview}</p>

              <ul className="service-hero-highlights">
                {service.highlights?.map((h, index) => (
                  <li key={index}>
                    <span className="bullet-dot" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <button
                className="service-cta-button"
                onClick={() => router.push('/#contact')}
              >
                Parliamo del tuo progetto
              </button>
            </motion.div>

            <motion.div
              className="service-hero-media"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
            >
              <div className="service-hero-image-main">
                <img
                  src={service.heroImage && /^https?:\/\//.test(service.heroImage)
                    ? service.heroImage
                    : getAssetPath(service.heroImage)}
                  alt={service.name}
                />
              </div>
              <div className="service-hero-image-offset-one" />
              <div className="service-hero-image-offset-two" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content sections con immagini sfalsate */}
      <section className="service-sections">
        <div className="service-sections-inner">
          {service.sections?.map((section, index) => (
            <motion.article
              key={section.title}
              className={`service-section service-section-${
                section.imageAlign === 'right' ? 'right' : 'left'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <div className="service-section-text">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
              <div className="service-section-media">
                <div className="service-section-image-primary">
                  <img
                    src={section.image && /^https?:\/\//.test(section.image)
                      ? section.image
                      : getAssetPath(section.image)}
                    alt={section.title}
                  />
                </div>
                <div className="service-section-image-floating" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="service-bottom-cta">
        <div className="service-bottom-cta-inner">
          <h2>Hai un progetto in mente?</h2>
          <p>
            Raccontaci cosa vuoi realizzare: ti proponiamo una soluzione tecnica
            chiara, sostenibile e pronta per essere messa in scena.
          </p>
          <button
            className="service-cta-button"
            onClick={() => router.push('/#contact')}
          >
            Contattaci ora
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
