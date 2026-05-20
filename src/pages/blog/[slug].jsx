/**
 * [slug].jsx — Pagina dinamica articolo blog
 * -----------------------------------------------
 * Scopo: genera staticamente una pagina HTML per ogni articolo
 *        in defaultArticles. Inietta Article schema (JSON-LD)
 *        con author Person, publisher Organization e datePublished.
 * Dipendenze: blogData (defaultArticles), BlogPost (UI),
 *             seoHelpers (generatePageMeta, DEFAULT_SEO)
 * Esporta: default BlogPostPage, getStaticPaths, getStaticProps
 * Note SEO: Article schema abilita rich result articolo in Google.
 *           og:type='article' per anteprima social corretta.
 *           Author impostato come Person (E-E-A-T > Organization).
 */
import Head from 'next/head';
import { defaultArticles } from '../../data/blogData';
import BlogPost from '../../components/BlogPost';
import { generatePageMeta, DEFAULT_SEO } from '../../utils/seoHelpers';

export default function BlogPostPage({ article }) {
  const meta = generatePageMeta({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image
      ? `${DEFAULT_SEO.siteUrl}${article.image.startsWith('/') ? '' : '/'}${article.image}`
      : `${DEFAULT_SEO.siteUrl}/gde.png`,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: 'Staff GD Events',
    },
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_SEO.companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${DEFAULT_SEO.siteUrl}/gde.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': meta.canonical,
    },
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:image" content="https://www.gd-events.it/gde.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
      <BlogPost article={article} />
    </>
  );
}

/**
 * getStaticPaths
 * Genera i path statici per i 3 articoli in defaultArticles.
 * Usa defaultArticles (non getBlogArticles) perché il contenuto
 * localStorage non è disponibile a build time (solo client-side).
 *
 * @returns {{ paths, fallback }} Lista slug per la build statica
 */
export async function getStaticPaths() {
  return {
    paths: defaultArticles.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

/**
 * getStaticProps
 * Recupera i dati dell'articolo per slug a build time.
 *
 * @param {{ params: { slug: string } }} context
 * @returns {{ props: { article } } | { notFound: true }}
 */
export async function getStaticProps({ params }) {
  const article = defaultArticles.find((a) => a.slug === params.slug);
  if (!article) return { notFound: true };
  return { props: { article } };
}
