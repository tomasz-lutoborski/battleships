import type { Field } from '../types';

const BOARD_SIZE = 10;

export class Board {
	fields: Field[][];

	constructor(serialized: string[] | undefined = undefined) {
		this.fields = [];

		if (serialized) {
			for (let i = 0; i < BOARD_SIZE; i++) {
				this.fields.push([]);
				for (let j = 0; j < BOARD_SIZE; j++) {
					this.fields[i].push(serialized[i * BOARD_SIZE + j] as Field);
				}
			}
		} else {
			for (let i = 0; i < BOARD_SIZE; i++) {
				this.fields.push([]);
				for (let j = 0; j < BOARD_SIZE; j++) {
					this.fields[i].push('empty');
				}
			}
		}
	}

	encode() {
		const encoded = [];
		for (let i = 0; i < BOARD_SIZE; i++) {
			for (let j = 0; j < BOARD_SIZE; j++) {
				encoded.push(this.fields[i][j]);
			}
		}
		encoded.join(',');
		return encoded;
	}

	getNumberOfShips() {
		const markShip = (shipTracker: number[][], i: number, j: number, count: number) => {
			if (
				i < 0 ||
				i >= BOARD_SIZE ||
				j < 0 ||
				j >= BOARD_SIZE ||
				shipTracker[i][j] !== 0 ||
				this.fields[i][j] !== 'ship'
			) {
				return;
			}
			shipTracker[i][j] = count;
			markShip(shipTracker, i - 1, j, count);
			markShip(shipTracker, i + 1, j, count);
			markShip(shipTracker, i, j - 1, count);
			markShip(shipTracker, i, j + 1, count);
		};

		let count = 0;
		const shipTracker: number[][] = [];
		for (let i = 0; i < BOARD_SIZE; i++) {
			shipTracker.push([]);
			for (let j = 0; j < BOARD_SIZE; j++) {
				shipTracker[i].push(0);
			}
		}

		for (let i = 0; i < BOARD_SIZE; i++) {
			for (let j = 0; j < BOARD_SIZE; j++) {
				if (this.fields[i][j] === 'ship' && shipTracker[i][j] === 0) {
					count++;
					markShip(shipTracker, i, j, count);
				}
			}
		}

		return count;
	}
}
