/**
 * index.jsx — Homepage
 * -----------------------------------------------
 * Scopo: pagina principale del sito GD Events.
 *        Inietta 3 blocchi di structured data JSON-LD:
 *          1. Organization — Knowledge Panel e info aziendali in SERP
 *          2. LocalBusiness — Local Pack e Google Maps
 *          3. FAQPage — FAQ espanse in SERP, citabilità AI
 * Dipendenze: Header, Services, ServicesGallery, Blog, Contact, Footer,
 *             seoHelpers (Organization/LocalBusiness/FAQ schema),
 *             faqData (domande e risposte)
 * Esporta: default HomePage (pagina statica, nessun getStaticProps)
 * Note SEO: canonical esplicito '/', title 49 chars (E2), description 152 chars
 *
 * FIX 5 — dynamic() per componenti below-fold:
 *   Header e Navigation rimangono sincroni (above fold, necessari al primo render).
 *   Services, ServicesGallery, Blog, Contact, Footer vengono code-splittati.
 *   SSR rimane attivo (default ssr:true) → HTML statico invariato, SEO preservato.
 *   emailjs (~90KB) si sposta dal main bundle ai lazy chunk, riducendo
 *   Next.js-before-hydration da ~301ms stimato.
 */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import { getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../utils/seoHelpers';
import { faqData } from '../data/faqData';

// Componenti below-fold — codice splittato in chunk separati
// ssr:true (default) → server-rendered nell'HTML statico, nessun layout shift
const Services = dynamic(() => import('../components/Services'));
const ServicesGallery = dynamic(() => import('../components/ServicesGallery'));
const Blog = dynamic(() => import('../components/Blog'));
const Contact = dynamic(() => import('../components/Contact'));
const Footer = dynamic(() => import('../components/Footer'));

export default function HomePage() {
  return (
    <>
      <Head>
        {/* E2: title accorciato da 72 → 49 chars */}
        <title>Service AVL Milano | Audio Video Luci — GD Events</title>
        <meta
          name="description"
          content="Service AVL professionale a Milano per convention, concerti, stand fieristici e illuminazione architetturale. Team tecnico esperto. Richiedi preventivo."
        />
        <meta
          name="keywords"
          content="service AVL Milano, audio video luci eventi Milano, convention Milano, concerti live show Lombardia, stand fieristici Milano, noleggio AVL, preventivo service tecnico"
        />
        <link rel="canonical" href="https://www.gd-events.it/" />
        <meta property="og:type" content="website" />
        {/* E2: og:title allineato al title tag */}
        <meta property="og:title" content="Service AVL Milano | Audio Video Luci — GD Events" />
        <meta
          property="og:description"
          content="Service AVL professionale a Milano per convention, concerti, stand fieristici e illuminazione architetturale. Team tecnico esperto. Richiedi preventivo."
        />
        <meta property="og:url" content="https://www.gd-events.it/" />
        {/* E3: immagine hero per anteprima social invece del solo logo */}
        <meta property="og:image" content="https://www.gd-events.it/images/illum_arch.webp" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Service AVL Milano | Audio Video Luci — GD Events" />
        <meta
          name="twitter:description"
          content="Service AVL professionale a Milano per convention, concerti, stand fieristici e illuminazione architetturale. Team tecnico esperto. Richiedi preventivo."
        />
        <meta name="twitter:image" content="https://www.gd-events.it/images/illum_arch.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqData)) }}
        />
      </Head>
      <Header />
      <Services />
      <ServicesGallery />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
