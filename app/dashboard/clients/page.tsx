import ClientsTable from '@/components/clientsTable';
import HeaderClient from '@/components/headerClient';

import { Client } from '@/interfaces';
import { fetchAllClients } from '@/lib/fetchData';

export default async function Page() {
	const clients: Client[] = await fetchAllClients();

	return (
		<div className='mt-2'>
			<HeaderClient />
			<ClientsTable clients={clients} />
		</div>
	);
}
