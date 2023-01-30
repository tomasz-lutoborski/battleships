import { generateBoard } from './utils';
import { test, expect } from 'vitest';

test('generates board filled with zeros', () => {
	const board = generateBoard();
	expect(board.length).toBe(10);
	expect(board[0].length).toBe(10);
	expect(board[0][0]).toBe('empty');
	expect(board[9][9]).toBe('empty');
});
