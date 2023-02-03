<script lang="ts">
	import GameField from './GameField.svelte';
	import { createBoard } from '$lib/stores/boardStore';
	import { getSavedGames } from '$lib/utils/localStorage';

	const playerBoard = createBoard();
	const oponentBoard = createBoard();
</script>

<h1>Game board</h1>
<div class="board">
	{#each $playerBoard.fields as row, i}
		<div class="row">
			{#each row as cell, j}
				<GameField {cell} id={`${i},${j}`} player={true} on:click={() => playerBoard.shoot(i, j)} />
			{/each}
		</div>
	{/each}
</div>

<div class="saved-games">
	<h2>Saved games</h2>
	<ul>
		{#each getSavedGames() as game}
			<li>{game}</li>
		{/each}
	</ul>
</div>

<!-- <div class="board">
	{#each oponentFields as row, i}
		<div class="row">
			{#each row as cell, j}
				<GameField {cell} id={`${i},${j}`} player={false} />
			{/each}
		</div>
	{/each}
</div> -->
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
