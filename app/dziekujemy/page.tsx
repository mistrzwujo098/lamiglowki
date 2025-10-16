'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { assetPath } from '@/lib/asset-path';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ivory to-cream">
      {/* Hero - Confirmation */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground-dark mb-4">
              Dziękujemy! Twój PDF jest w drodze 🎉
            </h1>

            {/* Instructions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green/30 mb-8">
              <p className="text-xl text-foreground-dark mb-4 font-semibold">
                Za 2-5 minut otrzymasz e-mail z linkiem do pobrania
              </p>
              <p className="text-foreground mb-2">
                📧 Sprawdź swoją skrzynkę (również folder SPAM)
              </p>
              <p className="text-sm text-warm-gray italic">
                Nie otrzymałeś? Sprawdź czy adres e-mail był poprawny lub napisz do nas.
              </p>
            </div>

            {/* Direct download button */}
            <motion.a
              href="https://paulinaodmatematyki.com/wp-content/uploads/2025/10/Bezplatny-fragment-Lamiglowki-dla-bystrej-glowki.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green hover:bg-green-alt text-white font-bold text-lg px-8 py-5 rounded-full transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-6 h-6" />
              Lub pobierz natychmiast tutaj
            </motion.a>

            <p className="text-sm text-warm-gray mt-4">
              Darmowy fragment książki w PDF
            </p>

          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground-dark mb-4">
              Co teraz?
            </h2>
            <p className="text-center text-foreground text-lg mb-12">
              Podczas gdy czekasz na e-mail...
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink to-honey rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground-dark mb-3">
                  Dołącz do społeczności
                </h3>
                <p className="text-foreground text-sm mb-6">
                  Codzienne inspiracje, darmowe materiały i wsparcie dla rodziców
                </p>
                <div className="space-y-3">
                  <a
                    href="https://facebook.com/paulinaodmatematyki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1877F2] hover:bg-[#0d65d9] text-white rounded-full transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com/paulinaodmatematyki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-full transition-opacity"
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@Paulina_od_Matematyki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white rounded-full transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                    YouTube
                  </a>
                </div>
              </motion.div>

              {/* Recommended Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-foreground-dark mb-6 text-center">
                  Polecamy również:
                </h3>
                <div className="space-y-4">
                  <a href="/" className="block group">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={assetPath("/images/okladka-przodem.webp")}
                          alt="Książka Łamigłówki"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground-dark group-hover:text-green transition-colors mb-1">
                          Pełna książka z łamigłówkami
                        </h4>
                        <p className="text-sm text-warm-gray">120 zagadek dla dziecka 8-99 lat</p>
                      </div>
                    </div>
                  </a>

                  <a href="/#examples" className="block group">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={assetPath("/images/fragment2.webp")}
                          alt="Przykłady"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground-dark group-hover:text-green transition-colors mb-1">
                          Zobacz więcej przykładów
                        </h4>
                        <p className="text-sm text-warm-gray">3 poziomy trudności</p>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-beige to-cream p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-4xl mb-4">💚</div>
                <h3 className="text-xl font-bold text-foreground-dark mb-3">
                  Znasz kogoś, komu to pomoże?
                </h3>
                <p className="text-foreground text-sm mb-6">
                  Udostępnij z przyjaciółmi i rodziną
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://paulinaodmatematyki.com/lead-magnet')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-foreground-dark hover:bg-foreground text-white rounded-full transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    Udostępnij na Facebooku
                  </a>
                  <a
                    href={`mailto:?subject=5 darmowych łamigłówek dla dzieci&body=Znalazłem świetny darmowy materiał z łamigłówkami dla dzieci: https://paulinaodmatematyki.com/lead-magnet`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green hover:bg-green-alt text-white rounded-full transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Wyślij e-mailem
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tripwire Offer (opcjonalnie) */}
      <section className="py-16 bg-gradient-to-r from-honey/20 to-pink/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-honey"
          >
            <div className="text-center mb-8">
              <span className="inline-block bg-honey text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
                EKSKLUZYWNA OFERTA
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground-dark mb-4">
                Podobają Ci się łamigłówki?
              </h2>
              <p className="text-xl text-foreground">
                Odbierz pełną książkę ze <strong>120 zagadkami</strong> w przedsprzedaży
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div className="flex justify-center items-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src={assetPath("/images/okladka-przodem.webp")}
                    alt="Książka Łamigłówki"
                    width={400}
                    height={550}
                    className="drop-shadow-2xl rounded-lg w-full h-auto"
                  />
                </div>
              </div>

              <div>
                <ul className="space-y-3 mb-6">
                  {[
                    '120 starannie wyselekcjonowanych zagadek',
                    '3 poziomy trudności dostosowane do wieku',
                    'Książka w formie papierowej (wysyłka po 12 listopada)',
                    'Certyfikat Bystrej Główki dla dziecka',
                    'Rozwiązania video',
                    'BONUS: eBook do wydrukowania'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-green">59 zł</span>
                  <span className="text-sm text-warm-gray">Cena przedsprzedażowa</span>
                </div>

                <a
                  href="https://paulinaodmatematyki.com/lamiglowki"
                  className="block w-full bg-foreground-dark hover:bg-foreground text-white font-bold text-lg py-5 rounded-full text-center transition-all shadow-lg hover:shadow-xl"
                >
                  Chcę skorzystać z oferty
                </a>
              </div>
            </div>

            <p className="text-center text-sm text-warm-gray italic">
              ⏰ Oferta przedsprzedażowa - najlepsza cena
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-foreground-dark font-semibold mb-4">
            Zobacz czemu ponad 500 rodziców nam ufa
          </p>
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-3xl">⭐</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-soft-blue/20 bg-white/50">
        <div className="container mx-auto px-4 text-center text-sm text-warm-gray">
          <p>&copy; 2025 Paulina od Matematyki. Wszelkie prawa zastrzeżone.</p>
          <p className="mt-2">
            <a href="mailto:paulina@paulinaodmatematyki.com" className="hover:text-green transition-colors">
              paulina@paulinaodmatematyki.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
