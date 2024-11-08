import RouterTable from '@/components/routers/routerTable';

export default function Page() {
	return (
		<>
			<div className='bg-gray-800 mt-3 rounded-md'>
				<header className='flex justify-between items-center px-4 py-1'>
					<h2 className='text-center text-lg font-bold'>Routers</h2>
					<div>
						<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
							Nuevo Router
						</button>
					</div>
				</header>
				<div className='mt-1 border-b-2 border-gray-700' />
				<RouterTable />
			</div>
		</>
	);
}
