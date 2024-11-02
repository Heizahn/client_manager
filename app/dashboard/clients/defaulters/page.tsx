import ClientsTable from '@/components/clientsTable';

import { Client } from '@/interfaces';
import { fetchDefaultersClients } from '@/lib/fetchData';

export default async function Page() {
	const clients: Client[] = await fetchDefaultersClients();

	return (
		<div className='mt-2'>
			<ClientsTable clients={clients} />
		</div>
	);
}
