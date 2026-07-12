import React from 'react';

interface PageIllustrationProps {
  type: string;
}

export const PageIllustration: React.FC<PageIllustrationProps> = ({ type }) => {
  switch (type) {
    case 'creation_myth':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-orange-100/30 border border-amber-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-amber-900/60" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Noxa (Cold/Moon) */}
            <circle cx="70" cy="100" r="45" strokeDasharray="4 4" />
            <path d="M 40,70 A 45,45 0 0,0 70,145 A 35,35 0 0,1 40,70" fill="currentColor" className="opacity-20" />
            {/* Solas (Heat/Sun) */}
            <circle cx="130" cy="100" r="45" />
            <circle cx="130" cy="100" r="10" fill="currentColor" className="opacity-30" />
            {/* Sun Rays */}
            <path d="M 130,45 L 130,35 M 130,155 L 130,165 M 75,100 L 65,100 M 185,100 L 195,100 M 91,61 L 84,54 M 169,139 L 176,146 M 91,139 L 84,146 M 169,61 L 176,54" strokeWidth="2" />
            {/* Intersecting cosmic stream */}
            <path d="M 10,100 Q 100,50 190,100 Q 100,150 10,100" strokeWidth="1" strokeDasharray="2 2" />
            {/* Central Spark */}
            <circle cx="100" cy="100" r="4" fill="currentColor" />
            <path d="M 100,85 L 100,115 M 85,100 L 115,100" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-amber-900/40">Gênese de Aethelgard</div>
        </div>
      );

    case 'ruins_solaria':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-slate-100/30 border border-slate-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-stone-700/70" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Cracked Ground */}
            <path d="M 10,160 L 190,160 M 10,160 L 40,190 M 100,160 L 115,195 M 190,160 L 160,190" />
            <path d="M 70,160 L 80,175 L 75,190 M 130,160 L 125,170 L 135,185" strokeWidth="1" />
            {/* Crumbling Towers */}
            <rect x="35" y="60" width="20" height="100" strokeDasharray="3 3" />
            <rect x="145" y="80" width="20" height="80" />
            {/* Falling spire */}
            <g transform="rotate(25 100 120)">
              <rect x="85" y="40" width="25" height="100" fill="currentColor" className="opacity-10" />
              <path d="M 85,40 L 97.5,10 L 110,40 Z" />
              <line x1="85" y1="60" x2="110" y2="60" />
              <line x1="85" y1="90" x2="110" y2="90" />
            </g>
            {/* The Rift (Void) */}
            <path d="M 60,160 Q 100,175 140,160 Q 100,210 60,160" fill="currentColor" className="opacity-35 text-purple-950" />
            {/* Floating debris */}
            <polygon points="25,40 32,45 28,52 20,48" fill="currentColor" className="opacity-40" />
            <polygon points="175,50 180,62 168,58" fill="currentColor" className="opacity-40" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-stone-600/50">Escombros de Solária</div>
        </div>
      );

    case 'kingdom_shields':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-emerald-100/20 border border-emerald-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-44 h-44 text-emerald-900/60" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Valeria Shield (Left) */}
            <g transform="translate(-10, 10) scale(0.8)">
              <path d="M 50,40 Q 50,110 90,140 Q 130,110 130,40 Z" fill="currentColor" className="opacity-10" />
              <path d="M 50,40 Q 50,110 90,140 Q 130,110 130,40 Z" />
              <path d="M 90,40 L 90,140" />
              {/* Crown symbol */}
              <path d="M 75,70 L 80,60 L 90,70 L 100,60 L 105,70 L 105,80 L 75,80 Z" fill="currentColor" />
            </g>
            {/* Ironclad Cog (Middle/Back) */}
            <g transform="translate(55, 30) scale(0.9)">
              <circle cx="50" cy="50" r="30" strokeDasharray="6 3" />
              <circle cx="50" cy="50" r="18" fill="currentColor" className="opacity-20" />
              <path d="M 50,10 L 50,90 M 10,50 L 90,50 M 22,22 L 78,78 M 22,78 L 78,22" strokeWidth="1" />
              {/* Hammer */}
              <rect x="45" y="35" width="10" height="30" rx="1" />
              <rect x="38" y="30" width="24" height="8" rx="2" fill="currentColor" />
            </g>
            {/* Silvania Leaf (Right) */}
            <g transform="translate(100, 15) scale(0.8)">
              <path d="M 50,130 C 10,100 10,50 50,30 C 90,50 90,100 50,130 Z" fill="currentColor" className="opacity-15" />
              <path d="M 50,130 C 10,100 10,50 50,30 C 90,50 90,100 50,130 Z" />
              <path d="M 50,30 C 50,30 50,90 50,130" />
              {/* Veins */}
              <path d="M 50,55 Q 35,45 25,48 M 50,55 Q 65,45 75,48 M 50,80 Q 30,70 20,78 M 50,80 Q 70,70 80,78" />
            </g>
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-emerald-900/40">Estandartes das Facções</div>
        </div>
      );

    case 'elven_architecture':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-emerald-100/20 border border-emerald-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-emerald-800/70" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Great Tree Trunk */}
            <path d="M 85,200 C 85,150 90,110 75,80 C 70,70 60,60 55,40 C 50,20 65,10 100,10 C 135,10 150,20 145,40 C 140,60 130,70 125,80 C 110,110 115,150 115,200" fill="currentColor" className="opacity-10" />
            <path d="M 85,200 C 85,150 90,110 75,80" />
            <path d="M 115,200 C 115,150 110,110 125,80" />
            {/* Roots */}
            <path d="M 85,200 Q 60,205 40,210 M 115,200 Q 140,205 160,210" />
            {/* Canopy Outline */}
            <path d="M 55,40 C 30,40 20,-10 100,-10 C 180,-10 170,40 145,40 C 120,50 100,50 55,40 Z" fill="currentColor" className="opacity-15" />
            {/* Platforms / Bridges */}
            <path d="M 40,95 L 160,95" strokeWidth="2" strokeDasharray="3 3" />
            <rect x="60" y="80" width="30" height="15" rx="2" fill="none" />
            <rect x="110" y="70" width="35" height="25" rx="3" fill="none" />
            <path d="M 110,85 L 145,85" />
            {/* Hanging Lanterns */}
            <circle cx="75" cy="110" r="3" fill="currentColor" className="text-amber-500" />
            <line x1="75" y1="95" x2="75" y2="107" />
            <circle cx="125" cy="115" r="3" fill="currentColor" className="text-amber-500" />
            <line x1="125" y1="95" x2="125" y2="112" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-emerald-800/40">Telm-Beryth (Ninho Élfico)</div>
        </div>
      );

    case 'dwarven_forges':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-red-100/10 border border-red-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-amber-800/80" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Cave Arch */}
            <path d="M 10,200 Q 100,20 190,200" strokeDasharray="4 4" />
            {/* Heavy Anvil */}
            <path d="M 40,150 L 160,150 L 150,110 L 175,100 L 175,80 L 25,80 L 25,100 L 50,110 Z" fill="currentColor" className="opacity-25" />
            <path d="M 40,150 L 160,150 L 150,110 L 175,100 L 175,80 L 25,80 L 25,100 L 50,110 Z" />
            {/* Base platform */}
            <rect x="20" y="150" width="160" height="20" rx="1" />
            {/* Runes on anvil */}
            <path d="M 80,105 L 90,95 L 100,105 M 90,95 L 90,115 M 110,100 L 120,110 L 110,115" strokeWidth="1" stroke="currentColor" />
            {/* Heat/lava glow effect */}
            <path d="M 10,190 Q 50,180 100,195 Q 150,180 190,190" stroke="red" strokeWidth="1" className="opacity-40" />
            {/* Hammer on anvil */}
            <g transform="translate(60, 45) rotate(-35 30 30)">
              <rect x="15" y="10" width="30" height="15" fill="currentColor" />
              <rect x="28" y="25" width="4" height="35" rx="1" />
            </g>
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-red-800/50">Forja Profunda de Khaz-Durn</div>
        </div>
      );

    case 'nomad_mask':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-slate-100/30 border border-slate-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-stone-700" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Mask Outline */}
            <path d="M 60,40 C 60,40 100,20 140,40 C 150,80 145,130 100,175 C 55,130 50,80 60,40 Z" fill="currentColor" className="opacity-15" />
            <path d="M 60,40 C 60,40 100,20 140,40 C 150,80 145,130 100,175 C 55,130 50,80 60,40 Z" />
            {/* Eye slits */}
            <rect x="75" y="80" width="18" height="5" rx="1" fill="currentColor" />
            <rect x="107" y="80" width="18" height="5" rx="1" fill="currentColor" />
            {/* Breathing grille */}
            <path d="M 90,110 L 110,110 M 88,118 L 112,118 M 92,126 L 108,126 M 96,134 L 104,134" />
            {/* Intricate glowing carvings (Ash circuit) */}
            <path d="M 65,60 Q 80,65 90,55" stroke="cyan" strokeWidth="1" className="opacity-60" />
            <path d="M 135,60 Q 120,65 110,55" stroke="cyan" strokeWidth="1" className="opacity-60" />
            <path d="M 70,120 Q 80,140 100,155" stroke="cyan" strokeWidth="1" className="opacity-60" strokeDasharray="3 3" />
            <path d="M 130,120 Q 120,140 100,155" stroke="cyan" strokeWidth="1" className="opacity-60" strokeDasharray="3 3" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-stone-600/50">Viseira de Filtro de Éter</div>
        </div>
      );

    case 'magic_symbols':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-purple-100/20 border border-purple-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-purple-900/60" stroke="currentColor" fill="none" strokeWidth="1.2">
            {/* Outer Spell Circles */}
            <circle cx="100" cy="100" r="75" />
            <circle cx="100" cy="100" r="70" strokeDasharray="5 3" />
            <circle cx="100" cy="100" r="45" />
            {/* Inner Hexagram / Pentagram */}
            <polygon points="100,25 165,138 35,138" />
            <polygon points="100,175 165,62 35,62" />
            {/* Small center core */}
            <circle cx="100" cy="100" r="10" fill="currentColor" className="opacity-15" />
            <circle cx="100" cy="100" r="4" />
            {/* Outer Runes (Lines representing ancient scripture) */}
            <path d="M 100,10 L 100,25 M 100,175 L 100,190 M 10,100 L 25,100 M 175,100 L 190,100" strokeWidth="1.5" />
            <path d="M 37,37 L 47,47 M 163,163 L 153,153 M 37,163 L 47,153 M 163,37 L 153,47" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-purple-900/40">Anel Litúrgico Rúnico</div>
        </div>
      );

    case 'mana_crystals':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-purple-100/20 border border-purple-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-blue-800/80" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Ground Bed */}
            <path d="M 30,160 L 170,160 M 20,170 L 180,170" strokeDasharray="3 3" />
            {/* Crystal 1 (Center Large) */}
            <polygon points="100,40 120,100 115,160 85,160 80,100" fill="currentColor" className="opacity-15" />
            <polygon points="100,40 120,100 115,160 85,160 80,100" />
            <line x1="100" y1="40" x2="100" y2="160" />
            {/* Crystal 2 (Left Angled) */}
            <g transform="rotate(-25 80 160)">
              <polygon points="70,60 85,110 80,160 60,160 55,110" fill="currentColor" className="opacity-10 text-cyan-600" />
              <polygon points="70,60 85,110 80,160 60,160 55,110" stroke="currentColor" />
              <line x1="70" y1="60" x2="70" y2="160" />
            </g>
            {/* Crystal 3 (Right Small) */}
            <g transform="rotate(20 120 160)">
              <polygon points="130,80 140,120 135,160 120,160 115,120" fill="currentColor" className="opacity-20 text-indigo-600" />
              <polygon points="130,80 140,120 135,160 120,160 115,120" stroke="currentColor" />
              <line x1="130" y1="80" x2="130" y2="160" />
            </g>
            {/* Sparkles / Magic particles */}
            <circle cx="50" cy="60" r="1.5" fill="currentColor" />
            <circle cx="150" cy="50" r="1.5" fill="currentColor" />
            <circle cx="110" cy="20" r="2" fill="currentColor" />
            <circle cx="90" cy="30" r="1" fill="currentColor" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-blue-800/40">Pedras Estelares de Éter</div>
        </div>
      );

    case 'shadow_beast':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-red-100/10 border border-red-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-stone-900" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Swirling smoky shapes */}
            <path d="M 60,150 Q 30,100 60,50 Q 100,10 140,50 Q 170,100 140,150 Q 100,190 60,150 Z" strokeDasharray="3 3" />
            <path d="M 80,130 C 60,110 50,90 70,70 C 90,50 110,60 120,80 C 130,100 120,120 80,130 Z" fill="currentColor" className="opacity-20 text-purple-950" />
            {/* Tentacles/Wisps */}
            <path d="M 70,70 Q 40,50 20,65" />
            <path d="M 130,80 Q 160,70 180,95" />
            <path d="M 60,110 Q 30,130 15,120" />
            <path d="M 140,110 Q 170,130 185,140" />
            {/* Glowing Red Eyes */}
            <ellipse cx="85" cy="85" rx="4" ry="2" fill="red" />
            <ellipse cx="85" cy="85" rx="3" ry="1.5" fill="red" />
            <ellipse cx="115" cy="85" rx="4" ry="2" fill="red" />
            <ellipse cx="115" cy="85" rx="3" ry="1.5" fill="red" />
            {/* Smoke dust */}
            <circle cx="100" cy="115" r="2" fill="currentColor" />
            <circle cx="75" cy="140" r="1" fill="currentColor" />
            <circle cx="125" cy="140" r="1.5" fill="currentColor" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-stone-700/60">O Devorador de Sombras</div>
        </div>
      );

    case 'blue_drake':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-red-100/10 border border-red-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-red-950" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Head Silhouette */}
            <path d="M 30,130 L 60,90 Q 75,65 110,60 L 150,55 L 175,75 L 150,90 L 165,105 L 130,110 L 95,120 L 55,145 Z" fill="currentColor" className="opacity-15" />
            {/* Detailed Head Outline */}
            <path d="M 30,130 L 60,90 Q 75,65 110,60 L 150,55 L 175,75 L 145,90 L 160,105 L 125,110 L 95,118 L 55,145 Z" />
            {/* Horns */}
            <path d="M 100,62 Q 120,40 145,30" strokeWidth="2.5" />
            <path d="M 90,64 Q 105,45 125,35" strokeWidth="2" />
            {/* Sharp Teeth */}
            <polygon points="140,90 144,95 148,90" fill="currentColor" />
            <polygon points="148,90 152,95 156,90" fill="currentColor" />
            <polygon points="135,108 138,103 141,108" fill="currentColor" />
            {/* Glowing Blue Eye */}
            <circle cx="120" cy="78" r="4.5" fill="cyan" />
            {/* Plasma/Electricity arcs */}
            <path d="M 160,95 Q 175,98 190,92 L 180,102 Q 195,105 185,115" stroke="cyan" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-red-950/50">Drake das Falésias</div>
        </div>
      );

    case 'obsidian_golem':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-stone-100/30 border border-stone-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-stone-800" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Heavy rock shoulders and chest */}
            <path d="M 40,90 L 160,90 L 140,160 L 60,160 Z" fill="currentColor" className="opacity-20" />
            <path d="M 40,90 L 160,90 L 140,160 L 60,160 Z" />
            {/* Head (Small blocky rock) */}
            <rect x="85" y="55" width="30" height="25" rx="2" />
            <line x1="85" y1="70" x2="115" y2="70" />
            {/* Glow eye slits */}
            <line x1="91" y1="65" x2="97" y2="65" stroke="amber" strokeWidth="2" />
            <line x1="103" y1="65" x2="109" y2="65" stroke="amber" strokeWidth="2" />
            {/* Crack lines across body */}
            <path d="M 60,100 L 75,115 L 70,135" />
            <path d="M 140,105 L 125,120 L 135,140" />
            {/* Heart Core (Glow crystal in chest) */}
            <polygon points="100,100 108,112 100,124 92,112" fill="amber" />
            <polygon points="100,100 108,112 100,124 92,112" stroke="gold" strokeWidth="1" />
            {/* Runic chest seal */}
            <path d="M 85,148 L 115,148" strokeWidth="1" />
            <path d="M 90,143 L 95,148 L 100,143 L 105,148 L 110,143" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-stone-600/50">Guardião de Vidro de Cinzas</div>
        </div>
      );

    case 'misty_sea':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-cyan-100/10 border border-cyan-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-cyan-950" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Heavy wavy sea */}
            <path d="M 10,150 C 30,140 50,160 70,150 C 90,140 110,160 130,150 C 150,140 170,160 190,150" strokeWidth="2" />
            <path d="M 10,165 C 30,160 50,170 70,165 C 90,160 110,170 130,165 C 150,160 170,170 190,165" strokeDasharray="3 3" />
            {/* Ship Silhouette */}
            <g transform="translate(45, 75) scale(0.6)">
              {/* Hull */}
              <path d="M 20,80 L 160,80 Q 150,110 90,110 L 40,110 Z" fill="currentColor" className="opacity-20" />
              <path d="M 20,80 L 160,80 Q 150,110 90,110 L 40,110 Z" />
              {/* Sails */}
              <path d="M 45,80 L 45,15 M 45,20 C 65,25 70,45 45,55" fill="currentColor" className="opacity-10" />
              <path d="M 45,20 C 65,25 70,45 45,55 Z" />
              <path d="M 95,80 L 95,5 M 95,10 C 120,15 125,45 95,60" fill="currentColor" className="opacity-15" />
              <path d="M 95,10 C 120,15 125,45 95,60 Z" />
              {/* Flags */}
              <path d="M 95,5 L 110,10 L 95,15" fill="currentColor" />
            </g>
            {/* Rising steam clouds */}
            <path d="M 20,130 Q 35,110 50,125 T 80,120 T 110,125 T 140,115 T 170,125" strokeDasharray="4 4" className="opacity-50" />
            <path d="M 10,110 Q 30,95 50,105 T 90,90 T 130,105 T 180,95" strokeDasharray="5 5" className="opacity-30" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-cyan-900/50">Mar Fervente do Oeste</div>
        </div>
      );

    case 'floating_castle':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-cyan-100/10 border border-cyan-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-sky-900" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Floating Island Base */}
            <polygon points="40,110 160,110 140,140 100,165 60,140" fill="currentColor" className="opacity-25" />
            <polygon points="40,110 160,110 140,140 100,165 60,140" />
            {/* Hanging roots / energy lines */}
            <path d="M 100,165 L 100,190 M 75,130 L 70,160 M 125,130 L 130,165" strokeDasharray="3 3" />
            {/* Castle structures on top */}
            <rect x="55" y="70" width="15" height="40" />
            <polygon points="55,70 62.5,50 70,70" />
            <rect x="130" y="75" width="15" height="35" />
            <polygon points="130,75 137.5,55 145,75" />
            <rect x="78" y="60" width="44" height="50" fill="currentColor" className="opacity-15" />
            <rect x="78" y="60" width="44" height="50" />
            <path d="M 92,110 L 92,95 A 8,8 0 0,1 108,95 L 108,110" />
            {/* High spire */}
            <rect x="95" y="35" width="10" height="25" />
            <polygon points="91,35 100,12 109,35" fill="currentColor" />
            {/* Clouds below the island */}
            <path d="M 20,135 C 30,130 45,135 55,145 C 65,135 80,130 95,135 C 110,130 125,135 135,145 C 145,135 160,130 180,135" strokeDasharray="4 2" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-sky-900/50">Cidadela de Éter</div>
        </div>
      );

    case 'whispering_trees':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-emerald-100/10 border border-emerald-950/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-emerald-950" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Interlacing tree trunks */}
            <path d="M 50,200 C 50,150 70,120 60,90" />
            <path d="M 150,200 C 150,150 130,120 140,90" />
            <path d="M 100,200 C 100,160 90,140 100,110" />
            {/* Swirling Whispering Faces in the Bark */}
            <path d="M 97,145 A 3,3 0 1,1 103,145 Q 100,155 95,148" strokeWidth="1" strokeDasharray="1 1" />
            <path d="M 57,125 A 3,3 0 1,1 63,125 Q 60,135 55,128" strokeWidth="1" strokeDasharray="1 1" />
            {/* Spooky swirls in canopy */}
            <path d="M 30,80 Q 50,50 80,60 T 130,50 T 170,80" />
            <path d="M 20,110 Q 50,85 80,105 T 140,90 T 180,110" strokeDasharray="2 2" />
            {/* Swirling breeze / whispers (Visual sound waves) */}
            <path d="M 30,130 C 50,120 60,140 80,130 S 110,110 130,120" stroke="emerald" strokeWidth="1" className="opacity-40" />
            <path d="M 70,150 C 90,140 100,160 120,150 S 150,130 170,140" stroke="emerald" strokeWidth="1" className="opacity-40" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-emerald-950/50">Floresta dos Murmúrios</div>
        </div>
      );

    case 'human_soul':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-emerald-100/20 border border-emerald-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-emerald-950" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Background spiritual flows */}
            <path d="M 20,100 C 50,40 150,40 180,100 C 150,160 50,160 20,100 Z" strokeDasharray="4 4" className="opacity-45" />
            <path d="M 50,100 C 70,60 130,60 150,100 C 130,140 70,140 50,100 Z" strokeDasharray="2 2" className="opacity-30" />
            
            {/* The individual human soul (Central orb) */}
            <circle cx="100" cy="100" r="28" fill="currentColor" className="opacity-10 text-emerald-900" />
            <circle cx="100" cy="100" r="20" strokeWidth="1.2" />
            
            {/* Glowing core */}
            <circle cx="100" cy="100" r="8" fill="currentColor" className="opacity-40" />
            <circle cx="100" cy="100" r="3" fill="currentColor" />
            
            {/* Swirling energy bands (Negative/Positive) */}
            <path d="M 60,100 Q 100,20 140,100" strokeWidth="1.8" />
            <path d="M 60,100 Q 100,180 140,100" strokeWidth="1.8" strokeDasharray="6 2" />
            
            {/* Surrounding spirit particles */}
            <circle cx="65" cy="70" r="3" fill="currentColor" className="opacity-60" />
            <path d="M 65,73 Q 62,80 58,82" strokeWidth="1" />
            
            <circle cx="135" cy="130" r="2" fill="currentColor" className="opacity-60" />
            <path d="M 135,132 Q 138,138 142,141" strokeWidth="1" />

            <circle cx="150" cy="75" r="2.5" fill="currentColor" className="opacity-50" />
            <path d="M 150,77.5 Q 155,82 153,88" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-emerald-900/50">Fluxo Espiritual Humano</div>
        </div>
      );

    case 'rever_halo':
      return (
        <div className="relative flex items-center justify-center h-48 w-full bg-amber-100/10 border border-amber-900/10 rounded-md p-4 my-2 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-amber-500/80" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Holy / Divine Radiance Lines */}
            <circle cx="100" cy="100" r="70" strokeDasharray="2 4" className="opacity-40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="6 3" className="opacity-50" />
            
            {/* Central Divine Halo */}
            <circle cx="100" cy="100" r="32" fill="currentColor" className="opacity-10 text-amber-500" />
            <circle cx="100" cy="100" r="32" strokeWidth="2" />
            <circle cx="100" cy="100" r="26" strokeWidth="1" strokeDasharray="3 1" />
            
            {/* Intersecting Geometry / Star of Creation */}
            <polygon points="100,50 143,125 57,125" className="opacity-30" />
            <polygon points="100,150 143,75 57,75" className="opacity-30" />
            
            {/* Cross/Compass Rays */}
            <path d="M 100,25 L 100,45 M 100,155 L 100,175 M 25,100 L 45,100 M 155,100 L 175,100" strokeWidth="2" />
            
            {/* Sparkles of Positive Energy */}
            <circle cx="60" cy="60" r="2" fill="currentColor" />
            <circle cx="140" cy="60" r="2.5" fill="currentColor" />
            <circle cx="60" cy="140" r="2.5" fill="currentColor" />
            <circle cx="140" cy="140" r="2" fill="currentColor" />
            <circle cx="100" cy="100" r="5" fill="currentColor" />
          </svg>
          <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-amber-600/60">Kami no Tenkai - Essência Divina</div>
        </div>
      );

    default:
      return (
        <div className="h-48 w-full bg-stone-100/30 border border-stone-900/10 rounded-md p-4 my-2 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-stone-400" stroke="currentColor" fill="none" strokeWidth="1.5">
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
      );
  }
};
