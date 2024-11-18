'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchServicesReceivable } from '@/lib/fetchData';
import { ServiceReceivable } from '@/interfaces';

interface ServiceReceivableContextType {
	serviceReceivable: ServiceReceivable[];
	loadData: (id: string) => Promise<{ ok: boolean }>;
	reLoadData: (id: string) => Promise<void>;
}

const ServiceReceivableContext = createContext<ServiceReceivableContextType>({
	serviceReceivable: [],
	loadData: () => Promise.resolve({ ok: true }),
	reLoadData: () => Promise.resolve(),
});

export function ServiceReceivableProvider({ children }: { children: React.ReactNode }) {
	const [serviceReceivable, setServiceReceivable] = useState<ServiceReceivable[]>([]);

	const loadData = async (id: string) => {
		try {
			setServiceReceivable(await fetchServicesReceivable(id));
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
		<ServiceReceivableContext.Provider value={{ serviceReceivable, loadData, reLoadData }}>
			{children}
		</ServiceReceivableContext.Provider>
	);
}

export function useServiceReceivableContext() {
	const context = useContext(ServiceReceivableContext);
	if (context === undefined) {
		throw new Error(
			'useServiceReceivableContext must be used within a ServiceReceivableProvider',
		);
	}
	return context;
}
