import SkeletonTable from '@/components/skeletonTable';

export default function Loading() {
	return (
		<div className='mt-2'>
			<div className='flex flex-row justify-between items-center py-2 px-4 rounded-t-md bg-gray-800 '>
				<h2 className='text-center text-2xl font-bold'>Clientes</h2>

				<div className='flex flex-row items-center gap-4'>
					<input
						type='text'
						className=' rounded-md px-2 py-0.5 outline-2 outline-gray-600 text-gray-950'
						placeholder='Buscar...'
					/>
					<button className='hover:underline hover:underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Crear Cliente
					</button>
				</div>
			</div>
			<SkeletonTable />
		</div>
	);
}
