import ClientsTable from '@/components/viewclients/clientsTable';

import { Client } from '@/interfaces';
import { fetchSolventsClients } from '@/lib/fetchData';

export default async function Page() {
	const clients: Client[] = await fetchSolventsClients();

	return (
		<div className='mt-2'>
			<ClientsTable clients={clients} />
		</div>
	);
}
