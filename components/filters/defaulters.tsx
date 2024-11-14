'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCountContextClients } from '@/context/countContext';

export default function Solvents() {
	const path = usePathname();
	const { clientsCountDefaulters } = useCountContextClients();

	const isActive = path.includes('defaulters');

	return (
		<Link
			href={'/dashboard/clients/defaulters'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-orange-500 `}
		>
			Morosos {clientsCountDefaulters}
		</Link>
	);
}
