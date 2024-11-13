import RouterTable from '@/components/routers/routerTable';
import ShowNewFormRouter from '@/components/routers/showNewFormRouter';

export default function Page() {
	return (
		<>
			<div className='bg-gray-800 mt-3 rounded-md'>
				<header className='flex justify-between items-center px-4 py-1'>
					<h2 className='text-center text-lg font-bold'>Routers</h2>
					<div>
						<ShowNewFormRouter />
					</div>
				</header>
				<div className='mt-1 border-b-2 border-gray-700' />
				<RouterTable />
			</div>
		</>
	);
}
