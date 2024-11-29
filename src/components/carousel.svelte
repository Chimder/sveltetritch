<script lang="ts">
	import { Motion } from 'svelte-motion';

	import CardVideo from './card-video.svelte';
	import Thumb from './carousel-Thumbs.svelte';
	import Skeleton from 'src/lib/components/ui/skeleton/skeleton.svelte';
	import { getTopStreamsByGame } from 'src/shared/api/twitch/axios.js';

	type PropType = {
		// slides?: TopGame[]
		slides?: any;
	};
	let { slides }: PropType = $props();
	/////////////////////////////

	let selectedIndex = slides[0]?.id || 0;
	let idGame = slides[0]?.id || '';
	let type = $state('stream');

	let fetchGameData = async () => {
		let res = await getTopStreamsByGame(idGame, type);

		return res;
	};
	let games = $state(fetchGameData);

	const onThumbClick = (index: number, type: 'clips' | 'stream') => {
		selectedIndex = index;
		idGame = index.toString();
		type = type;
		// fetchGameData();
	};

	// onMount(fetchGameData);
</script>

<div
	class="relative rounded-xl border-[2px] border-border p-5 lg:pl-[100px] md:ml-[25vw] sm:ml-[460px]"
>
	<div class="relative pb-4">
		<!-- <div use:emblaCarouselSvelte={{ options }} onemblaInit={onInit}> -->
		<div class="embla__container">
			{#each slides as slide, index (slide.id)}
				<div class="embla__slide">
					<Thumb
						on:click={(index, type) => onThumbClick(index, type)}
						{selectedIndex}
						{index}
						number={index}
						imgSrc={slide.box_art_url.replace('{width}', '320').replace('{height}', '180')}
					/>
				</div>
			{/each}
		</div>
	</div>
	<!-- </div> -->
</div>

<div class="container z-999 pt-2">
	<div class="gridCard">
		{#if $games.isLoading && !$games.isRefetching}
			{#each Array(50) as _, index}
				<Motion
					initial={{ opacity: 0, scale: 0.1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0.2, scale: 1 }}
					transition={{ duration: 0.4 }}
					class="relative mr-2 w-full rounded-2xl"
					style="padding-bottom: 52%;"
				>
					<div class="absolute inset-0 px-2">
						<Skeleton class="h-full w-full" />
					</div>
				</Motion>
			{/each}
		{:else}
			{#each $games.data as game (game.id)}
				<CardVideo {game} {type} />
			{/each}
		{/if}
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
		flex: 0 0 12%;
		margin-right: 16px;
	}
</style>
