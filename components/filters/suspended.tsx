'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/storeCount';

export default function Solvents() {
	const path = usePathname();
	const { SuspendedCount } = useStore((state) => state);

	const isActive = path.includes('suspended');

	return (
		<Link
			href={'/dashboard/clients/suspended'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-red-500`}
		>
			Suspendidos {SuspendedCount}
		</Link>
	);
}
