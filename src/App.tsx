import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WORLD_BOOKS } from './data/worldData';
import { Book } from './components/Book';
import { TravelersJournal } from './components/TravelersJournal';
import { Search, Compass, BookOpen, Sparkles, Scroll, HelpCircle, X, ArrowUpRight, Shield, KeyRound, Loader, RefreshCw, Trash2, Calendar } from 'lucide-react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const getAnonymousName = (visitorId: string) => {
  if (!visitorId) return 'Feiticeiro Anônimo';
  let hash = 0;
  for (let i = 0; i < visitorId.length; i++) {
    hash = visitorId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const adjectives = ['Infiltrado', 'Especial', 'Exilado', 'Supremo', 'Lendário', 'Vagante', 'Solitário', 'Herético', 'Ancestral', 'Místico'];
  const nouns = ['Clã Gojo', 'Clã Zenin', 'Clã Kamo', 'Shikigami', 'Xamã', 'Coadjuvante', 'Rever', 'Netriun', 'Viajante', 'Vassalo'];
  const adjIdx = Math.abs(hash) % adjectives.length;
  const nounIdx = Math.abs(hash >> 2) % nouns.length;
  const num = Math.abs(hash >> 4) % 1000;
  return `${adjectives[adjIdx]} do ${nouns[nounIdx]} #${num}`;
};

