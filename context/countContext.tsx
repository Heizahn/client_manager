'use client';
import {
	fetchCountClients,
	fetchCountDefaultersClients,
	fetchCountSolventsClients,
	fetchCountSuspendedClients,
} from '@/lib/fetchData';
import { createContext, useContext, useEffect, useState } from 'react';

export interface CountContextProps {
	clientsCountAll: number;
	clientsCountSolvents: number;
	clientsCountDefaulters: number;
	clientsCountSuspended: number;
	setClientsCountAll: React.Dispatch<React.SetStateAction<number>>;
	setClientsCountSolvents: React.Dispatch<React.SetStateAction<number>>;
	setClientsCountDefaulters: React.Dispatch<React.SetStateAction<number>>;
	setClientsCountSuspended: React.Dispatch<React.SetStateAction<number>>;
	Recount: () => void;
}

export const CountContextClients = createContext<CountContextProps>({
	clientsCountAll: 0,
	clientsCountSolvents: 0,
	clientsCountDefaulters: 0,
	clientsCountSuspended: 0,
	setClientsCountAll: () => {},
	setClientsCountSolvents: () => {},
	setClientsCountDefaulters: () => {},
	setClientsCountSuspended: () => {},
	Recount: () => {},
});

export function CountProviderClients({ children }: { children: React.ReactNode }) {
	const [clientsCountAll, setClientsCountAll] = useState(0);
	const [clientsCountSolvents, setClientsCountSolvents] = useState(0);
	const [clientsCountDefaulters, setClientsCountDefaulters] = useState(0);
	const [clientsCountSuspended, setClientsCountSuspended] = useState(0);

	const Recount = () => {
		fetchCountClients().then((count) => setClientsCountAll(count));
		fetchCountSolventsClients().then((count) => setClientsCountSolvents(count));
		fetchCountDefaultersClients().then((count) => setClientsCountDefaulters(count));
		fetchCountSuspendedClients().then((count) => setClientsCountSuspended(count));
	};

	useEffect(() => {
		Recount();
	});

	return (
		<CountContextClients.Provider
			value={{
				clientsCountAll,
				clientsCountSolvents,
				clientsCountDefaulters,
				clientsCountSuspended,
				setClientsCountAll,
				setClientsCountSolvents,
				setClientsCountDefaulters,
				setClientsCountSuspended,
				Recount,
			}}
		>
			{children}
		</CountContextClients.Provider>
	);
}

export function useCountContextClients() {
	return useContext(CountContextClients);
}
