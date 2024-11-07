import ClientDetails from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import { fetchClientById } from '@/lib/fetchData';

export default async function Page({ params }: { params: { id: string } }) {
	const client = await fetchClientById(params.id);

	return (
		<div className='flex flex-col md:overflow-hidden mt-2'>
			<HeaderClient client={client} />
			<ClientDetails client={client} />
		</div>
	);
}
