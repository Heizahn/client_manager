import {
	fetchCountClients,
	fetchCountDefaultersClients,
	fetchCountSolventsClients,
	fetchCountSuspendedClients,
} from '@/lib/fetchData';
import { create } from 'zustand';

interface CounterState {
	AllCount: number;
	SolventsCount: number;
	DefaultersCount: number;
	SuspendedCount: number;
	Recount: () => void;
}

export const useStore = create<CounterState>((set) => ({
	AllCount: 0,
	SolventsCount: 0,
	DefaultersCount: 0,
	SuspendedCount: 0,

	Recount: async () => {
		const allCount = await fetchCountClients();
		const solventsCount = await fetchCountSolventsClients();
		const defaultersCount = await fetchCountDefaultersClients();
		const suspendedCount = await fetchCountSuspendedClients();

		set({
			AllCount: allCount,
			SolventsCount: solventsCount,
			DefaultersCount: defaultersCount,
			SuspendedCount: suspendedCount,
		});
	},
}));
