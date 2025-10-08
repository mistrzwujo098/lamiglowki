'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingCTA() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.9, 0.95], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.15], [100, 0]);

  // Hide on lead magnet page
  if (pathname === '/lead-magnet' || pathname === '/lead-magnet/') {
    return null;
  }

  return (
    <>
      {/* Desktop version */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        style={{ opacity, y }}
      >
        <motion.a
          href="#pakiety"
          className="flex items-center gap-3 bg-gradient-to-r from-foreground-dark to-foreground text-white font-bold px-8 py-4 rounded-full shadow-2xl border-2 border-honey group overflow-hidden relative"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-honey/20 to-green/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <ShoppingCart className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
          <span className="relative z-10">Kup teraz • Oszczędź do 34%</span>
          <div className="w-3 h-3 bg-green rounded-full animate-pulse relative z-10" />
        </motion.a>
      </motion.div>

      {/* Mobile version - sticky bottom bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t-2 border-honey shadow-2xl"
        style={{ opacity }}
      >
        <motion.a
          href="#pakiety"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-foreground-dark to-foreground text-white font-bold px-4 py-4 group overflow-hidden relative w-full"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-honey/20 to-green/20 opacity-0 group-active:opacity-100 transition-opacity" />
          <ShoppingCart className="w-5 h-5 relative z-10" />
          <span className="relative z-10 text-sm">Kup teraz • Oszczędź do 34%</span>
          <div className="w-2.5 h-2.5 bg-green rounded-full animate-pulse relative z-10" />
        </motion.a>
      </motion.div>
    </>
  );
}
