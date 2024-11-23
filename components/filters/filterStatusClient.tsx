'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
	Count: number;
	title: string;
	href: string;
	className?: string;
}

export default function FilterStatusClient({ Count, title, href, className }: Props) {
	const path = usePathname();

	const isActive = path === href;
	return (
		<Link
			href={href}
			className={`${
				!isActive ? '' : 'font-bold underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 ${className}`}
		>
			{title} {Count}
		</Link>
	);
}
