
// --- Constants & Data ---

const REWARDS = {
  CHARACTERS: {
    title: "PRZEŁOM W ŚLEDZTWIE",
    compliment: "Przesłuchania zakończone sukcesem. Świadkowie potwierdzili: sprawca uciekał w stronę Portalu Symboli. Jesteś na dobrym tropie!",
    quote: "„Nie porzucaj nadzieje, jakoć się kolwiek dzieje”",
    author: "Jan Kochanowski",
    nextStage: 'SYMBOLS'
  },
  SYMBOLS: {
    title: "GORĄCY TROP",
    compliment: "Zabezpieczone dowody są jednoznaczne. Sprawca ukrył się w jednym z literackich światów. Czas na wizję lokalną i odzyskanie Księgi!",
    quote: "„Dobrze widzi się tylko sercem. Najważniejsze jest niewidoczne dla oczu.”",
    author: "Antoine de Saint-Exupéry",
    nextStage: 'VIBES'
  },
  VIBES: {
    title: "KSIĘGA ODZYSKANA!",
    compliment: "Niesamowite! Znalazłeś kryjówkę Cienia Zapomnienia i odzyskałeś Zaginioną Księgę Arkun. Egzamin ósmoklasisty jest uratowany!",
    quote: "„Gdy się zamkną jedne drzwi do szczęścia, otwierają się inne.”",
    author: "Henryk Sienkiewicz",
    nextStage: 'SUMMARY'
  }
};

const CHARACTER_CASES = [
  { id: 'char-1', clues: ['Sprawcę widział skąpiec z Londynu.', 'Twierdzi, że sprawca ukradł mu łańcuchy Marleya.', 'Mówi, że „Cień” pachniał wigilijną pieczenią.'], possibleNames: ['scrooge', 'ebenezer', 'ebenezer scrooge'], hint: 'Odwiedziły go trzy duchy: Przeszłości, Teraźniejszości i Przyszłości.' },
  { id: 'char-2', clues: ['Latarnik z Aspinwall zgłasza kradzież.', 'Zamiast Księgi Arkun, ktoś podłożył mu „Pana Tadeusza”.', 'Świadek był zbyt zaczytany, by widzieć twarz złodzieja.'], possibleNames: ['skawiński', 'skawinski', 'latarnik'], hint: 'Zgubiła go tęsknota za ojczyzną i lektura Mickiewicza.' },
  { id: 'char-3', clues: ['Kobieta z dzbankiem malin widziała ucieczkę.', 'Mówi, że sprawca omal nie potknął się o koronę Popiela.', 'Na czole świadka lśni dziwna plama.'], possibleNames: ['balladyna'], hint: 'Zabiła swoją siostrę Alinę w lesie.' },
  { id: 'char-4', clues: ['Mały mieszkaniec asteroidy B-612 widział blask.', 'Myślał, że to nowa gwiazda, ale to była skradziona Księga.', 'Wspomina coś o „odpowiedzialności za to, co się oswoiło”.'], possibleNames: ['mały książę', 'maly ksiaze'], hint: 'Kochał Różę, choć była kapryśna.' },
  { id: 'char-5', clues: ['Szeregowiec z Placu Broni salutował sprawcy.', 'Myślał, że to poseł od Czerwonych Koszul.', 'Widział go w Ogrodzie Botanicznym.'], possibleNames: ['nemeczek', 'ernest nemeczek'], hint: 'Najmniejszy żołnierz, który oddał życie za Plac.' },
  { id: 'char-6', clues: ['Lew z magicznej krainy poczuł zło.', 'Mówi, że sprawca przeszedł przez szafę do innego świata.'], possibleNames: ['aslan'], hint: 'Władca Narnii, potężny Lew.' },
  { id: 'char-7', clues: ['Wojowie z Mirmiłowa próbowali go gonić na miotłach.', 'Sprawca uciekł im, używając magicznej maści.'], possibleNames: ['kajko i kokosz', 'kajko', 'kokosz'], hint: 'Dwaj słowiańscy wojowie, jeden mądry, drugi silny.' },
  { id: 'char-8', clues: ['Szlachcic krzyczący „Mocium panie!” jest wściekły.', 'Sprawca uciekł przez dziurę w murze granicznym.'], possibleNames: ['cześnik', 'czesnik', 'raptusiewicz'], hint: 'Jego sąsiadem i wrogiem jest Rejent Milczek.' }
];

