'use client';
import { useStoreClientView } from '@/store/storeClientView';

export default function NavCliente() {
	const { details, invoices, payments, statistics, setSelectedSection } = useStoreClientView(
		(state) => state,
	);
	return (
		<nav className='px-4 py-2 mt-4 '>
			<ul className='flex flex-row gap-8 text-base font-bold mb-2'>
				<li>
					<button
						type='button'
						onClick={() =>
							setSelectedSection({
								details: true,
								invoices: false,
								payments: false,
								statistics: false,
							})
						}
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
						onClick={() =>
							setSelectedSection({
								details: false,
								invoices: true,
								payments: false,
								statistics: false,
							})
						}
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
						onClick={() =>
							setSelectedSection({
								details: false,
								invoices: false,
								payments: true,
								statistics: false,
							})
						}
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
						onClick={() =>
							setSelectedSection({
								details: false,
								invoices: false,
								payments: false,
								statistics: true,
							})
						}
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
