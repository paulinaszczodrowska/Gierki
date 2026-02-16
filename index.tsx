
import { GoogleGenAI } from "@google/genai";

// --- Types & Data ---

type GameStage = 'START' | 'CHARACTERS' | 'SYMBOLS' | 'VIBES' | 'SUMMARY';

const CHARACTER_CASES = [
  {
    id: 'char-1',
    clues: ['Stary skąpiec z Londynu.', 'Nienawidzi Świąt Bożego Narodzenia.', 'Zmieniony przez wizytę trzech duchów.'],
    possibleNames: ['scrooge', 'ebenezer', 'ebenezer scrooge']
  },
  {
    id: 'char-2',
    clues: ['Polski emigrant, który został latarnikiem w Aspinwall.', 'Zaczytał się w "Panu Tadeuszu".', 'Przez nostalgię zaniedbał swoje obowiązki.'],
    possibleNames: ['skawiński', 'skawinski', 'latarnik']
  },
  {
    id: 'char-3',
    clues: ['Okrutna kobieta, która zabiła siostrę dla korony.', 'Ma na czole krwawe piętno.', 'Zginęła rażona piorunem.'],
    possibleNames: ['balladyna']
  }
];

const SYMBOL_EVIDENCE = [
  { id: 'sym-1', symbols: ['Dzbanek malin', 'Nóż', 'Złota korona'], readingTitle: 'Balladyna' },
  { id: 'sym-2', symbols: ['Mur graniczny', 'List miłosny', 'Krokodyl'], readingTitle: 'Zemsta' },
  { id: 'sym-3', symbols: ['Róża', 'Baobaby', 'Lis'], readingTitle: 'Mały Książę' },
  { id: 'sym-4', symbols: ['Ryba (znak)', 'Płonący Rzym', 'Krzyż'], readingTitle: 'Quo Vadis' },
  { id: 'sym-5', symbols: ['Ziarna gorczycy', 'Kocioł', 'Pusty kościół'], readingTitle: 'Dziady cz. II' },
  { id: 'sym-6', symbols: ['Stara książka', 'Latarnia morska', 'Ocean'], readingTitle: 'Latarnik' },
  { id: 'sym-7', symbols: ['Butelki z benzyną', 'Kotwica', 'Książka "Lord Jim"'], readingTitle: 'Kamienie na szaniec' },
  { id: 'sym-8', symbols: ['Mundur rosyjski', 'Tabliczka mnożenia', 'Recytacja "Reduty Ordona"'], readingTitle: 'Syzyfowe prace' },
  { id: 'sym-9', symbols: ['Róg bawoleń', 'Serwis Horeszków', 'Czarna polewka'], readingTitle: 'Pan Tadeusz' }
];

const VIBE_SCENES = [
  { id: 'vibe-1', description: 'Atmosfera walki, odwagi i młodzieńczego braterstwa w okupowanej Warszawie.', location: 'Wojenna Warszawa', readingTitle: 'Kamienie na szaniec' },
  { id: 'vibe-2', description: 'Sielski spokój szlacheckiego dworku, zapach bigosu i dźwięki poloneza.', location: 'Soplicowo', readingTitle: 'Pan Tadeusz' },
  { id: 'vibe-3', description: 'Mroźny, mglisty Londyn XIX wieku, atmosfera osamotnienia i nadnaturalnych zjawisk.', location: 'Londyn', readingTitle: 'Opowieść wigilijna' },
  { id: 'vibe-4', description: 'Mroczne jezioro, nocna aura, obietnice i straszliwa kara za zdradę.', location: 'Brzeg jeziora Świteź', readingTitle: 'Świtezianka' }
];

const ALL_READINGS = [
  'Pan Tadeusz', 'Balladyna', 'Zemsta', 'Mały Książę', 'Quo Vadis', 'Dziady cz. II',
  'Latarnik', 'Opowieść wigilijna', 'Kamienie na szaniec', 'Syzyfowe prace', 'Artysta', 'Świtezianka'
].sort();

// --- State Management ---

let state = {
  currentStage: 'START' as GameStage,
  score: 0,
  currentSubIndex: 0,
  hint: '',
  isLoading: false
};

// --- API Service ---

