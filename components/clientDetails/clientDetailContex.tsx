'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchClientStatusById } from '@/lib/fetchData';

interface ClientDetailContextType {
	clientStatus: {
		nombre: string;
		direccion: string;
		saldo: number;
		estado: boolean;
	};
	loadData: (id: string) => Promise<{ ok: boolean }>;
	reLoadData: (id: string) => Promise<void>;
}

const ClientDetailContext = createContext<ClientDetailContextType>({
	clientStatus: {
		nombre: '',
		direccion: '',
		saldo: 0,
		estado: true,
	},
	loadData: () => Promise.resolve({ ok: true }),
	reLoadData: () => Promise.resolve(),
});

export function ClientDetailProvider({ children }: { children: React.ReactNode }) {
	const [clientStatus, setClientStaus] = useState({
		nombre: '',
		direccion: '',
		saldo: 0,
		estado: true,
	});

	const loadData = async (id: string) => {
		try {
			setClientStaus(await fetchClientStatusById(id));
			return { ok: true };
		} catch (err) {
			if (err instanceof Error) toast.error(err.message);
			return { ok: true };
		}
	};
	const reLoadData = async (id: string) => {
		await loadData(id);
	};

	return (
		<ClientDetailContext.Provider value={{ clientStatus, loadData, reLoadData }}>
			{children}
		</ClientDetailContext.Provider>
	);
}

export function useClientDetailContext() {
	const context = useContext(ClientDetailContext);
	if (context === undefined) {
		throw new Error('useClientDetailContext must be used within a ClientDetailProvider');
	}
	return context;
}
