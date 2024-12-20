'use client';
import { useClientDetailContext } from '../clientDetails/clientDetailContext';
import PaymentsTable from './paymentsTable';
import ShowFormPay from './showFormPay';
import { PaymentStruct } from '@/interfaces';

export default function PaymentsView({
	clientId,
	paymentClient,
}: {
	clientId: string;
	paymentClient: PaymentStruct[];
}) {
	const { payments } = useClientDetailContext();

	return (
		payments && (
			<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
				<header className='w-full flex justify-between items-center'>
					<h3 className='text-xl font-bold'>Pagos</h3>
					<ShowFormPay
						clientId={clientId}
						title={
							<span className='hover:underline hover:underline-offset-4 px-3 transition-all duration-300 ease-linear'>
								Nuevo Pago
							</span>
						}
					/>
				</header>{' '}
				{paymentClient.length > 0 ? (
					<PaymentsTable paymentClient={paymentClient} />
				) : (
					<div className='flex items-center justify-center'>No hay pagos</div>
				)}
			</div>
		)
	);
}
