export default function SkeletonPayment() {
	return (
		<>
			<div className='w-full max-h-[calc(100vh_-_7.5rem)] overflow-y-auto scrollbar-none rounded-b-md'>
				<table className='w-full table-auto bg-gray-800 '>
					<thead className='sticky top-0 bg-gray-800 mt-2'>
						<tr className='text-left text-lg animate-pulse'>
							<th className='pl-4 py-2'>Motivo</th>
							<th>Fecha Creación</th>
							<th>Tipo de Pago</th>
							<th>Creado Por</th>
							<th>Recibido Por</th>
							<th>Monto (REF)</th>
							<th>Monto (Bs)</th>
							<th>Referencia</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{/* Aquí es donde irían los datos, pero para el skeleton vamos a crear varias filas con el efecto de carga */}
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
										<div className='h-4 bg-gray-700 rounded w-24 animate-pulse'></div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}
