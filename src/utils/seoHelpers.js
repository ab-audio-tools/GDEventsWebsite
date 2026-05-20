/**
 * seoHelpers.js
 * -----------------------------------------------
 * Scopo: centralizza tutti i dati SEO e le funzioni
 *        per generare meta tag e JSON-LD structured data.
 * Dipendenze: nessuna (utility pura)
 * Esporta: DEFAULT_SEO, generatePageMeta, getOrganizationSchema,
 *          getLocalBusinessSchema, getServiceSchema,
 *          getBreadcrumbSchema, getFAQSchema, getServiceKeywords
 * Note SEO: questo file è la sorgente unica di verità per NAP
 *           (Name, Address, Phone) e schemi Schema.org.
 *           Modificare qui propagha i dati su tutte le pagine.
 */

/**
 * DEFAULT_SEO
 * Dati aziendali di base riutilizzati in tutti i meta tag e schemi.
 * NAP (Name, Address, Phone) deve essere identico in ogni occorrenza
 * del sito per coerenza E-E-A-T e Local SEO.
 */
export const DEFAULT_SEO = {
  siteTitle: 'GD Events - Service Audio Video Luci a Milano',
  siteDescription: 'GD Events: soluzioni tecniche complete per convention, concerti, stand fieristici, illuminazione architetturale e produzione eventi. Audio, video, luci professionali a Milano.',
  siteUrl: 'https://www.gd-events.it',
  locale: 'it_IT',
  ogImage: 'https://www.gd-events.it/gde.png',
  phone: '+39 02 49452872',
  email: 'info@gd-events.it',
  companyName: 'GD Events',
};

/**
 * generatePageMeta
 * Genera l'oggetto meta completo per una pagina (title, description,
 * OG, Twitter, canonical). Normalizza il path con trailing slash
 * per coerenza con next.config.js { trailingSlash: true }.
 *
 * @param {string} title - Titolo della pagina (50-65 chars)
 * @param {string} description - Meta description (140-160 chars con CTA)
 * @param {string} path - Path relativo es. '/servizi/convention'
 * @param {string[]} keywords - Array di keyword aggiuntive per la pagina
 * @param {string} ogImage - URL assoluto immagine Open Graph
 * @param {string} ogType - Tipo OG: 'website' | 'article'
 * @param {string|null} canonical - Override canonical URL (opzionale)
 * @returns {object} Oggetto con tutti i campi meta pronti per next/head
 */
export function generatePageMeta({
  title = DEFAULT_SEO.siteTitle,
  description = DEFAULT_SEO.siteDescription,
  path = '/',
  keywords = [],
  ogImage = DEFAULT_SEO.ogImage,
  ogType = 'website',
  canonical = null,
}) {
  // Aggiunge trailing slash per coerenza con next.config.js trailingSlash:true
  const normalizedPath = path === '/' ? '/' : path.replace(/\/?$/, '/');
  const fullUrl = `${DEFAULT_SEO.siteUrl}${normalizedPath}`;

  // Appende keyword globali aziendali a quelle specifiche di pagina
  const finalKeywords = [
    ...keywords,
    'GD Events', 'service AVL', 'audio video luci', 'Milano',
  ].join(', ');

  return {
    title, description, keywords: finalKeywords,
    url: fullUrl, ogTitle: title, ogDescription: description,
    ogImage, ogType, ogUrl: fullUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: title, twitterDescription: description, twitterImage: ogImage,
    canonical: canonical || fullUrl,
  };
}

/**
 * getOrganizationSchema
 * Schema.org Organization — abilita il Knowledge Panel di Google
 * e le informazioni aziendali nei risultati di ricerca.
 * Rich result: logo aziendale, link sito, contatti in SERP.
 *
 * @returns {object} JSON-LD Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: DEFAULT_SEO.companyName,
    url: DEFAULT_SEO.siteUrl,
    logo: `${DEFAULT_SEO.siteUrl}/gde.png`,
    description: DEFAULT_SEO.siteDescription,
    telephone: DEFAULT_SEO.phone,
    email: DEFAULT_SEO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Galvani 36',
      addressLocality: 'Settimo Milanese',
      addressRegion: 'MI',
      postalCode: '20019',
      addressCountry: 'IT',
    },
    sameAs: [], // Aggiungere URL profili social verificati (LinkedIn, Instagram…)
  };
}

/**
 * getLocalBusinessSchema
 * Schema.org LocalBusiness — abilita il Local Pack di Google Maps
 * e le schede attività nei risultati locali.
 * Rich result: indirizzo, telefono, fascia di prezzo, area servita
 * direttamente in SERP per ricerche "service AVL Milano".
 *
 * @returns {object} JSON-LD LocalBusiness schema
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: DEFAULT_SEO.companyName,
    image: `${DEFAULT_SEO.siteUrl}/gde.png`,
    description: DEFAULT_SEO.siteDescription,
    url: DEFAULT_SEO.siteUrl,
    telephone: DEFAULT_SEO.phone,
    email: DEFAULT_SEO.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Galvani 36',
      addressLocality: 'Settimo Milanese',
      addressRegion: 'MI',
      postalCode: '20019',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4772,
      longitude: 9.0394,
    },
    areaServed: [
      { '@type': 'City', name: 'Milano' },
      { '@type': 'AdministrativeArea', name: 'Lombardia' },
    ],
  };
}

/**
 * getServiceSchema
 * Schema.org Service — associa ogni pagina servizio all'azienda fornitrice.
 * Rich result: scheda servizio con descrizione e provider nei risultati.
 * Usato in /servizi/[slug].jsx per ogni delle 10 pagine servizio.
 *
 * @param {string} serviceName - Nome del servizio (es. 'Convention')
 * @param {string} serviceDescription - shortDescription del servizio
 * @param {string} image - URL assoluto immagine del servizio (opzionale)
 * @returns {object} JSON-LD Service schema
 */
