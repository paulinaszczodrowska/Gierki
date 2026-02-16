
export enum GameStage {
  START = 'START',
  CHARACTERS = 'CHARACTERS',
  SYMBOLS = 'SYMBOLS',
  VIBES = 'VIBES',
  SUMMARY = 'SUMMARY'
}

export interface CharacterCase {
  id: string;
  clues: string[];
  answer: string;
  possibleNames: string[]; // Variations for fuzzy matching
}

export interface SymbolEvidence {
  id: string;
  symbols: string[];
  readingTitle: string;
}

export interface VibeScene {
  id: string;
  description: string;
  location: string;
  readingTitle: string;
}

export interface GameState {
  currentStage: GameStage;
  score: number;
  completedTasks: string[];
  startTime: number;
}
