'use client';

import { Service } from '@/interfaces';

export default function RouterRow({ service }: { service: Service }) {
	const handlerClick = (id: string) => {
		alert(id);
	};

	return (
		<>
			<tr
				onClick={() => handlerClick(service.id)}
				className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'
			>
				<td className='text-left py-1 pl-4'>{service.nombre_service}</td>
				<td>{service.tipo}</td>
				<td>{service.clientes}</td>
				<td>{service.costo}</td>
				<td className={`${!service.estado ? 'text-red-500' : 'text-green-500'}`}>
					{service.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
