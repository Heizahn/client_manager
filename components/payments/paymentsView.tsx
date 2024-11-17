'use client';
import { useStoreClientView } from '@/store/storeClientView';
import { useEffect, useState } from 'react';
import SkeletonPayment from './skeletonPayment';
import PaymentsTable from './paymentsTable';
import { PaymentStruct } from '@/interfaces';
import ShowFormPay from './showFormPay';
import { fetchPaysByClient } from '@/lib/fetchData';
import { toast } from 'react-toastify';

export default function PaymentsView({ clientId }: { clientId: string }) {
	const { payments } = useStoreClientView();
	const [loading, setLoading] = useState(true);
	const [paymentClient, setPaymentClient] = useState<PaymentStruct[]>([]);

	useEffect(() => {
		fetchPaysByClient(clientId)
			.then((res) => setPaymentClient(res))
			.catch((err) => toast.error(err.message))
			.finally(() => {
				setLoading(false);
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
				) : (
					<PaymentsTable paymentClient={paymentClient} />
				)}
			</div>
		)
	);
}
