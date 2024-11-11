import type { Service } from '@/interfaces';
import { fetchServices } from '@/lib/fetchDataSystems';
import ServiceRow from './serviceRow';

export default async function ServiceTable() {
	const services = await fetchServices();

	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md mt-1'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Tipo</th>
						<th>Clientes</th>
						<th>Costo</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service: Service) => (
						<ServiceRow key={service.id} service={service} />
					))}
				</tbody>
			</table>
		</div>
	);
}
