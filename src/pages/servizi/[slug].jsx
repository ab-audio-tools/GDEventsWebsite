/**
 * [slug].jsx — Pagina dinamica servizio
 * -----------------------------------------------
 * Scopo: genera staticamente una pagina per ognuno dei 10 servizi
 *        definiti in servicesData.js. Meta tag e JSON-LD variano
 *        per ogni slug (title, description, Service schema, BreadcrumbList).
 * Dipendenze: servicesData (dati), ServicePage (componente UI),
 *             seoHelpers (meta + schemi)
 * Esporta: default ServizioPage, getStaticPaths, getStaticProps
 * Note SEO: Service schema + BreadcrumbList iniettati per ogni pagina.
 *           canonical normalizzato con trailing slash.
 */
import Head from 'next/head';
import { servicesData, getServiceBySlug } from '../../data/servicesData';
import ServicePage from '../../components/ServicePage';
import {
  generatePageMeta,
  getServiceSchema,
  getBreadcrumbSchema,
  getServiceKeywords,
} from '../../utils/seoHelpers';

export default function ServizioPage({ service, slug }) {
  const meta = generatePageMeta({
    title: `${service.name} — Service AVL Milano | GD Events`,
    description: service.shortDescription,
    path: `/servizi/${slug}`,
    keywords: getServiceKeywords(slug),
  });

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: service.name, path: `/servizi/${slug}` },
  ];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:image" content="https://www.gd-events.it/gde.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getServiceSchema(service.name, service.shortDescription)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
          }}
        />
      </Head>
      <ServicePage service={service} slug={slug} />
    </>
  );
}

/**
 * getStaticPaths
 * Obbligatorio con output:'export' — dichiara a Next.js quali slug
 * devono essere generati come file HTML statici al momento della build.
 * fallback:false → qualsiasi slug non in lista restituisce 404.
 *
 * @returns {{ paths, fallback }} Lista di { params: { slug } } per i 10 servizi
 */
export async function getStaticPaths() {
  return {
    paths: servicesData.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

/**
 * getStaticProps
 * Eseguito a build time per ogni slug — recupera i dati del servizio
 * e li passa come props al componente. Con output:'export' questo codice
 * NON gira mai lato client né a runtime.
 *
 * @param {{ params: { slug: string } }} context
 * @returns {{ props: { service, slug } } | { notFound: true }}
 */
export async function getStaticProps({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return { notFound: true };
  return { props: { service, slug: params.slug } };
}
