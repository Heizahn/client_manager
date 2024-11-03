'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCountSuspendedClients } from '@/lib/fetchData';

export default function Solvents() {
	const [clientsCount, setClientsCount] = useState(0);
	const path = usePathname();
	useEffect(() => {
		fetchCountSuspendedClients().then((res) => setClientsCount(res));
	}, []);

	const isActive = path.includes('suspended');
	return (
		<Link
			href={'/dashboard/clients/suspended'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-red-500`}
		>
			Suspendidos {clientsCount}
		</Link>
	);
}
