'use client';
import { useStoreClientView } from '@/store/storeClientView';
import { useEffect, useState } from 'react';
import SkeletonPayment from './skeletonPayment';
import PaymentsTable from './paymentsTable';
import ShowFormPay from './showFormPay';
import { usePaymentContext } from './paymentContext';

export default function PaymentsView({ clientId }: { clientId: string }) {
	const { payments } = useStoreClientView();
	const [loading, setLoading] = useState(true);
	const { paymentClient, loadData } = usePaymentContext();

	useEffect(() => {
		loadData(clientId).then((res) => {
			if (res.ok) {
				setLoading(false);
			}
		});
	}, [clientId]);
	return (
		payments && (
			<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
				<header className='w-full flex justify-between items-center'>
					<h3 className='text-xl font-bold'>Pagos</h3>
					<ShowFormPay clientId={clientId} />
				</header>{' '}
				{loading ? (
					<SkeletonPayment />
				) : paymentClient.length > 0 ? (
					<PaymentsTable paymentClient={paymentClient} />
				) : (
					<div className='flex items-center justify-center'>No hay pagos</div>
				)}
			</div>
		)
	);
}
