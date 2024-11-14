import ServiceReceivableTable from './serviceReceivableTable';

export default function ServiceReceivable({
	clientId,
	showSection,
}: {
	clientId: string;
	showSection: boolean;
}) {
	if (!showSection) {
		return null;
	}

	return (
		<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
			<header className='w-full flex justify-between items-center'>
				<h3 className='text-xl font-bold'>Servicios Por Cobrar</h3>
				<button className='hover:underline hover:underline-offset-4'>Crear</button>
			</header>

			<ServiceReceivableTable />
		</div>
	);
}
