import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JournalEntry } from '../types';
import { BookMarked, Trash2, Plus, Calendar, Save, FileText, Sparkles, X } from 'lucide-react';

export const TravelersJournal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jujutsu_journal');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Falha ao carregar diário', e);
      }
    } else {
      // Seed initial entries
      const initial: JournalEntry[] = [
        {
          id: 'seed-1',
          date: '11/07/2026',
          title: 'Iniciação na Escola de Jujutsu',
          text: 'Hoje encontrei os registros secretos de energia amaldiçoada. Os grimórios detalham as Crônicas do Mundo Jujutsu, os três grandes clãs e técnicas avançadas como a Expansão de Domínio. Também há um mapa de Tóquio indicando focos de energia negativa em Shibuya e Shinjuku. Devo manter este diário sob sigilo sob pena de execução!'
        }
      ];
      setEntries(initial);
      localStorage.setItem('jujutsu_journal', JSON.stringify(initial));
    }
  }, []);

  // Save entry
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;

    let updated: JournalEntry[];

    if (activeEntryId && entries.some(entry => entry.id === activeEntryId)) {
      // Edit existing
      updated = entries.map(entry =>
        entry.id === activeEntryId
          ? { ...entry, title, text, date: new Date().toLocaleDateString('pt-BR') }
          : entry
      );
    } else {
      // Create new
      const newEntry: JournalEntry = {
        id: 'journal-' + Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        title,
        text
      };
      updated = [newEntry, ...entries];
    }

    setEntries(updated);
    localStorage.setItem('jujutsu_journal', JSON.stringify(updated));
    
    // Clear inputs or keep edited active
    setTitle('');
    setText('');
    setActiveEntryId(null);
  };

  // Delete entry
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = entries.filter(entry => entry.id !== id);
    setEntries(updated);
    localStorage.setItem('jujutsu_journal', JSON.stringify(updated));
    if (activeEntryId === id) {
      setTitle('');
      setText('');
      setActiveEntryId(null);
    }
  };

  const startEdit = (entry: JournalEntry) => {
    setActiveEntryId(entry.id);
    setTitle(entry.title);
    setText(entry.text);
  };

  const startNew = () => {
    setActiveEntryId(null);
    setTitle('');
    setText('');
  };

  return (
    <>
      {/* Journal icon sitting on the desk */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 3 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 border-2 border-amber-800/40 p-3 rounded shadow-lg flex flex-col items-center gap-1.5 select-none text-amber-100/90 relative"
        title="Abrir o Diário de Bordo do Viajante"
      >
        {/* Embossed gold frame */}
        <div className="absolute inset-1 border border-amber-500/20 rounded pointer-events-none" />
        
        <BookMarked className="w-8 h-8 text-purple-400" />
        <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-purple-200">Diário do Feiticeiro</span>
        <span className="text-[8px] font-mono text-amber-400/50 -mt-1">{entries.length} anotações</span>
      </motion.div>

      {/* JOURNAL DIALOG SCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#faf6eb] border-8 border-[#3d2a1d] max-w-4xl w-full p-4 md:p-6 rounded-lg shadow-2xl relative text-amber-950 max-h-[90vh] flex flex-col"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 40px rgba(139,92,26,0.1)'
              }}
            >
              {/* Wooden background borders inside */}
              <div className="absolute top-2 left-2 text-xl text-amber-800/30">🕮</div>
              <div className="absolute top-2 right-2 text-xl text-amber-800/30">🕮</div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl md:text-2xl font-serif font-bold text-purple-900 border-b border-purple-900/15 pb-2 mb-4 flex items-center gap-2">
                <BookMarked className="w-6 h-6 text-purple-800" />
                Diário de Investigação Jujutsu
              </h2>

              {/* Content Grid (Notes list and Writing pad) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1 overflow-y-auto min-h-0 pr-1">
                
                {/* List of notes (Left column) */}
                <div className="md:col-span-2 flex flex-col gap-3 border-r border-[#3d2a1d]/15 pr-4 h-full overflow-y-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800/80 font-bold">Anotações Salvas</span>
                    <button
                      onClick={startNew}
                      className="text-[10px] font-sans font-bold text-amber-900 bg-amber-900/10 hover:bg-amber-900/20 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Novo
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
                    {entries.length === 0 ? (
                      <div className="text-center py-10 text-xs text-stone-400 italic">
                        Sem anotações no diário. Pegue a pena e comece a escrever!
                      </div>
                    ) : (
                      entries.map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() => startEdit(entry)}
                          className={`p-3 rounded border text-left cursor-pointer transition-all duration-200 ${activeEntryId === entry.id ? 'bg-[#efebd8] border-amber-800 shadow-sm' : 'bg-[#fcfaf2] border-stone-200 hover:border-amber-700/40'}`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif font-bold text-sm text-[#4a2e1d] truncate flex-1">{entry.title}</h4>
                            <button
                              onClick={(e) => handleDelete(entry.id, e)}
                              className="text-stone-400 hover:text-red-700 p-0.5 rounded transition-colors"
                              title="Deletar anotação"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                            {entry.text}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-[9px] text-stone-400 font-mono">
                            <Calendar className="w-2.5 h-2.5" />
                            {entry.date}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Form Writer (Right columns) */}
                <form onSubmit={handleSave} className="md:col-span-3 flex flex-col gap-4 h-full justify-between">
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-800" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800/80 font-bold">
                        {activeEntryId ? 'Editando Anotação' : 'Nova Anotação'}
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Título da sua descoberta..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full bg-[#fcfaf2] border border-stone-300 rounded px-3 py-2 font-serif text-sm focus:outline-none focus:border-amber-800 text-[#4a2e1d]"
                    />

                    <textarea
                      placeholder="Anote suas observações sobre a energia amaldiçoada, os clãs de elite, as maldições de grau especial ou anotações para seu próprio RPG..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                      rows={8}
                      className="w-full flex-1 bg-[#fcfaf2] border border-stone-300 rounded px-3 py-2 font-serif text-sm leading-relaxed focus:outline-none focus:border-amber-800 text-[#4a2e1d] resize-none"
                    />
                  </div>

                  <div className="flex justify-between items-center border-t border-stone-200 pt-3">
                    <div className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Salvo localmente em seu grimório
                    </div>
                    <div className="flex gap-2">
                      {activeEntryId && (
                        <button
                          type="button"
                          onClick={startNew}
                          className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 rounded text-xs font-sans font-semibold transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-amber-900 hover:bg-amber-950 text-amber-50 px-4 py-1.5 rounded text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {activeEntryId ? 'Salvar Alterações' : 'Salvar no Diário'}
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
