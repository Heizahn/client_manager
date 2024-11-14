import ServiceReceivableRow from './serviceReceivableRow';

export default function ServiceReceivableTable() {
	const servicesReceivable = [
		{
			id: '1',
			motivo: 'Servicio de Cobranza',
			created_at: '2023-03-01',
			monto: 100,
			deuda: 0,
			estado: true,
		},
		{
			id: '2',
			motivo: 'Servicio de Cobranza',
			created_at: '2023-03-01',
			monto: 100,
			deuda: 0,
			estado: true,
		},
		{
			id: '3',
			motivo: 'Servicio de Cobranza',
			created_at: '2023-03-01',
			monto: 100,
			deuda: 0,
			estado: true,
		},
	];
	return (
		<div className='w-full max-h-[calc(100vh_-_7.5rem)] overflow-y-auto scrollbar-none rounded-b-md'>
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
					{servicesReceivable.map((serviceReceivable) => (
						<ServiceReceivableRow
							key={serviceReceivable.id}
							service_receivable={serviceReceivable}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
