'use client';
import Breadcrumbs from '../viewclients/breadcrums';
import { formatMoney } from '../formatMoney';
import NavCliente from './navCliente';
import { ClientDetailsHeader } from '@/interfaces';
import { useClientDetailContext } from './clientDetailContext';

export default function HeaderClient({
	clientId,
	clientStatus,
}: {
	clientId: string;
	clientStatus: ClientDetailsHeader;
}) {
	const { details } = useClientDetailContext();
	return (
		<>
			<div className='mt-2 flex flex-row justify-center items-center py-2 rounded-md bg-gray-800  '>
				<h2 className='text-center text-2xl font-bold'>Detalles del Cliente</h2>
			</div>
			<div className='bg-gray-800 mt-3 rounded-t-md'>
				<Breadcrumbs
					breadcrumbs={[
						{
							label: 'Clientes',
							href: '/dashboard/clients',
							active: false,
						},
						{
							label: 'Cliente',
							href: `/dashboard/client/${clientId}`,
							active: true,
						},
					]}
				/>

				<div className='flex flex-row gap-4 items-start justify-between px-4 py-2'>
					<div className='flex flex-col'>
						<div className='flex flex-row items-center gap-3'>
							<h3 className='text-3xl font-bold'>{clientStatus.nombre}</h3>
							<span
								className={`${
									!clientStatus.estado
										? 'text-red-500'
										: clientStatus.saldo < 0
										? 'text-orange-500'
										: 'text-green-500'
								} flex flex-row items-center gap-1`}
							>
								<div
									className={`${
										!clientStatus.estado
											? 'bg-red-500'
											: clientStatus.saldo < 0
											? 'bg-orange-500'
											: 'bg-green-500'
									} w-4 h-4 rounded-full`}
								></div>
								{clientStatus.estado ? 'Activo' : 'Suspendido'}
							</span>
						</div>
						<div className='flex flex-row gap-2 mt-2 text-sm mb-2'>
							<p>{clientStatus.direccion}</p>
							<span
								className={`${
									clientStatus.saldo < 0 ? 'text-red-500' : 'text-green-500'
								} flex flex-row items-center gap-1`}
							>
								Saldo: {formatMoney(clientStatus.saldo)}$
							</span>
						</div>
					</div>
					<div className='flex flex-row items-center gap-6 mr-2'>
						{details && (
							<button className='hover:underline hover:underline-offset-4'>
								Editar
							</button>
						)}
						<button className='hover:underline hover:underline-offset-4'>
							Suspender
						</button>
					</div>
				</div>
				<NavCliente />
			</div>
		</>
	);
}
