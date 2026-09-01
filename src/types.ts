export interface WheelItem {
  id: number;
  number: number;
  label: string; // Korean
  phrase: string; // Full English phrase
  blanks: {
    prefix?: string;
    blank: string;
    suffix?: string;
    secondPrefix?: string;
    secondBlank?: string;
    secondSuffix?: string;
  };
  highlightColor: string;
  description: string;
  targetColors: {
    part: string;
    colorName: string;
    expectedHexes: string[];
  }[];
}

export type ColorMap = Record<number, Record<string, string>>;

export interface QuizState {
  answers: Record<number, { primary: string; secondary?: string }>;
  isSubmitted: boolean;
  showHints: boolean;
}

