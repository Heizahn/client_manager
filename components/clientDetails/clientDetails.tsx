'use client';

import Detail from './detail';
import DetailContainer from './detailContainer';
import { formatDate } from '../dateFormat';
import { formatMoney } from '../formatMoney';
import { useStoreClientView } from '@/store/storeClientView';
import { useEffect, useState } from 'react';
import { fetchClientById } from '@/lib/fetchData';
import { toast } from 'react-toastify';
import SkeletonDetail from './skeletonDetail';
import { ClientDetailsType } from '@/lib/typesConsultas';
import { useClientDetailContext } from './clientDetailContex';

export default function ClientDetailsById({ clientId }: { clientId: string }) {
	const { details } = useStoreClientView();
	const [client, setClient] = useState<ClientDetailsType | null>(null);
	const {
		clientStatus: { saldo, estado },
	} = useClientDetailContext();

	useEffect(() => {
		fetchClientById(clientId)
			.then((client) => setClient(client))
			.catch((err) => toast.error(err.message));
	}, [clientId]);

	return (
		details &&
		(client ? (
			<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
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
						<Detail
							title='Sector:'
							label={client.sectors?.nombre_sector as string}
						/>
						<Detail
							title='Dirección:'
							label={client.direccion}
							href={`https://www.google.com/maps/search/?api=1&query=${client.direccion}`}
						/>
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Servicios'>
						<Detail title='Router:' label={client.routers?.nombre as string} />
						<Detail
							title='IPV4:'
							label={client.ipv4}
							href={`http://${client.ipv4}`}
						/>
						<Detail
							title='Plan:'
							label={client.services?.nombre_service as string}
						/>
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Balance'>
						<Detail
							title='Saldo:'
							label={`${formatMoney(saldo)}$`}
							className={saldo < 0 ? 'text-red-500' : 'text-green-500'}
						/>
						<Detail title='Dia de Corte:' label={String(client.dia_corte)} />
					</DetailContainer>
				</div>
				<div className='w-72 lg:w-1/3 px-4 py-2'>
					<DetailContainer title='Estado'>
						<Detail
							title='Estado:'
							label={`${estado ? 'Activo' : 'Suspendido'}`}
							className={
								!estado
									? 'text-red-500'
									: saldo < 0
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
		) : (
			<SkeletonDetail />
		))
	);
}
