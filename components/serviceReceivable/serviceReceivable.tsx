'use client';

import { ServiceReceivable as ServiceReceivableType } from '@/interfaces';
import { fetchServicesReceivable } from '@/lib/fetchData';
import ServiceReceivableTable from './serviceReceivableTable';
import { useState, useEffect } from 'react';

export default function ServiceReceivable({
	showSection,
	clientId,
}: {
	showSection: boolean;
	clientId: string;
}) {
	const [servicesReceivables, setServicesReceivables] = useState<ServiceReceivableType[]>(
		[],
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchServicesReceivable(clientId)
			.then((res) => setServicesReceivables(res))
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		showSection && (
			<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
				<header className='w-full flex justify-between items-center'>
					<h3 className='text-xl font-bold'>Servicios Por Cobrar</h3>
					<button className='hover:underline hover:underline-offset-4'>Crear</button>
				</header>
				{loading ? (
					<div className='flex items-center justify-center'>Loading...</div>
				) : servicesReceivables.length > 0 ? (
					<ServiceReceivableTable servicesReceivables={servicesReceivables} />
				) : (
					<div className='flex items-center justify-center'>
						No hay servicios por cobrar
					</div>
				)}
			</div>
		)
	);
}