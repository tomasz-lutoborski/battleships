<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let cell: string;
	let id: string;
	let player: boolean;

	const dispatch = createEventDispatcher<{ click: { id: string; player: boolean } }>();

	function handleClick() {
		dispatch('click', { id, player });
	}

	export { cell, id, player };
</script>

<button class={`${cell} cell`} on:click={handleClick} />

<style>
	.empty {
		background-color: blue;
		cursor: pointer;
	}
	.ship {
		background-color: green;
	}
	.hit {
		background-color: red;
	}
	.miss {
		background-color: yellow;
	}
	.sunk {
		background-color: black;
	}

	.cell {
		width: 3.5rem;
		height: 3.5rem;
		border: none;
		border-radius: 2px;
	}
</style>
