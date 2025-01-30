// TODO:Try to reduce the size of layouts. Currently a single layout is around 7kb.
export type Key = {
	letter: string[];
	finger: string;
	shift: string;
};

export type Row = {
	keys: Key[];
};

export type Layout = {
	name: string;
	standard: string;
	layoutMasterVersion: number;
	rows: Row[];
};

export type LayoutConfig = {
	[layoutName: string]: Layout;
};

