import { Client } from '@/interfaces';
import { createClient } from './supabase/client';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select('id, nombre, identificacion,telefono, sector, ipv4, plan, saldo, estado');

	if (error) {
		console.log(error);
	}

	return data || [];
}

export async function fetchSolventsClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select('id, nombre, identificacion,telefono, sector, ipv4, plan, saldo, estado')
		.gte('saldo', 0);

	if (error) {
		console.log(error);
	}

	return data || [];
}

export async function fetchDefaultersClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select('id, nombre, identificacion,telefono, sector, ipv4, plan, saldo, estado')
		.lt('saldo', 0)
		.eq('estado', 'Activo');

	if (error) {
		console.log(error);
	}

	return data || [];
}

export async function fetchSuspendedClients(): Promise<Client[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select('id, nombre, identificacion,telefono, sector, ipv4, plan, saldo, estado')
		.eq('estado', 'Suspendido');

	if (error) {
		console.log(error);
	}

	return data || [];
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
		.gte('saldo', 0);

	return data?.length || 0;
}

export async function fetchCountDefaultersClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { data } = await supabase
		.from('clients')
		.select('id')
		.lt('saldo', 0)
		.eq('estado', 'Activo');

	return data?.length || 0;
}

export async function fetchCountSuspendedClients(): Promise<number> {
	noStore();
	const supabase = await createClient();
	const { data } = await supabase
		.from('clients')
		.select('id')
		.eq('estado', 'Suspendido');

	return data?.length || 0;
}