import { getTopGames } from '../shared/api/twitch/axios.js';

export const load = async () => {
	const games = await getTopGames();
	return {
		games
	};
};
