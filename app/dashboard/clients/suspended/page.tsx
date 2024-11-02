import ClientsTable from '@/components/clientsTable';

import { Client } from '@/interfaces';
import { fetchSuspendedClients } from '@/lib/fetchData';

export default async function Page() {
	const clients: Client[] = await fetchSuspendedClients();

	return (
		<div className='mt-2'>
			<ClientsTable clients={clients} />
		</div>
	);
}
