import type { ClientDetails } from '@/interfaces';
import Detail from './detail';
import DetailContainer from './detailContainer';
import { formatDate } from './dateFormat';

export default function ClientDetails({
	client,
	showSection,
}: {
	client: ClientDetails | null;
	showSection: boolean;
}) {
	if (!client) {
		return;
	}
	return (
		showSection && (
			<div className='mt-3 flex flex-wrap bg-gray-800 px-4 py-8 rounded-md'>
				<div className='w-72 lg:w-1/3 px-4 py-2 flex flex-col gap-1'>
					<DetailContainer title='Datos Personales'>
						<Detail title='Nombre:' label={client.nombre} />
						<Detail title='Cedula:' label={client.identificacion} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Contacto'>
						<Detail
							title='Teléfono:'
							label={client.telefono}
							href={`https://wa.me/${client.telefono.replace('0', '58')}`}
						/>
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Ubicación'>
						<Detail title='Sector:' label={client.sector} />
						<Detail
							title='Dirección:'
							label={client.direccion}
							href={`https://www.google.com/maps/search/?api=1&query=${client.direccion}`}
						/>
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Servicios'>
						<Detail title='Router:' label={client.router} />
						<Detail
							title='IPV4:'
							label={client.ipv4}
							href={`http://${client.ipv4}`}
						/>
						<Detail title='Plan:' label={client.plan} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Balance'>
						<Detail
							title='Saldo:'
							label={`${client.saldo.toFixed(2)}$`}
							className={client.saldo < 0 ? 'text-red-500' : 'text-green-500'}
						/>
						<Detail title='Dia de Corte:' label={String(client.dia_corte)} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Estado'>
						<Detail
							title='Estado:'
							label={client.estado}
							className={
								client.estado === 'Suspendido'
									? 'text-red-500'
									: client.saldo < 0
									? 'text-orange-500'
									: 'text-green-500'
							}
						/>
						<Detail
							title='Fecha de Creación:'
							label={formatDate(new Date(client.created_at))}
						/>
					</DetailContainer>
				</div>
			</div>
		)
	);
}
