import { Client } from '@/interfaces';
import { createClient } from './supabase/client';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchClients(): Promise<Client[]> {
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
