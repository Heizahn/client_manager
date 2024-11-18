import { ServiceReceivable } from '@/interfaces';
import ServiceReceivableRow from './serviceReceivableRow';

export default function ServiceReceivableTable({
	servicesReceivables,
}: {
	servicesReceivables: ServiceReceivable[];
}) {
	return (
		<div className='w-full max-h-[calc(100vh_-_22rem)] overflow-y-auto scrollbar-none rounded-b-md'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Motivo</th>
						<th>Fecha Creación</th>
						<th>Monto</th>
						<th>Deuda</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{servicesReceivables.map((serviceReceivable) => (
						<ServiceReceivableRow
							key={serviceReceivable.id}
							serviceReceivable={serviceReceivable}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