const getDetectiveHint = async (context: string, currentTask: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Jesteś doświadczonym detektywem literackim. Uczeń klasy 8 rozwiązuje zagadkę dotyczącą lektury obowiązkowej.
      Kontekst: ${context}
      Zadanie: ${currentTask}
      Podaj krótką, tajemniczą podpowiedź w stylu detektywistycznym (max 2 zdania), która nie zdradza bezpośrednio odpowiedzi.`,
    });
    return response.text || "Skup się na szczegółach, detektywie.";
  } catch (error) {
    return "Analiza dowodów utrudniona. Polegaj na własnej pamięci.";
  }
};

// --- DOM Rendering ---

const root = document.getElementById('root')!;

function render() {
  root.innerHTML = '';
  
  if (state.currentStage !== 'START' && state.currentStage !== 'SUMMARY') {
    root.appendChild(createHeader());
  }

  const main = document.createElement('main');
  main.className = 'fade-in';

  switch (state.currentStage) {
    case 'START':
      main.appendChild(createLandingPage());
      break;
    case 'CHARACTERS':
      main.appendChild(createCharacterStage());
      break;
    case 'SYMBOLS':
      main.appendChild(createSymbolStage());
      break;
    case 'VIBES':
      main.appendChild(createVibeStage());
      break;
    case 'SUMMARY':
      main.appendChild(createSummaryPage());
      break;
  }

  root.appendChild(main);
  root.appendChild(createFooter());
}

function createHeader() {
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 right-0 bg-zinc-900/95 border-b border-zinc-800 p-4 flex justify-between items-center z-50 backdrop-blur-sm';
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold border border-zinc-700">?</div>
      <h1 class="text-sm md:text-lg font-typewriter tracking-widest text-zinc-100 uppercase">Operacyjny Klasa 8</h1>
    </div>
    <div class="flex gap-4 items-center">
      <div class="hidden md:block text-[10px] font-mono text-zinc-500">ETAP: <span class="text-yellow-500">${state.currentStage}</span></div>
      <div class="bg-red-950/50 border border-red-900/50 px-3 py-1 rounded text-red-400 font-mono text-xs">
        DOWODY: ${state.score} pkt
      </div>
    </div>
  `;
  return header;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'fixed bottom-0 left-0 right-0 p-2 bg-black/90 text-[9px] text-zinc-600 font-mono flex justify-between uppercase z-50 border-t border-zinc-900';
  footer.innerHTML = `
    <span>LITERACKI_SYSTEM_V4.0</span>
    <span class="hidden sm:inline">POWTÓRKA EGZAMINACYJNA // KLASA 8</span>
  `;
  return footer;
}

function createLandingPage() {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-6 text-center';
  container.innerHTML = `
    <div class="max-w-2xl bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl relative">
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <h2 class="text-3xl md:text-5xl font-typewriter mb-6 text-yellow-500 tracking-tighter uppercase">Operacja: Egzamin</h2>
      <p class="text-zinc-400 mb-10 leading-relaxed font-mono text-sm">
        Agencie, czas na ostateczną weryfikację. Musisz zidentyfikować bohaterów, dopasować dowody i przeanalizować miejsca zdarzeń. Pamiętaj: każda lektura to oddzielne akta. Powodzenia.
      </p>
      <button id="start-btn" class="px-10 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold transition-all transform hover:scale-105 font-typewriter uppercase tracking-widest text-sm">
        Przyjmij Zlecenie
      </button>
    </div>
  `;
  container.querySelector('#start-btn')!.addEventListener('click', () => {
    state.currentStage = 'CHARACTERS';
    state.currentSubIndex = 0;
    render();
  });
  return container;
}

