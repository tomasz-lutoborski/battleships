export type Field = 'ship' | 'miss' | 'hit' | 'sunk' | 'empty';

export type Board = Field[][];

export type Ship = number[][];

export type Player = 'player' | 'computer';

export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };
