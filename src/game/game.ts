import { Board } from './board';

export class Game {
	playersBoard: Board;
	oponentsBoard: Board;
	playersTurn: boolean;
	id: string;
	created: string;

	constructor(serialized: string | undefined = undefined, id: string | undefined) {
		if (serialized && id) {
			const [playersBoard, oponentsBoard, playersTurn] = serialized.split('-');

			this.playersBoard = new Board(playersBoard);
			this.oponentsBoard = new Board(oponentsBoard);
			this.playersTurn = playersTurn === 'true';
			this.id = id;
			this.created = new Date().toString();
		} else {
			this.playersBoard = new Board();
			this.oponentsBoard = new Board();
			this.playersTurn = Math.random() < 0.5;
			this.id = id || Date.now().toString();
			this.created = new Date().toString();
		}
	}

	toString() {
		return `${this.playersBoard.encode()}-${this.oponentsBoard.encode()}-${this.playersTurn}`;
	}

	getNumberOfPlayersShips() {
		return this.playersBoard.getNumberOfShips();
	}

	getNumberOfOponentsShips() {
		return this.oponentsBoard.getNumberOfShips();
	}

	shoot(x: number, y: number, player: boolean) {
		if (player) {
			this.oponentsBoard.shoot(x, y);
		} else {
			this.playersBoard.shoot(x, y);
		}
	}
}
