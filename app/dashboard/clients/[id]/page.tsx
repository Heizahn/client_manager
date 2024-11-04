import Breadcrumbs from '@/components/breadcrums';
import ClientDetails from '@/components/clientDetails';
import { fetchClientById } from '@/lib/fetchData';

export default async function Page({ params }: { params: { id: string } }) {
	const client = await fetchClientById(params.id);

	return (
		<div className='flex flex-col md:overflow-hidden mt-2'>
			<div className='flex flex-row justify-center items-center py-2 rounded-md bg-gray-800  '>
				<h2 className='text-center text-2xl font-bold'>Detalles del Cliente</h2>
			</div>
			<div className='bg-gray-800 mt-3 rounded-md'>
				<Breadcrumbs
					breadcrumbs={[
						{ label: 'Clientes', href: '/dashboard/clients', active: false },
						{
							label: 'Cliente',
							href: `/dashboard/client/${client.id}`,
							active: true,
						},
					]}
				/>

				<div className='flex flex-row gap-4 items-start justify-between px-4 py-2'>
					<div className='flex flex-col'>
						<div className='flex flex-row items-center gap-3'>
							<h3 className='text-3xl font-bold'>{client.nombre}</h3>
							<span
								className={`${
									client.estado === 'Suspendido'
										? 'text-red-500'
										: client.saldo < 0
										? 'text-orange-500'
										: 'text-green-500'
								} flex flex-row items-center gap-1`}
							>
								<div
									className={`${
										client.estado === 'Suspendido'
											? 'bg-red-500'
											: client.saldo < 0
											? 'bg-orange-500'
											: 'bg-green-500'
									} w-4 h-4 rounded-full`}
								></div>
								{client.estado}
							</span>
						</div>
						<div className='flex flex-row gap-2 mt-2 text-sm'>
							<p>{client.direccion}</p>
							<span
								className={`${
									client.saldo < 0 ? 'text-red-500' : 'text-green-500'
								} flex flex-row items-center gap-1`}
							>
								Saldo: {client.saldo.toFixed(2)}$
							</span>
						</div>
					</div>
					<div className='flex flex-row items-center gap-6 mr-2'>
						<button>Editar</button>
						<button>Suspender</button>
					</div>
				</div>
			</div>
			<ClientDetails client={client} />
		</div>
	);
}