export default function App() {
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Master Panel states
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [masterCode, setMasterCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [masterEntries, setMasterEntries] = useState<any[]>([]);
  const [isLoadingMaster, setIsLoadingMaster] = useState(false);
  const [masterError, setMasterError] = useState('');

  const fetchAllDiaries = async () => {
    setIsLoadingMaster(true);
    setMasterError('');
    try {
      const querySnapshot = await getDocs(collection(db, 'journal_entries'));
      const fetched: any[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      // Sort by createdAt descending (client-side)
      fetched.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setMasterEntries(fetched);
    } catch (err) {
      console.error('Erro ao buscar diários para o Mestre:', err);
      setMasterError('Falha de conexão espiritual ao carregar registros.');
    } finally {
      setIsLoadingMaster(false);
    }
  };

  const handleCompassClick = () => {
    setShowMasterModal(true);
    if (isAuthorized) {
      fetchAllDiaries();
    }
  };

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
          <button
            onClick={handleCompassClick}
            className="p-2 bg-purple-950/60 rounded border border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-900/60 transition-all shadow-md shadow-purple-950/50 cursor-pointer group"
            title="Painel do Mestre"
          >
            <Compass className="w-6 h-6 text-purple-400 animate-spin-slow group-hover:text-purple-300" />
          </button>
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
                <h3 className="font-serif font-bold text-2xl text-purple-100 mt-2">Biblioteca de Estudos da Humanidade</h3>
                <div className="h-[1.5px] w-24 bg-purple-900/40 mx-auto my-3" />
                
                <p className="font-serif text-sm leading-relaxed text-purple-200/90 italic text-justify px-2">
                  "Aqui se encontra o resultado de décadas de estudos e criação de livros de Tengen e Kenjaku para documentar a evolução e vastidão da humanidade e do universo, segue agora o resultado do esforço milenar dos feiticeiros sobreviventes da terra Primordial"
                </p>
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

      {/* 5. MASTER MODAL & PORTAL PANEL */}
      <AnimatePresence>
        {showMasterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0f0a1c] border-4 border-purple-900 max-w-4xl w-full p-6 rounded-lg shadow-2xl relative text-purple-100 max-h-[85vh] flex flex-col"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), inset 0 0 30px rgba(139,92,246,0.1)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowMasterModal(false);
                  setMasterError('');
                }}
                className="absolute top-3 right-3 p-1.5 text-purple-400 hover:text-purple-100 hover:bg-purple-950/50 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl md:text-2xl font-serif font-bold text-purple-200 border-b border-purple-900/30 pb-3 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-400 animate-pulse" />
                Painel do Mestre do Jujutsu
              </h2>

              {!isAuthorized ? (
                /* PASSWORD PROTECTION SCREEN */
                <div className="flex flex-col items-center justify-center py-12 px-4 flex-1">
                  <KeyRound className="w-16 h-16 text-purple-500/80 mb-4 animate-bounce" />
                  <p className="font-serif text-sm text-purple-300 text-center max-w-sm mb-6">
                    Apenas o Mestre possui a energia amaldiçoada necessária para ter total controle dos registros.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (masterCode.trim().toUpperCase() === 'JJKGODTHE') {
                        setIsAuthorized(true);
                        setMasterError('');
                        fetchAllDiaries();
                      } else {
                        setMasterError('O selo permanece intacto. Código incorreto.');
                      }
                    }}
                    className="w-full max-w-sm flex flex-col gap-3"
                  >
                    <input
                      type="password"
                      placeholder="Insira a chave secreta..."
                      value={masterCode}
                      onChange={(e) => setMasterCode(e.target.value)}
                      className="w-full bg-[#18112d] border-2 border-purple-900/80 rounded-md px-4 py-2.5 font-mono text-center text-purple-200 text-sm tracking-widest focus:outline-none focus:border-purple-500"
                    />
                    {masterError && (
                      <p className="text-xs text-red-400 font-mono text-center">{masterError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-purple-900 hover:bg-purple-800 text-purple-100 py-2 rounded font-sans font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Desbloquear Registros
                    </button>
                  </form>
                </div>
              ) : (
                /* MASTER PANEL BODY */
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-purple-900/10 pb-3 mb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                        Diários de Investigação Coletivos (Total: {masterEntries.length})
                      </span>
                      <p className="text-xs text-purple-300/60 font-serif">Acesso irrestrito aos relatos anônimos</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchAllDiaries}
                        disabled={isLoadingMaster}
                        className="p-1.5 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/30 rounded text-purple-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Atualizar diários"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMaster ? 'animate-spin' : ''}`} />
                        Atualizar
                      </button>
                      <button
                        onClick={() => {
                          setIsAuthorized(false);
                          setMasterCode('');
                        }}
                        className="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 rounded text-red-300 text-xs font-sans font-semibold transition-colors cursor-pointer"
                      >
                        Sair do Painel
                      </button>
                    </div>
                  </div>

                  {isLoadingMaster ? (
                    <div className="flex flex-col items-center justify-center flex-1 py-12">
                      <Loader className="w-8 h-8 text-purple-400 animate-spin mb-2" />
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Acessando registros espirituais...</span>
                    </div>
                  ) : masterEntries.length === 0 ? (
                    <div className="flex-1 py-12 text-center text-xs text-purple-400/50 font-serif italic">
                      Nenhum diário foi escrito por visitantes ainda.
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
                      {masterEntries.map((entry) => {
                        const anonName = getAnonymousName(entry.visitorId);
                        return (
                          <div
                            key={entry.id}
                            className="p-4 rounded-lg bg-[#140e29]/75 border border-purple-900/40 hover:border-purple-800/60 transition-all flex flex-col sm:flex-row justify-between items-start gap-4"
                          >
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <h4 className="font-serif font-bold text-base text-amber-300">{entry.title}</h4>
                                <span className="text-[10px] font-mono bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800/30">
                                  👤 {anonName}
                                </span>
                              </div>
                              <p className="text-sm text-purple-100/90 font-serif leading-relaxed whitespace-pre-wrap">
                                {entry.text}
                              </p>
                              <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-purple-400/70 font-mono">
                                <Calendar className="w-3 h-3" />
                                {entry.date || 'Data desconhecida'}
                              </div>
                            </div>
                            <button
                              onClick={async () => {
                                if (confirm('Tem certeza de que deseja banir este registro permanente do diário?')) {
                                  try {
                                    await deleteDoc(doc(db, 'journal_entries', entry.id));
                                    setMasterEntries(prev => prev.filter(e => e.id !== entry.id));
                                  } catch (err) {
                                    console.error('Erro ao deletar:', err);
                                  }
                                }
                              }}
                              className="text-purple-400/50 hover:text-red-400 p-1.5 hover:bg-red-950/20 rounded transition-colors"
                              title="Banir Registro"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
