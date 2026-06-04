import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../lib/motion';

const BlogPost = ({ article }) => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  /* A9: useEffect invece di useLayoutEffect — scroll non richiede esecuzione sincrona */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [article?.slug]);

  if (!article) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-not-found">
          <h1>Articolo non trovato</h1>
          <p>L'articolo che stai cercando non esiste o è stato rimosso.</p>
          <button className="back-button" onClick={() => router.push('/#blog')}>
            Torna al Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <motion.article
        className="blog-post"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : DURATION.normal, ease: EASE.out }}
      >
        <button className="back-button" onClick={() => router.push('/#blog')}>
          ← Torna al Blog
        </button>

        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-post-tag">{article.tag}</span>
            <span className="blog-post-date">
              {new Date(article.date).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1>{article.title}</h1>
          <p className="blog-post-excerpt">{article.excerpt}</p>
        </header>

        {article.image && (
          <div className="blog-post-image">
            {/* C6: lazy loading — immagine below-fold dopo l'header */}
            <img src={article.image} alt={article.title} loading="lazy" />
          </div>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.article>
    </div>
  );
};

export default BlogPost;
