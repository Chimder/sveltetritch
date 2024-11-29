<script lang="ts">
	import { Motion } from 'svelte-motion';
	import * as Dialog from '../lib/components/ui/dialog/index.js';
	import { Input } from 'src/lib/components/ui/input/index.js';
	import { searchChannels } from 'src/shared/api/twitch/axios.js';
	import { goto } from '$app/navigation';
	let { children } = $props();
	// const navigate = useNavigate();
	let searchQuery = $state<string>('');

	let search = async () => {
		let res = await searchChannels(searchQuery);
		return res;
	};

	let searchResults = $state(search());
</script>

<Dialog.Root>
	<Dialog.Trigger asChild>
		{@render children()}
		<!-- <slot></slot> -->
	</Dialog.Trigger>
	<Dialog.Content
		class="md:top-100 z-[1100] h-auto max-w-lg rounded-xl border-[3px] border-card bg-black sm:absolute sm:top-64"
	>
		<Dialog.Header class="">
			<Dialog.Title class="flex items-center justify-center whitespace-nowrap">
				Search streamer
				<!-- {isFetching && <ReloadIcon class="ml-2 h-4 w-4 animate-spin" />} -->
			</Dialog.Title>
		</Dialog.Header>
		<div class="pt-3">
			<Input
				bind:value={searchQuery}
				class="border-card focus:border-card active:border-card"
				type="text"
				placeholder="Search"
			></Input>
		</div>
		<Motion
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			class="overflow-hidden"
		>
			{#await searchResults then res}
				{#each res as channel}
					<div>
						<Motion
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							class="relative flex h-16 cursor-pointer list-none items-start rounded-lg pl-5 pt-3 text-secondary no-underline  hover:bg-card hover:opacity-80"
							key={channel.id}
							on:click={() => goto(`/streamer/${channel.id}`)}
						>
							<div class="flex items-center justify-center">
								<img
									class="w-10 rounded-full"
									width={320}
									height={180}
									src={channel.thumbnail_url}
									loading="lazy"
									alt=""
								/>

								<span class="top[-20px] relative pl-5 text-white">{channel.display_name}</span>
								<!-- {#if channel.is_live}
              <DotFilledIconn class="relative left-1 top-[2px] animate-pulse text-red-700" />
            {/if} -->
							</div>
						</Motion>
					</div>
				{/each}
			{/await}
		</Motion>
	</Dialog.Content>
</Dialog.Root>
