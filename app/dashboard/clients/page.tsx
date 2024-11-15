import ShowFormNewClient from '@/components/newClient/showFormNewClient';
import ClientsTable from '@/components/viewclients/clientsTable';
import { fetchAllClients } from '@/lib/fetchData';

export default async function Page() {
	const clients = await fetchAllClients();

	return (
		<div className='mt-2'>
			<div className='flex flex-row justify-end items-center p-1 rounded-t-md bg-gray-800 '>
				<div>
					<ShowFormNewClient />
				</div>
			</div>
			<ClientsTable clients={clients} />
		</div>
	);
}
