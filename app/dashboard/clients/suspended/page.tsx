import ClientsTable from '@/components/viewclients/clientsTable';

import { fetchSuspendedClients } from '@/lib/fetchData';
import { ClientType } from '@/lib/typesConsultas';

export default async function Page() {
	const clients: ClientType[] = await fetchSuspendedClients();

	return (
		<div className='mt-2'>
			<ClientsTable clients={clients} />
		</div>
	);
}
