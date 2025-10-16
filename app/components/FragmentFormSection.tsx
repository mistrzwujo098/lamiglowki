'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Lock, Star } from 'lucide-react';
import { assetPath } from '@/lib/asset-path';
import { subscribeToNewsletter, MAILERLITE_GROUPS } from '@/lib/mailerlite';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FragmentFormSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);

    try {
      // Dodaj do grupy Lead Magnet (ta sama grupa co główny lead magnet)
      const result = await subscribeToNewsletter({
        email,
        groupId: MAILERLITE_GROUPS.LEAD_MAGNET,
        fields: {},
      });

      if (result.success) {
        // Redirect na thank you page
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-ivory via-cream to-beige">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-green text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
              DARMOWY FRAGMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground-dark mb-4">
              Chcesz najpierw zobaczyć <span className="text-green">jak to działa</span>?
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Pobierz <strong>5 darmowych łamigłówek</strong> i przekonaj się, że Twoje dziecko je pokocha
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative w-full max-w-md mx-auto mb-8">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={assetPath("/images/fragment1.webp")}
                    alt="Darmowy fragment - 5 łamigłówek"
                    fill
                    className="object-contain drop-shadow-2xl rounded-lg"
                  />
                  <div className="absolute -top-4 -right-4 bg-honey text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl transform rotate-12">
                    100% Darmowe
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  'Gotowe do wydrukowania w 30 sekund',
                  '5 zagadek na różnych poziomach trudności',
                  'Sprawdzisz czy dziecko polubi książkę',
                  'Natychmiastowy dostęp - bez czekania'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-dark font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-6 p-4 bg-white/70 rounded-xl border border-soft-blue/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-honey fill-honey" />
                  ))}
                </div>
                <p className="text-sm text-center text-foreground-dark font-semibold">
                  Ponad 500 rodziców już pobrało fragment
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border-2 border-green/30">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground-dark mb-2">
                    Pobierz darmowy fragment
                  </h3>
                  <p className="text-foreground">
                    Wpisz swój e-mail, aby otrzymać PDF z 5 łamigłówkami
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-4 text-lg border-2 border-soft-blue/30 rounded-lg focus:border-green focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green hover:bg-green-alt text-white font-bold text-lg py-5 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-6 h-6" />
                    {isSubmitting ? 'Wysyłam...' : 'Tak, chcę pobrać darmowy fragment!'}
                  </button>
                </form>

                <div className="mt-6 space-y-2">
                  <p className="text-xs text-center text-warm-gray">
                    Zapisując się wyrażasz zgodę na wysyłanie ofert promocyjnych.
                  </p>
                  <p className="text-sm text-center text-warm-gray flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Szanujemy Twoją prywatność. Bez spamu.
                  </p>
                </div>

                {/* Additional CTA under form */}
                <div className="mt-6 pt-6 border-t border-soft-blue/20">
                  <p className="text-center text-sm text-foreground mb-3">
                    A może od razu zamówisz pełną książkę?
                  </p>
                  <a
                    href="#pakiety"
                    className="block w-full bg-foreground-dark hover:bg-foreground text-white font-semibold text-base py-4 rounded-full text-center transition-all"
                  >
                    Zobacz pakiety
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
