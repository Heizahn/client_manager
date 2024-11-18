import { ClientDetailProvider } from '@/components/clientDetails/clientDetailContex';
import ClientDetailsById from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import { PaymentProvider } from '@/components/payments/paymentContext';
import PaymentsView from '@/components/payments/paymentsView';
import { ServiceReceivableProvider } from '@/components/serviceReceivable/serviceReceicvableContex';
import ServiceReceivable from '@/components/serviceReceivable/serviceReceivable';

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;

	return (
		<main className='flex flex-col md:overflow-hidden'>
			<ClientDetailProvider>
				<HeaderClient clientId={id as string} />

				{/* Details */}
				<ClientDetailsById clientId={id as string} />

				{/* Invoices */}
				<ServiceReceivableProvider>
					<ServiceReceivable clientId={id as string} />
				</ServiceReceivableProvider>

				{/* Payments */}
				<PaymentProvider>
					<PaymentsView clientId={id as string} />
				</PaymentProvider>
			</ClientDetailProvider>
		</main>
	);
}
