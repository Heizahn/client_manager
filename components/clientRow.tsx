import { Client } from '@/interfaces';
import Link from 'next/link';
export default function ClientRow({ client }: { client: Client }) {
	return (
		<>
			<tr className=' border-b border-gray-400 hover:bg-gray-700 transition-all duration-300 ease-linear '>
				<td className='text-left py-1 pl-4'>
					<Link
						href={`/dashboard/clients/${client.id}`}
						className='hover:underline hover:underline-offset-2'
					>
						{client.nombre}
					</Link>
				</td>
				<td>{client.identificacion}</td>
				<td>{client.telefono}</td>
				<td>{client.sector}</td>
				<td>
					<Link
						href={`http://${client.ipv4}`}
						target='_blank'
						className='text-blue-400 hover:underline hover:underline-offset-4'
					>
						{client.ipv4}
					</Link>
				</td>
				<td>{client.plan}</td>
				<td className='text-right pr-4'>{client.saldo.toFixed(2)}</td>
				<td
					className={`${
						client.estado === 'Suspendido'
							? 'text-red-500'
							: client.saldo < 0
							? 'text-orange-500'
							: 'text-green-500'
					}`}
				>
					{client.estado}
				</td>
			</tr>
		</>
	);
}