const SYMBOL_EVIDENCE = [
  { id: 'sym-1', symbols: ['Dzbanek malin', 'Nóż', 'Złota korona'], readingTitle: 'Balladyna' },
  { id: 'sym-2', symbols: ['Mur graniczny', 'List miłosny', 'Krokodyl'], readingTitle: 'Zemsta' },
  { id: 'sym-3', symbols: ['Róża', 'Baobaby', 'Lis'], readingTitle: 'Mały Książę' },
  { id: 'sym-4', symbols: ['Ryba (znak)', 'Płonący Rzym', 'Krzyż'], readingTitle: 'Quo Vadis' },
  { id: 'sym-5', symbols: ['Ziarna gorczycy', 'Kocioł', 'Pusty kościół'], readingTitle: 'Dziady cz. II' },
  { id: 'sym-6', symbols: ['Książka', 'Latarnia morska', 'Ocean'], readingTitle: 'Latarnik' },
  { id: 'sym-7', symbols: ['Pawiak', 'kotwica', 'marmolada'], readingTitle: 'Kamienie na szaniec' },
  { id: 'sym-8', symbols: ['Mundur rosyjski', 'dyscyplina', 'Recytacja Reduty Ordona'], readingTitle: 'Syzyfowe prace' },
  { id: 'sym-9', symbols: ['Róg', 'Zamek', 'Czarna polewka'], readingTitle: 'Pan Tadeusz' },
  { id: 'sym-10', symbols: ['Szafa', 'Latarnia w lesie', 'Ptasie mleczko'], readingTitle: 'Opowieści z Narnii' },
  { id: 'sym-11', symbols: ['Latający kufer', 'Maść na latanie', 'Magiczna fujarka'], readingTitle: 'Kajko i Kokosz' },
  { id: 'sym-12', symbols: ['Woda', 'Przysięga', 'Strzelec'], readingTitle: 'Świtezianka' },
  { id: 'sym-13', symbols: ['Kogut', 'Cyrk', 'Wybujałe ambicje'], readingTitle: 'Artysta' }
];

const VIBE_SCENES = [
  { id: 'vibe-1', description: 'Atmosfera walki, odwagi i młodzieńczego braterstwa. Tu widziano sprawcę malującego żółwia na murze.', location: 'Wojenna Warszawa', readingTitle: 'Kamienie na szaniec' },
  { id: 'vibe-2', description: 'Sielski spokój dworku. Świadkowie mówią, że złodziej ukrył się w wozie z bigosem.', location: 'Soplicowo', readingTitle: 'Pan Tadeusz' },
  { id: 'vibe-3', description: 'Plac zabaw pełen honoru. Nemeczek widział, jak sprawca przemyka za fortecą.', location: 'Plac Broni', readingTitle: 'Chłopcy z Placu Broni' },
  { id: 'vibe-4', description: 'Wieczna zima. Ślady stóp prowadzą prosto pod latarnię w lesie.', location: 'Narnia', readingTitle: 'Opowieści z Narnii' },
  { id: 'vibe-5', description: 'Słowiański gród pod atakiem. Kokosz twierdzi, że złodziej uciekał w stronę szkoły czarownic.', location: 'Mirmiłowo', readingTitle: 'Kajko i Kokosz' },
  { id: 'vibe-6', description: 'Mroźny Londyn. Duchy wskazują palcem na kantorek, w którym „Cień” liczy skradzione strony.', location: 'Londyn', readingTitle: 'Opowieść wigilijna' },
  { id: 'vibe-7', description: 'Brzeg jeziora. Strzelec widział błysk Księgi odbijający się w tafli wody.', location: 'Świteź', readingTitle: 'Świtezianka' },
  { id: 'vibe-8', description: 'Pustynia. To tutaj sprawca porzucił swój kamuflaż i ukrył Księgi Arkun.', location: 'Sahara', readingTitle: 'Mały Książę' }
];

