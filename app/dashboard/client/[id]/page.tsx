import ClientDetailsById from '@/components/clientDetails/clientDetails';
import HeaderClient from '@/components/clientDetails/headerClient';

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = await params;

	if (!id) {
		return <div>No se encontro el cliente</div>;
	}
	return (
		<>
			<div className='flex flex-col md:overflow-hidden'>
				<HeaderClient clientId={id as string} />
				{/* Details */}
				<ClientDetailsById clientId={id as string} />

				{/* Invoices */}
				{/* <ServiceReceivable
					clientId={id as string}
					showSection={selectedSection.invoices}
					/> */}
			</div>
		</>
	);
}
