'use client';
import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
	return (
		<main className='flex flex-col items-center justify-center h-screen'>
			<h2 className='text-4xl'>Error</h2>
			<p className='text-2xl text-red-500'>{error.message}</p>
			<Link
				href='/dashboard/clients'
				className='mt-3 border-b-2  border-transparent hover:border-b-white transition-all duration-300 ease-linear text-lg'
			>
				Volver atrás
			</Link>
		</main>
	);
}
