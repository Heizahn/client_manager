import ShowPayment from './pay';

const clients = [
	{
		nombre: 'Lorianny',
		phone_number: '04125403745',
	},
];

export default function Page() {
	return (
		<div className='flex flex-col md:overflow-hidden'>
			<div className='flex flex-row justify-center items-center '>
				<h2 className='text-center text-2xl font-bold'>Clientes</h2>
			</div>
			<div className='flex flex-row justify-between items-center p-3 rounded-md bg-gray-800'>
				<div className='flex flex-row '>
					<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Todos
					</button>
					<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Solvente
					</button>
					<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Moroso
					</button>
					<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Suspendidos
					</button>
				</div>
				<div>
					<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
						Nuevo Cliente
					</button>
				</div>
			</div>
			<div className='mt-4'>
				<div>
					<ul>
						{clients.map((client) => (
							<li key={client.phone_number}>
								{client.nombre} - {client.phone_number} -{' '}
								<ShowPayment client={client} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
