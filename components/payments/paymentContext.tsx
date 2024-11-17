'use client';

import { createContext, useContext, useState } from 'react';
import { PaymentStruct } from '@/interfaces';
import { fetchPaysByClient } from '@/lib/fetchData';
import { toast } from 'react-toastify';

interface PaymentContextType {
	paymentClient: PaymentStruct[];
	loadData: (id: string) => Promise<{ ok: boolean }>;
	reLoadData: (id: string) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType>({
	paymentClient: [],
	loadData: () => Promise.resolve({ ok: true }),
	reLoadData: () => Promise.resolve(),
});

export function PaymentProvider({ children }: { children: React.ReactNode }) {
	const [paymentClient, setPaymentClient] = useState<PaymentStruct[]>([]);

	const loadData = async (id: string) => {
		try {
			setPaymentClient(await fetchPaysByClient(id));
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
		<PaymentContext.Provider value={{ paymentClient, loadData, reLoadData }}>
			{children}
		</PaymentContext.Provider>
	);
}

export function usePaymentContext() {
	const context = useContext(PaymentContext);
	if (context === undefined) {
		throw new Error('usePaymentContext must be used within a PaymentProvider');
	}
	return context;
}
