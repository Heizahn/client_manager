import { create } from 'zustand';

interface StoreClientViewState {
	details: boolean;
	invoices: boolean;
	payments: boolean;
	statistics: boolean;
}

interface StoreClientView extends StoreClientViewState {
	setViewDetails: (section: boolean) => void;
	setViewInvoices: (section: boolean) => void;
	setViewPayments: (section: boolean) => void;
	setViewStatistics: (section: boolean) => void;
}

export const useStoreClientView = create<StoreClientView>((set) => ({
	details: true,
	invoices: false,
	payments: false,
	statistics: false,
	setViewDetails: (section: boolean) => {
		set({ details: section });
	},
	setViewInvoices: (section: boolean) => {
		set({ invoices: section });
	},
	setViewPayments: (section: boolean) => {
		set({ payments: section });
	},
	setViewStatistics: (section: boolean) => {
		set({ statistics: section });
	},
}));
