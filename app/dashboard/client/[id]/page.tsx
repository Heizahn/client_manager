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
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const clientStatus = await fetchClientStatusById(id);
	const clientDetails = await fetchClientById(id);
	const servicesReceivable = await fetchServicesReceivable(id);
	const paymentClient = await fetchPaysByClient(id);

	return (
		<main className='flex flex-col md:overflow-hidden'>
			<ClientDetailProvider>
				<HeaderClient clientId={id} clientStatus={clientStatus} />

				<ClientDetailsById client={clientDetails} />

				<ServiceReceivable clientId={id} serviceReceivable={servicesReceivable} />

				<PaymentsView clientId={id} paymentClient={paymentClient} />
			</ClientDetailProvider>
		</main>
	);
}
