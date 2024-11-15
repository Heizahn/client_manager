'use client';

import { ServiceReceivable } from '@/interfaces';
import { formatDate } from '../dateFormat';
import { formatMoney } from '../formatMoney';

export default function ServiceReceivableRow({
	serviceReceivable,
}: {
	serviceReceivable: ServiceReceivable;
}) {
	return (
		<>
			<tr className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'>
				<td className='text-left py-1 pl-4'>{serviceReceivable.motivo}</td>
				<td>{formatDate(new Date(serviceReceivable.created_at))}</td>
				<td>{formatMoney(serviceReceivable.monto)}</td>
				<td className={`${serviceReceivable.deuda < 0 ? 'text-red-500' : ''}`}>
					{formatMoney(serviceReceivable.deuda)}
				</td>
				<td
					className={`${
						!serviceReceivable.estado ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{serviceReceivable.estado ? 'Activo' : 'Anulado'}
				</td>
			</tr>
		</>
	);
}
