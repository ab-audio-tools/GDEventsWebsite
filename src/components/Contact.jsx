/**
 * Contact.jsx — Sezione form di contatto e preventivo
 * -----------------------------------------------
 * Scopo: form di richiesta preventivo con invio via EmailJS.
 *        All'invio: (1) email a info@gd-events.it con i dati del cliente,
 *        (2) email di conferma automatica al cliente (autoresponse).
 * Dipendenze: framer-motion, react-intersection-observer,
 *             @emailjs/browser, getAssetPath
 * Esporta: default Contact
 *
 * Variabili d'ambiente richieste (prefisso NEXT_PUBLIC_ = esposte al client):
 *   NEXT_PUBLIC_EMAILJS_SERVICE_ID                — ID servizio EmailJS
 *   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID               — Template email verso info@gd-events.it
 *   NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID  — Template conferma automatica al cliente
 *   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY                — Chiave pubblica account EmailJS
 *
 * Campi form → mapping variabili EmailJS template:
 *   name        → from_name, to_name (autoresponse)
 *   email       → from_email, to_email, reply_to
 *   data_evento → data_evento (fallback: 'Non specificata' se vuoto)
 *   service     → service (select con 11 opzioni)
 *   message     → message
 */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { getAssetPath } from '../utils/getAssetPath';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    data_evento: '',
    service: '',
    message: '',
  });

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
          data_evento: formData.data_evento || 'Non specificata',
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
      setFormData({ name: '', email: '', data_evento: '', service: '', message: '' });
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

  const contactInfo = [
   
    {
      icon: 'icon-location.png',
      title: 'Location',
      content: 'Via Galvani 36, Settimo Milanese',
    },
    {
      icon: 'icon-phone.png',
      title: 'Call',
      content: '+39 02 49452872',
    },
    {
      icon: 'icon-email.png',
      title: 'Email',
      content: 'info@gd-events.it',
    },
  ];

  return (
    <motion.div
      id="contact"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="contact-header"
        initial={{ y: -50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="color">Contattaci</span>
      </motion.div>

      <div className="contact-content">
        {/* Contact Form */}
        <motion.div
          className="contact-form"
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
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
            <motion.input
              type="text"
              name="data_evento"
              placeholder="Data evento (indicativa)"
              value={formData.data_evento}
              onChange={handleInputChange}
              whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
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
              <option value="feste-aziendali">Feste Aziendali</option>
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
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="contact-info"
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="contact-info-header">Contact Info</div>
          <div className="contact-info-content">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contect-info-content-line"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.05 }}
              >
                <motion.img
                  src={getAssetPath(info.icon)}
                  className="icon"
                  alt={`${info.title}-icon`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="contact-info-icon-text">
                  <h6>{info.title}</h6>
                  <p>{info.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
