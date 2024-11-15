'use client';

import { Router } from '@/interfaces';

export default function RouterRow({ router }: { router: Router }) {
	const handleClick = (id: string) => {
		alert(id);
	};
	return (
		<>
			<tr
				onClick={() => handleClick(router.id)}
				className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'
			>
				<td className='text-left py-1 pl-4'>{router.nombre}</td>
				<td>{router.ip}</td>
				<td>{router.sectors?.nombre_sector}</td>
				<td>{router.clientes}</td>
				<td className={`${!router.estado ? 'text-red-500' : 'text-green-500'}`}>
					{router.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
