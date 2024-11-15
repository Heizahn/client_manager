'use server';
import { Client, ClientDetails, CreateClient, ServiceReceivable } from '@/interfaces';
import { createClient } from './supabase/client';
import { createClient as createClientServer } from './supabase/server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

export async function fetchAllClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion, telefono, ipv4, saldo, estado, services(nombre_service), sectors(nombre_sector)',
		)
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}

	return data.map((client: any) => {
		const { sectors, services } = client;
		const sector = sectors?.nombre_sector;
		const service = services?.nombre_service;
		return {
			...client,
			sector,
			plan: service,
		};
	});
}

export async function fetchSolventsClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();

	const res = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion, telefono, ipv4, saldo, estado, services(nombre), sectors(nombre)',
		)
		.gte('saldo', 0)
		.order('nombre')
		.eq('estado', true);

	if (res.error) {
		console.log(res.error);
	}
	if (!res.data) {
		return [];
	}

	return res.data.map((client: any) => {
		const { services, sectors } = client;
		const sector = sectors.nombre;
		const service = services.nombre;
		return {
			...client,
			plan: service,
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
		.eq('estado', true)
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}

	return data.map((client: any) => {
		const { services, sectors } = client;
		const sector = sectors?.nombre;
		const service = services?.nombre;
		return {
			...client,
			plan: service,
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
		.eq('estado', false)
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}

	return data.map((client: any) => {
		const { services, sectors } = client;
		const sector = sectors?.nombre;
		const service = services?.nombre;
		return {
			...client,
			plan: service,
			sector,
		};
	});
}

export async function fetchCountClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { data } = await supabase.from('clients').select('id');

	return data?.length || 0;
}

export async function fetchCountSolventsClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { data } = await supabase
		.from('clients')
		.select('id')
		.gte('saldo', 0)
		.eq('estado', true);

	return data?.length || 0;
}

export async function fetchCountDefaultersClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { data } = await supabase
		.from('clients')
		.select('id')
		.lt('saldo', 0)
		.eq('estado', true);

	return data?.length || 0;
}

export async function fetchCountSuspendedClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { count } = await supabase
		.from('clients')
		.select('id', { count: 'exact', head: true })
		.eq('estado', false);

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
				nombre_service
				),
			sectors(
				nombre_sector
				)
		`,
		)
		.eq('id', id);

	console.log(data);
	if (error) {
		throw new Error('Debes estar logeado para acceder a este recurso');
	}

	if (!data) {
		throw new Error('Cliente no encontrado');
	}

	return data.map((client: any) => {
		const { routers, services, sectors } = client;
		const router = routers?.nombre;
		const service = services?.nombre_service;
		const sector = sectors?.nombre_sector;
		return {
			...client,
			router,
			plan: service,
			sector,
		};
	})[0];
}

export async function fetchCreateClient(values: CreateClient): Promise<string> {
	noStore();

	const supabase = await createClient();
	const supabaseServer = await createClientServer();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		throw new Error('No user found');
	}
	const { id } = user;
	const { error } = await supabase.from('clients').insert({ ...values, created_by: id });
	if (error) {
		throw new Error(error.message);
	}

	revalidatePath('/dashboard/clients');
	return 'Cliente creado exitosamente';
}

export async function fetchServicesReceivable(clientId: string): Promise<ServiceReceivable[]> {
	noStore();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('service_receivable')
		.select('id, motivo, created_at, monto, deuda, estado')
		.eq('cliente', clientId);

	if (error) {
		console.log(error);
	}

	if (!data) {
		return [];
	}

	return data;
}
