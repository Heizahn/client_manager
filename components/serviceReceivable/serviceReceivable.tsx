'use client';

import { ServiceReceivable as ServiceReceivableType } from '@/interfaces';
import ServiceReceivableTable from './serviceReceivableTable';
import { useState } from 'react';
import NewServiceReceivable from './newServiceReceivable';
import { useClientDetailContext } from '../clientDetails/clientDetailContext';

export default function ServiceReceivable({
	clientId,
	serviceReceivable,
}: {
	clientId: string;
	serviceReceivable: ServiceReceivableType[];
}) {
	const { invoices } = useClientDetailContext();
	const [showFormNewService, setShowFormNewService] = useState(false);

	return (
		invoices && (
			<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
				<header className='w-full flex justify-between items-center'>
					<h3 className='text-xl font-bold'>Servicios Por Cobrar</h3>
					<button
						onClick={() => {
							setShowFormNewService(true);
						}}
						className='hover:underline hover:underline-offset-4'
					>
						Crear
					</button>
					{showFormNewService && (
						<NewServiceReceivable
							clientId={clientId}
							setShow={setShowFormNewService}
						/>
					)}
				</header>
				{serviceReceivable.length > 0 ? (
					<ServiceReceivableTable servicesReceivables={serviceReceivable} />
				) : (
					<div className='flex items-center justify-center'>
						No hay servicios por cobrar
					</div>
				)}
			</div>
		)
	);
}
