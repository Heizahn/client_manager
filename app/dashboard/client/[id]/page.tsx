'use client';
import Details from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';
import { fetchClientById } from '@/lib/fetchData';
import type { ClientDetails } from '@/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavCliente from '@/components/clientDetails/navCliente';
import ServiceReceivable from '@/components/serviceReceivable/serviceReceivable';
import { toast } from 'react-toastify';

export default function Page() {
	const { id } = useParams();
	const [client, setClient] = useState<ClientDetails | null>(null);
	const [selectedSection, setSelectedSection] = useState({
		details: true,
		invoices: false,
		payments: false,
		statistics: false,
	});

	useEffect(() => {
		fetchClientById(id as string)
			.then((client) => setClient(client))
			.catch((err) => toast.error(err.message));
	}, [id]);

	return (
		<div className='flex flex-col md:overflow-hidden mt-2'>
			<HeaderClient client={client}>
				<NavCliente
					section={selectedSection}
					setSelectedSection={setSelectedSection}
				/>
			</HeaderClient>

			{/* Details */}
			<Details client={client} showSection={selectedSection.details} />

			{/* Invoices */}
			<ServiceReceivable
				clientId={id as string}
				showSection={selectedSection.invoices}
			/>
		</div>
	);
}
