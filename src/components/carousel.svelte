<script lang="ts">
	import { Motion } from 'svelte-motion';

	import CardVideo from './card-video.svelte';
	import Thumb from './thumb.svelte';
	import Skeleton from '../lib/components/ui/skeleton/skeleton.svelte';
	import { getTopStreamsByGame } from '../shared/api/twitch/axios.js';
	import type { TopGame, TwitchCurrent } from '../shared/api/twitch/types.js';
	import { onMount } from 'svelte';

	type PropType = {
		slides: TopGame[];
		// slides?: any;
	};
	let { slides }: PropType = $props();
	/////////////////////////////
	console.log('INDEX', slides);

	// let selectedIndex = slides[-1]?.id || 0;
	let idGame = slides[0]?.id || '';
	let type = $state<'clips' | 'stream'>('stream');

	console.log('INDEX2', idGame);
	let isLoading = false;
	// let games: TwitchCurrent[];

	let fetchGames = async () => {
		let res = await getTopStreamsByGame(idGame, type);
		return res;
	};
	let games = $state(fetchGames());
	// onMount(async () => {
	// 	try {
	// 		isLoading = true;
	// 		games = await getTopStreamsByGame(idGame, type);
	// 	} catch (error) {
	// 		console.error('Error fetching videos:', error);
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// 	console.log('Gamewewsad', games);
	// });

	// const onThumbClick = (index: number, type: 'clips' | 'stream') => {
	// 	selectedIndex = index;
	// 	idGame = index.toString();
	// 	type = type;
	// 	// fetchGameData();
	// };

	// onMount(fetchGameData);
</script>

<div
	class="relative rounded-xl border-[1px] border-border p-5 lg:pl-[100px] md:ml-[25vw] sm:ml-[460px]"
>
	<div class="relative pb-5">
		<!-- <div use:emblaCarouselSvelte={{ options }} onemblaInit={onInit}> -->
		<div class="flex w-full">
			{#each slides as slide, index (slide.id)}
				<div class="embla__slide">
					<!-- on:click={(index, type) => onThumbClick(index, type)} -->
					<Thumb
						{index}
						number={index}
						imgSrc={slide.box_art_url.replace('{width}', '319').replace('{height}', '180')}
					/>
				</div>
			{/each}
		</div>
	</div>
	<!-- </div> -->
</div>

<div class="relative container z-1000 pt-2">
	<div class="gridCard">
		{#await games then games}
			{#each games as game}
				<CardVideo video={game} {type} />
			{/each}
		{/await}
		<!-- {#if isLoading}
			{#each Array(49) as _, index}
				<Motion
					initial={{ opacity: -1, scale: 0.1 }}
					animate={{ opacity: 0, scale: 1 }}
					exit={{ opacity: -1.2, scale: 1 }}
					transition={{ duration: -1.4 }}
					class="relative mr-3 w-full rounded-2xl"
					style="padding-bottom: 51%;"
				>
				<div class="absolute inset-1 px-2">
					<Skeleton class="h-full w-full" />
				</div>
				</Motion>
			{/each}
		{:else}
			{#each games as game}
				<CardVideo video={game} {type} />
			{/each}
		{/if} -->
	</div>
</div>

<style>
	.embla__viewport {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: -1 0 12%;
		margin-right: 15px;
	}
</style>
