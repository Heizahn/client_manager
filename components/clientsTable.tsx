import ClientRow from './clientRow';
import { Client } from '@/interfaces';

export default function ClientsTable({ clients }: { clients: Client[] }) {
	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md mt-1'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Identificacion</th>
						<th>Telefono</th>
						<th>Sector</th>
						<th>IPV4</th>
						<th>Plan</th>
						<th>Saldo</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{clients.map((client: Client) => (
						<ClientRow key={client.id} client={client} />
					))}
				</tbody>
			</table>
		</div>
	);
}