const ALL_READINGS = [
  'Pan Tadeusz', 'Balladyna', 'Zemsta', 'Mały Książę', 'Quo Vadis', 'Dziady cz. II',
  'Latarnik', 'Opowieść wigilijna', 'Kamienie na szaniec', 'Syzyfowe prace', 'Artysta', 'Świtezianka',
  'Kajko i Kokosz', 'Opowieści z Narnii', 'Chłopcy z Placu Broni', 'Reduta Ordona'
].sort();

// --- State Management ---

let state = {
  currentStage: 'START',
  lastCompletedStage: '',
  score: 0,
  currentSubIndex: 0,
  hint: '',
  isLoading: false
};

// --- DOM Rendering ---

const root = document.getElementById('root');

function render() {
  root.innerHTML = '';

  if (state.currentStage !== 'START' && state.currentStage !== 'SUMMARY' && state.currentStage !== 'REWARD') {
    root.appendChild(createHeader());
  }

  const main = document.createElement('main');
  main.className = 'fade-in';

  switch (state.currentStage) {
    case 'START': main.appendChild(createLandingPage()); break;
    case 'CHARACTERS': main.appendChild(createCharacterStage()); break;
    case 'SYMBOLS': main.appendChild(createSymbolStage()); break;
    case 'VIBES': main.appendChild(createVibeStage()); break;
    case 'REWARD': main.appendChild(createRewardPage()); break;
    case 'SUMMARY': main.appendChild(createSummaryPage()); break;
  }

  root.appendChild(main);
  root.appendChild(createFooter());
}

