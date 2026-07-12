import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

// --- CANDLE COMPONENT ---
export const Candle: React.FC = () => {
  const [flameColor, setFlameColor] = useState<'amber' | 'emerald' | 'purple'>('amber');
  const [isLit, setIsLit] = useState(true);

  const flameColors = {
    amber: {
      flame: 'bg-gradient-to-t from-red-600 via-amber-500 to-yellow-200 shadow-[0_0_25px_10px_rgba(245,158,11,0.5)]',
      glow: 'bg-amber-500/10 shadow-[0_0_120px_40px_rgba(245,158,11,0.25)]',
      ambientText: 'Fogo Primordial de Solas',
    },
    emerald: {
      flame: 'bg-gradient-to-t from-emerald-600 via-green-400 to-emerald-200 shadow-[0_0_25px_10px_rgba(16,185,129,0.5)]',
      glow: 'bg-emerald-500/10 shadow-[0_0_120px_40px_rgba(16,185,129,0.25)]',
      ambientText: 'Chama Fluida de Silvânia',
    },
    purple: {
      flame: 'bg-gradient-to-t from-purple-800 via-fuchsia-500 to-purple-200 shadow-[0_0_25px_10px_rgba(168,85,247,0.5)]',
      glow: 'bg-purple-500/10 shadow-[0_0_120px_40px_rgba(168,85,247,0.25)]',
      ambientText: 'Chama Arcana do Vazio',
    }
  };

  const handleNextColor = () => {
    if (!isLit) {
      setIsLit(true);
      setFlameColor('amber');
      return;
    }
    if (flameColor === 'amber') setFlameColor('emerald');
    else if (flameColor === 'emerald') setFlameColor('purple');
    else setIsLit(false);
  };

  return (
    <div className="flex flex-col items-center justify-end h-32 w-20 relative select-none">
      {/* Light glow on table */}
      {isLit && (
        <div className={`absolute -bottom-6 w-32 h-16 rounded-full blur-xl pointer-events-none transition-all duration-700 ${flameColors[flameColor].glow}`} />
      )}

      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleNextColor}
            className="cursor-pointer flex flex-col items-center pb-1 z-10"
            title="Clique para mudar o fogo rúnico"
          >
            {/* Flickering Outer Flame */}
            <motion.div
              animate={{
                scaleY: [1, 1.15, 0.95, 1.05, 1],
                scaleX: [1, 0.9, 1.1, 0.95, 1],
                skewX: [0, 3, -2, 1, -1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut"
              }}
              className={`w-4 h-8 rounded-full rounded-b-xl origin-bottom ${flameColors[flameColor].flame}`}
            />
            {/* Small smoke particle effect when hovering */}
            <span className="text-[9px] font-serif text-amber-100/60 mt-1 pointer-events-none tracking-tight animate-pulse block">
              {flameColor === 'amber' ? '🔥' : flameColor === 'emerald' ? '🌿' : '✨'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlit state prompt */}
      {!isLit && (
        <button
          onClick={() => setIsLit(true)}
          className="text-stone-400 hover:text-amber-500 cursor-pointer text-xs mb-3 flex flex-col items-center gap-0.5 animate-bounce"
          title="Acender Vela"
        >
          <Flame className="w-4 h-4 text-stone-500 hover:text-amber-500" />
          <span className="text-[9px] uppercase font-mono tracking-widest text-stone-500">Acender</span>
        </button>
      )}

      {/* Candle Stick Wax */}
      <div className="w-6 h-16 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-50 border-x border-amber-900/20 rounded-t-sm shadow-inner relative flex flex-col items-center">
        {/* Wax melted drips */}
        <div className="absolute top-0 w-full h-3 flex justify-around overflow-visible">
          <div className="w-1.5 h-3 bg-amber-100 border-b border-r border-amber-900/10 rounded-b-full" />
          <div className="w-1 h-5 bg-amber-50 border-b border-amber-900/10 rounded-b-full -mt-0.5" />
          <div className="w-2 h-2.5 bg-amber-100 border-b border-l border-amber-900/10 rounded-b-full" />
        </div>
        {/* Rune written on the candle */}
        <div className="mt-6 flex flex-col gap-0.5 text-amber-900/40 font-mono text-[6px] select-none text-center">
          <div>🜂</div>
          <div>🜁</div>
          <div>🜃</div>
        </div>
      </div>

      {/* Candle Base / Brass Saucer */}
      <div className="w-14 h-3 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-800 rounded-full border border-yellow-900 shadow-md flex items-center justify-center relative">
        <div className="w-5 h-1.5 bg-yellow-900/40 rounded-full" />
        {/* Tiny handle on the saucer */}
        <div className="absolute right-0 top-0.5 w-3 h-3 border-2 border-yellow-700 rounded-full -mr-1.5 shadow-sm" />
      </div>

      <div className="text-[8px] font-mono tracking-widest text-stone-400/80 mt-1 uppercase text-center w-24">
        {isLit ? flameColors[flameColor].ambientText : 'Vela Apagada'}
      </div>
    </div>
  );
};


