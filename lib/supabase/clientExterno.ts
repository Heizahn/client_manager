import { createClient } from '@supabase/supabase-js';

export async function createClientExterno() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing environment variables');
	}

	return createClient(supabaseUrl, supabaseAnonKey);
}
