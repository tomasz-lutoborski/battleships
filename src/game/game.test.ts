import { Game } from './game';
import { expect, test } from 'vitest';

const game = new Game();

test('game is created', () => {
	expect(game).toBeTruthy();
});
