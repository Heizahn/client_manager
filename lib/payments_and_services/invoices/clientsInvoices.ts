import { createClient } from '@supabase/supabase-js';

type services = {
	nombre_service: string;
	costo: number;
};

type client = {
	id: string;
	services: services;
};

export async function ClientsForServiceReceivable() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing environment variables');
	}

	try {
		const supabase = createClient<{ clients: client; services: services }>(
			supabaseUrl,
			supabaseAnonKey,
		);
		const { data, error } = await supabase
			.from('clients')
			.select('id, services(nombre_service, costo)');

		if (error) {
			throw new Error(error.message);
		}

		if (!data) {
			throw new Error('No client found');
		}

		return data as unknown as client[];
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
}
