export type Finger =
  | 'pinkyLeft'
  | 'ringLeft'
  | 'middleLeft'
  | 'indexLeft'
  | 'indexRight'
  | 'middleRight'
  | 'ringRight'
  | 'pinkyRight'
  | 'thumbLeft';

export type Shift = 'left' | 'right' | '';

export type Standard = 'iso' | 'ansi' | 'ortholinear';

export type Letters = {
  display: string;
  withoutShift: string;
  withShift: string;
};

export type RowKey = {
  letter: Letters;
  finger: Finger;
  shift: Shift;
};

export type KeyboardRow = {
  rowKeys: RowKey[];
};

export type Layout = {
  name: string;
  standard: Standard;
  layoutMasterVersion: number; // used for compatibility
  keyboardRows: KeyboardRow[];
};

export type LayoutConfig = {
  [layoutName: string]: Layout;
};
