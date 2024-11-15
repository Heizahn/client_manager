import { create } from 'zustand';

interface StoreClientViewState {
	details: boolean;
	invoices: boolean;
	payments: boolean;
	statistics: boolean;
}

interface StoreClientView extends StoreClientViewState {
	setSelectedSection: (section: StoreClientViewState) => void;
}

export const useStoreClientView = create<StoreClientView>((set) => ({
	details: true,
	invoices: false,
	payments: false,
	statistics: false,
	setSelectedSection: (section: StoreClientViewState) => {
		set(section);
	},
}));
