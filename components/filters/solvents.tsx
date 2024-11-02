'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Solvents() {
	const path = usePathname();

	const isActive = path.includes('solvents');
	return (
		<Link
			href={'/dashboard/clients/solvents'}
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear`}
		>
			Solventes
		</Link>
	);
}
