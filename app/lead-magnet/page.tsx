'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Lock, Star } from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wantsSMS, setWantsSMS] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !agreed) return;

    setIsSubmitting(true);

    // Integracja z MailerLite
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        // Redirect na thank you page
        window.location.href = '/dziekujemy';
      } else {
        alert('Wystąpił błąd. Spróbuj ponownie.');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Wystąpił błąd. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ivory to-cream">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-dark mb-6">
              5 łamigłówek logicznych<br/>dla bystrej główki
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-foreground mb-8">
              Darmowy zestaw zagadek, które rozwiną logiczne myślenie Twojego dziecka w 15 minut
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                <Image
                  src="/images/fragment1.webp"
                  alt="Darmowy lead magnet - 5 łamigłówek"
                  fill
                  className="object-contain drop-shadow-2xl rounded-lg"
                />
                <div className="absolute -top-6 -right-6 bg-green text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl transform rotate-12">
                  100% Darmowe
                </div>
              </div>
            </motion.div>

            {/* Right: Form + Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Short description */}
              <p className="text-lg text-foreground-dark mb-6">
                <strong>Pobierz darmowy PDF</strong> z 5 starannie wyselekcjonowanymi zagadkami logicznymi dla osób w wieku 8-99 lat.
              </p>

              {/* Benefits list */}
              <div className="space-y-4 mb-8">
                {[
                  'Zaoszczędzisz czas - gotowe do wydrukowania',
                  'Rozwiniesz logiczne myślenie dziecka bez nudnych zadań',
                  'Spędzisz 15 minut jakościowego czasu razem',
                  'Odkryjesz jak łatwo zaangażować dziecko w naukę',
                  'Otrzymasz natychmiastowy dostęp - pobierz w 30 sekund'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-dark">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green/20">
                <p className="text-lg font-semibold text-foreground-dark mb-4 text-center">
                  Wpisz swój e-mail, aby otrzymać darmowy PDF:
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                      required
                      autoComplete="email"
                      autoFocus
                      className="w-full px-4 py-4 text-lg border-2 border-soft-blue/30 rounded-lg focus:border-green focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="sms"
                      checked={wantsSMS}
                      onChange={(e) => setWantsSMS(e.target.checked)}
                      className="mt-1 w-4 h-4"
                    />
                    <label htmlFor="sms" className="text-sm text-foreground">
                      Chcę otrzymać powiadomienie SMS o premierze książki
                    </label>
                  </div>

                  {wantsSMS && (
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Numer telefonu (np. 123 456 789)"
                        required={wantsSMS}
                        autoComplete="tel"
                        className="w-full px-4 py-4 text-lg border-2 border-soft-blue/30 rounded-lg focus:border-green focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="rodo"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4"
                    />
                    <label htmlFor="rodo" className="text-sm text-foreground">
                      Zgadzam się na przetwarzanie danych osobowych.{' '}
                      <a href="/polityka-prywatnosci" target="_blank" className="text-green underline">
                        Polityka prywatności
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green hover:bg-green-alt text-white font-bold text-lg py-5 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-6 h-6" />
                    {isSubmitting ? 'Wysyłam...' : 'Tak, chcę pobrać darmowy PDF!'}
                  </button>
                </form>

                <p className="text-sm text-center text-warm-gray mt-4 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Szanujemy Twoją prywatność. Bez spamu, gwarantujemy.
                </p>
              </div>

              {/* Social proof pod formularzem */}
              <div className="mt-6 text-center">
                <p className="text-sm text-foreground font-semibold flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-honey fill-honey" />
                  Dołącz do ponad 500 rodziców, którzy już pobrali
                </p>
              </div>
            </motion.div>
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold text-center text-foreground-dark mb-8">
              Co mówią rodzice:
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: "Moja córka uwielbia te zagadki! Wreszcie coś bez ekranu.",
                  author: "Katarzyna M.",
                  role: "mama 9-latki"
                },
                {
                  text: "Świetne jako rozgrzewka przed odrabianiem lekcji. Polecam!",
                  author: "Tomasz K.",
                  role: "tata 11-latka"
                },
                {
                  text: "Proste, praktyczne i dzieci się nie nudzą. Dokładnie tego szukałam.",
                  author: "Anna P.",
                  role: "nauczycielka"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-soft-blue/20">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-honey fill-honey" />
                    ))}
                  </div>
                  <p className="text-foreground italic mb-4">"{testimonial.text}"</p>
                  <p className="text-sm font-semibold text-foreground-dark">{testimonial.author}</p>
                  <p className="text-xs text-warm-gray">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 border-t border-soft-blue/20 bg-white/50">
        <div className="container mx-auto px-4 text-center text-sm text-warm-gray">
          <p>&copy; 2025 Paulina od Matematyki. Wszelkie prawa zastrzeżone.</p>
          <p className="mt-2">
            <a href="/polityka-prywatnosci" className="hover:text-green transition-colors">
              Polityka prywatności
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
