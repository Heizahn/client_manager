'use client';

export default function ServiceReceivableRow({
	service_receivable,
}: {
	service_receivable: {
		id: string;
		motivo: string;
		created_at: string;
		monto: number;
		deuda: number;
		estado: boolean;
	};
}) {
	return (
		<>
			<tr className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'>
				<td className='text-left py-1 pl-4'>{service_receivable.motivo}</td>
				<td>{service_receivable.created_at}</td>
				<td>{service_receivable.monto}</td>
				<td>{service_receivable.deuda}</td>
				<td
					className={`${
						!service_receivable.estado ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{service_receivable.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
