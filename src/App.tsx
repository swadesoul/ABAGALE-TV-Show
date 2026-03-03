import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Calendar, ShoppingBag, UserPlus, Info, ChevronRight, Menu, X, Radio } from 'lucide-react';

// --- CONSTANTS & CONFIG ---
const AFFILIATE_URL = "https://abagale.live/auth?ref=ref_5b80_bdacf1";
const EMBED_URL = "https://abagale.live/watch/abagale-tv-mlrhmiqe?embed=1";
const CALENDAR_URL = "https://calendar.google.com/calendar/embed?src=PUBLIC_CALENDAR_ID&ctz=UTC&bgcolor=%231a1a1a&color=%23D97706";

// Placeholder Image IDs (Replace with Google Drive IDs as per instructions)
// Pattern: https://drive.google.com/uc?export=view&id=FILE_ID
const IMAGES = {
  hero: "https://picsum.photos/seed/cyberpunk-studio/1920/1080",
  about: "https://picsum.photos/seed/film-projector/1200/800",
  docs: "https://picsum.photos/seed/explorer-canyon/800/600",
  series: "https://picsum.photos/seed/penthouse-night/800/600",
  music: "https://picsum.photos/seed/stage-laser/800/600",
  store: "https://picsum.photos/seed/streetwear-hoodie/1200/800",
  logo: "https://picsum.photos/seed/abagale-logo/400/150", // Placeholder for the logo
};

// --- COMPONENTS ---

