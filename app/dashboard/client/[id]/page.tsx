import ClientDetailsById from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import { PaymentProvider } from '@/components/payments/paymentContext';
import PaymentsView from '@/components/payments/paymentsView';
import ServiceReceivable from '@/components/serviceReceivable/serviceReceivable';
import { fetchPaysByClient } from '@/lib/fetchData';

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	const payments = await fetchPaysByClient(id as string);

	return (
		<>
			<div className='flex flex-col md:overflow-hidden'>
				<HeaderClient clientId={id as string} />

				{/* Details */}
				<ClientDetailsById clientId={id as string} />

				{/* Invoices */}
				<ServiceReceivable clientId={id as string} />

				{/* Payments */}
				<PaymentProvider>
					<PaymentsView clientId={id as string} />
				</PaymentProvider>
			</div>
		</>
	);
}
