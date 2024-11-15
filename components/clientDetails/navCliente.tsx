'use client';
import { useStoreClientView } from '@/store/storeClientView';

export default function NavCliente() {
	const {
		details,
		invoices,
		payments,
		statistics,
		setViewDetails,
		setViewInvoices,
		setViewPayments,
		setViewStatistics,
	} = useStoreClientView((state) => state);
	return (
		<nav className='px-4 py-2 mt-4 '>
			<ul className='flex flex-row gap-8 text-base font-bold mb-2'>
				<li>
					<button
						type='button'
						onClick={() => {
							setViewInvoices(false);
							setViewPayments(false);
							setViewStatistics(false);
							setViewDetails(true);
						}}
						className={
							details
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Detalles del Cliente
					</button>
				</li>
				<li>
					<button
						type='button'
						onClick={() => {
							setViewDetails(false);
							setViewPayments(false);
							setViewStatistics(false);
							setViewInvoices(true);
						}}
						className={
							invoices
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Cuentas Por Cobrar
					</button>
				</li>
				<li>
					<button
						type='button'
						onClick={() => {
							setViewInvoices(false);
							setViewStatistics(false);
							setViewDetails(false);
							setViewPayments(true);
						}}
						className={
							payments
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Pagos
					</button>
				</li>
				<li>
					<button
						type='button'
						onClick={() => {
							setViewInvoices(false);
							setViewPayments(false);
							setViewDetails(false);
							setViewStatistics(true);
						}}
						className={
							statistics
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Estadísticas
					</button>
				</li>
			</ul>
		</nav>
	);
}
