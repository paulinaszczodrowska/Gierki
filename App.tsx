
import React, { useState, useEffect, useCallback } from 'react';
import { GameStage, GameState } from './types';
import { CHARACTER_CASES, SYMBOL_EVIDENCE, VIBE_SCENES, ALL_READINGS } from './constants';
import { getDetectiveHint } from './geminiService';

// --- Sub-components ---

const Header: React.FC<{ stage: GameStage, score: number }> = ({ stage, score }) => (
  <header className="fixed top-0 left-0 right-0 bg-zinc-900/90 border-b border-zinc-700 p-4 flex justify-between items-center z-50 backdrop-blur-md">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl border-2 border-zinc-800">?</div>
      <h1 className="text-xl font-typewriter tracking-wider font-bold">LITERACKI OPERACYJNY: KLASA 8</h1>
    </div>
    <div className="flex gap-6 items-center">
      <div className="text-sm font-mono text-zinc-400">STATUS: <span className="text-yellow-500">{stage}</span></div>
      <div className="bg-red-900/40 border border-red-500/50 px-4 py-1 rounded text-red-200 font-mono">
        DOWODY: {score}
      </div>
    </div>
  </header>
);

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
    <div className="max-w-2xl bg-zinc-900/80 border-2 border-zinc-700 p-10 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
      <h2 className="text-4xl font-typewriter mb-6 text-yellow-500">OPERACJA: EGZAMIN 8-KLASISTY</h2>
      <p className="text-lg mb-8 text-zinc-300 leading-relaxed">
        Witaj, agencie. Twoim zadaniem jest zweryfikowanie tożsamości bohaterów, zabezpieczenie symboli oraz zbadanie miejsc zdarzeń z najważniejszych lektur obowiązkowych. 
        Od tego zależy sukces Twojej misji egzaminacyjnej.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="p-3 border border-zinc-700 rounded bg-zinc-800/50">
          <div className="text-yellow-500 font-bold mb-1">ETAP 1</div>
          Identyfikacja Osób
        </div>
        <div className="p-3 border border-zinc-700 rounded bg-zinc-800/50">
          <div className="text-yellow-500 font-bold mb-1">ETAP 2</div>
          Magazyn Dowodów
        </div>
        <div className="p-3 border border-zinc-700 rounded bg-zinc-800/50">
          <div className="text-yellow-500 font-bold mb-1">ETAP 3</div>
          Wizja Lokalna
        </div>
      </div>
      <button 
        onClick={onStart}
        className="px-10 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-sm transition-all transform hover:scale-105 shadow-lg font-typewriter uppercase tracking-widest"
      >
        Rozpocznij Śledztwo
      </button>
    </div>
  </div>
);

