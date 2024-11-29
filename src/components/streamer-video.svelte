<script lang="ts">
	import { onMount } from 'svelte';
	import { getVideosByUserId } from '../shared/api/twitch/axios.js';
	import { page } from '$app/stores';

	import CardVideo from './card-video.svelte';
	import { Button } from '../lib/components/ui/button/index.js';
	import { Skeleton } from '../lib/components/ui/skeleton/index.js';
	import type { TwitchVideo } from 'src/shared/api/twitch/types.js';

	let id: string = '';
	let type: 'offline' | 'stream' | 'clips' = 'offline';
	let videos: { videos: TwitchVideo[]; nextCursor: string | null } | null = null;
	let isLoading = true;

	onMount(async () => {
		id = $page.params.id;
		try {
			isLoading = true;
			videos = await getVideosByUserId(id, type);
		} catch (error) {
			console.error('Error fetching videos:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<section class="container pt-2">
	<div class="rounded-xl border-[2px] border-border">
		<div class="flex items-center justify-evenly py-4">
			<Button
				variant="ghost"
				class={`border-[2px] border-border  px-[12vw] py-[2vh] text-white ${
					type === 'offline' ? 'bg-primary' : ''
				}`}
			>
				Streams
			</Button>
			<Button
				variant="ghost"
				class={`border-[2px] border-border px-[12vw] py-[2vh] text-white ${
					type === 'clips' ? 'bg-primary' : ''
				}`}
			>
				Clips
			</Button>
		</div>
		<div class="gridCard">
			{#if isLoading}
				{#each Array(12) as _, index}
					<div
						class="relative mr-4 w-full overflow-hidden rounded-2xl"
						style="padding-bottom: 56%;"
					>
						<div class="absolute inset-0 px-3">
							<Skeleton class="h-full w-full" />
						</div>
					</div>
				{/each}
			{:else if videos}
				{#each videos.videos as video}
					<CardVideo {type} {video} />
				{/each}
			{:else}
				<p>No videos found</p>
			{/if}
		</div>
	</div>
</section>
