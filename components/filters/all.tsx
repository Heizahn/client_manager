'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetchCountClients } from '@/lib/fetchData';
import { useEffect, useState } from 'react';

export default function All() {
	const [clientsCount, setClientsCount] = useState(0);
	const path = usePathname();

	useEffect(() => {
		fetchCountClients().then((count) => {
			setClientsCount(count);
		});
	}, []);

	const isActive = path === '/dashboard/clients';
	return (
		<Link
			href='/dashboard/clients'
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 `}
		>
			Todos {clientsCount}
		</Link>
	);
}
