import ClientRow from './clientRow';
import { Client } from '@/interfaces';

export default function ClientsTable({ clients }: { clients: Client[] }) {
	return (
		<table className='w-full table-auto bg-gray-800 rounded-md'>
			<thead>
				<tr className='text-left text-lg '>
					<th className='pl-4 pt-2'>Nombre</th>
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
	);
}
