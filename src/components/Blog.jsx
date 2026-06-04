import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { getBlogArticles } from '../data/blogData';
import { DURATION, EASE } from '../lib/motion';

// Formatter deterministico — produce output identico su Node.js e browser
// evitando toLocaleDateString() che può differire per dati ICU (hydration mismatch)
const MONTHS_IT = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
function formatDateIT(dateStr) {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${MONTHS_IT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const Blog = () => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const posts = getBlogArticles().slice(0, 3);

  const handleCardClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <section id="blog" className="blog-section" ref={ref}>
      <motion.div
        className="blog-header"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        transition={{ duration: prefersReducedMotion ? 0 : DURATION.normal, ease: EASE.out }}
      >
        {/* A6: h2 semantico per heading di sezione */}
        <h2 className="blog-heading-text"><span className="color">Blog</span></h2>
        {/* C5: descrizione aggiornata — più specifica e orientata al lettore */}
        <p>Guide tecniche e consigli pratici per chi organizza eventi.</p>
      </motion.div>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            transition={{ duration: prefersReducedMotion ? 0 : DURATION.normal, delay: prefersReducedMotion ? 0 : index * 0.1, ease: EASE.out }}
            whileHover={prefersReducedMotion ? {} : { y: -6 }}
            onClick={() => handleCardClick(post.slug)}
            /* B5: keyboard accessibility */
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(post.slug);
              }
            }}
            style={{
              cursor: 'pointer',
              backgroundImage: post.image ? `linear-gradient(rgba(6, 12, 31, 0.92), rgba(6, 12, 31, 0.92)), url(${post.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="blog-card-meta">
              <span>{post.tag}</span>
              <span>{formatDateIT(post.date)}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            {/* C5: CTA aggiornata con freccia */}
            <button
              className="blog-card-cta"
              type="button"
              tabIndex={-1}
              aria-hidden="true"
            >
              Leggi →
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
