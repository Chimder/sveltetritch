<script lang="ts">
	import { Motion } from 'svelte-motion';
	// import { onMount } from 'svelte';
	type PropType = {
		selected?: boolean;
		imgSrc?: string;
		index?: number;
		number: number;
		type?: 'clips' | 'stream';
		onClick?: (index: number, type: 'clips' | 'stream') => void;
	};

	let { imgSrc, index, number, onClick, selected, type }: PropType = $props();
</script>

<div
	class={`group relative z-999 mr-4 mb-14 flex w-[220px] h-[180px] rounded-2xl ${
		selected ? 'border-[2px] border-card opacity-100' : 'border-[2px] opacity-30 hover:opacity-60'
	}`}
>
	<button
		class="text-decoration-none m-0 block w-full cursor-pointer rounded-2xl border-0 bg-transparent p-0 transition-opacity duration-300 focus:outline-none"
		type="button"
	>
		<div class="absolute mr-1 flex w-full cursor-pointer justify-end border-0">
			<div class="flex h-8 w-4 items-center justify-center bg-black/90 p-3">
				<span class="text-lg text-white">{number + 1}</span>
			</div>
		</div>
		<img
			width="320"
			height="180"
			class="ImgCarusel w-full"
			loading="lazy"
			src={imgSrc}
			alt="Your alt text"
		/>
	</button>

	<div
		class="ImgCarusel absolute top-0 z-10 flex w-full flex-col rounded-2xl opacity-0 group-hover:opacity-100"
	>
		<!-- on:click={() => onClick(index, 'stream')} -->
		<!-- <Motion
			class="relative flex h-[50%] w-full items-center justify-center bg-black/50 hover:bg-black/5"
			whileHover={{ scale: 1.05 }}
			style="background-image: linear-gradient(to top, transparent 50%, rgba(0, 0, 0, 0.9) 100%)"
		>
			<Motion class="mt-5 text-white focus:outline-none" whileHover={{ scale: 1.1 }}> -->
		<div class="text-base text-white xl:text-sm">Stream Online</div>
		<!-- </Motion>
		</Motion> -->

		<!-- on:click={() => onClick(index, 'clips')} -->
		<!-- <Motion
			class="relative flex h-[50%] w-full items-center justify-center bg-black/50 hover:bg-black/5"
			whileHover={{ scale: 1.05 }}
			style="background-image: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9) 100%)"
		>
			<Motion class="mb-5 text-white focus:outline-none" whileHover={{ scale: 1.1 }}> -->
		<div class="text-base text-white xl:text-sm">Top Clips</div>
		<!-- </Motion>
		</Motion> -->
	</div>
</div>
