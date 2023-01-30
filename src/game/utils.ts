import type { Field, Board } from '../types';

export function generateBoard() {
	const board: Board = [];
	for (let i = 0; i <= 9; i++) {
		board.push([]);
		for (let j = 0; j <= 9; j++) {
			board[i].push('empty');
		}
	}
	return board;
}

export function decodeBoard(board: string[]) {
	const decoded: Board = [];
	for (let i = 0; i < 9; i++) {
		decoded.push([]);
		for (let j = 0; j < 9; j++) {
			decoded[i].push(board[i * 9 + j] as Field);
		}
	}
	return decoded;
}

export function encodeBoard(board: Board) {
	const encoded = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			encoded.push(board[i][j]);
		}
	}
	encoded.join(',');
	return encoded;
}

export function getNumberOfShips(board: Board) {
	let visited: Array<[number, number]> = [];
	let count = 0;
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] === 'ship') {
			}
		}
	}
	return count;
}
