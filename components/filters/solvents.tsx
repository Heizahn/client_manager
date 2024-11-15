'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/storeCount';

export default function Solvents() {
	const path = usePathname();
	const { SolventsCount } = useStore((state) => state);

	const isActive = path.includes('solvents');

	return (
		<Link
			href={'/dashboard/clients/solvents'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-green-500 `}
		>
			Solventes {SolventsCount}
		</Link>
	);
}
