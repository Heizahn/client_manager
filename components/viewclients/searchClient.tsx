'use client';

import { useClientsContext } from './clientsContext';

export default function SearchClient() {
	const { setFilter } = useClientsContext();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<input
			type='text'
			className=' rounded-md px-2 py-0.5 outline-2 outline-gray-600 text-gray-950'
			placeholder='Buscar...'
			onChange={handleChange}
		/>
	);
}
