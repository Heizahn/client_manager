import Link from 'next/link';

export default function Details({
	title,
	label,
	href,
	className,
}: {
	title: string;
	label: string;
	href?: string;
	className?: string;
}) {
	return (
		<p className='text-base'>
			<strong className='ml-2'>{title}</strong>{' '}
			{href ? (
				<Link
					href={href}
					target='_blank'
					className='text-blue-400 hover:underline hover:underline-offset-2'
				>
					{label}
				</Link>
			) : (
				<span className={className}>{label}</span>
			)}
		</p>
	);
}
