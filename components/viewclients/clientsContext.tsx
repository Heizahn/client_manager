'use client';

import { ClientType } from '@/lib/typesConsultas';
import { createContext, useCallback, useContext, useState } from 'react';

interface ClientsContextType {
	clients: ClientType[];
	setClients: (clients: ClientType[]) => void;
	setFilter: (filter: string) => void;
	filterClients: () => ClientType[];
}

const ClientsContext = createContext<ClientsContextType>({
	clients: [],
	setClients: () => {},
	setFilter: () => {},
	filterClients: () => [],
});

export function ClientsProvider({ children }: { children: React.ReactNode }) {
	const [clients, setClients] = useState<ClientType[]>([]);
	const [clientFilter, setClientFilter] = useState('');

	const filterClients = useCallback(() => {
		if (clientFilter === '') {
			return clients;
		}
		return clients.filter(
			(client) =>
				client.nombre.toLowerCase().includes(clientFilter.toLowerCase()) ||
				client.identificacion.toLowerCase().includes(clientFilter.toLowerCase()) ||
				client.telefono.toLowerCase().includes(clientFilter.toLowerCase()) ||
				client.sectors?.nombre_sector
					.toLowerCase()
					.includes(clientFilter.toLowerCase()) ||
				client.ipv4.toLowerCase().includes(clientFilter.toLowerCase()),
		);
	}, [clientFilter]);

	return (
		<ClientsContext.Provider
			value={{ clients, setClients, setFilter: setClientFilter, filterClients }}
		>
			{children}
		</ClientsContext.Provider>
	);
}

export function useClientsContext() {
	const context = useContext(ClientsContext);
	if (context === undefined) {
		throw new Error('useClientsContext must be used within a ClientsProvider');
	}
	return context;
}
