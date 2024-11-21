'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	return (
		<main className='h-screen flex flex-col items-center justify-center'>
			<h2 className='text-4xl'>Recurso no encontrado</h2>
			<button
				className='mt-3 border-b-2  border-transparent hover:border-b-white transition-all duration-300 ease-linear text-lg'
				onClick={router.back}
			>
				Volver atrás
			</button>
		</main>
	);
}
