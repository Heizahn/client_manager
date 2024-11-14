'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCountContextClients } from '@/context/countContext';

export default function Solvents() {
	const path = usePathname();
	const { clientsCountSolvents } = useCountContextClients();

	const isActive = path.includes('solvents');

	return (
		<Link
			href={'/dashboard/clients/solvents'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-green-500 `}
		>
			Solventes {clientsCountSolvents}
		</Link>
	);
}
