import { test, expect } from 'vitest';
import { Board } from './board';

const BOARD_SIZE = 10;

function generateSerializedBoard() {
	const fields = ['ship', 'empty', 'miss', 'hit', 'sunk'];

	const boardArray = [];
	for (let i = 0; i < Math.pow(BOARD_SIZE, 2); i++) {
		boardArray.push(fields[i % fields.length]);
	}
	return boardArray;
}

function generateSerializedBoardWith8Ships() {
	const boardArray = [];
	for (let i = 0; i < Math.pow(BOARD_SIZE, 2); i++) {
		boardArray.push('empty');
	}

	boardArray[0] = 'ship';
	boardArray[1] = 'ship';
	boardArray[8] = 'ship';
	boardArray[9] = 'ship';
	boardArray[20] = 'ship';
	boardArray[21] = 'ship';
	boardArray[28] = 'ship';
	boardArray[29] = 'ship';
	boardArray[40] = 'ship';
	boardArray[41] = 'ship';
	boardArray[48] = 'ship';
	boardArray[49] = 'ship';
	boardArray[60] = 'ship';
	boardArray[61] = 'ship';
	boardArray[68] = 'ship';
	boardArray[69] = 'ship';

	return boardArray;
}

const boardFromSerialized = new Board(generateSerializedBoard());
const boardFromScratch = new Board();
const boardWithShips = new Board(undefined, true);

test('correctly generates board from serialized', () => {
	expect(boardFromSerialized.fields.length).toBe(BOARD_SIZE);
	expect(boardFromSerialized.fields[0].length).toBe(BOARD_SIZE);
	expect(boardFromSerialized.fields[0][0]).toBe('ship');
	expect(boardFromSerialized.fields[0][1]).toBe('empty');
	expect(boardFromSerialized.fields[0][2]).toBe('miss');
	expect(boardFromSerialized.fields[0][3]).toBe('hit');
	expect(boardFromSerialized.fields[0][4]).toBe('sunk');
	expect(boardFromSerialized.fields[3][5]).toBe('ship');
	expect(boardFromSerialized.fields[3][6]).toBe('empty');
	expect(boardFromSerialized.fields[4][7]).toBe('miss');
	expect(boardFromSerialized.fields[5][8]).toBe('hit');
	expect(boardFromSerialized.fields[5][9]).toBe('sunk');
});

test('correctly encodes board', () => {
	expect(boardFromSerialized.encode()).toEqual(generateSerializedBoard());
});

test('correctly counts ships', () => {
	expect(boardFromSerialized.getNumberOfShips()).toBe(2);
	expect(boardFromScratch.getNumberOfShips()).toBe(5);
	expect(new Board(generateSerializedBoardWith8Ships()).getNumberOfShips()).toBe(8);
});
