'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Rozwiązanie' },
  { id: 'benefits', label: 'Korzyści' },
  { id: 'timeline', label: 'Co się stanie?' },
  { id: 'for-who', label: 'Dla kogo?' },
  { id: 'inside', label: 'Co w środku?' },
  { id: 'examples', label: 'Przykłady' },
  { id: 'stories', label: 'Historie' },
  { id: 'pakiety', label: 'Cennik' },
  { id: 'faq', label: 'FAQ' },
  { id: 'author', label: 'O autorce' },
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:block"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-2 py-3 border border-soft-blue/20">
        <nav className="flex flex-col items-center gap-2">
          {sections.map(({ id, label }, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === id
                  ? 'bg-green scale-125 shadow-md ring-2 ring-green/30'
                  : 'bg-soft-blue/30 hover:bg-soft-blue/50 hover:scale-110'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
              title={label}
            />
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
