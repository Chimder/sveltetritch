<script lang="ts">
	import { getTopGames } from '../shared/api/twitch/axios.js';
	import { Button } from '../lib/components/ui/button/index.js';
	import Loading from '../components/loading.svelte';
	import { onMount } from 'svelte';
	import type { TopGame } from 'src/shared/api/twitch/types.js';
  import Carousel from 'src/components/carousel.svelte';

	let isLoading = true;
	let games: TopGame[] | null;

	onMount(async () => {
		try {
			isLoading = true;
			games = await getTopGames();
		} catch (error) {
			console.error('Error fetching videos:', error);
		} finally {
			isLoading = false;
		}
	});
	// let games = $state(fetchGames());

	// if (!games) return <Loading></Loading>
</script>

<main class="h-[2000px] overflow-hidden">
	{#if isLoading}
		<Loading />
	{/if}
	<section class="w-full">
		<div class="flex flex-col items-center justify-end bg-background pb-10 pt-24 md:py-12">
			<div class="flex flex-col items-center justify-center">
				<h1 class="pb-4 pt-12 text-9xl xl:text-6xl md:pt-16 md:text-4xl">Discover Twitch Vods</h1>
				<p class="pb-10 text-center text-2xl lg:text-base md:pb-6 md:text-sm">
					Watch twitch past broadcasts streams Start by Typing twitch username...
				</p>
			</div>
			<DialogInput>
				<Button
					class="bg-button-foreground  px-40 text-xl text-text text-white lg:text-base md:px-32 md:text-sm sm:px-28"
				>
					<!-- <MagnifyingGlassIcon class="h-6 w-6 pr-1" /> -->
					Search Steamer
				</Button>
			</DialogInput>
		</div>
	</section>
	<section class="relative flex w-full flex-col items-center justify-center rounded-2xl">
		<div>
			<h1 class="pb-3 text-7xl text-white xl:text-6xl md:text-4xl">Top streams Now</h1>
		</div>
		{#if games}
			<Carousel slides={games} />
		{/if}
	</section>
</main>
