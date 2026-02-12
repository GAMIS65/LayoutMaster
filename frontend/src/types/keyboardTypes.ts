export enum Finger {
  PinkyLeft = 'pinkyLeft',
  RingLeft = 'ringLeft',
  MiddleLeft = 'middleLeft',
  IndexLeft = 'indexLeft',
  IndexRight = 'indexRight',
  MiddleRight = 'middleRight',
  RingRight = 'ringRight',
  PinkyRight = 'pinkyRight',
  ThumbLeft = 'thumbLeft',
}

export enum Shift {
  Left = 'left',
  Right = 'right',
  None = '',
}

export enum Standard {
  Iso = 'iso',
  Ansi = 'ansi',
  Ortholinear = 'ortholinear',
}

export type Letters = {
  display: string;
  withoutShift: string;
  withShift: string;
};

export type Key = {
  letter: Letters;
  finger: Finger;
  shift: Shift;
};

export type Row = {
  rows: Key[];
};

export type Layout = {
  name: string;
  standard: Standard;
  layoutMasterLayoutVersion: number; // used for compatibility
  rows: Row[];
};

export type LayoutConfig = {
  [layoutName: string]: Layout;
};
