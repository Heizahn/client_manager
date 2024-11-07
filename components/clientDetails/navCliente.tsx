export default function NavCliente() {
	return (
		<nav className='px-4 py-2 mt-4 '>
			<ul className='flex flex-row gap-8 text-base font-bold'>
				<li>
					<a href='#' className='hover:underline hover:underline-offset-4'>
						Detalles del Cliente
					</a>
				</li>
				<li>
					<a href='#' className='hover:underline hover:underline-offset-4'>
						Cuentas Por Cobrar
					</a>
				</li>
				<li>
					<a href='#' className='hover:underline hover:underline-offset-4'>
						Pagos
					</a>
				</li>
				<li>
					<a href='#' className='hover:underline hover:underline-offset-4'>
						Estadísticas
					</a>
				</li>
			</ul>
		</nav>
	);
}
