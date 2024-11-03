'use client';
import { fetchCountSolventsClients } from '@/lib/fetchData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Solvents() {
	const [clientsCount, setClientsCount] = useState(0);
	const path = usePathname();

	useEffect(() => {
		fetchCountSolventsClients().then((res) => setClientsCount(res));
	}, []);

	const isActive = path.includes('solvents');
	return (
		<Link
			href={'/dashboard/clients/solvents'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear`}
		>
			Solventes {clientsCount}
		</Link>
	);
}
