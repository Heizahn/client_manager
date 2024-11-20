import { ClientDetailProvider } from '@/components/clientDetails/clientDetailContex';
import ClientDetailsById from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import { PaymentProvider } from '@/components/payments/paymentContext';
import PaymentsView from '@/components/payments/paymentsView';
import { ServiceReceivableProvider } from '@/components/serviceReceivable/serviceReceicvableContex';
import ServiceReceivable from '@/components/serviceReceivable/serviceReceivable';
import {
	fetchClientById,
	fetchClientPayment,
	fetchClientStatusById,
	fetchPaysByClient,
	fetchServicesReceivable,
} from '@/lib/fetchData';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	const clientStatus = await fetchClientStatusById(id);
	const clientDetail = await fetchClientById(id as string);
	const serviceReceivable = await fetchServicesReceivable(id as string);
	const paymentClient = await fetchPaysByClient(id as string);

	return (
		<main className='flex flex-col md:overflow-hidden'>
			<Suspense fallback={<div>Loading...</div>}>
				<HeaderClient clientId={id as string} clientStatus={clientStatus} />
			</Suspense>

			<ClientDetailsById client={clientDetail} />

			<ServiceReceivable clientId={id as string} serviceReceivable={serviceReceivable} />

			<PaymentsView clientId={id as string} paymentClient={paymentClient} />
		</main>
	);
}
