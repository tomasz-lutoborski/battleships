import { generateBoard, decodeBoard, encodeBoard, getNumberOfShips } from './utils';
import type { Board } from '../types';

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
			this.playersBoard = decodeBoard(playersBoard.split(','));
			this.oponentsBoard = decodeBoard(oponentsBoard.split(','));
			this.playersTurn = playersTurn === 'true';
		} else {
			this.index = Math.floor(Math.random() * Date.now());
			this.playersBoard = generateBoard();
			this.oponentsBoard = generateBoard();
			this.playersTurn = Math.random() < 0.5;
		}
	}

	toString() {
		return `${this.index}-${encodeBoard(this.playersBoard)}-${encodeBoard(this.oponentsBoard)}-${
			this.playersTurn
		}`;
	}

	getNumberOfPlayersShips() {
		return getNumberOfShips(this.playersBoard);
	}

	getNumberOfOponentsShips() {
		return getNumberOfShips(this.oponentsBoard);
	}
}