function createHeader() {
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 right-0 bg-zinc-900/95 border-b border-zinc-800 p-4 flex justify-between items-center z-50 backdrop-blur-sm';
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">?</div>
      <h1 class="text-xs md:text-sm font-typewriter tracking-widest text-zinc-100 uppercase">MISJA: KSIĘGA ARKUN</h1>
    </div>
    <div class="bg-red-950/50 border border-red-900/50 px-3 py-1 rounded text-red-400 font-mono text-[10px]">
      POSTĘP ŚLEDZTWA: ${state.score} PKT
    </div>
  `;
  return header;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'fixed bottom-0 left-0 right-0 p-2 bg-black/90 text-[8px] text-zinc-600 font-mono flex justify-between uppercase z-50 border-t border-zinc-900';
  footer.innerHTML = `
    <span>STATUS: ${state.currentStage === 'START' ? 'STANDBY' : 'ACTIVE_SEARCH'}</span>
    <span>DETEKTYW LITERACKI KLASY 8</span>
  `;
  return footer;
}

function createLandingPage() {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-6 text-center';
  container.innerHTML = `
    <div class="max-w-2xl bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl relative">
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <h2 class="text-3xl md:text-5xl font-typewriter mb-6 text-yellow-500 uppercase">Kradzież w Bibliotece</h2>
      <p class="text-zinc-400 mb-8 leading-relaxed font-mono text-sm">
        UWAGA! "Cień Zapomnienia" skradł <span class="text-white font-bold">Zaginioną Księgę Arkun</span>. 
        Jeśli jej nie odzyskasz, wszyscy ósmoklasiści obleją egzamin! 
        Musisz przesłuchać świadków, zebrać dowody i namierzyć kryjówkę sprawcy.
      </p>
      <button id="start-btn" class="px-10 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold transition-all font-typewriter uppercase tracking-widest text-sm">
        Przyjmij Zlecenie
      </button>
    </div>
  `;
  container.querySelector('#start-btn').addEventListener('click', () => {
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
  container.innerHTML = `
    <div class="max-w-lg w-full paper-effect p-8 shadow-2xl relative border-l-[12px] border-zinc-800">
      <div class="text-[9px] font-mono opacity-40 uppercase mb-2">PRZESŁUCHANIE ŚWIADKA #${state.currentSubIndex + 1}</div>
      <h3 class="text-xl font-typewriter mb-6 border-b border-black/10 pb-2 uppercase font-bold">Zeznania</h3>
      <ul class="space-y-4 mb-8">
        ${currentCase.clues.map(c => `<li class="flex gap-3 text-sm font-mono italic leading-tight text-zinc-700"><span>- "${c}"</span></li>`).join('')}
      </ul>
      <input id="char-input" type="text" placeholder="KOGO PRZESŁUCHUJESZ?..." class="w-full bg-transparent border-b-2 border-black p-2 font-typewriter focus:outline-none text-sm uppercase">
      <div class="flex gap-2 mt-6">
        <button id="check-char" class="bg-black text-white px-5 py-2 font-typewriter text-xs">POTWIERDŹ</button>
        <button id="hint-char" class="border border-black px-5 py-2 font-typewriter text-xs">PODPOWIEDŹ</button>
      </div>
      <div id="feedback" class="mt-4 text-[10px] font-bold uppercase text-center h-4"></div>
      <div id="hint-box" class="mt-4 p-3 bg-zinc-950 text-zinc-300 text-[10px] hidden italic"></div>
    </div>
  `;

  const input = container.querySelector('#char-input');
  const feedback = container.querySelector('#feedback');
  const hintBox = container.querySelector('#hint-box');

  const check = () => {
    const val = input.value.toLowerCase().trim();
    if (currentCase.possibleNames.some(n => val.includes(n))) {
      feedback.textContent = 'ŚWIADEK ZIDENTYFIKOWANY. TROP POTWIERDZONY.';
      state.score += 20;
      setTimeout(() => {
        if (state.currentSubIndex < CHARACTER_CASES.length - 1) {
          state.currentSubIndex++;
          render();
        } else {
          state.lastCompletedStage = 'CHARACTERS';
          state.currentStage = 'REWARD';
          render();
        }
      }, 1000);
    } else {
      feedback.textContent = 'TO NIE TA OSOBA. SPRÓBUJ PONOWNIE.';
    }
  };

  container.querySelector('#check-char').addEventListener('click', check);
  container.querySelector('#hint-char').addEventListener('click', () => {
    hintBox.classList.remove('hidden');
    hintBox.textContent = currentCase.hint;
  });
  input.addEventListener('keydown', (e) => e.key === 'Enter' && check());
  return container;
}

function createSymbolStage() {
  const currentEvidence = SYMBOL_EVIDENCE[state.currentSubIndex];
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center py-24 px-4 min-h-screen detective-board';
  container.innerHTML = `
    <div class="max-w-5xl w-full grid lg:grid-cols-2 gap-8">
      <div class="bg-zinc-900/95 border border-zinc-700 p-8 shadow-2xl">
        <h3 class="text-xl font-typewriter text-yellow-500 mb-8 border-b border-yellow-500/20 pb-2 uppercase">Ślady na Miejscu Zdarzenia</h3>
        <div class="grid gap-3">
          ${currentEvidence.symbols.map(s => `<div class="bg-zinc-800 p-4 border border-zinc-600 text-zinc-300 font-mono text-xs uppercase">${s}</div>`).join('')}
        </div>
      </div>
      <div class="bg-zinc-900/95 border border-zinc-700 p-8 shadow-2xl overflow-hidden">
        <p class="text-[10px] font-bold text-zinc-500 uppercase mb-4">W którym świecie sprawca zostawił te ślady?</p>
        <div class="grid grid-cols-2 gap-2 h-[350px] overflow-y-auto pr-2">
          ${ALL_READINGS.map(r => `<button data-reading="${r}" class="text-left p-3 text-[10px] font-bold uppercase border border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-white transition-all">${r}</button>`).join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-reading]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.getAttribute('data-reading') === currentEvidence.readingTitle) {
        state.score += 15;
        if (state.currentSubIndex < SYMBOL_EVIDENCE.length - 1) {
          state.currentSubIndex++; render();
        } else {
          state.lastCompletedStage = 'SYMBOLS';
          state.currentStage = 'REWARD';
          render();
        }
      } else {
        btn.classList.add('bg-red-900');
        setTimeout(() => btn.classList.remove('bg-red-900'), 500);
      }
    });
  });
  return container;
}

