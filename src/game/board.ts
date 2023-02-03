import type { Field, Ship } from '../types';

const BOARD_SIZE = 10;

export class Board {
	fields: Field[][];
	ships: Ship[];

	constructor(serialized: string | undefined = undefined, populated: boolean = true) {
		this.fields = [];

		if (serialized) {
			let serializedArr = serialized.split(',');
			for (let i = 0; i < BOARD_SIZE; i++) {
				this.fields.push([]);
				for (let j = 0; j < BOARD_SIZE; j++) {
					this.fields[i].push(serializedArr[i * BOARD_SIZE + j] as Field);
				}
			}
		} else {
			if (!populated) {
				for (let i = 0; i < BOARD_SIZE; i++) {
					this.fields.push([]);
					for (let j = 0; j < BOARD_SIZE; j++) {
						this.fields[i].push('empty');
					}
				}
			} else {
				for (let i = 0; i < BOARD_SIZE; i++) {
					this.fields.push([]);
					for (let j = 0; j < BOARD_SIZE; j++) {
						this.fields[i].push('empty');
					}
				}
				const ships = [5, 4, 3, 3, 2];
				for (let i = 0; i < ships.length; i++) {
					const ship = ships[i];
					const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
					let x = Math.floor(Math.random() * BOARD_SIZE);
					let y = Math.floor(Math.random() * BOARD_SIZE);
					if (direction === 'horizontal') {
						while (!this.isFieldAvailable(x, y, direction, ship)) {
							x = Math.floor(Math.random() * BOARD_SIZE);
							y = Math.floor(Math.random() * BOARD_SIZE);
						}
					} else {
						while (!this.isFieldAvailable(x, y, direction, ship)) {
							y = Math.floor(Math.random() * BOARD_SIZE);
							x = Math.floor(Math.random() * BOARD_SIZE);
						}
					}
					for (let j = 0; j < ship; j++) {
						if (direction === 'vertical') {
							this.fields[x + j][y] = 'ship';
						} else {
							this.fields[x][y + j] = 'ship';
						}
					}
				}
			}
		}

		this.ships = this.getShips();
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

	getShips() {
		const markShip = (shipTracker: number[][], i: number, j: number, count: number, ship: Ship) => {
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
			ship.push([i, j]);
			markShip(shipTracker, i - 1, j, count, ship);
			markShip(shipTracker, i + 1, j, count, ship);
			markShip(shipTracker, i, j - 1, count, ship);
			markShip(shipTracker, i, j + 1, count, ship);
		};

		const ships: Ship[] = [];
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
					const ship: Ship = [];
					markShip(shipTracker, i, j, count, ship);
					ships.push(ship);
				}
			}
		}

		return ships;
	}

	isFieldAvailable(
		x: number,
		y: number,
		direction: 'horizontal' | 'vertical' = 'horizontal',
		shipSize: number = 1
	) {
		let neigbours = [
			[x - 1, y - 1],
			[x - 1, y],
			[x - 1, y + 1],
			[x, y - 1],
			[x, y + 1],
			[x + 1, y - 1],
			[x + 1, y],
			[x + 1, y + 1]
		];

		for (let i = 0; i < shipSize; i++) {
			if (direction === 'vertical') {
				if (
					x + i < 0 ||
					x + i >= BOARD_SIZE ||
					y < 0 ||
					y >= BOARD_SIZE ||
					this.fields[x + i][y] !== 'empty'
				) {
					return false;
				}
				for (let j = 0; j < neigbours.length; j++) {
					const [a, b] = neigbours[j];
					if (a + i < 0 || a + i >= BOARD_SIZE || b < 0 || b >= BOARD_SIZE) {
						continue;
					}
					if (this.fields[a + i][b] !== 'empty') {
						return false;
					}
				}
			} else {
				if (
					x < 0 ||
					x >= BOARD_SIZE ||
					y < 0 ||
					y >= BOARD_SIZE ||
					this.fields[x][y + i] !== 'empty'
				) {
					return false;
				}
				for (let j = 0; j < neigbours.length; j++) {
					const [a, b] = neigbours[j];
					if (a < 0 || a >= BOARD_SIZE || b + i < 0 || b + i >= BOARD_SIZE) {
						continue;
					}
					if (this.fields[a][b + i] !== 'empty') {
						return false;
					}
				}
			}
		}
		return true;
	}

	checkIfShipIsSunk(ship: Ship) {
		for (let i = 0; i < ship.length; i++) {
			const [x, y] = ship[i];
			if (this.fields[x][y] !== 'hit') {
				return false;
			}
		}
		return true;
	}

	shoot(x: number, y: number) {
		if (this.fields[x][y] === 'ship') {
			this.fields[x][y] = 'hit';
		}
		this.fields[x][y] = 'miss';
	}
}
