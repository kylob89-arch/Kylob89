/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Type, 
  Eye, 
  Layout, 
  Copy, 
  Check, 
  Smartphone, 
  ShieldCheck, 
  Play, 
  TrendingUp,
  Settings2
} from 'lucide-react';

// --- Constants from User Guide ---
const COLORS = {
  WHITE: '#FFFFFF',
  GOLD: '#FFD700',
  BLACK: '#000000',
};

const FONTS = [
  { name: 'Montserrat Bold', value: 'font-montserrat', desc: 'Geometria, autorytet, spokój. Do sekwencji filozoficznych.' },
  { name: 'Bebas Neue', value: 'font-bebas', desc: 'Klasyk filmowy, jednowyrazowe strzały. Akcja i thriller.' },
  { name: 'Anton', value: 'font-anton', desc: 'Agresywny. Wyłącznie na finałowe CTA (klatki 18-21).' },
];

const GRADING_DATA = [
  { param: 'Exposure / Brightness', value: '-10 do -15', effect: 'Ściemnienie surowego materiału, fundament klimatu "dark".' },
  { param: 'Contrast', value: '+10 do +20', effect: 'Oddzielenie podmiotu od tła, nadanie trójwymiarowej głębi.' },
  { param: 'Highlights', value: '-20 do -50', effect: 'Odzyskanie struktury z jasnych partii nieba lub odblasków.' },
  { param: 'Shadows', value: '+5 do +10', effect: 'Zachowanie faktury w ciemnych fragmentach ekranu.' },
  { param: 'Saturation', value: '-5 do -15', effect: 'Redukcja nienaturalnych barw cyfrowych dla poważnego tonu.' },
  { param: 'HSL - Blues & Greens', value: 'Saturacja/Luma ↓', effect: 'Usunięcie zakłóceń tła i cyfrowego szumu kolorystycznego.' },
  { param: 'Sharpening & Vignette', value: '+10 / +5', effect: 'Uwypuklenie faktury na obrzeżach i skupienie uwagi na centrum.' },
];

const METADATA = {
  HASHTAGS: '#PoziomWyżej #Progres #Rozwój #Trening #Bieganie #Motywacja #Runmageddon #Forma #SystemProgresji',
  DESCRIPTION: '„Każdy progres zaczyna się od jednego kroku. Nie musisz być idealny. Ważne, żeby codziennie iść do przodu.”',
  CTA: 'Napisz START i zacznij swój progres.',
};

// --- Subcomponents ---

