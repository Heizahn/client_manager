'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCountContextClients } from '@/context/countContext';

export default function Solvents() {
	const path = usePathname();
	const { clientsCountSuspended } = useCountContextClients();

	const isActive = path.includes('suspended');

	return (
		<Link
			href={'/dashboard/clients/suspended'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-red-500`}
		>
			Suspendidos {clientsCountSuspended}
		</Link>
	);
}
