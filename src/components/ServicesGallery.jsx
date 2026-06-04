import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
import { getAssetPath } from '../utils/getAssetPath';
import { DURATION, EASE } from '../lib/motion';

const ServicesGallery = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const galleryItems = [
    {
      img: getAssetPath('/convention.webp'),
      title: 'Convention',
      description: 'Sale congressi con sistemi audio/video di ultima generazione e regia broadcast professionale',
      slug: 'convention',
    },
    {
      img: getAssetPath('/stand_fiera.webp'),
      title: 'Stand Fieristici',
      description: 'Allestimenti fieristici con illuminazione scenografica e sistemi multimediali integrati',
      slug: 'stand-fieristici',
    },
    {
      img: getAssetPath('/concert.webp'),
      title: 'Concerti',
      description: 'Live show con impianti audio line array, luci robotiche e video mapping spettacolare',
      slug: 'concerti',
    },
    {
      img: getAssetPath('/illum_arch.webp'),
      title: 'Illuminazione Architetturale',
      description: 'Valorizzazione di edifici storici e monumenti con illuminazione LED dinamica RGB',
      slug: 'illuminazione-architetturale',
    },
    {
      img: 'https://images.unsplash.com/photo-1558970439-add78fc68990?q=80&w=1920',
      title: 'Teatro',
      description: 'Spettacoli teatrali con illuminazione scenica DMX programmabile e console digitali',
      slug: 'teatro',
    },
    {
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
      title: 'Eventi Aziendali',
      description: 'Eventi corporate con scenografie personalizzate, luci d\'atmosfera e DJ set professionale',
      slug: 'eventi-aziendali',
    },
    {
      img: getAssetPath('/vetrina.webp'),
      title: 'Vetrine',
      description: 'Illuminazione retail con LED RGB controllabili per valorizzare prodotti e brand identity',
      slug: 'vetrine',
    },
    {
      img: getAssetPath('/fixed.webp'),
      title: 'Installazioni Fisse',
      description: 'Impianti audio/video permanenti per auditorium, sale conferenze e spazi polifunzionali',
      slug: 'installazioni-fisse',
    },
    {
      img: getAssetPath('/produzione_eventi.webp'),
      title: 'Produzione Eventi',
      description: 'Gestione completa dalla progettazione al post-evento con team tecnico specializzato',
      slug: 'produzione-eventi',
    },
    {
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      title: 'Eventi Privati',
      description: 'Matrimoni, compleanni e cerimonie con allestimenti eleganti, illuminazione d\'atmosfera e audio di qualità',
      slug: 'eventi-privati',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Configurazione EmailJS da variabili d'ambiente
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const autoresponseTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Verifica che le variabili d'ambiente siano configurate
      if (!serviceId || !templateId || !autoresponseTemplateId || !publicKey) {
        throw new Error('Configurazione EmailJS mancante. Verifica il file .env');
      }

      // Debug: loggare le variabili per verificare che siano presenti
      console.debug('EmailJS config', { serviceId, templateId, autoresponseTemplateId, publicKey });

      // Invia email a info@gd-events.it con i dati del form
      const primaryParams = {
        name: formData.name,
        email: formData.email,
        title: formData.service,
        message: formData.message,
      };
      console.debug('=== PRIMARY EMAIL (ServicesGallery) ===');
      console.debug('ServiceID:', serviceId);
      console.debug('TemplateID:', templateId);
      console.debug('Template Params:', JSON.stringify(primaryParams, null, 2));
      try {
        const sendResult = await emailjs.send(serviceId, templateId, primaryParams, publicKey);
        console.debug('✓ PRIMARY EMAIL SENT', sendResult);
      } catch (err) {
        console.error('✗ Primary email send failed:', err.message, err);
        throw err;
      }

      // Invia email di conferma automatica al cliente solo se presente email valida
      const clientEmail = formData.email && String(formData.email).trim();
      const isValidEmail = clientEmail && /@/.test(clientEmail);
      if (isValidEmail) {
        const autoParams = { name: formData.name, title: formData.service, email: clientEmail };
        console.debug('=== AUTORESPONSE EMAIL (ServicesGallery) ===');
        console.debug('ServiceID:', serviceId);
        console.debug('TemplateID:', autoresponseTemplateId);
        console.debug('Template Params:', JSON.stringify(autoParams, null, 2));
        try {
          const sendAuto = await emailjs.send(serviceId, autoresponseTemplateId, autoParams, publicKey);
          console.debug('✓ AUTORESPONSE SENT', sendAuto);
        } catch (err) {
          console.error('✗ Autoresponse send failed:', err.message, err);
          // don't rethrow: primary was already sent
        }
      } else {
        console.warn('⚠ Autoresponse non inviato: email cliente mancante o non valida', { clientEmail });
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      // Log dettagliato dell'errore
      try {
        console.error('Errore invio email (dettagli):', error, {
          message: error?.message,
          status: error?.status,
          text: error?.text,
        });
      } catch (logErr) {
        console.error('Errore invio email:', error);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inizializza EmailJS con la chiave pubblica (compatibilità)
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey && emailjs && typeof emailjs.init === 'function') {
      try {
        emailjs.init(publicKey);
        console.debug('EmailJS inizializzato con public key (ServicesGallery)');
      } catch (err) {
        console.warn('EmailJS init fallita (ServicesGallery)', err);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="services-gallery-section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="services-split-container"
      >
        {/* Left: CTA + Contact Form */}
        <div className="cta-contacts-column">
          <motion.div
            className="cta-content"
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hai un evento in mente? Parliamone.
              </motion.h2>

              
              {/* <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                Dalla progettazione alla realizzazione, gestiamo ogni aspetto tecnico del tuo evento
                con professionalità e passione.
              </motion.p> */}
              

              <motion.form
                ref={formRef}
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* A5: role="alert" — screen reader annuncia il risultato */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="form-message success"
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Richiesta inviata con successo! Riceverai una conferma via email.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    className="form-message error"
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ Errore nell'invio. Riprova o contattaci direttamente.
                  </motion.div>
                )}
                {/* A4: label visually-hidden per ogni campo */}
                <label htmlFor="sg-name" className="visually-hidden">Il tuo nome</label>
                <motion.input
                  id="sg-name"
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  required
                />
                <label htmlFor="sg-email" className="visually-hidden">Il tuo indirizzo email</label>
                <motion.input
                  id="sg-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  required
                />
                <label htmlFor="sg-service" className="visually-hidden">Servizio</label>
                <motion.select
                  id="sg-service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  required
                >
                  <option value="">Seleziona un servizio</option>
                  <option value="convention">Convention</option>
                  <option value="eventi-aziendali">Eventi Aziendali</option>
                  <option value="stand-fieristici">Stand Fieristici</option>
                  <option value="vetrine">Vetrine</option>
                  <option value="concerti">Concerti</option>
                  <option value="installazioni-fisse">Installazioni Fisse</option>
                  <option value="illuminazione-architetturale">Illuminazione Architetturale</option>
                  <option value="produzione-eventi">Produzione Eventi</option>
                  <option value="teatro">Teatro</option>
                  <option value="eventi-privati">Eventi Privati</option>
                  <option value="altro">Altro</option>
                </motion.select>
                <label htmlFor="sg-message" className="visually-hidden">Il tuo messaggio</label>
                <motion.textarea
                  id="sg-message"
                  name="message"
                  placeholder="Messaggio"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  required
                />
                <motion.button
                  type="submit"
                  className="cta-button"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.05,
                    backgroundColor: isSubmitting ? undefined : '#00d4ff',
                    color: isSubmitting ? undefined : '#060c1f',
                    boxShadow: isSubmitting ? undefined : '0 0 30px rgba(0, 212, 255, 0.6)',
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? 'INVIO IN CORSO...' : 'RICHIEDI PREVENTIVO'}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>

        {/* Right: Gallery Mosaic */}
        <motion.div
          className="gallery-mosaic"
          initial={{ x: prefersReducedMotion ? 0 : 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: prefersReducedMotion ? 0 : 100, opacity: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : DURATION.normal }}
        >
          <div className="gallery-column">
            {galleryItems.slice(0, 5).map((item, index) => (
              /* B5: keyboard accessible gallery items */
              <motion.div
                key={index}
                className="gallery-item-mosaic"
                role="button"
                tabIndex={0}
                aria-label={`Vai al servizio ${item.title}`}
                onClick={() => item.slug && router.push(`/servizi/${item.slug}`)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && item.slug) {
                    e.preventDefault();
                    router.push(`/servizi/${item.slug}`);
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 + 0.2, ease: EASE.out }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, zIndex: 10 }}
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  animate={{
                    scale: hoveredIndex === index ? 1 : 1.15,
                    filter: hoveredIndex === index ? 'brightness(1)' : 'brightness(0.7)',
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : DURATION.fast }}
                />
                <div className="gallery-title-always">
                  <h3>{item.title}</h3>
                </div>
                <motion.div
                  className="gallery-details"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: 0.05 }}
                >
                  <p>{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="gallery-column">
            {galleryItems.slice(5, 10).map((item, index) => (
              <motion.div
                key={index + 5}
                className="gallery-item-mosaic"
                role="button"
                tabIndex={0}
                aria-label={`Vai al servizio ${item.title}`}
                onClick={() => item.slug && router.push(`/servizi/${item.slug}`)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && item.slug) {
                    e.preventDefault();
                    router.push(`/servizi/${item.slug}`);
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index + 5)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 + 0.25, ease: EASE.out }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, zIndex: 10 }}
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  animate={{
                    scale: hoveredIndex === index + 5 ? 1 : 1.15,
                    filter: hoveredIndex === index + 5 ? 'brightness(1)' : 'brightness(0.7)',
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : DURATION.fast }}
                />
                <div className="gallery-title-always">
                  <h3>{item.title}</h3>
                </div>
                <motion.div
                  className="gallery-details"
                  animate={{
                    opacity: hoveredIndex === index + 5 ? 1 : 0,
                    y: hoveredIndex === index + 5 ? 0 : 10,
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: 0.05 }}
                >
                  <p>{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesGallery;
