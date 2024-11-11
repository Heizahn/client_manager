import SectorTable from '@/components/sectors/sectorTable';
import ShowFormNewSector from '@/components/sectors/showFormNewSector';

export default function Page() {
	return (
		<>
			<div className='bg-gray-800 mt-3 rounded-md'>
				<header className='flex justify-between items-center px-4 py-1'>
					<h2 className='text-center text-lg font-bold'>Sectores</h2>
					<div>
						<ShowFormNewSector />
					</div>
				</header>
				<div className='mt-1 border-b-2 border-gray-700' />
				<SectorTable />
			</div>
		</>
	);
}
