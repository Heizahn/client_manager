'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatMoney } from '../formatMoney';
import { ClientType } from '@/lib/typesConsultas';

export default function ClientRow({ client }: { client: ClientType }) {
	const router = useRouter();
	const handleClick = (id: string) => {
		router.push(`/dashboard/client/${id}`);
	};
	return (
		<>
			<tr className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'>
				<td onClick={() => handleClick(client.id)} className='text-left py-1 pl-4'>
					{client.nombre}
				</td>
				<td onClick={() => handleClick(client.id)}>{client.identificacion}</td>
				<td onClick={() => handleClick(client.id)}>{client.telefono}</td>
				<td onClick={() => handleClick(client.id)}>{client.sectors?.nombre_sector}</td>
				<td className='cursor-default'>
					<Link
						href={`http://${client.ipv4}`}
						target='_blank'
						className='text-blue-400 hover:underline hover:underline-offset-4'
					>
						{client.ipv4}
					</Link>
				</td>
				<td onClick={() => handleClick(client.id)}>
					{client.services?.nombre_service}
				</td>
				<td
					onClick={() => handleClick(client.id)}
					className={`text-right pr-4 ${
						client.saldo < 0 ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{formatMoney(client.saldo)}
				</td>
				<td
					onClick={() => handleClick(client.id)}
					className={`${
						!client.estado
							? 'text-red-500'
							: client.saldo < 0
							? 'text-orange-500'
							: 'text-green-500'
					}`}
				>
					{!client.estado ? 'Suspendido' : 'Activo'}
				</td>
			</tr>
		</>
	);
}
