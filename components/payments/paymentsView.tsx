'use client';
import { useStoreClientView } from '@/store/storeClientView';
import { useState } from 'react';
import SkeletonPayment from './skeletonPayment';
import PaymentsTable from './paymentsTable';
import { PaymentStruct } from '@/interfaces';

export default function PaymentsView({ clientId }: { clientId: string }) {
	const { payments } = useStoreClientView();
	const [loading, setLoading] = useState(false);
	const [paymentClient, setPaymentClient] = useState<PaymentStruct[]>([]);

	return (
		payments && (
			<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
				<header className='w-full flex justify-between items-center'>
					<h3 className='text-xl font-bold'>Pagos</h3>
					<button className='hover:underline hover:underline-offset-4'>Crear</button>
				</header>{' '}
				{loading ? (
					<SkeletonPayment />
				) : (
					<PaymentsTable paymentClient={paymentClient} />
				)}
			</div>
		)
	);
}
