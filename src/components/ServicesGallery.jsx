import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
import { getAssetPath } from '../utils/getAssetPath';

const ServicesGallery = () => {
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
      img: getAssetPath('/convention.jpeg'),
      title: 'Convention',
      description: 'Sale congressi con sistemi audio/video di ultima generazione e regia broadcast professionale',
      slug: 'convention',
    },
    {
      img: getAssetPath('/stand_fiera.jpeg'),
      title: 'Stand Fieristici',
      description: 'Allestimenti fieristici con illuminazione scenografica e sistemi multimediali integrati',
      slug: 'stand-fieristici',
    },
    {
      img: getAssetPath('/concert.jpeg'),
      title: 'Concerti',
      description: 'Live show con impianti audio line array, luci robotiche e video mapping spettacolare',
      slug: 'concerti',
    },
    {
      img: getAssetPath('/illum_arch.jpeg'),
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
      img: getAssetPath('/vetrina.jpeg'),
      title: 'Vetrine',
      description: 'Illuminazione retail con LED RGB controllabili per valorizzare prodotti e brand identity',
      slug: 'vetrine',
    },
    {
      img: getAssetPath('/fixed.jpeg'),
      title: 'Installazioni Fisse',
      description: 'Impianti audio/video permanenti per auditorium, sale conferenze e spazi polifunzionali',
      slug: 'installazioni-fisse',
    },
    {
      img: getAssetPath('/produzione_eventi.jpeg'),
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

      // Invia email a info@gd-events.it con i dati del form
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'info@gd-events.it',
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );

      // Invia email di conferma automatica al cliente
      await emailjs.send(
        serviceId,
        autoresponseTemplateId,
        {
          to_email: formData.email,
          to_name: formData.name,
          service: formData.service,
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error('Errore invio email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Trasformiamo le tue idee in eventi memorabili
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
                {submitStatus === 'success' && (
                  <motion.div
                    className="form-message success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Richiesta inviata con successo! Riceverai una conferma via email.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    className="form-message error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ Errore nell'invio. Riprova o contattaci direttamente.
                  </motion.div>
                )}
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  required
                />
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  required
                />
                <motion.select
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
                <motion.textarea
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
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="gallery-column">
            {galleryItems.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                className="gallery-item-mosaic"
                onClick={() => item.slug && router.push(`/servizi/${item.slug}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  animate={{
                    scale: hoveredIndex === index ? 1 : 1.15,
                    filter: hoveredIndex === index ? 'brightness(1)' : 'brightness(0.7)',
                  }}
                  transition={{ duration: 0.3 }}
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
                  transition={{ duration: 0.2, delay: 0.05 }}
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
                onClick={() => item.slug && router.push(`/servizi/${item.slug}`)}
                onMouseEnter={() => setHoveredIndex(index + 5)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.05 + 0.25 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  animate={{
                    scale: hoveredIndex === index + 5 ? 1 : 1.15,
                    filter: hoveredIndex === index + 5 ? 'brightness(1)' : 'brightness(0.7)',
                  }}
                  transition={{ duration: 0.3 }}
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
                  transition={{ duration: 0.2, delay: 0.05 }}
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
