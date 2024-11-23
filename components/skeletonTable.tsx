export default function SkeletonTable() {
	return (
		<div className='w-full max-h-[calc(100vh_-_7.5rem)] overflow-y-auto scrollbar-none rounded-b-md'>
			<table className='w-full table-auto bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg animate-pulse'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Cedula</th>
						<th>Telefono</th>
						<th>Sector</th>
						<th>IPV4</th>
						<th>Plan</th>
						<th>Saldo</th>
						<th>Estado</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{Array(5)
						.fill(0)
						.map((_, idx) => (
							<tr key={idx} className='border-t border-gray-700'>
								<td className='pl-4 py-3'>
									<div className='h-4 bg-gray-700 rounded w-48 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-36 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
								</td>
								<td>
									<div className='h-4 bg-gray-700 rounded w-4 animate-pulse'></div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
