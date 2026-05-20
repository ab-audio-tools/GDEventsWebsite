/**
 * next.config.js — Configurazione Next.js
 * -----------------------------------------------
 * Scopo: definisce il comportamento del build e del server Next.js.
 * ATTENZIONE: modificare con cautela — alcune opzioni sono interdipendenti.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * output: 'export'
   * Genera HTML/CSS/JS statici in /out/ invece di un server Node.js.
   * Compatibile con hosting Apache/Nginx senza runtime Node.
   * LIMITAZIONE: disabilita ISR, middleware, API routes e next/image
   * con ottimizzazione server-side (images.unoptimized:true è obbligatorio).
   */
  output: 'export',

  /**
   * trailingSlash: true
   * Ogni pagina viene esportata come /pagina/index.html invece di /pagina.html.
   * IMPORTANTE: se rimosso, tutti i canonical URL, le sitemap e i redirect
   * .htaccess smettono di funzionare — le URL cambiano forma e Google
   * tratterebbe le vecchie URL come errori 404.
   * Coerente con il SPA fallback in .htaccess che riscrive verso /index.html.
   */
  trailingSlash: true,

  /**
   * images.unoptimized: true
   * Obbligatorio con output:'export' — il server di ottimizzazione immagini
   * di Next.js non è disponibile in modalità statica.
   * Le immagini vengono servite as-is da /public/images/.
   */
  images: { unoptimized: true },
};

module.exports = nextConfig;