const CharacterStage: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | 'hint' | null }>({ msg: '', type: null });
  const [localScore, setLocalScore] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const currentCase = CHARACTER_CASES[currentIndex];

  const handleCheck = () => {
    const isCorrect = currentCase.possibleNames.some(name => userInput.toLowerCase().trim().includes(name));
    if (isCorrect) {
      setFeedback({ msg: 'Tożsamość potwierdzona.', type: 'success' });
      setLocalScore(prev => prev + 10);
      setTimeout(() => {
        if (currentIndex < CHARACTER_CASES.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setFeedback({ msg: '', type: null });
          setHint(null);
        } else {
          onComplete(localScore + 10);
        }
      }, 1500);
    } else {
      setFeedback({ msg: 'Błędne dane. Spróbuj ponownie.', type: 'error' });
    }
  };

  const requestHint = async () => {
    setIsLoadingHint(true);
    const aiHint = await getDetectiveHint('Identyfikacja bohatera lektury.', currentCase.clues.join(' '));
    setHint(aiHint);
    setIsLoadingHint(false);
  };

  return (
    <div className="flex flex-col items-center py-20 px-4 min-h-screen">
      <div className="max-w-xl w-full bg-[#f4e4bc] text-black p-8 shadow-2xl relative border-l-[15px] border-red-800 rounded-sm">
        <div className="absolute top-4 right-6 text-xs font-mono opacity-50 uppercase tracking-tighter">CASE FILE #{currentCase.id}</div>
        <h3 className="text-2xl font-typewriter mb-6 border-b-2 border-black/20 pb-2">AKTA PODEJRZANEGO</h3>
        
        <div className="space-y-4 mb-8">
          {currentCase.clues.map((clue, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <span className="text-red-700 font-bold">•</span>
              <p className="font-mono text-sm leading-relaxed italic">"{clue}"</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-black/10">
          <label className="block text-xs font-bold uppercase mb-2">Wprowadź nazwisko/imię postaci:</label>
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            className="w-full bg-white/50 border-b-2 border-black p-2 font-typewriter focus:outline-none focus:bg-white transition-colors"
            placeholder="KTO TO JEST?"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={handleCheck}
            className="bg-black text-white px-6 py-2 font-typewriter text-sm hover:bg-zinc-800 transition-colors"
          >
            SPRAWDŹ
          </button>
          <button 
            onClick={requestHint}
            disabled={isLoadingHint}
            className="border border-black px-6 py-2 font-typewriter text-sm hover:bg-black/5 transition-colors disabled:opacity-50"
          >
            {isLoadingHint ? 'KONSULTACJA...' : 'PODPOWIEDŹ'}
          </button>
        </div>

        {feedback.msg && (
          <div className={`mt-4 p-2 text-center text-sm font-bold uppercase ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {feedback.msg}
          </div>
        )}

        {hint && (
          <div className="mt-4 p-3 bg-zinc-900 text-white text-xs leading-relaxed border-l-4 border-yellow-500 italic">
            "Słuchaj uważnie: {hint}"
          </div>
        )}
      </div>
    </div>
  );
};

const SymbolStage: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReading, setSelectedReading] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | null }>({ msg: '', type: null });
  const [localScore, setLocalScore] = useState(0);

  const currentEvidence = SYMBOL_EVIDENCE[currentIndex];

  const handleMatch = (title: string) => {
    setSelectedReading(title);
    if (title === currentEvidence.readingTitle) {
      setFeedback({ msg: 'Zabezpieczono właściwy dowód.', type: 'success' });
      setLocalScore(prev => prev + 15);
      setTimeout(() => {
        if (currentIndex < SYMBOL_EVIDENCE.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedReading('');
          setFeedback({ msg: '', type: null });
        } else {
          onComplete(localScore + 15);
        }
      }, 1200);
    } else {
      setFeedback({ msg: 'Fałszywy ślad. Spróbuj jeszcze raz.', type: 'error' });
      setTimeout(() => setFeedback({ msg: '', type: null }), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center py-24 px-4 min-h-screen detective-board">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Evidence Display */}
        <div className="bg-zinc-900 border-4 border-zinc-700 p-6 rounded shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-xl font-typewriter text-yellow-500 mb-8 underline decoration-double">MAGAZYN DOWODÓW: #{currentIndex + 1}</h3>
          <div className="grid grid-cols-1 gap-4 w-full">
            {currentEvidence.symbols.map((symbol, idx) => (
              <div key={idx} className="bg-zinc-800 p-4 border-2 border-zinc-600 rounded flex items-center gap-4 animate-pulse">
                <div className="w-8 h-8 bg-red-600/30 rounded-full flex items-center justify-center border border-red-500">
                   <span className="text-red-500 text-xs">{idx + 1}</span>
                </div>
                <span className="text-zinc-200 font-mono tracking-wide">{symbol}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Area */}
        <div className="bg-zinc-900/90 border-4 border-zinc-700 p-6 rounded shadow-2xl">
          <h3 className="text-sm font-bold uppercase text-zinc-400 mb-4 tracking-tighter">Do jakiej lektury należą te przedmioty?</h3>
          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
            {ALL_READINGS.sort().map((title) => (
              <button
                key={title}
                onClick={() => handleMatch(title)}
                className={`text-left p-3 text-sm rounded border transition-all ${
                  selectedReading === title 
                    ? (feedback.type === 'success' ? 'bg-green-900 border-green-500 text-white' : 'bg-red-900 border-red-500 text-white') 
                    : 'bg-zinc-800 border-zinc-600 text-zinc-300 hover:border-yellow-500 hover:text-white'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
          {feedback.msg && (
            <div className={`mt-6 text-center text-xs font-bold uppercase p-2 border animate-bounce ${feedback.type === 'success' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
              {feedback.msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VibeStage: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReading, setSelectedReading] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | null }>({ msg: '', type: null });
  const [localScore, setLocalScore] = useState(0);

  const currentScene = VIBE_SCENES[currentIndex];

  const handleMatch = (title: string) => {
    setSelectedReading(title);
    if (title === currentScene.readingTitle) {
      setFeedback({ msg: 'Analiza miejsca zdarzenia poprawna.', type: 'success' });
      setLocalScore(prev => prev + 25);
      setTimeout(() => {
        if (currentIndex < VIBE_SCENES.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedReading('');
          setFeedback({ msg: '', type: null });
        } else {
          onComplete(localScore + 25);
        }
      }, 1500);
    } else {
      setFeedback({ msg: 'Błędna interpretacja atmosfery.', type: 'error' });
      setTimeout(() => setFeedback({ msg: '', type: null }), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center py-24 px-4 min-h-screen bg-zinc-950">
      <div className="max-w-3xl w-full">
        <div className="bg-zinc-900 border-t-4 border-yellow-500 p-8 shadow-2xl rounded-b-lg mb-8 relative">
          <div className="absolute top-2 right-4 text-[10px] font-mono text-zinc-500">LOCATION SCAN // STAGE_3</div>
          <h3 className="text-xl font-typewriter text-zinc-100 mb-2 uppercase tracking-widest">Wizja Lokalna: {currentScene.location}</h3>
          <p className="text-zinc-400 text-sm italic mb-6">"Zapis z rejestratora wrażeń..."</p>
          
          <div className="p-6 bg-zinc-800/50 border-l-4 border-zinc-600 text-lg text-zinc-200 leading-relaxed font-mono">
            {currentScene.description}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ALL_READINGS.map((title) => (
            <button
              key={title}
              onClick={() => handleMatch(title)}
              className={`p-4 text-xs font-bold uppercase rounded border-2 transition-all transform hover:-translate-y-1 ${
                selectedReading === title 
                  ? (feedback.type === 'success' ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 text-white') 
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-yellow-500 hover:text-white'
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        {feedback.msg && (
           <div className={`mt-8 text-center font-typewriter tracking-widest ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
             {feedback.msg}
           </div>
        )}
      </div>
    </div>
  );
};

const SummaryPage: React.FC<{ score: number, onReset: () => void }> = ({ score, onReset }) => {
  const grade = score > 150 ? 'CELUJĄCY' : score > 120 ? 'BARDZO DOBRY' : score > 80 ? 'DOBRY' : 'DOPUSZCZAJĄCY';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full bg-zinc-900 border-2 border-zinc-700 p-10 rounded shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
        <div className="text-6xl mb-6">🕵️‍♂️</div>
        <h2 className="text-3xl font-typewriter mb-4 text-white">RAPORT KOŃCOWY</h2>
        <div className="mb-8 space-y-2">
          <p className="text-zinc-400 font-mono text-sm uppercase">Zgromadzone dowody:</p>
          <div className="text-5xl font-bold text-yellow-500">{score} pkt</div>
        </div>
        <div className="mb-10 p-4 border border-zinc-700 bg-zinc-800/50 rounded">
          <p className="text-zinc-500 text-xs mb-1 uppercase font-bold">Ocena operacyjna:</p>
          <p className="text-2xl font-typewriter text-white">{grade}</p>
        </div>
        <p className="text-zinc-400 text-sm mb-10 italic">
          "Dobra robota, agencie. Wiedza o lekturach jest Twoją najpotężniejszą bronią na egzaminie. Odpocznij, ale bądź w gotowości."
        </p>
        <button 
          onClick={onReset}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors font-typewriter"
        >
          Nowe Śledztwo
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: GameStage.START,
    score: 0,
    completedTasks: [],
    startTime: 0
  });

  const handleStart = () => {
    setGameState(prev => ({
      ...prev,
      currentStage: GameStage.CHARACTERS,
      startTime: Date.now()
    }));
  };

  const handleStageComplete = useCallback((addedScore: number) => {
    setGameState(prev => {
      let nextStage = prev.currentStage;
      if (prev.currentStage === GameStage.CHARACTERS) nextStage = GameStage.SYMBOLS;
      else if (prev.currentStage === GameStage.SYMBOLS) nextStage = GameStage.VIBES;
      else if (prev.currentStage === GameStage.VIBES) nextStage = GameStage.SUMMARY;

      return {
        ...prev,
        currentStage: nextStage,
        score: prev.score + addedScore
      };
    });
  }, []);

  const handleReset = () => {
    setGameState({
      currentStage: GameStage.START,
      score: 0,
      completedTasks: [],
      startTime: 0
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-yellow-500 selection:text-black">
      {gameState.currentStage !== GameStage.START && gameState.currentStage !== GameStage.SUMMARY && (
        <Header stage={gameState.currentStage} score={gameState.score} />
      )}

      <main className="transition-all duration-500">
        {gameState.currentStage === GameStage.START && (
          <LandingPage onStart={handleStart} />
        )}

        {gameState.currentStage === GameStage.CHARACTERS && (
          <CharacterStage onComplete={handleStageComplete} />
        )}

        {gameState.currentStage === GameStage.SYMBOLS && (
          <SymbolStage onComplete={handleStageComplete} />
        )}

        {gameState.currentStage === GameStage.VIBES && (
          <VibeStage onComplete={handleStageComplete} />
        )}

        {gameState.currentStage === GameStage.SUMMARY && (
          <SummaryPage score={gameState.score} onReset={handleReset} />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-2 bg-black/80 text-[10px] text-zinc-600 font-mono flex justify-between uppercase z-50">
        <span>&copy; 2024 LITERACKI_SYSTEM_OPERACYJNY_V3.1</span>
        <span>KLASA 8 // POWTÓRKA_EGZAMINACYJNA</span>
      </footer>
    </div>
  );
}
