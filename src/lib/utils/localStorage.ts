import { Game } from '../../game/game';

export function getSavedGames(): Game[] {
	const serialized = localStorage.getItem('games');
	const savedGames: Game[] = [];

	if (serialized) {
		const parsedGames = JSON.parse(serialized);
		for (const id in parsedGames) {
			savedGames.push(new Game(parsedGames[id], id));
		}
	}

	return savedGames;
}

export function saveGame(game: Game) {
	const savedGames = JSON.parse(localStorage.getItem('games') || '{}');

	if (Object.getOwnPropertyNames(savedGames).length > 5) {
		const oldestGame = Object.keys(savedGames).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0];

		delete savedGames[oldestGame];
	}

	const serialized = { [game.id]: game.toString() };
	localStorage.setItem('games', JSON.stringify({ ...savedGames, ...serialized }));
}
