type KeyInfo = {
  letter: string[];
  finger: string;
  shift: string;
};

type Row = Record<string, KeyInfo>;

type KeyboardLayout = Record<string, Row>;

type Keyboard = {
  name: string
  "layout-standard": string,
  language: string,
  stages: string[],
  layout: KeyboardLayout 
}