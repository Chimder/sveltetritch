import { getEmotes, getUserById } from '../../../shared/api/twitch/axios.js';
import type { PageLoad } from './$types.js';

export const ssr = false;
export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const [user, emotes] = await Promise.all([getUserById(id), getEmotes(id)]);
	return {
		user,
		emotes
	};
};
