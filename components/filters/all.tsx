'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function All() {
	const path = usePathname();

	const isActive = path === '/dashboard/clients';
	return (
		<Link
			href='/dashboard/clients'
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear`}
		>
			Todos
		</Link>
	);
}
