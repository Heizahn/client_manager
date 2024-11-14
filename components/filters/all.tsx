'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCountContextClients } from '@/context/countContext';

export default function All() {
	const path = usePathname();

	const { clientsCountAll } = useCountContextClients();

	const isActive = path === '/dashboard/clients';
	return (
		<Link
			href='/dashboard/clients'
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 `}
		>
			Todos {clientsCountAll}
		</Link>
	);
}
