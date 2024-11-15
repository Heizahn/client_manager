import type { Sector } from '@/interfaces';
import { fetchSectors } from '@/lib/fetchDataSystems';
import SectorRow from './sectorRow';
import ErrorMessage from '../error';

export default async function SectorTable() {
	const sectors = await fetchSectors();

	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md mt-1'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Creado</th>
						<th>Clientes</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{typeof sectors !== 'string' ? (
						sectors.map((sector: Sector) => (
							<SectorRow key={sector.id} sector={sector} />
						))
					) : (
						<tr>
							<td colSpan={4}>
								<ErrorMessage error={sectors} />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
