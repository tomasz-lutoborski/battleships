<script lang="ts">
	import { count } from '$lib/stores/GameStore';
	import { Game } from '../../../game/game';
	import GameField from './GameField.svelte';

	function handleShot(e: CustomEvent<{ id: string; player: boolean }>) {
		const [i, j] = e.detail.id.split(',').map(Number);
		game.shoot(i, j, e.detail.player);
	}

	function increment() {
		count.update((n) => n + 1);
	}

	const game = new Game();

	let countValue = 0;
	count.subscribe((value) => {
		countValue = value;
	});

	$: playerFields = game.playersBoard.fields;
	$: oponentFields = game.oponentsBoard.fields;
</script>

<h1>Game board</h1>
<div class="board">
	{#each playerFields as row, i}
		<div class="row">
			{#each row as cell, j}
				<GameField {cell} on:click={handleShot} id={`${i},${j}`} player={true} />
			{/each}
		</div>
	{/each}
</div>

<div class="board">
	{#each oponentFields as row, i}
		<div class="row">
			{#each row as cell, j}
				<GameField {cell} id={`${i},${j}`} player={false} />
			{/each}
		</div>
	{/each}
</div>

<button on:click={increment}>{countValue}</button>

<style>
	.row {
		display: flex;
		gap: 2px;
	}

	.board {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-bottom: 2rem;
	}
</style>
