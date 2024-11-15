'use client';

import ClientDetailsById from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import PaymentsView from '@/components/payments/paymentsView';
import ServiceReceivable from '@/components/serviceReceivable/serviceReceivable';
import { useParams } from 'next/navigation';

export default function Page() {
	const { id } = useParams();
	return (
		<>
			<div className='flex flex-col md:overflow-hidden'>
				<HeaderClient clientId={id as string} />

				{/* Details */}
				<ClientDetailsById clientId={id as string} />

				{/* Invoices */}
				<ServiceReceivable clientId={id as string} />

				{/* Payments */}
				<PaymentsView clientId={id as string} />
			</div>
		</>
	);
}
