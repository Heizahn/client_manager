'use client';

import { Sector } from '@/interfaces';
import { formatDate } from '../dateFormat';

export default function RouterRow({ sector }: { sector: Sector }) {
	const handlerClick = (id: string) => {
		alert(id);
	};

	return (
		<>
			<tr
				onClick={() => handlerClick(sector.id)}
				className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'
			>
				<td className='text-left py-1 pl-4'>{sector.nombre}</td>
				<td>{formatDate(new Date(sector.created_at))}</td>
				<td>{sector.clientes}</td>
				<td className={`${!sector.estado ? 'text-red-500' : 'text-green-500'}`}>
					{sector.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
