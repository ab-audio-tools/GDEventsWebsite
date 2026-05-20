import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { getBlogArticles } from '../data/blogData';

const Blog = () => {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const posts = getBlogArticles().slice(0, 3);

  return (
    <section id="blog" className="blog-section" ref={ref}>
      <motion.div
        className="blog-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
      >
        <span className="color">Blog</span>
        <p>Ultimi articoli e approfondimenti dal mondo degli eventi.</p>
      </motion.div>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => router.push(`/blog/${post.slug}`)}
            style={{
              cursor: 'pointer',
              backgroundImage: post.image ? `linear-gradient(rgba(6, 12, 31, 0.92), rgba(6, 12, 31, 0.92)), url(${post.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="blog-card-meta">
              <span>{post.tag}</span>
              <span>
                {new Date(post.date).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <button className="blog-card-cta" type="button">
              Leggi articolo
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