function createVibeStage() {
  const currentVibe = VIBE_SCENES[state.currentSubIndex];
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center py-24 px-4 min-h-screen bg-zinc-950';
  container.innerHTML = `
    <div class="max-w-3xl w-full">
      <div class="bg-zinc-900 border-t-4 border-yellow-500 p-8 shadow-2xl mb-8">
        <h3 class="text-lg font-typewriter text-white uppercase tracking-widest mb-4">Namierzanie Kryjówki: ${currentVibe.location}</h3>
        <div class="p-6 bg-zinc-950 border border-zinc-800 text-sm text-zinc-400 font-mono leading-relaxed italic">
          "${currentVibe.description}"
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
        ${ALL_READINGS.map(r => `<button data-vibe="${r}" class="p-3 text-[10px] font-bold uppercase border border-zinc-800 bg-zinc-900 text-zinc-600 hover:text-white">${r}</button>`).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-vibe]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.getAttribute('data-vibe') === currentVibe.readingTitle) {
        state.score += 25;
        if (state.currentSubIndex < VIBE_SCENES.length - 1) {
          state.currentSubIndex++; render();
        } else {
          state.lastCompletedStage = 'VIBES';
          state.currentStage = 'REWARD';
          render();
        }
      }
    });
  });
  return container;
}

function createRewardPage() {
  const reward = REWARDS[state.lastCompletedStage];
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-6 bg-zinc-950';
  container.innerHTML = `
    <div class="max-w-xl w-full bg-zinc-900 border-2 border-yellow-600 p-10 shadow-2xl text-center relative">
      <div class="text-yellow-500 font-typewriter text-[10px] mb-4 tracking-[0.3em] uppercase">DEPESZA OPERACYJNA</div>
      <h2 class="text-2xl font-typewriter mb-6 text-white uppercase">${reward.title}</h2>
      <p class="mb-8 text-zinc-300 font-mono text-sm leading-relaxed border-y border-zinc-800 py-6">${reward.compliment}</p>
      <div class="mb-10 italic text-yellow-500/80">
        <p class="text-lg font-serif">"${reward.quote}"</p>
        <p class="text-[9px] font-mono text-zinc-600 uppercase mt-2">— ${reward.author}</p>
      </div>
      <button id="reward-continue" class="px-12 py-4 bg-yellow-600 text-black font-bold uppercase font-typewriter text-xs">KONTYNUUJ POŚCIG</button>
    </div>
  `;
  container.querySelector('#reward-continue').addEventListener('click', () => {
    state.currentStage = reward.nextStage;
    state.currentSubIndex = 0;
    render();
  });
  return container;
}

function createSummaryPage() {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-6 bg-zinc-950';
  const maxScore = (CHARACTER_CASES.length * 20) + (SYMBOL_EVIDENCE.length * 15) + (VIBE_SCENES.length * 25);
  const grade = state.score > (maxScore * 0.9) ? 'CELUJĄCY' : state.score > (maxScore * 0.7) ? 'BARDZO DOBRY' : 'DOBRY';

  container.innerHTML = `
    <div class="max-w-md w-full bg-zinc-900 border border-zinc-800 p-10 shadow-2xl text-center">
      <div class="text-6xl mb-6">📖</div>
      <h2 class="text-2xl font-typewriter mb-6 text-zinc-100 uppercase">MISJA ZAKOŃCZONA</h2>
      <div class="mb-8 p-6 bg-zinc-950 border border-zinc-800 rounded">
        <p class="text-[10px] text-zinc-500 uppercase font-mono mb-2">KSIĘGA ARKUN ODZYSKANA</p>
        <div class="text-4xl font-bold text-yellow-500 font-mono mb-2">${state.score} pkt</div>
        <p class="text-[9px] text-zinc-600 font-mono">TWOJA GOTOWOŚĆ: <span class="text-white">${grade}</span></p>
      </div>
      <p class="text-zinc-400 text-xs mb-8 italic">"Cień Zapomnienia został wygnany. Wiedza o lekturach jest bezpieczna. Powodzenia na prawdziwym egzaminie!"</p>
      <button id="reset-btn" class="w-full py-4 bg-white text-black font-bold uppercase font-typewriter text-xs">POWRÓT DO BAZY</button>
    </div>
  `;
  container.querySelector('#reset-btn').addEventListener('click', () => {
    state = { currentStage: 'START', lastCompletedStage: '', score: 0, currentSubIndex: 0, hint: '', isLoading: false };
    render();
  });
  return container;
}

// Initial render
render();
