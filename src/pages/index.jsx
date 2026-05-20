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
 * Note SEO: canonical esplicito '/', title 63 chars, description 152 chars
 */
import Head from 'next/head';
import Header from '../components/Header';
import Services from '../components/Services';
import ServicesGallery from '../components/ServicesGallery';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../utils/seoHelpers';
import { faqData } from '../data/faqData';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Service Audio Video Luci Milano | AVL Professionale — GD Events</title>
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
        <meta property="og:title" content="Service Audio Video Luci Milano | AVL Professionale — GD Events" />
        <meta
          property="og:description"
          content="Service AVL professionale a Milano per convention, concerti, stand fieristici e illuminazione architetturale. Team tecnico esperto. Richiedi preventivo."
        />
        <meta property="og:url" content="https://www.gd-events.it/" />
        <meta property="og:image" content="https://www.gd-events.it/gde.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Service Audio Video Luci Milano | AVL Professionale — GD Events" />
        <meta
          name="twitter:description"
          content="Service AVL professionale a Milano per convention, concerti, stand fieristici e illuminazione architetturale. Team tecnico esperto. Richiedi preventivo."
        />
        <meta name="twitter:image" content="https://www.gd-events.it/gde.png" />
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
