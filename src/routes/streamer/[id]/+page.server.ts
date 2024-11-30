import { getEmotes, getUserById } from '../../../shared/api/twitch/axios.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const [user, emotes] = await Promise.all([getUserById(id), getEmotes(id)]);
	return {
		user,
		emotes
	};
};
