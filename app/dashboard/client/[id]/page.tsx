'use client';
import { fetchClientById } from '@/lib/fetchData';
import type { ClientDetails } from '@/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
	const { id } = useParams();
	const [client, setClient] = useState<ClientDetails | null>(null);

	useEffect(() => {
		fetchClientById(id as string)
			.then((client) => setClient(client))
			.catch((err) => toast.error(err.message));
	}, [id]);

	return (
		<div className='flex flex-col md:overflow-hidden mt-2'>
			{/* <Suspense fallback={<div>Loading feed...</div>}>
				{/* Details 
				<Details client={client} showSection={selectedSection.details} />

				{/* Invoices 
				<ServiceReceivable
					clientId={id as string}
					showSection={selectedSection.invoices}
				/>
			</Suspense> */}
		</div>
	);
}
