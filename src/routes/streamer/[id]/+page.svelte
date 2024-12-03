<script lang="ts">
	import StreamerInfo from '../../../components/streamer-info.svelte';
	import StreamerVideos from '../../../components/streamer-video.svelte';

	let { data } = $props();

</script>

<article class="overflow-hidden">
	<StreamerInfo emotes={data.emotes} user={data.user} />
	<StreamerVideos />
</article>
