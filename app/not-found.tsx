import Link from 'next/link';
export default function NotFound() {
	return (
		<main className='h-screen flex flex-col items-center justify-center'>
			<h2 className='text-4xl'>Recurso no encontrado</h2>
			<Link
				className='mt-3 border-b-2  border-transparent hover:border-b-white transition-all duration-300 ease-linear text-lg'
				href='/dashboard/clients'
			>
				Volver Clientes
			</Link>

			<Link
				className='mt-3 border-b-2  border-transparent hover:border-b-white transition-all duration-300 ease-linear text-lg'
				href='/dashboard'
			>
				Volver al inicio
			</Link>
		</main>
	);
}
