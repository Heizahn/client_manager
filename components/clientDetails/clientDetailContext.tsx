'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchClientStatusById } from '@/lib/fetchData';

interface ClientDetailContext {
	details: boolean;
	invoices: boolean;
	payments: boolean;
	statistics: boolean;
	setViewDetails: (section: boolean) => void;
	setViewInvoices: (section: boolean) => void;
	setViewPayments: (section: boolean) => void;
	setViewStatistics: (section: boolean) => void;
}

export const ClientDetailContext = createContext<ClientDetailContext>({
	details: true,
	invoices: false,
	payments: false,
	statistics: false,
	setViewDetails: (section: boolean) => {},
	setViewInvoices: (section: boolean) => {},
	setViewPayments: (section: boolean) => {},
	setViewStatistics: (section: boolean) => {},
});

export const ClientDetailProvider = ({ children }: { children: React.ReactNode }) => {
	const [details, setDetails] = useState(true);
	const [invoices, setInvoices] = useState(false);
	const [payments, setPayments] = useState(false);
	const [statistics, setStatistics] = useState(false);

	const setViewDetails = (section: boolean) => {
		setDetails(section);
	};
	const setViewInvoices = (section: boolean) => {
		setInvoices(section);
	};
	const setViewPayments = (section: boolean) => {
		setPayments(section);
	};
	const setViewStatistics = (section: boolean) => {
		setStatistics(section);
	};

	return (
		<ClientDetailContext.Provider
			value={{
				details,
				invoices,
				payments,
				statistics,
				setViewDetails,
				setViewInvoices,
				setViewPayments,
				setViewStatistics,
			}}
		>
			{children}
		</ClientDetailContext.Provider>
	);
};

export const useClientDetailContext = () => {
	const context = useContext(ClientDetailContext);
	if (context === undefined) {
		throw new Error('useClientDetailContext must be used within a ClientDetailProvider');
	}
	return context;
};
