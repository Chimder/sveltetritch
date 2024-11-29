<script lang="ts">
	import { lazy, Suspense } from 'react';

	import { QueryClient } from '@tanstack/react-query';
	import { LoaderFunctionArgs, ScrollRestoration } from 'react-router-dom';

	import { useUserById, useUserEmotes } from '@/hooks/query/user';
	import Loading from '@/components/loading';

	// const StreamerInfo = lazy(() => import('@/components/streamer-info'));
	// const StreamerVideos = lazy(() => import('@/components/streamer-video'));
</script>

<!-- export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
      console.log(params.id)
      throw new Error('No contact ID provided')
    }
    const id = params.id
    queryClient.ensureQueryData(useUserById(id))
    queryClient.ensureQueryData(useUserEmotes(id))
    return id
  } -->

<!-- // const data = useLoaderData() -->
<article class="overflow-hidden">
	<ScrollRestoration />
	<StreamerInfo />
	<StreamerVideos />
</article>
