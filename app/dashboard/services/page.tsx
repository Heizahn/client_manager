import ServiceTable from '@/components/services/serviceTable';
import ShowFormNewService from '@/components/services/showFormNewService';

export default function Page() {
	return (
		<>
			<div className='bg-gray-800 mt-3 rounded-md'>
				<header className='flex justify-between items-center px-4 py-1'>
					<h2 className='text-center text-lg font-bold'>Servicios</h2>
					<div>
						<ShowFormNewService />
					</div>
				</header>
				<div className='mt-1 border-b-2 border-gray-700' />
				<ServiceTable />
			</div>
		</>
	);
}
