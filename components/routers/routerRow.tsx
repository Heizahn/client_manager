'use client';

import { Router } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function RouterRow({ router }: { router: Router }) {
	const route = useRouter();
	const handleClick = (id: string) => {
		route.push(`/dashboard/router/${id}`);
	};
	return (
		<>
			<tr
				onClick={() => handleClick(router.id)}
				className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'
			>
				<td className='text-left py-1 pl-4'>{router.nombre}</td>
				<td>{router.ip}</td>
				<td>{router.sector}</td>
				<td>{router.clientes}</td>
				<td className={`${!router.estado ? 'text-red-500' : 'text-green-500'}`}>
					{router.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
