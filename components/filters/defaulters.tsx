'use client';
import { fetchCountDefaultersClients } from '@/lib/fetchData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Solvents() {
	const [clientsCount, setClientsCount] = useState(0);
	const path = usePathname();

	useEffect(() => {
		fetchCountDefaultersClients().then((res) => setClientsCount(res));
	}, []);
	const isActive = path.includes('defaulters');
	return (
		<Link
			href={'/dashboard/clients/defaulters'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 text-orange-500 `}
		>
			Morosos {clientsCount}
		</Link>
	);
}
