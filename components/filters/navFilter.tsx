import { fetchCountClients } from '@/lib/fetchData';
import FilterStatusClient from '@/components/filters/filterStatusClient';

async function NavFilter() {
	const AllCount = await fetchCountClients();
	return (
		<nav className='flex flex-row' aria-label='Filtro de Clientes'>
			<FilterStatusClient title='Todos' Count={AllCount.all} href='/dashboard/clients' />
			<FilterStatusClient
				title='Solventes'
				Count={AllCount.solvent}
				href='/dashboard/clients/solvents'
				className='text-green-500'
			/>
			<FilterStatusClient
				title='Defaulters'
				Count={AllCount.defaulter}
				href='/dashboard/clients/defaulters'
				className='text-orange-500'
			/>
			<FilterStatusClient
				title='Suspendidos'
				Count={AllCount.suspended}
				href='/dashboard/clients/suspended'
				className='text-red-500'
			/>
		</nav>
	);
}

export default NavFilter;