export function getServiceSchema(serviceName, serviceDescription, image = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    image,
    provider: {
      '@type': 'Organization',
      name: DEFAULT_SEO.companyName,
      url: DEFAULT_SEO.siteUrl,
    },
  };
}

/**
 * getBreadcrumbSchema
 * Schema.org BreadcrumbList — abilita i breadcrumb nei risultati Google.
 * Rich result: percorso di navigazione visibile sotto il titolo in SERP.
 * Normalizza i path con trailing slash per coerenza con il sito.
 *
 * @param {{ name: string, path: string }[]} breadcrumbs - Array di step
 * @returns {object} JSON-LD BreadcrumbList schema
 */
export function getBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      // Trailing slash obbligatorio per coerenza con next.config.js
      item: `${DEFAULT_SEO.siteUrl}${item.path === '/' ? '/' : item.path.replace(/\/?$/, '/')}`,
    })),
  };
}

/**
 * getFAQSchema
 * Schema.org FAQPage — abilita le FAQ espanse nei risultati Google.
 * Rich result: domande e risposte visibili direttamente in SERP,
 * aumentano CTR e possibilità di citazione da parte di AI (SGE/Gemini).
 *
 * @param {{ question: string, answer: string }[]} faqs - Array di FAQ
 * @returns {object} JSON-LD FAQPage schema
 */
export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * getServiceKeywords
 * Restituisce le keyword SEO specifiche per ogni slug servizio.
 * Include keyword geografiche (Milano, Lombardia) e transazionali
 * (preventivo, noleggio, service professionale) per catturare
 * traffico con intento commerciale esplicito.
 *
 * @param {string} serviceName - Slug del servizio (es. 'convention')
 * @returns {string[]} Array di keyword pronto per il campo meta keywords
 */
export function getServiceKeywords(serviceName) {
  const keywordMap = {
    convention: 'service audio video luci convention Milano, regia tecnica meeting aziendali Milano, impianti AVL convention Lombardia, streaming ibrido eventi aziendali, preventivo convention',
    'stand-fieristici': 'service AVL stand fieristici Milano, illuminazione LED stand fiera Lombardia, video wall stand fieristici, noleggio attrezzature fiera Milano, preventivo stand fiera',
    concerti: 'service audio video luci concerti Milano, noleggio line array concerti Lombardia, luci motorizzate live show Milano, video mapping concerti, preventivo service concerto',
    'illuminazione-architetturale': 'illuminazione architetturale LED Milano, illuminazione facciate edifici Lombardia, scenari dinamici DMX, progettazione illuminazione architettonica Milano, preventivo illuminazione facciata',
    'installazioni-fisse': 'impianti audio video fissi Milano, installazione impianti sale conferenze Lombardia, service professionale auditorium Milano, manutenzione impianti AVL, preventivo installazione fissa',
    'produzione-eventi': 'produzione eventi Milano, regia tecnica eventi aziendali Lombardia, service professionale eventi Milano, coordinamento fornitori evento, preventivo produzione evento',
    'eventi-aziendali': 'service audio video eventi aziendali Milano, regia tecnica corporate event Lombardia, noleggio AVL eventi aziendali Milano, allestimento meeting aziendale, preventivo evento aziendale',
    teatro: 'service luci teatro Milano, lighting design spettacoli Lombardia, regia audio teatro Milano, noleggio attrezzature teatrali, preventivo service teatro',
    vetrine: 'illuminazione LED vetrine Milano, illuminazione retail Lombardia, scenari luce RGB vetrina programmabile, service professionale vetrinistica Milano, preventivo illuminazione vetrina',
    'eventi-privati': 'service audio luci matrimoni Milano, allestimenti cerimonie Lombardia, noleggio AVL eventi privati Milano, scenografie matrimonio service professionale, preventivo evento privato',
  };
  return (keywordMap[serviceName] || '').split(',').map((k) => k.trim());
}
