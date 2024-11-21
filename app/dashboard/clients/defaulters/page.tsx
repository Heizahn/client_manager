import ShowFormNewClient from '@/components/newClient/showFormNewClient';
import { ClientsProvider } from '@/components/viewclients/clientsContext';
import ClientsTable from '@/components/viewclients/clientsTable';
import SearchClient from '@/components/viewclients/searchClient';
import { fetchDefaultersClients } from '@/lib/fetchData';
import { ClientType } from '@/lib/typesConsultas';

export default async function Page() {
	const clients: ClientType[] = await fetchDefaultersClients();

	return (
		<div className='mt-2'>
			<ClientsProvider>
				<div className='flex flex-row justify-between items-center py-2 px-4 rounded-t-md bg-gray-800 '>
					<h2 className='text-center text-2xl font-bold'>Clientes</h2>

					<div className='flex flex-row items-center gap-4'>
						<SearchClient />
						<ShowFormNewClient />
					</div>
				</div>
				<ClientsTable clients={clients} />
			</ClientsProvider>
		</div>
	);
}
