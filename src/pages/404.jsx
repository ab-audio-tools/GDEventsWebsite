/**
 * 404.jsx — Pagina di errore Not Found
 * -----------------------------------------------
 * Scopo: pagina personalizzata per URL inesistenti.
 *        noindex/nofollow per escludere dalla SERP.
 *        Due CTA per rientrare nel sito: homepage e form contatto.
 * Dipendenze: next/head, next/router
 * Esporta: default NotFoundPage
 * Note SEO: robots noindex/nofollow — la pagina 404 non deve essere
 *           indicizzata né seguita dai crawler.
 */
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pagina non trovata — GD Events</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="not-found-content">
        <p className="not-found-code">404</p>
        <h1>Questa pagina non esiste.</h1>
        <p className="not-found-sub">
          Ma il tuo evento sì — torna alla home o scrivici direttamente.
        </p>
        <div className="not-found-actions">
          <button
            className="cta-button"
            onClick={() => router.push('/')}
          >
            Torna alla Home
          </button>
          <button
            className="not-found-secondary"
            onClick={() => router.push('/#contact')}
          >
            Oppure raccontaci il tuo evento →
          </button>
        </div>
      </div>
    </>
  );
}
