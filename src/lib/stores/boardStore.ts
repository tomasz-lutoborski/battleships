import { writable } from 'svelte/store';
import { Board } from '../../game/board';

export const createBoard = (serialized: string | undefined = undefined) => {
	const { subscribe, set, update } = writable<Board>(new Board(serialized));

	return {
		subscribe,
		set,
		update,
		shoot: (x: number, y: number) => {
			update((board) => {
				console.log(board.getShips());
				board.shoot(x, y);
				return board;
			});
		},
		reset: () => {
			set(new Board());
		}
	};
};
