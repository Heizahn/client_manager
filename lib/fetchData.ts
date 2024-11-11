import { Client, ClientDetails } from '@/interfaces';
import { createClient } from './supabase/client';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, services(nombre), sectors(nombre)',
		)
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}
	//@ts-ignore
	return data.map((client) => {
		const { sectors, services } = client;
		//@ts-ignore
		const sector = sectors?.nombre || '';
		//@ts-ignore
		const service = services?.nombre || '';
		return {
			...client,
			sector,
			service,
		};
	});
}

export async function fetchSolventsClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, services(nombre), sectors(nombre)',
		)
		.gte('saldo', 0)
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}
	//@ts-ignore
	return data.map((client) => {
		const { services, sectors } = client;
		//@ts-ignore
		const sector = sectors?.nombre || '';
		//@ts-ignore
		const service = services?.nombre || '';
		return {
			...client,
			service,
			sector,
		};
	});
}

export async function fetchDefaultersClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, sectors(nombre), services(nombre)',
		)
		.lt('saldo', 0)
		.eq('estado', 'Activo')
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}
	//@ts-ignore
	return data.map((client) => {
		const { services, sectors } = client;
		//@ts-ignore
		const sector = sectors?.nombre || '';
		//@ts-ignore
		const service = services?.nombre || '';
		return {
			...client,
			service,
			sector,
		};
	});
}

export async function fetchSuspendedClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, sectors(nombre), services(nombre)',
		)
		.eq('estado', 'Suspendido')
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}
	//@ts-ignore
	return data.map((client) => {
		const { services, sectors } = client;
		//@ts-ignore
		const sector = sectors?.nombre || '';
		//@ts-ignore
		const service = services?.nombre || '';
		return {
			...client,
			service,
			sector,
		};
	});
}

export async function fetchCountClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { count } = await supabase
		.from('clients')
		.select('*', { count: 'exact', head: true });

	return count || 0;
}

export async function fetchCountSolventsClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { count } = await supabase
		.from('clients')
		.select('*', { count: 'exact', head: true })
		.gte('saldo', 0);

	return count || 0;
}

export async function fetchCountDefaultersClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { count } = await supabase
		.from('clients')
		.select('*', { count: 'exact', head: true })
		.lt('saldo', 0)
		.eq('estado', 'Activo');

	return count || 0;
}

export async function fetchCountSuspendedClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { count } = await supabase
		.from('clients')
		.select('*', { count: 'exact', head: true })
		.eq('estado', 'Suspendido');

	return count || 0;
}

export async function fetchClientById(id: string): Promise<ClientDetails> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			`
			id, 
			nombre, 
			identificacion, 
			telefono, 
			direccion, 
			ipv4, 
			saldo, 
			estado, 
			created_at, 
			dia_corte, 
			routers(
				nombre
				),
			services(
				nombre
				),
			sectors(
				nombre
				)
		`,
		)
		.eq('id', id);

	console.log(data);
	if (error) {
		console.log(error);
	}

	if (!data) {
		throw new Error('Client not found');
	}
	//@ts-ignore
	return data.map((client) => {
		const { routers, services, sectors } = client;
		//@ts-ignore
		const router = routers?.nombre || '';
		//@ts-ignore
		const service = services?.nombre || '';
		//@ts-ignore
		const sector = sectors?.nombre || '';
		return {
			...client,
			router,
			service,
			sector,
		};
	})[0];
}
