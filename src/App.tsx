import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WORLD_BOOKS } from './data/worldData';
import { Book } from './components/Book';
import { TravelersJournal } from './components/TravelersJournal';
import { Search, Compass, BookOpen, Sparkles, Scroll, HelpCircle, X, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Background image representing mystical/cursed energy
  const tableBgUrl = "/src/assets/images/cursed_energy_bg_1783811324756.jpg";

  // Search through all books and chapters
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: Array<{
      bookId: string;
      bookTitle: string;
      chapterId: string;
      chapterTitle: string;
      snippet: string;
      index: number;
    }> = [];

    WORLD_BOOKS.forEach((book) => {
      book.chapters.forEach((chap, idx) => {
        // Search in title or content
        const matchTitle = chap.title.toLowerCase().includes(query);
        const matchContent = chap.content.some(paragraph => paragraph.toLowerCase().includes(query));

        if (matchTitle || matchContent) {
          // Find matching snippet or default to first paragraph
          const matchedParagraph = chap.content.find(p => p.toLowerCase().includes(query)) || chap.content[0];
          const snippet = matchedParagraph.length > 130 
            ? matchedParagraph.slice(0, 130) + '...' 
            : matchedParagraph;

          results.push({
            bookId: book.id,
            bookTitle: book.title,
            chapterId: chap.id,
            chapterTitle: chap.title,
            snippet,
            index: idx
          });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const handleSelectSearchResult = (bookId: string, chapterIndex: number) => {
    setActiveBookId(bookId);
    setSelectedChapterIndex(chapterIndex);
    setShowSearchResults(false); // Close dropdown but keep query for in-book highlighting
  };

  const highlightSnippet = (text: string, query: string) => {
    if (!query || !query.trim()) return <span>{text}</span>;
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-500/35 text-amber-200 font-bold px-0.5 rounded shadow-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const activeBook = WORLD_BOOKS.find(b => b.id === activeBookId);

  return (
    <div 
      className="min-h-screen text-[#e0e7ff] flex flex-col relative overflow-x-hidden"
      style={{
        // Immersive mystical cursed energy background with dark radial vignette overlay
        backgroundImage: `radial-gradient(circle, rgba(10, 5, 20, 0.4) 0%, rgba(3, 1, 7, 0.9) 100%), url(${tableBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0a0512' // Dark violet fallback
      }}
    >
      {/* 1. ATMOSPHERIC HEADER BAR */}
      <header className="w-full bg-[#05020c]/85 backdrop-blur-md border-b border-purple-950/40 px-4 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-950/60 rounded border border-purple-500/30 shadow-md shadow-purple-950/50">
            <Compass className="w-6 h-6 text-purple-400 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg md:text-xl text-purple-100 tracking-wider flex items-center gap-1.5 uppercase">
              Grimório Jujutsu Kaisen
              <span className="text-xs font-mono text-purple-400/50 normal-case tracking-normal">v2.0</span>
            </h1>
            <p className="text-[10px] md:text-xs text-purple-300 font-serif italic">
              Explore a energia amaldiçoada, os clãs de elite e as anomalias espirituais
            </p>
          </div>
        </div>

        {/* Dynamic actions & guide button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowIntro(true)}
            className="text-xs font-sans font-bold text-purple-200/90 hover:text-purple-100 bg-purple-950/40 hover:bg-purple-950/75 px-3 py-1.5 rounded-md border border-purple-800/30 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Mostrar Guia do Feiticeiro"
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            Ajuda
          </button>
        </div>
      </header>

      {/* 2. CORE WORKSPACE & AMBIENCE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6 relative z-10">
        
        {/* ROW 1: SEARCH & ACTIVE STATUS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* STATEFUL SEARCH PARCHMENT */}
          <div className="md:col-span-2 relative">
            {/* Backdrop to close search dropdown when clicking outside */}
            {searchQuery && showSearchResults && (
              <div 
                className="fixed inset-0 z-30 cursor-default" 
                onClick={() => setShowSearchResults(false)} 
              />
            )}

            <div className="relative flex items-center bg-[#110b24]/90 border-2 border-purple-900/50 rounded-lg shadow-lg px-3 py-2 text-purple-100 z-40">
              <Search className="w-4 h-4 text-purple-400/60 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Pesquisar nos volumes (ex: 'Sukuna', 'Gojo', 'Domínio')..."
                value={searchQuery}
                onFocus={() => setShowSearchResults(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                className="w-full bg-transparent font-serif text-sm md:text-base focus:outline-none placeholder-purple-400/35 text-purple-100"
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="p-1 hover:bg-purple-900/30 rounded-full transition-colors cursor-pointer text-purple-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Floating Search Results */}
            <AnimatePresence>
              {searchQuery && showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 4 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-1.5 bg-[#170e30] border-2 border-purple-900 rounded-md shadow-2xl z-40 max-h-72 overflow-y-auto p-2 text-purple-100"
                >
                  <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold px-2 py-1 border-b border-purple-900/30 mb-1">
                    Registros Encontrados ({filteredResults.length})
                  </div>

                  {filteredResults.length === 0 ? (
                    <div className="p-4 text-center text-xs font-serif text-purple-400/50 italic">
                      Nenhuma anotação sobre este termo nos registros jujutsu...
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {filteredResults.map((res, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectSearchResult(res.bookId, res.index)}
                          className="p-2 hover:bg-purple-900/40 rounded cursor-pointer transition-colors text-left border-b border-purple-900/20 last:border-0"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <span className="font-serif font-bold text-xs text-amber-400">
                              {res.chapterTitle}
                            </span>
                            <span className="text-[9px] font-mono bg-purple-950/60 text-purple-200 border border-purple-800/30 px-1.5 py-0.5 rounded flex-shrink-0">
                              {res.bookTitle}
                            </span>
                          </div>
                          <p className="text-[11px] font-serif text-purple-200/70 line-clamp-1 mt-1">
                            {highlightSnippet(res.snippet, searchQuery)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTIVE COGNITIVE AMBIENT STATUS */}
          <div className="bg-purple-950/20 backdrop-blur-sm border border-purple-900/30 p-2 rounded-lg flex items-center justify-around h-11">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/80">Monitoramento Ativo</span>
            </div>
            <div className="h-4 w-[1px] bg-purple-900/20" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span className="text-[10px] font-mono text-purple-300">Resíduos de Energia: Normais</span>
            </div>
          </div>

        </div>

        {/* ROW 2: ACTIVE DESK GRID */}
        <div className="w-full flex flex-col gap-6 mt-2">
          
          {/* THE SCATTERED INTERACTIVE BOOKS */}
          <div className="w-full flex flex-col gap-6">
            
            {/* BOOKSHELF SHELF DESIGN */}
            <div className="relative p-6 md:p-8 bg-[#0b0617]/70 border border-purple-900/30 rounded-2xl shadow-2xl shadow-purple-950/30 min-h-[400px] flex flex-col justify-between">
              
              {/* Header inside Shelf */}
              <div className="flex justify-between items-center border-b border-purple-950/30 pb-3 mb-6">
                <span className="text-xs font-serif font-semibold italic text-purple-200 flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-purple-400" />
                  Selecione um tomo para abrir e investigar os segredos
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold bg-purple-950/40 border border-purple-900/30 px-2.5 py-0.5 rounded-full">
                  Registros de Investigação Jujutsu
                </span>
              </div>

              {/* Grid of Books laying on Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center flex-1">
                {WORLD_BOOKS.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    isOpen={activeBookId === book.id}
                    onOpen={() => {
                      setActiveBookId(book.id);
                      setSelectedChapterIndex(0);
                    }}
                    onClose={() => setActiveBookId(null)}
                    initialChapterIndex={activeBookId === book.id ? selectedChapterIndex : 0}
                    highlightQuery={searchQuery}
                  />
                ))}
              </div>

              {/* Board shadow / Border Line below */}
              <div className="h-2 w-full bg-[#080211] rounded-md mt-6 shadow-md border-t border-purple-950/30 shadow-purple-950/60" />
            </div>

            {/* EXTRA ACTION BAR: JOURNAL ONLY */}
            <div className="w-full">
              {/* Scholar Traveler's Journal */}
              <TravelersJournal />
            </div>

          </div>

        </div>

      </main>

      {/* 3. IMAGES & AUDIO CREDIT FOOTER */}
      <footer className="w-full bg-[#05020c]/90 border-t border-purple-950/30 px-4 py-3 text-center text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mt-auto z-10">
        Grimório de Estudos Jujutsu • Criado para Registro de Informações de RPG Jujutsu Kaisen • 2026
      </footer>

      {/* 4. RPG LIBRARIAN INTRODUCTION SCROLL MODAL */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-[#0e0a1a] border-4 border-purple-950 max-w-lg w-full p-6 md:p-8 rounded-lg shadow-2xl relative text-purple-100"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), inset 0 0 40px rgba(168,85,247,0.1)'
              }}
            >
              {/* Ribbon Header decoration */}
              <div className="absolute -top-3 left-[50%] -translate-x-[50%] bg-purple-950 text-purple-200 border border-purple-800/50 px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold whitespace-nowrap shadow shadow-black">
                📜 Registro Confidencial de Feiticeiros
              </div>

              <div className="mt-4 text-center">
                <Compass className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
                <h3 className="font-serif font-bold text-2xl text-purple-100 mt-2">Mesa de Estudos Jujutsu</h3>
                <div className="h-[1.5px] w-24 bg-purple-900/40 mx-auto my-3" />
                
                <p className="font-serif text-sm leading-relaxed text-purple-200/90 italic text-justify px-2">
                  "À sua frente jaz o acervo proibido da Sociedade de Jujutsu. Três volumes de lore e regras documentam as bases de nossa história e poder: as Crônicas do Mundo Jujutsu, o Livro Oficial de Regras e a Enciclopédia de Raças."
                </p>

                <p className="font-serif text-sm leading-relaxed text-purple-200/90 italic text-justify px-2 mt-3">
                  "Sinta-se livre para examinar a mesa. Você pode utilizar o Diário de Investigação para documentar suas próprias observações táticas."
                </p>
              </div>

              {/* List of features */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] font-mono text-purple-300/90 bg-purple-950/40 p-3 rounded border border-purple-900/30">
                <div>📙 3 Tomos de Lore & Regras</div>
                <div>🌀 Expansão de Domínio</div>
                <div>🧬 Enciclopédia de Raças</div>
                <div>⚜️ Clãs e Linhagens de Elite</div>
                <div>✒️ Diário Local do Feiticeiro</div>
                <div>🔍 Busca Global em Tempo Real</div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowIntro(false)}
                  className="bg-purple-900 hover:bg-purple-950 border border-purple-700 text-purple-100 px-6 py-2 rounded-md font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow transition-all cursor-pointer"
                >
                  Acessar os Registros <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
