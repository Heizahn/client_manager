import {
	fetchCountClients,
	fetchCountDefaultersClients,
	fetchCountSolventsClients,
	fetchCountSuspendedClients,
} from '@/lib/fetchData';
import FilterStatusClient from '@/components/filters/filterStatusClient';

async function NavFilter() {
	const AllCount = await fetchCountClients();
	const SolventsCount = await fetchCountSolventsClients();
	const SuspendedCount = await fetchCountSuspendedClients();
	const DefaultersCount = await fetchCountDefaultersClients();
	return (
		<nav className='flex flex-row' aria-label='Filtro de Clientes'>
			<FilterStatusClient title='Todos' Count={AllCount} href='/dashboard/clients' />
			<FilterStatusClient
				title='Solventes'
				Count={SolventsCount}
				href='/dashboard/clients/solvents'
				className='text-green-500'
			/>
			<FilterStatusClient
				title='Defaulters'
				Count={DefaultersCount}
				href='/dashboard/clients/defaulters'
				className='text-orange-500'
			/>
			<FilterStatusClient
				title='Suspendidos'
				Count={SuspendedCount}
				href='/dashboard/clients/suspended'
				className='text-red-500'
			/>
		</nav>
	);
}

export default NavFilter;