function createCharacterStage() {
  const currentCase = CHARACTER_CASES[state.currentSubIndex];
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center py-24 px-4 min-h-screen';
  
  const card = document.createElement('div');
  card.className = 'max-w-lg w-full paper-effect p-8 shadow-2xl relative border-l-[12px] border-red-900';
  card.innerHTML = `
    <div class="absolute top-2 right-4 text-[9px] font-mono opacity-40">AKTA #${currentCase.id}</div>
    <h3 class="text-xl font-typewriter mb-6 border-b border-black/10 pb-2 uppercase font-bold tracking-tight">Dane Operacyjne</h3>
    <ul class="space-y-4 mb-8">
      ${currentCase.clues.map(c => `<li class="flex gap-3 text-sm font-mono leading-tight"><span class="text-red-800">•</span> <span>${c}</span></li>`).join('')}
    </ul>
    <div class="mt-8">
      <input id="char-input" type="text" placeholder="NAZWISKO POSTACI..." class="w-full bg-transparent border-b-2 border-black p-2 font-typewriter focus:outline-none placeholder:text-black/30 text-sm">
    </div>
    <div class="flex gap-2 mt-6">
      <button id="check-char" class="bg-black text-white px-5 py-2 font-typewriter text-xs hover:bg-zinc-800">SPRAWDŹ</button>
      <button id="hint-char" class="border border-black px-5 py-2 font-typewriter text-xs hover:bg-black/5">PODPOWIEDŹ</button>
    </div>
    <div id="feedback" class="mt-4 text-xs font-bold uppercase text-center h-4"></div>
    <div id="hint-box" class="mt-4 p-3 bg-zinc-950 text-zinc-300 text-[10px] leading-relaxed border-l-2 border-yellow-500 hidden italic"></div>
  `;

  const input = card.querySelector('#char-input') as HTMLInputElement;
  const feedback = card.querySelector('#feedback')!;
  const hintBox = card.querySelector('#hint-box')!;

  const check = () => {
    const val = input.value.toLowerCase().trim();
    const isCorrect = currentCase.possibleNames.some(n => val.includes(n));
    if (isCorrect) {
      feedback.textContent = 'TOŻSAMOŚĆ POTWIERDZONA.';
      feedback.className = 'mt-4 text-xs font-bold uppercase text-center h-4 text-green-700';
      state.score += 15;
      setTimeout(() => {
        if (state.currentSubIndex < CHARACTER_CASES.length - 1) {
          state.currentSubIndex++;
          state.hint = '';
          render();
        } else {
          state.currentStage = 'SYMBOLS';
          state.currentSubIndex = 0;
          render();
        }
      }, 1000);
    } else {
      feedback.textContent = 'BŁĘDNE DANE. SPRÓBUJ PONOWNIE.';
      feedback.className = 'mt-4 text-xs font-bold uppercase text-center h-4 text-red-700';
    }
  };

  card.querySelector('#check-char')!.addEventListener('click', check);
  input.addEventListener('keydown', (e) => e.key === 'Enter' && check());
  
  card.querySelector('#hint-char')!.addEventListener('click', async () => {
    if (state.isLoading) return;
    state.isLoading = true;
    hintBox.textContent = '... nawiązywanie kontaktu z informatorem ...';
    hintBox.classList.remove('hidden');
    const h = await getDetectiveHint('Identyfikacja bohatera lektury.', currentCase.clues.join(' '));
    hintBox.textContent = `Wskazówka: "${h}"`;
    state.isLoading = false;
  });

  container.appendChild(card);
  return container;
}

