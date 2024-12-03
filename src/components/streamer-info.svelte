<script lang="ts">
	import { getEmotes, getUserById } from '../shared/api/twitch/axios.js';
	import { page } from '$app/stores';
	import Skeleton from '../lib/components/ui/skeleton/skeleton.svelte';
	import type { Emotes, TwitchUser } from '../shared/api/twitch/types.js';

	type Props = {
		user?: TwitchUser;
		emotes?: Emotes[];
	};
	let { emotes, user }: Props = $props();
	let id = $page.params.id;

	const getRandomPosition = () =>
		`top: ${Math.random() * 32}vh; left: ${Math.random() * 98}vw; transform: rotate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 10}deg);`;

	// let fetchUser = async () => {
	// 	let res = await getUserById(id);
	// 	return res;
	// };
	// let user = $state(fetchUser());

	// let fetchEmotes = async () => {
	// 	let res = await getEmotes(id);
	// 	return res;
	// };
	// let emotes = $state(fetchEmotes());
</script>

<div class="w-full h-full relative">
	<div class="z-1 absolute mt-16 flex h-[60vh] w-full overflow-x-hidden">
		{#await emotes}
			<Skeleton class="mt-16 z-1000 w-full z-50 bg-red-600" />
		{:then emotes}
			{#each emotes! as emote}
				<div style={getRandomPosition()} class="z-1 absolute m-4">
					<img class="z-1" src={emote.images.url_2x} alt="" />
				</div>
			{/each}
		{/await}
	</div>

	{#await user}
		<Skeleton class="h-[60vh] w-full bg-border" />
	{:then user}
		<section class="container z-100 flex flex-col items-center justify-center pb-10">
			<div class="z-[500] flex w-full flex-col items-center justify-center pt-28">
				<div class="z-[500]"></div>
				<img
					class="z-[500] h-60 w-60 rounded-full border-[2px] border-border pb-1"
					src={user?.profile_image_url}
					alt=""
				/>
				<h1 class="rounded-xl border-[2px] border-border bg-black px-2 pb-4 text-6xl lg:text-4xl">
					{user?.display_name}
				</h1>
				<h2
					class="rounded-xl border-[2px] border-border bg-black px-2 text-center text-xl lg:text-base"
				>
					{user?.description}
				</h2>
			</div>
			<div
				class="mt-5 flex items-center justify-center rounded-2xl border-[3px] border-border md:flex-col"
			>
				<iframe
					title="VideoPlayer"
					class="relative h-[68vh] w-[70vw] rounded-2xl pr-2 lg:h-[58vh] lg:w-[75vw] md:h-[50vh] md:w-[96vw] md:pb-1 md:pr-0 sm:h-[30vh]"
					src={`https://player.twitch.tv/?channel=${user?.login}&autoplay=1&muted=1&parent=localhost&parent=sveltetritch.vercel.app`}
				></iframe>
				<iframe
					title="chat"
					class=" h-[68vh] w-[18vw] rounded-2xl lg:h-[58vh] lg:w-[21vw] md:h-[42vh] md:w-[96vw]"
					src={`https://www.twitch.tv/embed/${user?.login}/chat?parent=localhost&parent=sveltetritch.vercel.app&darkpopout`}
				></iframe>
			</div>
		</section>
	{/await}
</div>
