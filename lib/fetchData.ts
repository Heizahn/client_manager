'use server';
import { ClientDetailsHeader, CreateClient, ServiceReceivable } from '@/interfaces';
import { createClient, createClientDetails, createClientTables } from './supabase/client';
import { createClient as createClientServer } from './supabase/server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { ClientDetailsType, ClientType } from './typesConsultas';

export async function fetchAllClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();

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
	return data as unknown as ClientType[];
}

export async function fetchSolventsClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();

	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion, telefono, ipv4, saldo, estado, services(nombre_service), sectors(nombre_sector)',
		)
		.gte('saldo', 0)
		.order('nombre')
		.eq('estado', true);

	if (error) {
		throw new Error(error.message);
	}
	if (!data) {
		return [];
	}

	return data as unknown as ClientType[];
}

export async function fetchDefaultersClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, sectors(nombre_sector), services(nombre_service)',
		)
		.lt('saldo', 0)
		.eq('estado', true)
		.order('nombre');

	if (error) {
		throw new Error(error.message);
	}
	if (!data) {
		return [];
	}

	return data as unknown as ClientType[];
}

export async function fetchSuspendedClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, sectors(nombre_sector), services(nombre_service)',
		)
		.eq('estado', false)
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}

	return data as unknown as ClientType[];
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

export async function fetchClientById(id: string): Promise<ClientDetailsType> {
	noStore();
	const supabase = await createClientDetails();
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

	if (error) {
		throw new Error('Cliente no valido');
	}

	return data[0] as unknown as ClientDetailsType;
}

export async function fetchClientHeaderById(id: string): Promise<ClientDetailsHeader> {
	noStore();
	const supabase = await createClientDetails();
	const { data, error } = await supabase
		.from('clients')
		.select('id, nombre, saldo, estado, direccion')
		.eq('id', id);

	if (error) {
		throw new Error('Error al buscar el cliente');
	}

	return data[0] as unknown as ClientDetailsHeader;
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
