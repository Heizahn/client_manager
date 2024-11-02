import ClientsTable from '@/components/clientsTable';
import All from '@/components/filters/all';
import Defaulters from '@/components/filters/defaulters';
import Solvents from '@/components/filters/solvents';
import Suspended from '@/components/filters/suspended';
import { Client } from '@/interfaces';
import { fetchClients } from '@/lib/fetchData';

export default async function Page() {
	const clients: Client[] = await fetchClients();

	return (
		<div className='flex flex-col md:overflow-hidden mt-2'>
			<div className='flex flex-row justify-between items-center p-3 rounded-md bg-gray-800  sticky top-0 z-10'>
				<div className='flex flex-row '>
					<All />
					<Solvents />
					<Defaulters />
					<Suspended />
				</div>
				<div>
					<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Nuevo Cliente
					</button>
				</div>
			</div>
			<div className='mt-2'>
				<ClientsTable clients={clients} />
			</div>
		</div>
	);
}