// --- COFFEE/ELIXIR CUP COMPONENT ---
export const FictionalCup: React.FC = () => {
  const [sips, setSips] = useState(3);
  const [buff, setBuff] = useState<string | null>(null);

  const buffs = [
    '🔮 Visão Arcana (+15 Sabedoria)',
    '🛡️ Vitalidade do Forjador (+10 Defesa)',
    '🌲 Sincronia da Floresta (+12 Percepção)',
    '☕ Calor da Taberna (+20 Conforto Espiritual)',
    '⚡ Centelha de Solas (+18 Iniciativa)'
  ];

  const handleDrink = () => {
    if (sips > 0) {
      const newSips = sips - 1;
      setSips(newSips);
      const randomBuff = buffs[Math.floor(Math.random() * buffs.length)];
      setBuff(randomBuff);
      
      // Auto-clear buff notification after 4s
      setTimeout(() => {
        setBuff(null);
      }, 4000);
    } else {
      // Refill
      setSips(3);
      setBuff('🍵 Elixir Sagrado Reabastecido!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-end h-28 w-20 relative select-none">
      {/* Steam floating up if cup is full */}
      {sips > 0 && (
        <motion.div
          animate={{
            y: [-10, -35],
            x: [0, 5, -5, 0],
            opacity: [0.6, 0.8, 0],
            scale: [0.8, 1.2, 0.6]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut"
          }}
          className="absolute bottom-12 text-stone-300 text-xs font-serif opacity-0 pointer-events-none"
        >
          {sips === 3 ? '░ ▒' : '░'}
        </motion.div>
      )}

      {/* The Clay Mug */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDrink}
        className="cursor-pointer relative z-10"
        title={sips > 0 ? "Dar um gole no Elixir de Ervas" : "Caneca vazia. Clique para reabastecer!"}
      >
        {/* Mug Body */}
        <div className="w-9 h-11 bg-gradient-to-b from-stone-600 to-stone-800 border-2 border-stone-900 rounded-b-md rounded-t-sm shadow-md flex items-center justify-center relative">
          {/* Liquid content indicator inside top ridge */}
          <div className="absolute top-0.5 w-7 h-1 rounded-full bg-amber-800/80 mx-auto" style={{ opacity: sips / 3 }} />
          
          {/* Crest emblem on mug */}
          <div className="text-[8px] text-amber-500/40 font-serif">🜾</div>

          {/* Mug Handle */}
          <div className="absolute -left-3 top-1.5 w-4 h-7 border-2 border-r-0 border-stone-800 bg-stone-900 rounded-l-full" />
        </div>
      </motion.div>

      {/* Coaster */}
      <div className="w-11 h-1.5 bg-amber-900 border border-amber-950 rounded-full shadow-md -mt-1" />

      {/* Sips indicators */}
      <div className="text-[8px] font-mono tracking-widest text-stone-400 mt-1 uppercase text-center">
        {sips > 0 ? `Elixir: ${'●'.repeat(sips)}${'○'.repeat(3 - sips)}` : 'Vazia (Refilar)'}
      </div>

      {/* Floating Buff Banner */}
      <AnimatePresence>
        {buff && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: -45 }}
            exit={{ opacity: 0 }}
            className="absolute z-40 bg-amber-950/95 text-amber-100 text-[10px] font-serif border border-amber-700 px-2.5 py-1 rounded-md whitespace-nowrap shadow-lg pointer-events-none"
          >
            {buff}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- QUILL AND INKWELL COMPONENT ---
export const QuillAndInkwell: React.FC = () => {
  return (
    <div className="flex items-end justify-center h-28 w-24 relative select-none">
      {/* Inkwell pot */}
      <div className="w-8 h-8 bg-gradient-to-b from-stone-800 via-stone-900 to-stone-950 border-2 border-stone-950 rounded-md relative flex items-center justify-center shadow-lg">
        {/* Brass Cap Rim */}
        <div className="w-5 h-2 bg-yellow-700 border border-yellow-800 rounded-sm -mt-6 absolute shadow-sm" />
        {/* Ink emblem */}
        <div className="text-[7px] text-purple-400 font-mono scale-90">🜿</div>
      </div>

      {/* The Quill Pen leaning outwards */}
      <motion.div
        animate={{
          rotate: [-15, -12, -15],
          y: [0, -1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className="absolute bottom-6 left-12 w-1.5 h-20 origin-bottom-left"
        style={{ transform: 'rotate(-15deg)' }}
      >
        {/* Feather Quill texture */}
        <div className="w-5 h-16 bg-gradient-to-l from-stone-100 via-stone-200 to-amber-50 border-r border-stone-400/40 rounded-l-full rounded-r-[4px] absolute bottom-3 -left-2 shadow-sm opacity-90 relative">
          {/* Feather ridges */}
          <div className="absolute inset-0 flex flex-col justify-around py-2 opacity-30">
            <div className="h-[1px] w-full bg-stone-500/30 transform -rotate-12" />
            <div className="h-[1px] w-full bg-stone-500/30 transform -rotate-12" />
            <div className="h-[1px] w-full bg-stone-500/30 transform -rotate-12" />
            <div className="h-[1px] w-full bg-stone-500/30 transform -rotate-12" />
          </div>
        </div>
        {/* Quill tip */}
        <div className="w-1 h-4 bg-amber-100 border-x border-stone-500 rounded-b-sm absolute bottom-0 left-0" />
      </motion.div>

      <div className="absolute bottom-0 text-[8px] font-mono tracking-widest text-stone-400/80 uppercase">
        Pena & Nanquim
      </div>
    </div>
  );
};


// --- MAP PARCHMENT COMPONENT ---
// Removed by request
