import ClientsTable from '@/components/viewclients/clientsTable';

import { Client } from '@/interfaces';
import { fetchAllClients } from '@/lib/fetchData';

export default async function Page() {
	const clients: Client[] = await fetchAllClients();

	return (
		<div className='mt-2'>
			<ClientsTable clients={clients} />
		</div>
	);
}
