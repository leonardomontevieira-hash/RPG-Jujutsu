import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book as BookType, Chapter } from '../types';
import { BookOpen, Users, Sparkles, Flame, Compass, ChevronLeft, ChevronRight, X, Bookmark, CornerDownRight } from 'lucide-react';
import { PageIllustration } from './PageIllustration';

interface BookProps {
  book: BookType;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  initialChapterIndex?: number;
  highlightQuery?: string;
}

// Helper to render the matching cover icon
const renderCoverIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};

export const Book: React.FC<BookProps> = ({ 
  book, 
  isOpen, 
  onOpen, 
  onClose, 
  initialChapterIndex = 0, 
  highlightQuery = '' 
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isFlippedForward, setIsFlippedForward] = useState(true); // Flip animation direction

  // Sync activeChapterIndex when book is opened or initialChapterIndex changes
  React.useEffect(() => {
    if (isOpen) {
      setActiveChapterIndex(initialChapterIndex);
    }
  }, [isOpen, initialChapterIndex]);

  const chaptersCount = book.chapters.length;
  const currentChapter: Chapter = book.chapters[activeChapterIndex];

  const handleNextPage = () => {
    if (activeChapterIndex < chaptersCount - 1) {
      setIsFlippedForward(true);
      setActiveChapterIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (activeChapterIndex > 0) {
      setIsFlippedForward(false);
      setActiveChapterIndex(prev => prev - 1);
    }
  };

  const handleJumpToChapter = (idx: number) => {
    setIsFlippedForward(idx > activeChapterIndex);
    setActiveChapterIndex(idx);
  };

  // Helper to support both bold markdown (**text**) and search highlighting simultaneously
  const formatAndHighlight = (text: string, query: string) => {
    if (!text) return null;
    
    // Split by bold markers '**'
    const boldParts = text.split('**');
    
    const highlightSegment = (segment: string, keyPrefix: string) => {
      if (!query || !query.trim()) {
        return <span key={keyPrefix}>{segment}</span>;
      }
      
      const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      const matchParts = segment.split(regex);
      
      return (
        <span key={keyPrefix}>
          {matchParts.map((part, index) => {
            if (part.toLowerCase() === query.toLowerCase()) {
              return (
                <mark 
                  key={`${keyPrefix}-${index}`} 
                  className="bg-yellow-300 text-amber-950 font-bold px-1 rounded shadow-sm border-b border-amber-500/50"
                >
                  {part}
                </mark>
              );
            }
            return part;
          })}
        </span>
      );
    };

    return (
      <>
        {boldParts.map((part, index) => {
          const isBold = index % 2 === 1;
          if (isBold) {
            return (
              <strong key={index} className="font-bold text-amber-950">
                {highlightSegment(part, `bold-${index}`)}
              </strong>
            );
          } else {
            return highlightSegment(part, `normal-${index}`);
          }
        })}
      </>
    );
  };

  // Split paragraphs of content between Left Page and Right Page
  // We can show the first 1-2 paragraphs on the left page and the rest (including illustrations) on the right page!
  const paragraphsLeft = currentChapter.content.slice(0, 2);
  const paragraphsRight = currentChapter.content.slice(2);

  return (
    <>
      {/* 1. BOOK COVER IN 3D TABLE LAYOUT */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            layoutId={`book-container-${book.id}`}
            whileHover={{ y: -12, scale: 1.03, rotate: -1, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.4)' }}
            onClick={onOpen}
            className={`cursor-pointer select-none rounded-r-lg shadow-xl border-y border-r flex flex-col justify-between p-4 h-80 w-60 relative overflow-hidden transition-all duration-300 bg-gradient-to-br ${book.coverColor} flex-shrink-0`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)`,
              backgroundAttachment: 'scroll',
            }}
          >
            {/* Spine Highlight Shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-black/40 border-r border-white/10" />
            <div className="absolute left-3.5 top-0 bottom-0 w-1 bg-white/10" />

            {/* Embossed Corner Ornaments */}
            <div className={`absolute top-2 right-2 border-t-2 border-r-2 p-1.5 rounded-tr-md ${book.coverPattern}`}>🙾</div>
            <div className={`absolute bottom-2 right-2 border-b-2 border-r-2 p-1.5 rounded-br-md ${book.coverPattern}`}>🙽</div>

            {/* Header / Subtitle */}
            <div className="pl-4 mt-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400/80 font-bold block">
                {book.category}
              </span>
              <h3 className={`font-serif font-bold text-lg leading-snug tracking-wide ${book.textColor} mt-1 pr-2`}>
                {book.title}
              </h3>
            </div>

            {/* Emblem icon centered */}
            <div className="flex justify-center items-center my-6">
              <div className="p-4 bg-black/20 rounded-full border border-white/5 shadow-inner">
                {renderCoverIcon(book.iconName, `w-10 h-10 ${book.textColor} opacity-80`)}
              </div>
            </div>

            {/* Spine/Base labels */}
            <div className="pl-4 pb-2 flex justify-between items-center z-10">
              <div className="text-[10px] font-serif text-amber-200/70 italic max-w-[150px] truncate">
                {book.subtitle}
              </div>
              <div className="text-[9px] font-mono uppercase text-amber-400/90 font-bold">
                {chaptersCount} Cap.
              </div>
            </div>

            {/* Aged paper pages peek on the right edge */}
            <div className="absolute right-0 top-1 bottom-1 w-1.5 bg-amber-100 rounded-l-[1px] border-l border-amber-900/10 flex flex-col justify-between py-2 opacity-95">
              <div className="h-[1px] w-full bg-amber-900/20" />
              <div className="h-[1px] w-full bg-amber-900/20" />
              <div className="h-[1px] w-full bg-amber-900/20" />
              <div className="h-[1px] w-full bg-amber-900/20" />
              <div className="h-[1px] w-full bg-amber-900/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. OPEN BOOK MODAL & TWO-PAGE FLIP VIEW */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-2 md:p-6 select-text">
            {/* Background cancel action on empty space */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

            <motion.div
              layoutId={`book-container-${book.id}`}
              className="w-full max-w-6xl h-[92vh] md:h-[85vh] bg-[#eae3cd] rounded-md shadow-2xl relative flex flex-col overflow-hidden border-x-[12px] border-y-[10px] border-[#311c0f] z-10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.15)'
              }}
            >
              {/* Spine shadow gutter in exact middle */}
              <div className="absolute left-[50%] -translate-x-[50%] top-0 bottom-0 w-10 bg-gradient-to-r from-[#cfc5aa] via-[#a89d81]/70 to-[#cfc5aa] z-30 border-x border-[#968b6f]/30" />

              {/* Close Book Header Ribbon */}
              <div className="bg-[#311c0f] py-2 px-4 flex justify-between items-center text-amber-200 z-40 relative">
                <div className="flex items-center gap-2">
                  {renderCoverIcon(book.iconName, 'w-4 h-4 text-amber-400')}
                  <span className="text-xs font-serif font-bold uppercase tracking-wider">{book.title}</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-xs font-sans font-bold text-amber-100 hover:text-white bg-amber-900/40 hover:bg-amber-900/80 px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Fechar Livro e voltar para a mesa"
                >
                  <X className="w-3.5 h-3.5" />
                  Fechar Livro
                </button>
              </div>

              {/* TWO PAGES ROW CONTAINER */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
                
                {/* --- LEFT PAGE --- */}
                <div className="p-4 md:p-8 flex flex-col justify-between overflow-y-auto pr-6 md:pr-12 relative h-full">
                  {/* Decorative page corners */}
                  <div className="text-amber-900/10 text-xl absolute top-3 left-3 select-none">🙾</div>
                  <div className="text-amber-900/10 text-xl absolute bottom-3 left-3 select-none">🙼</div>

                  <div className="z-10">
                    {/* Chapter index label */}
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800/80 font-bold flex items-center gap-1.5">
                      Capítulo {activeChapterIndex + 1} de {chaptersCount}
                    </span>

                    {/* Chapter Title with Elegant Font */}
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-950 mt-2 border-b border-amber-900/15 pb-2 tracking-wide">
                      {currentChapter.title}
                    </h2>

                    {/* Table of Contents Quick Navigation sidebar */}
                    <div className="mt-4 bg-amber-900/5 p-3 rounded border border-amber-900/10">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-amber-800/60 font-bold block mb-1.5">Índice do Volume</span>
                      <div className="flex flex-wrap gap-2">
                        {book.chapters.map((chap, idx) => (
                          <button
                            key={chap.id}
                            onClick={() => handleJumpToChapter(idx)}
                            className={`text-[10px] font-serif px-2 py-0.5 rounded transition-all cursor-pointer ${activeChapterIndex === idx ? 'bg-amber-900 text-amber-50 font-bold shadow-sm' : 'text-amber-900 hover:bg-amber-900/10'}`}
                          >
                            {idx + 1}. {chap.title.split(' (')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Paragraph Content (Left Page) */}
                    <div className="mt-6 space-y-4 text-sm md:text-base font-serif text-amber-950 leading-relaxed text-justify">
                      {paragraphsLeft.map((p, pIdx) => {
                        // Apply beautiful Drop Cap to very first letter of the first paragraph
                        if (pIdx === 0) {
                          const firstLetter = p.charAt(0);
                          const remainingText = p.slice(1);
                          return (
                            <p key={pIdx}>
                              <span className="float-left text-4xl md:text-5xl font-serif font-bold text-amber-900 mr-2 mt-1 leading-[0.8] border border-amber-900/30 p-1.5 bg-[#fcfaf2] rounded-sm shadow-sm select-none">
                                {firstLetter}
                              </span>
                              {formatAndHighlight(remainingText, highlightQuery)}
                            </p>
                          );
                        }
                        return <p key={pIdx}>{formatAndHighlight(p, highlightQuery)}</p>;
                      })}
                    </div>
                  </div>

                  {/* Page index footer (odd page) */}
                  <div className="text-[10px] font-mono text-amber-900/50 flex justify-between items-center border-t border-amber-900/10 pt-3 mt-6 z-10 select-none">
                    <span>Codex Jujutsu</span>
                    <span>Pág. {(activeChapterIndex * 2) + 1}</span>
                  </div>
                </div>

                {/* --- RIGHT PAGE --- */}
                <div className="p-4 md:p-8 flex flex-col justify-between overflow-y-auto pl-6 md:pl-12 bg-[#eae3cd] border-t md:border-t-0 border-[#a89d81]/20 h-full relative">
                  {/* Decorative page corners */}
                  <div className="text-amber-900/10 text-xl absolute top-3 right-3 select-none">🙿</div>
                  <div className="text-amber-900/10 text-xl absolute bottom-3 right-3 select-none">🙽</div>

                  {/* Bookmark ribbon visual on right page corner */}
                  <div className="absolute right-10 -top-1 w-6 h-16 bg-red-800 shadow-md border-x border-b border-red-950 z-20 rounded-b flex items-end justify-center pb-1">
                    <Bookmark className="w-3 h-3 text-amber-300" />
                  </div>

                  <div className="z-10">

                    {/* Paragraph Content (Right Page) */}
                    <div className="mt-4 space-y-4 text-sm md:text-base font-serif text-amber-950 leading-relaxed text-justify">
                      {paragraphsRight.length > 0 ? (
                        paragraphsRight.map((p, pIdx) => <p key={pIdx}>{formatAndHighlight(p, highlightQuery)}</p>)
                      ) : (
                        <p className="text-xs text-amber-900/60 italic flex items-center gap-1">
                          <CornerDownRight className="w-3.5 h-3.5" />
                          Os registros continuam no próximo capítulo do arquivo.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Page Footer and Navigation Buttons */}
                  <div className="mt-8 z-10">
                    {/* Flipping Buttons Row */}
                    <div className="flex justify-between items-center bg-[#ded6be] border border-[#beb394] p-1.5 rounded-md shadow-inner select-none mb-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={activeChapterIndex === 0}
                        className={`px-3 py-1.5 rounded flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${activeChapterIndex === 0 ? 'text-stone-400 opacity-50 cursor-not-allowed' : 'text-amber-950 hover:bg-amber-950/10 active:scale-95'}`}
                      >
                        <ChevronLeft className="w-4 h-4" /> Anterior
                      </button>

                      <span className="text-[10px] font-mono text-amber-900/70">
                        Cap. {activeChapterIndex + 1} / {chaptersCount}
                      </span>

                      <button
                        onClick={handleNextPage}
                        disabled={activeChapterIndex === chaptersCount - 1}
                        className={`px-3 py-1.5 rounded flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${activeChapterIndex === chaptersCount - 1 ? 'text-stone-400 opacity-50 cursor-not-allowed' : 'text-amber-950 hover:bg-amber-950/10 active:scale-95'}`}
                      >
                        Próximo <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Page index (even page) */}
                    <div className="text-[10px] font-mono text-amber-900/50 flex justify-between items-center border-t border-amber-900/10 pt-3">
                      <span>Pág. {(activeChapterIndex * 2) + 2}</span>
                      <span>Coleção de Pergaminhos</span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
