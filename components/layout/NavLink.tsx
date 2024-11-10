'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
	href,
	title,
	name,
}: {
	href: string;
	title: string;
	name: string;
}) {
	const path = usePathname();
	const isActive = path.includes(name);
	return (
		<Link
			href={href}
			className={`flex h-12 items-center justify-center rounded-md ${
				isActive ? 'bg-gray-800' : 'bg-gray-700'
			}  px-4 text-white hover:bg-gray-800`}
		>
			{title}
		</Link>
	);
}
