/**
 * _app.jsx — Wrapper globale dell'applicazione Next.js
 * -----------------------------------------------
 * Scopo: punto di montaggio unico per tutti gli import CSS globali,
 *        il font self-hosted, il Loader e la Navigation persistente.
 * Dipendenze: Navigation, Loader, Cursor, next/font/google, tutti i CSS
 * Esporta: default App (componente radice Next.js)
 *
 * Pattern Loader overlay (NON ternario):
 *   Il Loader è renderizzato in parallelo a <Component />, non in alternativa.
 *   Storia del bug SSG: con il pattern `isLoading ? <Loader> : <Component>`,
 *   Next.js escludeva <Component> dall'HTML statico generato a build time,
 *   perché isLoading=true è il valore iniziale di useState e useEffect
 *   non gira durante la pre-renderizzazione statica (SSG). Risultato:
 *   meta tag assenti e body vuoto nell'HTML crawlato da Google.
 *   Soluzione: <Component> è sempre nel DOM; il Loader è un overlay
 *   position:fixed che lo copre visivamente finché isLoading=true.
 *
 * Import CSS centralizzati:
 *   Tutti i CSS sono importati qui e non nei singoli componenti
 *   perché Next.js (con output:'export') non supporta import CSS
 *   globali fuori da _app.jsx. Importarli nei componenti causa
 *   il build error "Global CSS cannot be imported from files other
 *   than your Custom App".
 */

import { useState, useEffect } from 'react';
import { Space_Grotesk } from 'next/font/google';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import Cursor from '../components/Cursor';

// CSS globali — tutti centralizzati qui (vedi nota sopra)
import '../styles/index.css';
import '../styles/App.css';
import '../styles/Blog.css';
import '../styles/BlogPost.css';
import '../styles/Contact.css';
import '../styles/Cursor.css';
import '../styles/Footer.css';
import '../styles/Header.css';
import '../styles/Loader.css';
import '../styles/Navigation.css';
import '../styles/SectionDivider.css';
import '../styles/ServicePage.css';
import '../styles/Services.css';
import '../styles/ServicesGallery.css';

/**
 * Font self-hosted tramite next/font/google.
 * I file woff2 vengono scaricati a build time e serviti
 * localmente, eliminando il round-trip DNS verso fonts.googleapis.com
 * e migliorando LCP. display:'swap' previene il FOIT.
 * Pesi caricati: 300 (Header subtitle), 400, 500, 600, 700.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

/**
 * App
 * Componente radice — wrappa ogni pagina del sito.
 *
 * @param {React.ComponentType} Component - Pagina corrente (da Next.js router)
 * @param {object} pageProps - Props pre-fetchate da getStaticProps
 * @returns {JSX.Element}
 */
export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disabilita il ripristino automatico della posizione di scroll
    // per evitare salti visivi al ritorno su una pagina visitata
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Loader visibile per 300ms — tempo minimo per evitare flash di contenuto
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    // spaceGrotesk.className inietta @font-face per Space Grotesk self-hosted
    <div id="all" className={spaceGrotesk.className}>
      <Cursor />
      {/* Loader come overlay — vedi nota "Pattern Loader overlay" nell'intestazione */}
      {isLoading && <Loader />}
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}
