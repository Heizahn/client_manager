import { createClient } from '@supabase/supabase-js';
import { months } from './months';

export async function ClientsForServiceReceivable() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing environment variables');
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseAnonKey);
		const {
			data,
			error,
		}: {
			data: { id: string; services: { nombre: string; costo: number } }[] | null;
			error: Error | null;
		} = await supabase.from('clients').select('id, services(nombre, costo)');

		if (error) {
			console.log(error.message);
		}

		if (!data) {
			throw new Error('No client found');
		}

		const clients = data.map((client) => {
			const { services } = client;
			const motivo = `${services.nombre} Residencial - `;
			const monto = services.costo;

			return {
				id: client.id,
				motivo: motivo + months[new Date().getMonth()],
				monto,
				deuda: -monto,
			};
		});

		return clients;
	} catch (error) {
		console.log(error);
	}
}
