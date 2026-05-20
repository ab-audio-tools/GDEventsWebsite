/**
 * next-sitemap.config.js — Configurazione generazione sitemap e robots.txt
 * -----------------------------------------------
 * Scopo: genera sitemap.xml e robots.txt nella cartella /out/ dopo ogni build.
 *        Eseguito dallo script "next build && next-sitemap" in package.json.
 * Priorità per tipo di pagina:
 *   Homepage   → 1.0 / weekly  (massima priorità, aggiornamento frequente)
 *   /servizi/* → 0.9 / monthly (pagine commerciali ad alta priorità)
 *   /blog/*    → 0.7 / monthly (contenuto editoriale, priorità media)
 *   Altri      → 0.7 / monthly (default, es. /404 è escluso)
 */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.gd-events.it',
  generateRobotsTxt: true,       // Genera /out/robots.txt con Sitemap: URL incluso
  generateIndexSitemap: false,   // Sitemap singola (non index) — sito < 50k URL
  outDir: 'out',                 // Deve corrispondere a next.config.js output:'export'
  exclude: ['/404'],             // Esclude la pagina 404 dalla sitemap
  changefreq: 'monthly',        // Default per pagine non gestite da transform
  priority: 0.7,                // Default priority

  /**
   * transform
   * Personalizza i metadati di ogni URL nella sitemap.
   * Chiamata per ogni path rilevato nel build output.
   *
   * @param {object} config - Configurazione globale next-sitemap
   * @param {string} path   - Path della pagina (es. '/', '/servizi/convention/')
   * @returns {object} Oggetto { loc, changefreq, priority, lastmod }
   */
  transform: async (config, path) => {
    // Homepage: priorità massima, aggiornamento frequente
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    // Pagine servizio: alta priorità (pagine commerciali principali)
    if (path.startsWith('/servizi/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    // Blog post: media priorità (contenuto editoriale)
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    // Default per qualsiasi altra pagina
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404'], // Impedisce l'indicizzazione della pagina di errore
      },
    ],
    additionalSitemaps: [], // Aggiungere URL di sitemap esterne se necessario
  },
};
