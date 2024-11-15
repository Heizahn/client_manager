export default function SkeletonDetail() {
	return (
		<div className='flex flex-wrap bg-gray-800 px-4 pb-4 pt-6 rounded-b-md'>
			{/* Section: Datos Personales */}
			<div className='w-72 lg:w-1/3 px-4 py-2 flex flex-col gap-1'>
				<div className='bg-gray-700 rounded-md p-4'>
					<div className='w-32 h-5 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded'></div>
				</div>
			</div>

			{/* Section: Contacto */}
			<div className='w-72 lg:w-1/3 px-4 py-2'>
				<div className='bg-gray-700 rounded-md p-4'>
					<div className='w-32 h-5 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded'></div>
				</div>
			</div>

			{/* Section: Ubicación */}
			<div className='w-72 lg:w-1/3 px-4 py-2'>
				<div className='bg-gray-700 rounded-md p-4'>
					<div className='w-32 h-5 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded'></div>
				</div>
			</div>

			{/* Section: Servicios */}
			<div className='w-72 lg:w-1/3 px-4 py-2'>
				<div className='bg-gray-700 rounded-md p-4'>
					<div className='w-32 h-5 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded'></div>
				</div>
			</div>

			{/* Section: Balance */}
			<div className='w-72 lg:w-1/3 px-4 py-2'>
				<div className='bg-gray-700 rounded-md p-4'>
					<div className='w-32 h-5 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded'></div>
				</div>
			</div>

			{/* Section: Estado */}
			<div className='w-72 lg:w-1/3 px-4 py-2'>
				<div className='bg-gray-700 rounded-md p-4'>
					<div className='w-32 h-5 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded mb-1'></div>
					<div className='w-64 h-3 bg-gray-600 rounded'></div>
				</div>
			</div>
		</div>
	);
}
