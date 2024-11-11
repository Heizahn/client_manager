import type { Router } from '@/interfaces';
import { fetchRouters } from '@/lib/fetchDataSystems';
import RouterRow from './routerRow';

export default async function RouterTable() {
	const routers: Router[] = await fetchRouters();
	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md mt-1'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>IP</th>
						<th>Sector</th>
						<th>Clientes</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{routers.map((router: Router) => (
						<RouterRow key={router.id} router={router} />
					))}
				</tbody>
			</table>
		</div>
	);
}
