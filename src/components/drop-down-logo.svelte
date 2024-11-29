<!-- <script lang="ts">
	import { ReactNode } from 'react';
	import { useAccountSingOut } from '@/features/auth/useSession';

	import * as DropdownMenu from '../lib/components/ui/dropdown-menu/index.js';
	let { children } = $props();

	// const { mutate } = useAccountSingOut();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild>
    {children}
  </DropdownMenu.Trigger>
	<DropdownMenu.Content className="w-56">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>GitHub</DropdownMenu.Item>
		<DropdownMenu.Item className="">Support</DropdownMenu.Item>
		<DropdownMenu.Item
			onClick={() => mutate()}
			className="flex items-center justify-center bg-red-400"
		>
			LogOut
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root> -->
