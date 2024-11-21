'use client';
import { ClientType } from '@/lib/typesConsultas';
import ClientRow from './clientRow';
import { useClientsContext } from './clientsContext';
import { useEffect } from 'react';

export default function ClientsTable({ clients }: { clients: ClientType[] }) {
	const { setClients, filterClients } = useClientsContext();

	useEffect(() => {
		setClients(clients);
	}, [clients]);

	return (
		<div className='max-h-[calc(100vh_-_7.5rem)] overflow-y-auto scrollbar-none rounded-b-md'>
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
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filterClients().map((client: ClientType) => (
						<ClientRow key={client.id} client={client} />
					))}
				</tbody>
			</table>
		</div>
	);
}
