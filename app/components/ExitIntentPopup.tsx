'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Lock } from 'lucide-react';
import Image from 'next/image';
import { assetPath } from '@/lib/asset-path';
import { subscribeToNewsletter, MAILERLITE_GROUPS } from '@/lib/mailerlite';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    if (typeof window !== 'undefined') {
      const popupShown = sessionStorage.getItem('exitPopupShown');
      if (popupShown) return;
    }

    let exitIntentTriggered = false;
    const startTime = Date.now();
    const MIN_TIME_ON_PAGE = 10000; // 10 sekund minimum na stronie

    // Exit intent detection - tylko po 10 sekundach
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitIntentTriggered) return;

      // Sprawdź czy minęło minimum 10 sekund
      const timeElapsed = Date.now() - startTime;
      if (timeElapsed < MIN_TIME_ON_PAGE) return;

      // Detect mouse leaving viewport at the top (trying to close tab)
      if (e.clientY <= 0) {
        exitIntentTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Dodaj do grupy Lead Magnet (ta sama co formularz i lead magnet)
      const result = await subscribeToNewsletter({
        email,
        groupId: MAILERLITE_GROUPS.LEAD_MAGNET,
      });

      if (result.success) {
        window.location.href = '/lamiglowki/dziekujemy';
      } else {
        // Pokaż konkretny błąd użytkownikowi
        if (result.code === 'ALREADY_SUBSCRIBED') {
          alert('Ten adres email jest już zapisany. Sprawdź swoją skrzynkę!');
        } else {
          alert(result.error || 'Wystąpił błąd. Spróbuj ponownie.');
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Wystąpił błąd. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Popup Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                aria-label="Zamknij"
              >
                <X className="w-6 h-6 text-foreground-dark" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-8 md:p-10">
                {/* Left: Image */}
                <div className="flex items-center justify-center">
                  <div className="relative w-full aspect-[3/4] max-w-[200px]">
                    <Image
                      src={assetPath("/images/fragment1.webp")}
                      alt="Darmowe łamigłówki"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                    <div className="absolute -top-3 -right-3 bg-green text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-12">
                      Darmowe!
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground-dark mb-3">
                    Zanim odejdziesz...
                  </h2>
                  <p className="text-lg text-foreground mb-6">
                    Odbierz <strong>5 darmowych łamigłówek</strong> dla Twojego dziecka!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Twój e-mail"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 text-base border-2 border-soft-blue/30 rounded-lg focus:border-green focus:outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green hover:bg-green-alt text-white font-bold text-base py-4 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      {isSubmitting ? 'Wysyłam...' : 'Pobieram darmowy PDF'}
                    </button>
                  </form>

                  <p className="text-xs text-center text-warm-gray mt-4 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    100% bez spamu
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
