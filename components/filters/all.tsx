'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/store/storeCount';
import { useEffect } from 'react';

export default function All() {
	const path = usePathname();

	const { AllCount, Recount } = useStore((state) => state);
	useEffect(() => {
		Recount();
	}, []);

	const isActive = path === '/dashboard/clients';
	return (
		<Link
			href='/dashboard/clients'
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 `}
		>
			Todos {AllCount}
		</Link>
	);
}