const SafeZoneOverlay = () => (
  <div className="absolute inset-0 z-50 pointer-events-none select-none">
    {/* Top UI Area (20%) */}
    <div className="absolute top-0 left-0 w-full h-[18%] border-b border-red-500/30 bg-red-900/10 flex items-start justify-center pt-2">
      <span className="text-[10px] uppercase font-bold text-red-400 bg-black/50 px-2 py-0.5 rounded">Native UI / Header</span>
    </div>
    
    {/* Bottom UI Area (25%) */}
    <div className="absolute bottom-0 left-0 w-full h-[25%] border-t border-red-500/30 bg-red-900/10 flex items-end justify-center pb-2">
      <span className="text-[10px] uppercase font-bold text-red-400 bg-black/50 px-2 py-0.5 rounded">Native UI / Captions & Music</span>
    </div>

    {/* Right Interaction Area (15%) */}
    <div className="absolute top-0 right-0 h-full w-[15%] border-l border-red-500/30 bg-red-900/10 flex items-center justify-center">
      <span className="text-[10px] uppercase font-bold text-red-400 bg-black/50 px-2 py-0.5 rounded rotate-90 whitespace-nowrap">Interactions</span>
    </div>

    {/* Profile Grid Guide (3:4) */}
    <div className="absolute top-[12.5%] left-0 w-full h-[75%] border-y-[2px] border-blue-500/40 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full aspect-[3/4] border-x-[2px] border-blue-500/40 flex items-center justify-center">
           <span className="text-[10px] uppercase font-bold text-blue-400 bg-black/60 px-2 py-1 rounded">Profile Grid Safe Area (3:4)</span>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('typo');
  const [previewText, setPreviewText] = useState('POZIOM WYŻEJ');
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Trigger animation
  const playPreview = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  };

  useEffect(() => {
    playPreview();
  }, [previewText, selectedFont]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-gold w-6 h-6" />
            <h1 className="text-3xl font-black uppercase tracking-tighter">Poziom Wyżej</h1>
          </div>
          <p className="text-gray-400 text-sm max-w-xl">
            Oficjalny panel kreatywny dla strategii "Dark Cinematic". 
            Zoptymalizuj typografię, grading i zasięgi swoich reelsów.
          </p>
        </div>
        
        <div className="flex bg-card-bg p-1 rounded-xl border border-white/5">
          {[
            { id: 'typo', icon: Type, label: 'Typografia' },
            { id: 'grading', icon: Camera, label: 'Grading' },
            { id: 'strategy', icon: Smartphone, label: 'Dystrybucja' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white shadow-lg shadow-black/20' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Panel */}
        <div className="lg:col-span-5 space-y-8">
          
          {activeTab === 'typo' && (
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card-bg p-6 rounded-2xl border border-white/5 space-y-6">
                <h2 className="text-xl flex items-center gap-2">
                  <Settings2 size={20} className="text-gold" />
                  Konfiguracja Napisów
                </h2>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Tekst do podglądu</label>
                  <input 
                    type="text" 
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Wpisz słowo klucz..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Wybór Fontu</label>
                  <div className="grid grid-cols-1 gap-2">
                    {FONTS.map(font => (
                      <button
                        key={font.value}
                        onClick={() => setSelectedFont(font.value)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          selectedFont === font.value 
                            ? 'bg-gold/10 border-gold/40 text-white' 
                            : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <span className={`block text-lg ${font.value}`}>{font.name}</span>
                        <span className="text-[10px] text-gray-500 block mt-1">{font.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <Layout size={16} className="text-gold" />
                    <span className="text-sm">Pokaż Safe Zones</span>
                  </div>
                  <button 
                    onClick={() => setShowSafeZones(!showSafeZones)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${showSafeZones ? 'bg-gold' : 'bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showSafeZones ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>

                {/* Sound Sync Note */}
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <Play size={10} className="text-gold" />
                    Synchronizacja Audio (M83 - Outro)
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Klatka 15: "Beat Drop" - twarde cięcie napisu „którzy stoją w miejscu.” bez animacji łagodnego wejścia.
                  </p>
                </div>

                <button 
                  onClick={playPreview}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gold transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={18} fill="currentColor" />
                  Testuj Animację
                </button>
              </div>
            </motion.section>
          )}

          {activeTab === 'grading' && (
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card-bg p-6 rounded-2xl border border-white/5 space-y-6"
            >
              <h2 className="text-xl flex items-center gap-2">
                <Camera size={20} className="text-gold" />
                Color Grading Master
              </h2>
              <div className="space-y-3">
                {GRADING_DATA.map((item, idx) => (
                  <div key={idx} className="group p-4 bg-black/30 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-tighter">{item.param}</span>
                      <span className="text-gold font-mono text-sm">{item.value}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                      {item.effect}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] text-blue-300 leading-relaxed uppercase tracking-widest font-bold">
                  Pro tip: Krzywa "S-Curve" jest kluczowa dla uzyskania efektu "faded dark look".
                </p>
              </div>
            </motion.section>
          )}

          {activeTab === 'strategy' && (
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Distribution Strategy Tabs */}
              <div className="bg-card-bg p-6 rounded-2xl border border-white/5 space-y-6">
                <h2 className="text-xl flex items-center gap-2">
                   <TrendingUp size={20} className="text-gold" />
                   Dystrybucja & SEO
                </h2>

                <div className="space-y-6">
                  {/* Hashtags with Level Labels */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Hashtag Ekosystem</label>
                      <button 
                        onClick={() => copyToClipboard(METADATA.HASHTAGS, 'h')}
                        className="text-gold text-[10px] flex items-center gap-1 hover:underline"
                      >
                        {copied === 'h' ? <Check size={10} /> : <Copy size={10} />}
                        {copied === 'h' ? 'Skopiowano' : 'Kopiuj'}
                      </button>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {METADATA.HASHTAGS.split(' ').map((tag, idx) => {
                          const isMacro = ['#Motywacja', '#Trening'].includes(tag);
                          const isMicro = ['#PoziomWyżej', '#SystemProgresji', '#Runmageddon'].includes(tag);
                          return (
                            <span key={idx} className={`text-[10px] px-2 py-1 rounded border ${
                              isMacro ? 'border-red-500/30 text-red-400 bg-red-900/10' : 
                              isMicro ? 'border-gold/30 text-gold bg-gold/5' : 
                              'border-white/10 text-gray-400'
                            }`}>
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                      <div className="grid grid-cols-3 gap-2 opacity-50">
                        <div className="text-[8px] uppercase tracking-tighter text-red-400">Level: Macro</div>
                        <div className="text-[8px] uppercase tracking-tighter text-gray-400">Level: Meso</div>
                        <div className="text-[8px] uppercase tracking-tighter text-gold">Level: Mikro</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Opis (Optimization Engine)</label>
                      <button 
                        onClick={() => copyToClipboard(METADATA.DESCRIPTION, 'd')}
                        className="text-gold text-[10px] flex items-center gap-1 hover:underline"
                      >
                        {copied === 'd' ? <Check size={10} /> : <Copy size={10} />}
                        {copied === 'd' ? 'Skopiowano' : 'Kopiuj'}
                      </button>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-gray-400 leading-relaxed italic">
                      {METADATA.DESCRIPTION}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Call To Action (Engagement Bait)</label>
                      <button 
                        onClick={() => copyToClipboard(METADATA.CTA, 'c')}
                        className="text-gold text-[10px] flex items-center gap-1 hover:underline"
                      >
                        {copied === 'c' ? <Check size={10} /> : <Copy size={10} />}
                        {copied === 'c' ? 'Skopiowano' : 'Kopiuj'}
                      </button>
                    </div>
                    <div className="bg-gold/10 p-3 rounded-xl border border-gold/20 text-xs text-gold font-bold">
                      {METADATA.CTA}
                    </div>
                    <p className="text-[9px] text-gray-500 italic mt-2">
                      *Predefiniowany komentarz "START" minimalizuje tarcie i zwiększa "Prędkość Interakcji" (Velocity).
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload settings reminder */}
              <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                  <Smartphone className="text-gold" size={16} />
                  Krytyczne ustawienia uploadu
                </h3>
                <ul className="space-y-3 text-[11px] text-gray-400">
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                    <strong>Android/iOS:</strong> Settings {">"} Your App & Media {">"} Data Usage {">"} Upload at highest quality (ON)
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1 shrink-0" />
                    <strong>Specyfikacja:</strong> MP4 / H.264 | 1080x1920 | 10-20 Mbps Bitrate
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1 shrink-0" />
                    <strong>Data Saver:</strong> Wyłącz w fazie uploadu, aby uniknąć agresywnej kompresji Meta.
                  </li>
                </ul>
              </div>
            </motion.section>
          )}

        </div>

        {/* Right Preview Viewport */}
        <div className="lg:col-span-7 sticky top-8 h-fit">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
              <Eye size={12} />
              Symulator Reels
            </div>
            
            {/* The Phone Frame */}
            <div className="relative w-full max-w-[360px] aspect-[9/16] bg-black rounded-[3rem] border-8 border-[#1a1a1a] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Background Plate */}
              <div className="absolute inset-0 bg-[#050505]">
                 <img 
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1000" 
                    alt="Cinematic Background" 
                    className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
              </div>

              {/* Safe Zone Layer */}
              {showSafeZones && <SafeZoneOverlay />}

              {/* Typography Preview */}
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center z-10">
                <AnimatePresence mode="wait">
                  {isAnimating && (
                    <motion.div
                      key={previewText + selectedFont}
                      initial={{ opacity: 0, scale: 1.15 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.33, 1, 0.68, 1], // Cinematic Ease-Out
                        opacity: { duration: 0.5 } 
                      }}
                      className={`text-white text-5xl md:text-6xl leading-tight uppercase text-shadow-cinematic ${selectedFont}`}
                    >
                      {previewText.split(' ').map((word, i) => (
                        <span key={i} className={word.toLowerCase() === 'progres' || word.toLowerCase() === 'krok' ? 'text-gold' : ''}>
                          {word}{' '}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fake Phone UI details */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl z-50" />
            </div>

            <p className="mt-6 text-[10px] text-gray-600 text-center uppercase tracking-widest max-w-[300px]">
              Symulacja stref bezpiecznych platformy Instagram. Tekst powinien znajdować się w czarnym obszarze bez pasków menu.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/10 pt-12 pb-12 w-full max-w-6xl text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-loose">
          Projekt Strategiczny "POZIOM WYŻEJ" · Technologia: React + Motion + Tailwind<br/>
          Designed for elite content creators.
        </p>
      </footer>
    </div>
  );
}
