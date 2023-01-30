import { Board } from './board';

export class Game {
	index: number;
	playersBoard: Board;
	oponentsBoard: Board;
	playersTurn: boolean;

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor(serialized: string | undefined = undefined) {
		if (serialized) {
			const [index, playersBoard, oponentsBoard, playersTurn] = serialized.split('-');

			this.index = +index;
			this.playersBoard = new Board(playersBoard.split(','));
			this.oponentsBoard = new Board(oponentsBoard.split(','));
			this.playersTurn = playersTurn === 'true';
		} else {
			this.index = Math.floor(Math.random() * Date.now());
			this.playersBoard = new Board();
			this.oponentsBoard = new Board();
			this.playersTurn = Math.random() < 0.5;
		}
	}

	toString() {
		return `${this.index}-${this.playersBoard.encode()}-${this.oponentsBoard.encode()}-${
			this.playersTurn
		}`;
	}

	getNumberOfPlayersShips() {
		return this.playersBoard.getNumberOfShips();
	}

	getNumberOfOponentsShips() {
		return this.oponentsBoard.getNumberOfShips();
	}
}
