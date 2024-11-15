import Breadcrumbs from '../viewclients/breadcrums';

export default function LoaderHeader() {
	return (
		<>
			{/* Header */}
			<div className='mt-2 flex flex-row justify-center items-center py-2 rounded-md bg-gray-800'>
				<h2 className='text-center text-2xl font-bold'>Detalles del Cliente</h2>
			</div>

			{/* Main Container */}
			<div className='bg-gray-800 mt-3 rounded-t-md'>
				{/* Breadcrumbs */}
				<Breadcrumbs
					breadcrumbs={[
						{
							label: 'Clientes',
							href: '/dashboard/clients',
							active: false,
						},
						{
							label: 'Cliente',
							active: true,
						},
					]}
				/>

				{/* Client Info */}
				<div className='flex flex-row gap-4 items-start justify-between px-4 py-2'>
					<div className='flex flex-col'>
						{/* Client name and status */}
						<div className='flex flex-row items-center gap-3 mt-2'>
							<div className='w-60 h-8 bg-gray-600 rounded'></div>
							<div className='w-24 h-8 bg-gray-600 rounded'></div>
						</div>

						{/* Address and balance */}
						<div className='flex flex-row gap-2 mt-2 text-sm mb-2'>
							<div className='w-40 h-4 bg-gray-600 rounded'></div>
							<div className='w-32 h-4 bg-gray-600 rounded'></div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-row items-center gap-6 mr-2'>
						<div className='w-16 h-6 bg-gray-600 rounded'></div>
						<div className='w-12 h-6 bg-gray-600 rounded'></div>
					</div>
				</div>

				{/* Navigation */}
				<div className='flex flex-row gap-4 justify-start px-4 py-2 mt-4 mb-2'>
					{Array(4)
						.fill(null)
						.map((_, i) => (
							<div
								key={i}
								className='w-32 h-6 bg-gray-600 rounded-md text-center'
							></div>
						))}
				</div>
			</div>
		</>
	);
}
