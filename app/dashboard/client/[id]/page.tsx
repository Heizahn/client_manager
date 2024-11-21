import { ClientDetailProvider } from '@/components/clientDetails/clientDetailContext';
import ClientDetailsById from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import PaymentsView from '@/components/payments/paymentsView';
import ServiceReceivable from '@/components/serviceReceivable/serviceReceivable';
import {
	fetchClientById,
	fetchClientStatusById,
	fetchPaysByClient,
	fetchServicesReceivable,
} from '@/lib/fetchData';

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = await params;
	const clientStatus = await fetchClientStatusById(id as string);
	const clientDetails = await fetchClientById(id as string);
	const servicesReceivable = await fetchServicesReceivable(id as string);
	const paymentClient = await fetchPaysByClient(id as string);

	return (
		<main className='flex flex-col md:overflow-hidden'>
			<ClientDetailProvider>
				<HeaderClient clientId={id as string} clientStatus={clientStatus} />

				<ClientDetailsById client={clientDetails} />

				<ServiceReceivable
					clientId={id as string}
					serviceReceivable={servicesReceivable}
				/>

				<PaymentsView clientId={id as string} paymentClient={paymentClient} />
			</ClientDetailProvider>
		</main>
	);
}
