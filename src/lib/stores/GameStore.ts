import { writable } from 'svelte/store';

export const count = writable(0);

count.subscribe((value) => {
	console.log(value);
});
