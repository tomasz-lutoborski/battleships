import { writable } from 'svelte/store';

import type { JsonValue } from '../../types';

export const localStore = <T extends JsonValue>(key: string) => {
	const toString = (value: T) => JSON.stringify(value, null, 2);
	const toObj = JSON.parse;

	let saved = toObj(localStorage.getItem(key) || '{}');

	const { subscribe, set, update } = writable<T>(saved);

	return {
		subscribe,
		set: (value: T) => {
			localStorage.setItem(key, toString(value));
			return set(value);
		},
		update
	};
};
