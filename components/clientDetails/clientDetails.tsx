import type { ClientDetails } from '@/interfaces';
import Detail from './detail';
import DetailContainer from './detailContainer';

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
						<Detail title='Teléfono:' label={client.telefono} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Ubicación'>
						<Detail title='Sector:' label={client.sector} />
						<Detail title='Dirección:' label={client.direccion} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Servicios'>
						<Detail title='Router:' label={client.router} />
						<Detail title='IPV4:' label={client.ipv4} />
						<Detail title='Plan:' label={client.plan} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Balance'>
						<Detail title='Saldo:' label={client.saldo.toFixed(2)} />
						<Detail title='Dia de Corte:' label={'6'} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Estado'>
						<Detail title='Estado:' label={client.estado} />
						<Detail
							title='Fecha de Creación:'
							label={client.created_at.split('T')[0]}
						/>
					</DetailContainer>
				</div>
			</div>
		)
	);
}
