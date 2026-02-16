
import { CharacterCase, SymbolEvidence, VibeScene } from './types';

export const CHARACTER_CASES: CharacterCase[] = [
  {
    id: 'char-1',
    clues: [
      'Stary skąpiec z Londynu.',
      'Nienawidzi Świąt Bożego Narodzenia.',
      'Zmieniony przez wizytę trzech duchów.'
    ],
    answer: 'Ebenezer Scrooge',
    possibleNames: ['scrooge', 'ebenezer', 'ebenezer scrooge']
  },
  {
    id: 'char-2',
    clues: [
      'Polski emigrant, który został latarnikiem w Aspinwall.',
      'Zaczytał się w "Panu Tadeuszu".',
      'Przez nostalgię zaniedbał swoje obowiązki.'
    ],
    answer: 'Skawiński',
    possibleNames: ['skawiński', 'skawinski', 'latarnik']
  },
  {
    id: 'char-3',
    clues: [
      'Okrutna kobieta, która zabiła siostrę dla korony.',
      'Ma na czole krwawe piętno.',
      'Zginęła rażona piorunem.'
    ],
    answer: 'Balladyna',
    possibleNames: ['balladyna']
  }
];

export const SYMBOL_EVIDENCE: SymbolEvidence[] = [
  {
    id: 'sym-1',
    symbols: ['Dzbanek malin', 'Nóż', 'Złota korona'],
    readingTitle: 'Balladyna'
  },
  {
    id: 'sym-2',
    symbols: ['Mur graniczny', 'List miłosny', 'Krokodyl'],
    readingTitle: 'Zemsta'
  },
  {
    id: 'sym-3',
    symbols: ['Róża', 'Baobaby', 'Lis'],
    readingTitle: 'Mały Książę'
  },
  {
    id: 'sym-4',
    symbols: ['Ryba (znak)', 'Płonący Rzym', 'Krzyż'],
    readingTitle: 'Quo Vadis'
  },
  {
    id: 'sym-5',
    symbols: ['Ziarna gorczycy', 'Kocioł', 'Pusty kościół'],
    readingTitle: 'Dziady cz. II'
  },
  {
    id: 'sym-6',
    symbols: ['Stara książka', 'Latarnia morska', 'Ocean'],
    readingTitle: 'Latarnik'
  },
  {
    id: 'sym-7',
    symbols: ['Butelki z benzyną', 'Kotwica (znak Polski Walczącej)', 'Książka "Lord Jim"'],
    readingTitle: 'Kamienie na szaniec'
  },
  {
    id: 'sym-8',
    symbols: ['Mundur rosyjski', 'Tabliczka mnożenia', 'Recytacja Reduty Ordona'],
    readingTitle: 'Syzyfowe prace'
  },
  {
    id: 'sym-9',
    symbols: ['Róg bawoleń', 'Serwis Horeszków', 'Czarna polewka'],
    readingTitle: 'Pan Tadeusz'
  }
];

export const VIBE_SCENES: VibeScene[] = [
  {
    id: 'vibe-1',
    description: 'Atmosfera walki, odwagi i młodzieńczego braterstwa w okupowanej Warszawie.',
    location: 'Wojenna Warszawa',
    readingTitle: 'Kamienie na szaniec'
  },
  {
    id: 'vibe-2',
    description: 'Sielski spokój szlacheckiego dworku, zapach bigosu i dźwięki poloneza.',
    location: 'Soplicowo',
    readingTitle: 'Pan Tadeusz'
  },
  {
    id: 'vibe-3',
    description: 'Mroźny, mglisty Londyn XIX wieku, atmosfera osamotnienia i nadnaturalnych zjawisk.',
    location: 'Londyn',
    readingTitle: 'Opowieść wigilijna'
  },
  {
    id: 'vibe-4',
    description: 'Mroczne jezioro, nocna aura, obietnice i straszliwa kara za zdradę.',
    location: 'Brzeg jeziora Świteź',
    readingTitle: 'Świtezianka'
  }
];

export const ALL_READINGS = [
  'Pan Tadeusz',
  'Balladyna',
  'Zemsta',
  'Mały Książę',
  'Quo Vadis',
  'Dziady cz. II',
  'Latarnik',
  'Opowieść wigilijna',
  'Kamienie na szaniec',
  'Syzyfowe prace',
  'Artysta',
  'Świtezianka'
];
