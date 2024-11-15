import { createBrowserClient } from '@supabase/ssr';
import { ClientType, SectorType, ServiceType } from '../typesConsultas';

export async function createClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing environment variables');
	}

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export async function createClientTables() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing environment variables');
	}

	return createBrowserClient<{
		clients: ClientType;
		services: ServiceType;
		sectors: SectorType;
	}>(supabaseUrl, supabaseAnonKey);
}
