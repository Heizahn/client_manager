'use client';

import { ServiceReceivable as ServiceReceivableType } from '@/interfaces';
import { fetchServicesReceivable } from '@/lib/fetchData';
import ServiceReceivableTable from './serviceReceivableTable';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useStoreClientView } from '@/store/storeClientView';
import SkeletonTable from '../skeletonTable';
import NewServiceReceivable from './newServiceReceivable';
import { useServiceReceivableContext } from './serviceReceicvableContex';

export default function ServiceReceivable({ clientId }: { clientId: string }) {
	const { invoices } = useStoreClientView();
	const { serviceReceivable, loadData } = useServiceReceivableContext();
	const [loading, setLoading] = useState(true);
	const [showFormNewService, setShowFormNewService] = useState(false);

	useEffect(() => {
		loadData(clientId).then((res) => {
			if (res.ok) {
				setLoading(false);
			}
		});
	}, [clientId, invoices]);

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
				{loading ? (
					<SkeletonTable />
				) : serviceReceivable.length > 0 ? (
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
