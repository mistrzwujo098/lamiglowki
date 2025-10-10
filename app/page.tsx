'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, BookOpen, Users, Award, Clock, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { assetPath } from '@/lib/asset-path';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'problem', 'solution', 'benefits', 'for-who', 'inside', 'examples', 'pakiety', 'faq', 'author'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const packages = [
    {
      name: 'Pakiet startowy',
      price: '59 zł + 9 zł dostawa',
      popular: false,
      features: [
        'Książka w formie papierowej (wysyłka po 12 listopada)',
        'Certyfikat imienny dla dziecka',
        'Kilka rozwiązań video'
      ],
      value: 'Podstawowy',
      link: 'https://skutecznekorepetycje.salescrm.pl/cart/add_product/18215'
    },
    {
      name: 'Pakiet korzystny',
      price: '119 zł',
      popular: true,
      features: [
        '2× książka drukowana (dziecko + prezent/rodzeństwo) - wysyłka po 12 listopada',
        'Certyfikat imienny dla dziecka',
        'Kilka rozwiązań video',
        'eBook do wydrukowania',
        'Darmowa dostawa'
      ],
      value: 'Najpopularniejszy',
      link: 'https://skutecznekorepetycje.salescrm.pl/cart/add_product_set/3723'
    },
    {
      name: 'Pakiet najlepszy',
      price: '159 zł',
      popular: false,
      features: [
        '📚 3 KSIĄŻKI DRUKOWANE:',
        '  • 2× Łamigłówki dla bystrej główki (dziecko + prezent/rodzeństwo)',
        '  • "Wierszyki z Matematyki - Ucz się matematyki przez zabawę"',
        '(wysyłka po 12 listopada)',
        'Certyfikat imienny dla dziecka',
        'Kilka rozwiązań video',
        'eBook do wydrukowania',
        'Rozwiązania video wszystkich zagadek',
        'eBook z dodatkowymi zagadkami dla utrwalenia',
        'Darmowa dostawa'
      ],
      value: 'Kompletny',
      link: 'https://skutecznekorepetycje.salescrm.pl/cart/add_product_set/3724'
    }
  ];

  const benefits = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Rozwija logiczne myślenie',
      description: '15 minut dziennie trenuje mózg jak najlepsza siłownia dla umysłu'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Wspólny czas bez ekranu',
      description: 'Buduj więzi rodzinne przy rozwiązywaniu zagadek razem z dzieckiem'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Konkurencja dla AI',
      description: 'Rozwija kreatywność i nieszablonowe myślenie - umiejętności przyszłości'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Cierpliwość i wytrwałość',
      description: 'Uczy, że sukces wymaga czasu i że błędy to część drogi do celu'
    }
  ];

  const faqItems = [
    {
      q: 'Dla jakiego wieku jest książka?',
      a: 'Większość zagadek może rozwiązać zarówno kilkuletnie dziecko, jak i osoba dorosła. Książka jest podzielona na trzy poziomy trudności (★, ★★, ★★★). Niektóre zagadki dziecko rozwiąże szybciej niż dorosły, więc wiek nie do końca ma znaczenie.'
    },
    {
      q: 'Co jeśli dziecko nie lubi matematyki?',
      a: 'Ta książka to nie tradycyjna matematyka! To zagadki pełne magii, humoru, smoków i ciasteczek - dzieci uwielbiają takie wyzwania.'
    },
    {
      q: 'Kiedy otrzymam książkę/zamówienie?',
      a: 'Książka w formie papierowej zostanie wysłana po 12 listopada. Materiały cyfrowe (video, ebooki) otrzymasz przed wysyłką fizyczną.'
    },
    {
      q: 'Co jeśli mamy mało czasu?',
      a: 'Wystarczy 10-15 minut dziennie. Krótkie sesje dają lepsze efekty niż długie maratony. Możecie też rozwiązywać zagadki w dowolnej kolejności.'
    },
    {
      q: 'Czy mogę zwrócić książkę?',
      a: 'Tak! Masz 14 dni od otrzymania książki na zwrot bez podania przyczyny.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <div className="bg-gradient-to-r from-pink via-honey to-green text-foreground-dark py-3 px-4 text-center font-semibold text-sm md:text-base sticky top-0 z-50 shadow-md">
        🎯 PRZEDSPRZEDAŻ • Zamów teraz w najlepszej cenie • Wysyłka po 12 listopada 📦
      </div>

      {/* Side Navigation */}
      <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <ul className="space-y-4">
          {[
            { id: 'hero', label: 'Start' },
            { id: 'problem', label: 'Problem' },
            { id: 'solution', label: 'Rozwiązanie' },
            { id: 'benefits', label: 'Korzyści' },
            { id: 'for-who', label: 'Dla kogo' },
            { id: 'inside', label: 'Zawartość' },
            { id: 'examples', label: 'Przykłady' },
            { id: 'pakiety', label: 'Pakiety' },
            { id: 'faq', label: 'FAQ' },
            { id: 'author', label: 'Autor' },
          ].map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block group relative transition-all duration-300 ${
                  activeSection === section.id ? 'scale-110' : ''
                }`}
              >
                <span
                  className={`absolute right-full mr-3 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeSection === section.id
                      ? 'opacity-100 translate-x-0 bg-green text-white'
                      : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-foreground-dark text-white'
                  }`}
                >
                  {section.label}
                </span>
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-green border-green scale-125'
                      : 'bg-white border-foreground-dark/30 group-hover:border-green group-hover:scale-110'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-background via-ivory to-cream">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60"></div>

        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Left Content */}
            <motion.div variants={fadeInUp} className="space-y-6 md:space-y-8">
              <div className="inline-block bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full border border-green/20 shadow-sm">
                <p className="text-sm font-semibold text-foreground-dark">🎉 Przedsprzedaż - ograniczona liczba egzemplarzy</p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground-dark">
                Łamigłówki dla bystrej główki
              </h1>

              <p className="text-lg md:text-xl text-foreground">
                15 minut dziennie = lepsza logika, koncentracja i wspólny czas bez ekranu
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href="#pakiety"
                  className="bg-foreground-dark hover:bg-foreground text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 border-2 border-honey"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Zamów w przedsprzedaży
                </motion.a>

              </div>

              <div className="flex flex-col gap-4 pt-6">
                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm border border-soft-blue/20 whitespace-nowrap">
                    <span className="text-green text-sm sm:text-base">✓</span>
                    <span className="text-foreground-dark font-semibold">Dla osób w wieku 8-99 lat</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm border border-soft-blue/20 whitespace-nowrap">
                    <span className="text-green text-sm sm:text-base">📚</span>
                    <span className="text-foreground-dark font-semibold">120 zagadek</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm border border-soft-blue/20 whitespace-nowrap">
                    <span className="text-honey text-sm sm:text-base">📦</span>
                    <span className="text-foreground-dark font-semibold">Wysyłka po 12 listopada</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              variants={fadeInUp}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={assetPath("/images/okladka-przodem.webp")}
                    alt="Łamigłówki dla bystrej główki - okładka książki"
                    width={500}
                    height={700}
                    className="drop-shadow-2xl"
                    priority
                    quality={95}
                  />
                </motion.div>

                {/* Dekoracyjne elementy - subtelniejsze */}
                <motion.div
                  className="absolute -top-6 -right-6 w-32 h-32 bg-pink/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-40 h-40 bg-green/15 rounded-full blur-3xl"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Owce dekoracyjne */}
                <motion.div
                  className="absolute -top-8 -left-12 w-16 h-16 opacity-60"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image src={assetPath("/images/1.webp")} alt="" width={64} height={64} className="rounded-full" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-8 w-20 h-20 opacity-70"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Image src={assetPath("/images/1.webp")} alt="" width={80} height={80} className="rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Expansion - Czy masz dość...? */}
      <section id="problem" className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Dekoracyjne ilustracje */}
        <motion.div
          className="absolute top-20 right-5 w-20 h-20 md:w-32 md:h-32 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={assetPath("/images/4.webp")} alt="" width={128} height={128} className="rounded-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-5 w-24 h-24 opacity-10"
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={assetPath("/images/5.webp")} alt="" width={96} height={96} className="rounded-full" />
        </motion.div>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-8 text-center text-foreground-dark"
            >
              Czy masz <span className="text-pink">dość</span> wieczornych{' '}
              <motion.span
                className="text-honey inline-block"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                kłótni
              </motion.span>{' '}
              o tablet?
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-6 text-lg">
              <motion.div
                className="bg-gradient-to-r from-red-50/80 to-red-100/50 p-8 rounded-3xl border-l-4 border-red-400 transform hover:scale-[1.02] transition-all"
                whileHover={{ x: 5 }}
              >
                <p className="font-bold text-foreground-dark mb-3 text-xl flex items-center gap-2">
                  <span className="text-3xl">😤</span> "Oddaj ten tablet!"
                </p>
                <p className="text-foreground leading-relaxed">
                  Codziennie to samo. Dziecko przyklejone do ekranu, a Ty czujesz się jak zły policjant.
                  <strong className="text-foreground-dark"> Wieczory kończą się płaczem i frustracją z obu stron.</strong>
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-orange-50/80 to-orange-100/50 p-8 rounded-3xl border-l-4 border-orange-400 transform hover:scale-[1.02] transition-all"
                whileHover={{ x: 5 }}
                transition={{ delay: 0.1 }}
              >
                <p className="font-bold text-foreground-dark mb-3 text-xl flex items-center gap-2">
                  <span className="text-3xl">⏰</span> Gubisz cenny czas rozwoju
                </p>
                <p className="text-foreground leading-relaxed">
                  Wiesz, że pierwsze lata to <span className="font-semibold text-foreground-dark">złoty czas dla rozwoju mózgu</span>.
                  A one przesuwają palcem po TikToku zamiast trenować logiczne myślenie.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-yellow-50/80 to-yellow-100/50 p-8 rounded-3xl border-l-4 border-yellow-500 transform hover:scale-[1.02] transition-all"
                whileHover={{ x: 5 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-bold text-foreground-dark mb-3 text-xl flex items-center gap-2">
                  <span className="text-3xl">🎯</span> Matematyka = stres
                </p>
                <p className="text-foreground leading-relaxed">
                  "To nudne!", "Nie umiem!", "Nie chcę!" - każda praca domowa to walka.
                  <strong className="text-foreground-dark"> A w przyszłości matematyka będzie jeszcze ważniejsza...</strong>
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-16 text-center bg-gradient-to-br from-beige/50 to-cream p-10 rounded-3xl border-2 border-soft-blue/30"
            >
              <p className="text-3xl text-foreground-dark font-bold mb-4">
                Wiem, jak się czujesz. Też tam byłam. 💙
              </p>
              <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
                Jako nauczycielka widziałam setki rodzin w tej samej sytuacji.
                <br /><br />
                <span className="font-bold text-foreground-dark text-2xl bg-gradient-to-r from-honey/20 to-green/20 px-4 py-2 rounded-lg inline-block">
                  Ale co gdyby istniał sposób, żeby zamienić te wieczorne kłótnie na wspólny, jakościowy czas?
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mechanizm Różnicujący - DLACZEGO TO DZIAŁA */}
      <section id="solution" className="py-20 md:py-32 bg-gradient-to-br from-beige/30 via-ivory to-cream relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-pink/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-6 text-center text-foreground-dark leading-tight"
            >
              Dlaczego tradycyjne metody{' '}
              <motion.span
                className="text-pink relative inline-block"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <span className="line-through decoration-4">nie działają</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-pink"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.span>
              ?
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-2xl text-center text-foreground mb-16 font-semibold">
              Problem nie tkwi w dziecku. <span className="text-honey">Problem tkwi w metodzie.</span>
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                variants={fadeInUp}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border-2 border-red-200/60 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100/50 rounded-full -mr-12 -mt-12" />
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
                  <span className="text-4xl">❌</span> Tradycyjne ćwiczenia z matmy
                </h3>
                <ul className="space-y-4 text-foreground-dark">
                  {[
                    'Nudne, powtarzalne zadania',
                    'Kojarzą się ze szkołą i stresem',
                    'Dziecko czuje presję "musi umieć"',
                    'Brak elementu zabawy i odkrywania'
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-red-500 text-xl flex-shrink-0">✗</span>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-green-50 to-green-100/70 p-8 rounded-3xl border-3 border-green-400/80 shadow-2xl relative overflow-hidden group"
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-green-200/40 rounded-full -mr-16 -mt-16"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-3 relative z-10">
                  <span className="text-4xl">✓</span> Metoda Łamigłówek™
                </h3>
                <ul className="space-y-4 text-foreground-dark relative z-10">
                  {[
                    { icon: '🎭', text: '<strong>Intrygujące historie</strong> - żabki, smoki, ciasteczka' },
                    { icon: '🌈', text: '<strong>Zero presji</strong> - to zabawa, nie lekcja' },
                    { icon: '✨', text: '<strong>Satysfakcja z odkrycia</strong> - "Sam to wymyśliłem!"' },
                    { icon: '👨‍👩‍👧', text: '<strong>Wspólny czas</strong> - rodzic + dziecko razem' }
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-12 rounded-3xl shadow-2xl border-3 border-honey/60 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-honey/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-3xl font-bold text-center text-foreground-dark mb-8 relative z-10">
                🧠 Sekret Metody Łamigłówek™
              </h3>
              <div className="prose prose-lg max-w-none text-foreground relative z-10">
                <p className="text-center mb-8 text-2xl">
                  <strong className="text-honey bg-honey/10 px-4 py-2 rounded-lg inline-block">
                    NIE ucząc matematyki... uczysz logicznego myślenia.
                  </strong>
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  Kiedy dziecko rozwiązuje łamigłówkę o żabkach i komarach, <strong className="text-foreground-dark">nie wie że trenuje te same umiejętności co przy równaniach</strong>.
                  <br /><br />
                  Ale efekt? <span className="text-2xl font-bold text-green-700">Mózg się rozwija, a dziecko... się bawi!</span>
                </p>
                <motion.div
                  className="text-center text-xl font-bold text-green-700 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl mt-6 border-2 border-green-300"
                  whileHover={{ scale: 1.05 }}
                >
                  💪 To jak siłownia dla mózgu, ale zamiast hantli - kolorowe ilustracje i ciekawe historie.
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Dekoracyjne owce w tle */}
        <div className="absolute top-10 left-10 w-24 h-24 opacity-10">
          <Image src={assetPath("/images/1.webp")} alt="" width={96} height={96} className="rounded-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-32 h-32 opacity-10">
          <Image src={assetPath("/images/1.webp")} alt="" width={128} height={128} className="rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 text-foreground-dark">
              Dlaczego warto?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-warm-gray max-w-2xl mx-auto">
              W erze sztucznej inteligencji najważniejsze stają się umiejętności, których nie zastąpi żadna maszyna
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border-2 border-soft-blue/20 hover:border-green/40 group"
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="text-green mb-6 inline-block p-4 bg-green/10 rounded-2xl group-hover:bg-green/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-foreground-dark">{benefit.title}</h3>
                <p className="text-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Who / Not For Who Section */}
      <section id="for-who" className="py-20 md:py-32 bg-gradient-to-br from-ivory via-cream to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-center text-foreground">
              Dla osób w wieku 8-99 lat
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-center text-foreground-dark mb-12 font-semibold">
              Idealna dla każdego, kto lubi ruszyć głową!
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Dla kogo */}
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-xl border-2 border-green/30 relative overflow-hidden"
                whileHover={{ borderColor: "rgba(149, 181, 84, 0.5)" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-xl font-bold mb-4 text-green relative">
                  Ta książka to nie tylko zabawa dla dzieci — to trening kreatywnego myślenia dla całej rodziny.
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green text-xl">✓</span>
                    <div>
                      <strong className="text-foreground-dark">Dzieci od 8 lat</strong>
                      <p className="text-foreground text-sm">Nauka logicznego myślenia przez zabawę</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green text-xl">✓</span>
                    <div>
                      <strong className="text-foreground-dark">Rodzice</strong>
                      <p className="text-foreground text-sm">Sposób na wspólny czas bez telefonów i tabletów</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green text-xl">✓</span>
                    <div>
                      <strong className="text-foreground-dark">Dorośli</strong>
                      <p className="text-foreground text-sm">Idealny reset dla mózgu po pracy i ćwiczenie nieszablonowego myślenia</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green text-xl">✓</span>
                    <div>
                      <strong className="text-foreground-dark">Nauczyciele</strong>
                      <p className="text-foreground text-sm">Gotowy zestaw rozgrzewek, które ożywią każdą lekcję</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-gradient-to-br from-green/10 to-beige/30 rounded-xl border border-green/20">
                  <p className="text-sm text-foreground-dark">
                    <strong>Rozwiązuj w dowolnym momencie:</strong> w podróży, w aucie, przy kawie lub przed snem.
                  </p>
                </div>
              </motion.div>

              {/* Nie dla kogo */}
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-warm-gray/20">
                <h3 className="text-2xl font-bold mb-6 text-warm-gray flex items-center gap-3">
                  <span className="text-3xl">⚠️</span>
                  Może nie być dla Ciebie, jeśli:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-warm-gray text-xl">×</span>
                    <div>
                      <p className="text-warm-gray">Unikasz łamigłówek jak ognia 😉</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-warm-gray text-xl">×</span>
                    <div>
                      <p className="text-warm-gray">Wolisz aplikacje, które same myślą za Ciebie</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-warm-gray text-xl">×</span>
                    <div>
                      <p className="text-warm-gray">Szukasz prostych zadań do mechanicznego wypełniania</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-warm-gray text-xl">×</span>
                    <div>
                      <p className="text-warm-gray">Nie chcesz dać się wciągnąć w zabawę, która naprawdę rozwija mózg</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section id="inside" className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Żabki jako dekoracja */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 opacity-20"
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={assetPath("/images/9.webp")} alt="" width={80} height={80} />
        </motion.div>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 text-center text-foreground">
              Co jest w środku?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-warm-gray text-center mb-12">
              Szczegółowa zawartość książki
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div variants={fadeInUp} className="text-center p-6 bg-cream rounded-2xl border border-soft-blue/30">
                <div className="text-5xl font-bold text-honey mb-2">120</div>
                <div className="text-lg font-semibold text-foreground-dark mb-2">Zagadek logicznych</div>
                <p className="text-sm text-foreground">Różne typy zadań: obrazkowe, słowne, przestrzenne, matematyczne</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6 bg-cream rounded-2xl border border-soft-blue/30">
                <div className="text-5xl font-bold text-green mb-2">3</div>
                <div className="text-lg font-semibold text-foreground-dark mb-2">Poziomy trudności</div>
                <p className="text-sm text-foreground">★ łatwe | ★★ średnie | ★★★ trudne</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6 bg-cream rounded-2xl border border-soft-blue/30">
                <div className="text-5xl font-bold text-honey mb-2">10-15</div>
                <div className="text-lg font-semibold text-foreground-dark mb-2">Minut na sesję</div>
                <p className="text-sm text-foreground">Idealna długość dla koncentracji dziecka</p>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-beige to-cream p-8 rounded-2xl border border-soft-blue/30">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Struktura książki:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-honey" />
                    Część 1: Rozgrzewka (★)
                  </h4>
                  <p className="text-warm-gray text-sm mb-4">Budowanie pewności siebie i zaufania do własnych umiejętności</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <Star className="w-5 h-5 text-honey" />
                    Część 2: Wyzwanie (★★)
                  </h4>
                  <p className="text-warm-gray text-sm mb-4">Rozwijanie strategii i nieszablonowego myślenia</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    Część 3: Mistrzostwo (★★★)
                  </h4>
                  <p className="text-warm-gray text-sm mb-4">Trening wytrwałości i głębokiej koncentracji dla prawdziwych łamigłówkowiczów</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">Bonus:</h4>
                  <ul className="text-sm text-warm-gray space-y-1">
                    <li>✓ Instrukcja dla rodziców</li>
                    <li>✓ Wskazówki dla nauczycieli</li>
                    <li>✓ Miejsca na notatki</li>
                    <li>✓ Certyfikat Bystrej Główki dla dziecka do wydrukowania</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Not Apps/Internet Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cream to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-foreground">
              Czym różni się od darmowych zagadek z internetu?
            </h2>
            <p className="text-lg text-warm-gray text-center mb-12">
              Tak, w internecie są zagadki za darmo. Ale czy naprawdę są darmowe?
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-3">
                  <span className="text-3xl">📱</span>
                  Aplikacje i internet
                </h3>
                <ul className="space-y-3 text-warm-gray">
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Reklamy i rozproszenie uwagi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Mikrotransakcje i ukryte koszty</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Notyfikacje i uzależnienie</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Czas przed ekranem</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Brak kontaktu rodzica z dzieckiem</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Losowa jakość treści</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-beige to-cream p-6 rounded-2xl shadow-xl border-2 border-green">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-3">
                  <span className="text-3xl">📖</span>
                  Ta książka
                </h3>
                <ul className="space-y-3 text-foreground">
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Zero reklam i rozpraszaczy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Jedna cena, wszystko w środku</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Pełna koncentracja na zadaniu</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Czas bez ekranu</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Wspólne rozwiązywanie, rozmowy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Przemyślana progresja trudności</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
              <p className="text-center text-foreground font-semibold mb-2">
                Dodatkowe korzyści fizycznej książki:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-warm-gray">
                <span>📝 Możliwość rysowania</span>
                <span>👀 Brak zmęczenia oczu</span>
                <span>🤝 Budowanie więzi</span>
                <span>♻️ Można przekazać dalej</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Before You Buy Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-center text-foreground">
              Zanim kupisz - jak dobrać poziom?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-warm-gray text-center mb-12">
              Nie musisz martwić się wyborem! Książka zawiera 3 poziomy, więc każde dziecko znajdzie coś dla siebie
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-cream to-background p-6 rounded-2xl border border-soft-blue/30">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-honey" />
                  <h3 className="text-xl font-bold text-foreground">Poziom ★</h3>
                </div>
                <p className="text-warm-gray mb-3"><strong>Dla kogo:</strong> Dzieci 8-12 lat lub starsze na rozgrzewkę</p>
                <p className="text-warm-gray mb-3"><strong>Cechy:</strong> Kolorowe, intuicyjne, wizualne zagadki</p>
                <p className="text-warm-gray text-sm italic">Buduje pewność siebie i zaufanie do własnych umiejętności</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-beige to-cream p-6 rounded-2xl border-2 border-honey">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-honey fill-honey" />
                  <Star className="w-6 h-6 text-honey" />
                  <h3 className="text-xl font-bold text-foreground">Poziom ★★</h3>
                </div>
                <p className="text-warm-gray mb-3"><strong>Dla kogo:</strong> Dzieci 12-16 lat</p>
                <p className="text-warm-gray mb-3"><strong>Cechy:</strong> Wymagają myślenia o krok dalej</p>
                <p className="text-warm-gray text-sm italic">Najbardziej uniwersalny poziom - tu spędzi się najwięcej czasu</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-ivory to-cream p-6 rounded-2xl border border-soft-blue/30">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-honey fill-honey" />
                  <Star className="w-6 h-6 text-honey fill-honey" />
                  <Star className="w-6 h-6 text-honey fill-honey" />
                  <h3 className="text-xl font-bold text-foreground">Poziom ★★★</h3>
                </div>
                <p className="text-warm-gray mb-3"><strong>Dla kogo:</strong> Młodzież 16+ lat (i rodzice!)</p>
                <p className="text-warm-gray mb-3"><strong>Cechy:</strong> Prawdziwe wyzwania logiczne</p>
                <p className="text-warm-gray text-sm italic">Niektóre zagadki mogą zająć kilka dni - i to jest OK!</p>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-beige to-cream p-8 rounded-2xl border border-soft-blue/30">
              <h3 className="text-2xl font-bold mb-4 text-foreground text-center">💡 Tip od Autorki</h3>
              <p className="text-warm-gray text-center mb-4">
                <strong>Nie musicie rozwiązywać po kolei!</strong> Otwórzcie książkę na losowej stronie i wybierzcie zagadkę,
                która Was najbardziej zaciekawi. Każda zagadka jest samodzielna.
              </p>
              <p className="text-center text-sm text-warm-gray italic">
                10 minut przed snem, w samochodzie czy podczas weekendowego śniadania - książka pasuje do każdej sytuacji
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Puzzle Examples Section */}
      <section id="examples" className="py-20 md:py-32 bg-gradient-to-br from-ivory via-white to-cream relative overflow-hidden">
        {/* Dekoracyjne ilustracje w tle */}
        <motion.div
          className="absolute top-10 left-10 w-24 h-24 opacity-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Image src={assetPath("/images/2.webp")} alt="" width={96} height={96} className="rounded-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 opacity-10"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Image src={assetPath("/images/3.webp")} alt="" width={128} height={128} className="rounded-full" />
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-center text-foreground">
              Przykładowe zagadki z książki
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-warm-gray text-center mb-12">
              Podejrzyj prawdziwe strony z książki - tak to wygląda w środku!
            </motion.p>

            {/* Real examples from the book */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
              {[
                { src: '/images/fragment1.webp', title: 'Fragment 1' },
                { src: '/images/fragment2.webp', title: 'Fragment 2' },
                { src: '/images/fragment3.webp', title: 'Fragment 3' },
                { src: '/images/fragment4.webp', title: 'Fragment 4' },
              ].map((example, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedImage(example.src)}
                >
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <Image
                      src={example.src}
                      alt={example.title}
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-white font-bold text-sm">Kliknij aby powiększyć</span>
                    </div>
                  </div>
                  <p className="text-center text-sm font-semibold text-foreground-dark">{example.title}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block bg-gradient-to-r from-honey/20 via-green/20 to-pink/20 px-8 py-4 rounded-2xl border-2 border-green/30">
                <p className="text-foreground-dark font-bold text-lg mb-2">
                  📚 To tylko 4 z 120 zagadek!
                </p>
                <p className="text-warm-gray text-sm">
                  Każda strona to nowa przygoda i sposób na rozwijanie umiejętności logicznych
                </p>
              </div>
            </motion.div>

            <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">
              Typy zagadek
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-3xl shadow-xl border-2 border-soft-blue/20 hover:border-green/40 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <span className="text-foreground-dark text-lg font-bold">Poziom 1</span>
                  </div>
                  <span className="text-xs bg-beige px-3 py-1 rounded-full text-foreground-dark font-medium">8-12 lat</span>
                </div>
                <div className="bg-gradient-to-br from-cream to-background p-8 rounded-2xl mb-6 min-h-40 flex items-center justify-center border border-soft-blue/20">
                  <p className="text-center text-foreground-dark font-medium leading-relaxed">
                    Jaki znak należy wstawić pomiędzy liczby 8 i 9, aby uzyskać liczbę większą od 8, ale mniejszą od 9?
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-3xl shadow-2xl border-2 border-pink/60 hover:border-pink transition-all transform hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <span className="text-foreground-dark text-lg font-bold">Poziom 2</span>
                  </div>
                  <span className="text-xs bg-pink/30 px-3 py-1 rounded-full text-foreground-dark font-medium">12-16 lat</span>
                </div>
                <div className="bg-gradient-to-br from-pink/10 to-beige/30 p-8 rounded-2xl mb-6 min-h-40 flex items-center justify-center border border-pink/20">
                  <p className="text-center text-foreground-dark font-medium leading-relaxed text-sm">
                    Masz do dyspozycji 2 wiadra – jedno o pojemności 3 litry, a drugie o pojemności 5 litrów – oraz kran.
                    Jak przy najmniejszej liczbie ruchów odmierzyć za pomocą wiader 4 litry wody?
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-3xl shadow-xl border-2 border-soft-blue/20 hover:border-honey/60 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <Star className="w-5 h-5 text-honey fill-honey" />
                    <span className="text-foreground-dark text-lg font-bold">Poziom 3</span>
                  </div>
                  <span className="text-xs bg-honey/30 px-3 py-1 rounded-full text-foreground-dark font-medium">16+ lat</span>
                </div>
                <div className="bg-gradient-to-br from-honey/10 to-background p-8 rounded-2xl mb-6 min-h-40 flex items-center justify-center border border-honey/20">
                  <p className="text-center text-foreground-dark font-medium leading-relaxed text-sm">
                    W pewnym dużym domu są 2 pomieszczenia połączone długim korytarzem. W pierwszym pomieszczeniu znajdują się 3 włączniki – jeden z nich włącza żarówkę, która jest w drugim pokoju.
                    Możesz przejść z pierwszego pomieszczenia do drugiego, ale nie możesz już wrócić. W jaki sposób stwierdzić, który z 3 włączników włącza żarówkę,
                    jeśli z pierwszego pomieszczenia nie widać, czy żarówka świeci się w drugim pokoju?
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-8">
              <p className="text-warm-gray">To tylko 3 z 120 zagadek w książce!</p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* For Teachers Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Dla nauczycieli i wychowawców
              </h2>
              <p className="text-lg text-warm-gray">
                Gotowe scenariusze lekcji i materiały dodatkowe
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-soft-blue" />
                    Pomoc dla nauczycieli
                  </h3>
                  <ul className="space-y-3 text-warm-gray">
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Szybka rozgrzewka na lekcję</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Zagadki do pracy w grupach</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Gotowy materiał na zastępstwo</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Inspiracja do zajęć rozwijających logiczne myślenie</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Users className="w-6 h-6 text-soft-blue" />
                    Licencje dla szkół
                  </h3>
                  <ul className="space-y-3 text-warm-gray">
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Rabaty hurtowe (10+ egz.)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Materiały do druku dla klasy</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Wsparcie metodyczne</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span>
                      <span>Faktura VAT dla szkół</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cream to-background p-6 rounded-xl border border-soft-blue/30">
                <h4 className="font-semibold text-foreground mb-3">Powiązanie z podstawą programową:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-warm-gray">
                  <div>
                    <strong className="text-foreground">Matematyka:</strong> rozumowanie, liczby, geometria, analiza danych
                  </div>
                  <div>
                    <strong className="text-foreground">Język polski:</strong> czytanie ze zrozumieniem, analiza tekstu
                  </div>
                  <div>
                    <strong className="text-foreground">Kompetencje:</strong> myślenie krytyczne, wytrwałość, współpraca
                  </div>
                  <div>
                    <strong className="text-foreground">Inne:</strong> informatyka, przyroda, logika
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="mailto:paulina@paulinaodmatematyki.com?subject=Zapytanie dla szkół"
                  className="inline-block bg-foreground-dark hover:bg-foreground text-white font-semibold px-8 py-4 rounded-full transition-all border-2 border-honey"
                >
                  Zapytaj o ofertę dla szkół
                </a>
                <p className="text-sm text-foreground mt-3">Odpowiadamy w 24h</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pakiety" className="py-20 md:py-32 bg-gradient-to-br from-background to-cream relative overflow-hidden">
        {/* Ilustracje dekoracyjne */}
        <motion.div
          className="absolute top-10 left-5 w-24 h-24 opacity-10"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Image src={assetPath("/images/1.webp")} alt="" width={96} height={96} className="rounded-full" />
        </motion.div>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-block bg-pink/20 px-6 py-2 rounded-full mb-4">
              <p className="text-sm font-semibold text-foreground-dark">🎯 PRZEDSPRZEDAŻ</p>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 text-foreground-dark">
              Wybierz swój pakiet
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-warm-gray">
              Zamów teraz w najlepszej cenie • Wysyłka po 12 listopada
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative bg-white rounded-2xl p-6 sm:p-8 border border-soft-blue/30 ${
                  pkg.popular ? 'ring-2 sm:ring-4 ring-pink shadow-2xl md:scale-105' : 'shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green to-green-alt text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                    ⭐ NAJPOPULARNIEJSZY
                  </div>
                )}

                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-beige to-cream text-foreground-dark px-4 py-1.5 rounded-full text-sm font-semibold border border-soft-blue/20">
                    💡 {pkg.value}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-foreground">{pkg.name}</h3>

                <div className="mb-6">
                  <div className="flex flex-col gap-3">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground-dark">{pkg.price}</span>
                    <span className="text-base text-green font-semibold">
                      💳 Kup teraz
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href={pkg.link} className={`block w-full py-4 rounded-full font-semibold transition-all text-center ${
                  pkg.popular
                    ? 'bg-foreground-dark hover:bg-foreground text-white shadow-lg hover:shadow-xl border-2 border-honey'
                    : 'bg-pink hover:bg-pink-hover text-foreground-dark border-2 border-pink hover:border-pink-hover'
                }`}>
                  Kup teraz
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12 space-y-4"
          >
            <p className="text-warm-gray">✓ Wysyłka po 12 listopada ✓ 14 dni na zwrot ✓ Materiały cyfrowe otrzymasz przed wysyłką fizyczną</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-gradient-to-br from-background via-ivory to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Najczęściej zadawane pytania
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.details
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-3xl shadow-md border-2 border-soft-blue/20 hover:border-green/30 transition-all group"
                  whileHover={{ scale: 1.01 }}
                >
                  <summary className="text-lg font-bold mb-0 text-foreground-dark cursor-pointer list-none flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="text-green text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-foreground leading-relaxed mt-4 pt-4 border-t border-soft-blue/20">{item.a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Author Section */}
      <section id="author" className="py-16 md:py-24 bg-gradient-to-br from-background to-beige relative overflow-hidden">
        {/* Dekoracyjne ilustracje */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 opacity-10 hidden md:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Image src={assetPath("/images/5.webp")} alt="" width={128} height={128} />
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Author photo */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={assetPath("/images/paulina-ksiazka.webp")}
                    alt="Paulina - autorka książki Łamigłówki dla bystrej główki"
                    width={500}
                    height={750}
                    className="rounded-3xl shadow-2xl"
                  />
                  {/* Dekoracyjne gwiazdki */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Image src={assetPath("/images/6.webp")} alt="" width={48} height={48} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right: Author info */}
              <motion.div
                variants={fadeInUp}
              >
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                  <h2 className="text-3xl font-bold mb-6 text-foreground-dark">O autorce</h2>
                  <div className="space-y-4 text-foreground">
                    <p>
                      Nazywam się <strong className="text-foreground-dark">Paulina</strong> i jestem pasjonatką matematyki i logicznego myślenia.
                      Jako dziecko uwielbiałam zagadki i teraz chcę tę pasję przekazać dalej.
                    </p>
                    <p>
                      Wierzę, że odwaga myślenia inaczej to jedna z najpiękniejszych cech człowieka.
                      W erze sztucznej inteligencji to właśnie kreatywność i nieszablonowe myślenie
                      będą najcenniejsze.
                    </p>
                    <p className="italic">
                      &ldquo;Ta książka to nie tylko zbiór zagadek. To wyprawa do świata, w którym matematyka
                      spotyka ciekawość i przygodę.&rdquo;
                    </p>
                    <p className="text-right font-semibold text-foreground-dark">— Paulina od Matematyki</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-cream via-beige to-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

        {/* Dekoracyjne ilustracje zagadek */}
        <motion.div
          className="absolute top-10 left-10 w-48 h-48 opacity-5 hidden lg:block"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <Image src={assetPath("/images/1.webp")} alt="" width={192} height={192} className="rounded-2xl" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 opacity-5 hidden lg:block"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <Image src={assetPath("/images/2.webp")} alt="" width={192} height={192} className="rounded-2xl" />
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground-dark leading-tight">
              Gotowi zamienić <span className="text-honey">ekrany</span> na <span className="text-green">rozmowy</span>?
            </h2>
            <p className="text-xl text-foreground mb-4">
              Zamów teraz w przedsprzedaży i ciesz się najlepszą ceną
            </p>
            <p className="text-base text-foreground mb-8 max-w-2xl mx-auto">
              📦 Wysyłka po 12 listopada • 🎁 Najlepsza oferta w przedsprzedaży • ⚡ Materiały cyfrowe od razu
            </p>
            <motion.a
              href="#pakiety"
              className="inline-block bg-foreground-dark hover:bg-foreground text-white font-bold text-lg px-16 py-5 rounded-full shadow-2xl transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-3 border-honey relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Tak! Chcę książkę 📚</span>
              <div className="absolute inset-0 bg-gradient-to-r from-honey/20 to-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
            <p className="text-sm text-foreground-dark mt-6 font-medium">
              ✓ 14 dni na zwrot • ✓ Bezpieczna płatność
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Łamigłówki dla bystrej główki</h3>
              <p className="text-sm opacity-80">Rozwijamy logiczne myślenie i kreatywność dzieci</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informacje</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Regulamin</a></li>
                <li><a href="#" className="hover:opacity-100">Polityka prywatności</a></li>
                <li><a href="#" className="hover:opacity-100">Wysyłka i zwroty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-sm opacity-80">paulina@paulinaodmatematyki.com</p>
              <p className="text-sm opacity-80 mt-2">Odpowiadamy w 24h</p>
            </div>
          </div>
          <div className="border-t border-cream/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 Paulina od Matematyki. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA for mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-2xl md:hidden z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <a
          href="#pakiety"
          className="block w-full bg-foreground-dark hover:bg-foreground text-white font-semibold text-center py-4 rounded-full shadow-lg border-2 border-honey"
        >
          Zamawiam książkę
        </a>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Zamknij"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Powiększony fragment"
                width={1200}
                height={1500}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