const SectionReveal = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.section>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A1A1A]/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bebas text-3xl tracking-wider text-amber-600">ABAGALE</span>
          <span className="font-oswald text-sm tracking-[0.3em] text-white/60 mt-1">TV</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-oswald text-sm tracking-widest uppercase">
          <a href="#theater" className="hover:text-amber-500 transition-colors">Theater</a>
          <a href="#about" className="hover:text-amber-500 transition-colors">Manifesto</a>
          <a href="#lineup" className="hover:text-amber-500 transition-colors">Lineup</a>
          <a href="#schedule" className="hover:text-amber-500 transition-colors">Schedule</a>
          <a href={AFFILIATE_URL} className="bg-amber-600 px-6 py-2 rounded-full hover:bg-amber-500 transition-all shadow-glow-amber">Join Network</a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A1A1A] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 font-oswald uppercase tracking-widest text-center">
              <a href="#theater" onClick={() => setIsOpen(false)}>Theater</a>
              <a href="#about" onClick={() => setIsOpen(false)}>Manifesto</a>
              <a href="#lineup" onClick={() => setIsOpen(false)}>Lineup</a>
              <a href="#schedule" onClick={() => setIsOpen(false)}>Schedule</a>
              <a href={AFFILIATE_URL} className="text-amber-500">Join Network</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [latestReleases, setLatestReleases] = useState<any[]>([]);

  // CMS Logic: Google Sheets Integration
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        // Replace YOUR_SHEET_ID with actual ID
        const SHEET_ID = 'YOUR_SHEET_ID';
        const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
        
        // Note: This is a pattern. It will fail without a real ID.
        // const response = await fetch(SHEET_URL);
        // const text = await response.text();
        // const json = JSON.parse(text.substring(47).slice(0, -2));
        // setLatestReleases(json.table.rows);
        
        // Mock data for demonstration
        setLatestReleases([
          { title: "Neon Metropolis", category: "Documentary", img: "https://picsum.photos/seed/neon/400/250" },
          { title: "The Last Frame", category: "Original Series", img: "https://picsum.photos/seed/frame/400/250" },
          { title: "Sonic Ascension", category: "Music Video", img: "https://picsum.photos/seed/sonic/400/250" },
        ]);
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      }
    };
    fetchSheetData();
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Nav />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="Cinematic Studio" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1A1A1A]"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-bebas text-6xl md:text-9xl tracking-tighter leading-none text-glow-amber mb-4"
          >
            THE AFTERMOVIE <br /> NEVER ENDS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-oswald text-lg md:text-2xl tracking-[0.4em] text-white/80 mb-10 uppercase"
          >
            ABAGALE TV: AUDIO VISUAL ASCENSION ⚡️
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a 
              href="#theater" 
              className="group relative inline-flex items-center gap-3 bg-amber-600 px-10 py-4 rounded-full font-oswald tracking-widest uppercase text-lg overflow-hidden transition-all hover:bg-amber-500 shadow-glow-amber"
            >
              <Play size={20} fill="currentColor" />
              <span>Watch Live</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ChevronRight className="rotate-90" size={32} />
        </div>
      </section>

      {/* 2. LIVE THEATER FRAME */}
      <SectionReveal id="theater" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-4 bg-amber-600/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative grain-overlay rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/50">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="font-oswald text-xs tracking-widest uppercase text-red-500 font-bold">Live</span>
              </div>
            </div>

            <div className="aspect-video w-full">
              <iframe 
                src={EMBED_URL} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; encrypted-media"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="font-bebas text-4xl tracking-wide text-amber-500">Now Premiering</h2>
              <p className="font-oswald text-white/60 tracking-widest uppercase text-sm">Abagale TV Global Broadcast</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors border border-white/10">
                <Info size={20} />
              </button>
              <a href={AFFILIATE_URL} className="bg-amber-600/10 text-amber-500 border border-amber-600/30 px-6 py-2 rounded-full font-oswald text-sm tracking-widest uppercase hover:bg-amber-600/20 transition-all">
                Join Discussion
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* 3. ABOUT SECTION (THE MANIFESTO) */}
      <SectionReveal id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <span className="font-bebas text-[20vw] whitespace-nowrap">ABAGALE TV ABAGALE TV</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={IMAGES.about} 
                alt="Manifesto Visual" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <h3 className="font-bebas text-6xl md:text-8xl tracking-tight leading-none">THE <br /> <span className="text-amber-600">MANIFESTO</span></h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80">
              ABAGALE TV serves as the premier flagship destination for the network, offering a sophisticated curation of high-impact documentaries, premium television series, and cutting-edge music videos.
            </p>
            <div className="pt-6">
              <a href={AFFILIATE_URL} className="group flex items-center gap-4 font-oswald tracking-[0.3em] uppercase text-amber-500">
                <span>Explore the Network</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* 4. PROGRAMMING CATEGORIES (THE LINEUP) */}
      <SectionReveal id="lineup" className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl md:text-7xl tracking-wide mb-4">THE LINEUP</h2>
            <div className="h-1 w-24 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Documentaries", img: IMAGES.docs, desc: "Epic scales & human stories." },
              { title: "Original Series", img: IMAGES.series, desc: "Premium narrative experiences." },
              { title: "Music Videos", img: IMAGES.music, desc: "Audio visual ascension." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#1A1A1A]"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className="font-bebas text-4xl tracking-wider mb-2">{item.title}</h4>
                  <p className="font-oswald text-white/60 text-sm tracking-widest uppercase mb-6">{item.desc}</p>
                  <a href={AFFILIATE_URL} className="inline-flex items-center gap-2 text-amber-500 font-oswald text-xs tracking-[0.2em] uppercase">
                    Browse Category <ChevronRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* 5. SCHEDULING */}
      <SectionReveal id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-wide mb-2">APPOINTMENT <br /> VIEWING</h2>
              <p className="font-oswald text-amber-500 tracking-[0.3em] uppercase">Never miss a premiere</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <Calendar className="text-amber-500" size={20} />
              <span className="font-oswald text-sm tracking-widest uppercase">Sync to Device</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <iframe 
              src={CALENDAR_URL} 
              style={{ borderWidth: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0" 
              scrolling="no"
              className="w-full grayscale invert opacity-80 hover:opacity-100 transition-opacity duration-500"
            ></iframe>
          </div>
        </div>
      </SectionReveal>

      {/* 8. DYNAMIC RELEASES (CMS) */}
      <SectionReveal className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-bebas text-4xl md:text-6xl tracking-wide">LATEST RELEASES</h2>
            <a href={AFFILIATE_URL} className="font-oswald text-amber-500 text-sm tracking-widest uppercase border-b border-amber-500/30 pb-1">View All</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestReleases.map((release, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={release.img} 
                    alt={release.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <span className="font-oswald text-[10px] tracking-[0.3em] uppercase text-amber-500 mb-2 block">{release.category}</span>
                  <h5 className="font-bebas text-2xl tracking-wide mb-4">{release.title}</h5>
                  <a href={AFFILIATE_URL} className="flex items-center justify-between text-white/40 group-hover:text-white transition-colors">
                    <span className="text-xs font-oswald tracking-widest uppercase">Watch Now</span>
                    <Play size={14} fill="currentColor" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* 6. STORE SECTION (COLLECTIBLES) */}
      <SectionReveal className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tight leading-none">MEDIA IN <br /> <span className="text-amber-600">MOTION</span></h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center text-amber-500">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="font-oswald tracking-widest uppercase text-sm">Festival Circuit</h4>
                  <p className="text-xs text-white/40">Mainstage Energy & Streetwear</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center text-amber-500">
                  <Radio size={24} />
                </div>
                <div>
                  <h4 className="font-oswald tracking-widest uppercase text-sm">Hyperspace</h4>
                  <p className="text-xs text-white/40">Galactic Travel Essentials</p>
                </div>
              </div>
            </div>
            <a href={AFFILIATE_URL} className="inline-block bg-white text-black px-10 py-4 rounded-full font-oswald tracking-widest uppercase text-sm hover:bg-amber-500 hover:text-white transition-all">
              Shop Collectibles
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-amber-600/10 blur-[100px] rounded-full"></div>
            <img 
              src={IMAGES.store} 
              alt="Merch Lifestyle" 
              className="relative rounded-2xl border border-white/10 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </SectionReveal>

      {/* 7. JOIN NOW SECTION (THE NETWORK) */}
      <SectionReveal className="py-32 px-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-amber-600/20 blur-[120px] rounded-full"></div>
          
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-16 border border-white/10 text-center space-y-10">
            <div className="space-y-4">
              <h2 className="font-bebas text-5xl md:text-7xl tracking-wide">JOIN THE ABAGALE NETWORK</h2>
              <p className="font-oswald text-white/60 tracking-[0.2em] uppercase max-w-xl mx-auto">
                Gain exclusive access to premieres, behind-the-scenes content, and the global creator community.
              </p>
            </div>

            <form 
              action={AFFILIATE_URL} 
              method="POST" 
              className="max-w-md mx-auto space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = AFFILIATE_URL;
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <input 
                  type="text" 
                  placeholder="NAME" 
                  className="bg-black/40 border border-white/10 rounded-xl px-6 py-4 font-oswald tracking-widest text-sm focus:outline-none focus:border-amber-600 transition-colors"
                  required
                />
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  className="bg-black/40 border border-white/10 rounded-xl px-6 py-4 font-oswald tracking-widest text-sm focus:outline-none focus:border-amber-600 transition-colors"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-amber-600 py-4 rounded-xl font-oswald tracking-[0.3em] uppercase text-sm hover:bg-amber-500 transition-all shadow-glow-amber flex items-center justify-center gap-2"
              >
                <UserPlus size={18} />
                <span>Sign Up Now</span>
              </button>
            </form>
            
            <p className="text-[10px] font-oswald tracking-widest text-white/30 uppercase">
              By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </SectionReveal>

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/5 bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="font-bebas text-4xl tracking-wider text-amber-600">ABAGALE</span>
                <span className="font-oswald text-sm tracking-[0.3em] text-white/60 mt-1">TV</span>
              </div>
              <p className="font-oswald text-[10px] tracking-[0.4em] text-white/40 uppercase">Audio Visual Ascension</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 font-oswald text-[10px] tracking-[0.3em] uppercase text-white/60">
              <a href="https://abagale.live/terms" className="hover:text-amber-500 transition-colors">Terms</a>
              <a href="https://abagale.live/privacy" className="hover:text-amber-500 transition-colors">Privacy</a>
              <a href="#theater" className="hover:text-amber-500 transition-colors">Broadcast</a>
              <a href={AFFILIATE_URL} className="hover:text-amber-500 transition-colors">Affiliate</a>
            </div>

            <a href={AFFILIATE_URL} className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-oswald text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
              Join Now
            </a>
          </div>

          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-[10px] font-oswald tracking-[0.5em] text-white/20 uppercase">
              Powered by ABAGALE &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