function createSymbolStage() {
  const currentEvidence = SYMBOL_EVIDENCE[state.currentSubIndex];
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center py-24 px-4 min-h-screen detective-board';
  
  const board = document.createElement('div');
  board.className = 'max-w-5xl w-full grid lg:grid-cols-2 gap-8';
  board.innerHTML = `
    <div class="bg-zinc-900/95 border border-zinc-700 p-8 shadow-2xl rounded-sm">
      <h3 class="text-xl font-typewriter text-yellow-500 mb-8 border-b border-yellow-500/20 pb-2 uppercase tracking-widest">Zabezpieczone Przedmioty</h3>
      <div class="space-y-4">
        ${currentEvidence.symbols.map((s, i) => `
          <div class="bg-zinc-800 border border-zinc-600 p-4 flex items-center gap-4 group">
            <div class="w-6 h-6 bg-red-600/20 text-red-500 border border-red-500 text-[10px] flex items-center justify-center rounded-full">${i+1}</div>
            <div class="text-zinc-200 font-mono text-sm tracking-wide uppercase">${s}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="bg-zinc-900/95 border border-zinc-700 p-8 shadow-2xl rounded-sm">
      <p class="text-[10px] font-bold text-zinc-500 uppercase mb-4 tracking-tighter">Wybierz odpowiednie akta lektury:</p>
      <div id="reading-grid" class="grid grid-cols-2 gap-2 h-[380px] overflow-y-auto pr-2">
        ${ALL_READINGS.map(r => `
          <button data-reading="${r}" class="text-left p-3 text-[11px] font-bold uppercase border border-zinc-700 bg-zinc-800 hover:border-yellow-500 hover:bg-zinc-700 transition-all text-zinc-400">
            ${r}
          </button>
        `).join('')}
      </div>
      <div id="sym-feedback" class="mt-4 h-4 text-center text-[10px] font-bold uppercase"></div>
    </div>
  `;

  const feedback = board.querySelector('#sym-feedback')!;
  board.querySelectorAll('[data-reading]').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-reading');
      if (selected === currentEvidence.readingTitle) {
        btn.classList.add('bg-green-900', 'border-green-500', 'text-white');
        feedback.textContent = 'DOPASOWANIE PRAWIDŁOWE.';
        feedback.className = 'mt-4 h-4 text-center text-[10px] font-bold uppercase text-green-500';
        state.score += 10;
        setTimeout(() => {
          if (state.currentSubIndex < SYMBOL_EVIDENCE.length - 1) {
            state.currentSubIndex++;
            render();
          } else {
            state.currentStage = 'VIBES';
            state.currentSubIndex = 0;
            render();
          }
        }, 800);
      } else {
        btn.classList.add('bg-red-900', 'border-red-500', 'text-white');
        feedback.textContent = 'FAŁSZYWY ŚLAD.';
        feedback.className = 'mt-4 h-4 text-center text-[10px] font-bold uppercase text-red-500';
        setTimeout(() => {
          btn.classList.remove('bg-red-900', 'border-red-500', 'text-white');
          feedback.textContent = '';
        }, 800);
      }
    });
  });

  container.appendChild(board);
  return container;
}

function createVibeStage() {
  const currentVibe = VIBE_SCENES[state.currentSubIndex];
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center py-24 px-4 min-h-screen bg-zinc-950';
  
  const content = document.createElement('div');
  content.className = 'max-w-3xl w-full';
  content.innerHTML = `
    <div class="bg-zinc-900 border-t-4 border-yellow-500 p-8 shadow-2xl rounded-sm mb-8">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-typewriter text-white uppercase tracking-widest">Wizja Lokalna: ${currentVibe.location}</h3>
        <span class="text-[9px] font-mono text-zinc-600">RAPORT_${state.currentSubIndex + 1}</span>
      </div>
      <div class="p-6 bg-zinc-950 border border-zinc-800 text-sm md:text-base text-zinc-300 font-mono leading-relaxed italic">
        "${currentVibe.description}"
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
      ${ALL_READINGS.map(r => `
        <button data-vibe="${r}" class="p-3 text-[10px] font-bold uppercase border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-500 transition-all text-zinc-500">
          ${r}
        </button>
      `).join('')}
    </div>
    <div id="vibe-feedback" class="mt-8 text-center font-typewriter tracking-widest text-xs h-4"></div>
  `;

  const feedback = content.querySelector('#vibe-feedback')!;
  content.querySelectorAll('[data-vibe]').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-vibe');
      if (selected === currentVibe.readingTitle) {
        btn.classList.add('bg-green-700', 'border-green-400', 'text-white');
        feedback.textContent = 'LOKALIZACJA ZGODNA Z MATERIAŁEM DOWODOWYM.';
        feedback.className = 'mt-8 text-center font-typewriter tracking-widest text-xs h-4 text-green-500';
        state.score += 20;
        setTimeout(() => {
          if (state.currentSubIndex < VIBE_SCENES.length - 1) {
            state.currentSubIndex++;
            render();
          } else {
            state.currentStage = 'SUMMARY';
            render();
          }
        }, 1000);
      } else {
        btn.classList.add('bg-red-900', 'border-red-500', 'text-white');
        feedback.textContent = 'BŁĄD W ANALIZIE ATMOSFERY.';
        feedback.className = 'mt-8 text-center font-typewriter tracking-widest text-xs h-4 text-red-500';
        setTimeout(() => {
          btn.classList.remove('bg-red-900', 'border-red-500', 'text-white');
          feedback.textContent = '';
        }, 800);
      }
    });
  });

  container.appendChild(content);
  return container;
}

function createSummaryPage() {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-6';
  
  const grade = state.score > 200 ? 'CELUJĄCY' : state.score > 150 ? 'BARDZO DOBRY' : state.score > 100 ? 'DOBRY' : 'DOPUSZCZAJĄCY';

  container.innerHTML = `
    <div class="max-w-md w-full bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl text-center relative">
      <div class="absolute top-0 left-0 w-full h-1 bg-yellow-600"></div>
      <div class="text-5xl mb-6 grayscale">🕵️‍♂️</div>
      <h2 class="text-2xl font-typewriter mb-6 text-zinc-100 uppercase tracking-widest">Raport Finalny</h2>
      <div class="mb-8 p-4 bg-zinc-950 border border-zinc-800">
        <p class="text-[10px] text-zinc-500 uppercase font-mono mb-2">Zebrane Dowody</p>
        <div class="text-4xl font-bold text-yellow-500 font-mono">${state.score} pkt</div>
      </div>
      <div class="mb-10 text-left space-y-2">
        <p class="text-[9px] text-zinc-600 font-mono uppercase">Ocena operacyjna:</p>
        <div class="text-xl font-typewriter text-zinc-100">${grade}</div>
      </div>
      <button id="reset-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors font-typewriter text-xs">
        Nowa Sprawa
      </button>
    </div>
  `;
  container.querySelector('#reset-btn')!.addEventListener('click', () => {
    state = {
      currentStage: 'START',
      score: 0,
      currentSubIndex: 0,
      hint: '',
      isLoading: false
    };
    render();
  });
  return container;
}

// --- Initial Render ---
render();
