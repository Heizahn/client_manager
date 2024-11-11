'use server';
import type { Router, Sector, CreateRouter, Service } from '@/interfaces';
import { createClient } from './supabase/client';
import { createClient as createClientServer } from './supabase/server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

export async function fetchRouters(): Promise<Router[]> {
	noStore();
	const supabase = await createClient();

	const consulta = await supabase.from('routers').select(`
		id,
		nombre,
		ip,
		clientes,
		estado,
		sectors(nombre)`);

	if (consulta.error) {
		console.log(consulta.error);
	}

	if (!consulta.data) {
		return [];
	}

	type Router_DTO = {
		id: string;
		nombre: string;
		ip: string;
		clientes: number;
		estado: boolean;
		sectors: Sector_DTO;
	};

	interface Sector_DTO {
		nombre: string;
	}
	// @ts-ignore
	const routers: Router_DTO[] = consulta.data;

	return routers.map((router) => {
		const { sectors } = router;
		const { nombre } = sectors;
		return {
			...router,
			sector: nombre,
		};
	});
}

export async function fetchSectors(): Promise<Sector[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('sectors')
		.select('id, nombre, created_at, clientes, estado')
		.order('nombre');

	if (error) {
		console.log(error);
	}

	return data || [];
}

export async function fetchCreateSector(nombre: string) {
	const supabase = await createClient();
	const supabaseServer = await createClientServer();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		throw new Error('No user found');
	}

	const { id } = user;
	const { error } = await supabase
		.from('sectors')
		.insert({ nombre, estado: true, created_by: id });

	if (error) {
		return Error(error.message);
	}
	revalidatePath('/dashboard/sectors');
	return 'Sector creado exitosamente';
}

export async function fetchCreateRouter({ nombre, ip }: CreateRouter) {
	const supabase = await createClient();
	const supabaseServer = await createClientServer();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		throw new Error('No user found');
	}

	const { id } = user;
	const { error } = await supabase.from('routers').insert({ nombre, ip, created_by: id });

	if (error) {
		return Error(error.message);
	}
	revalidatePath('/dashboard/routers');
	return 'Sector creado exitosamente';
}

export async function fetchServices(): Promise<Service[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('services')
		.select('id, nombre, tipo, clientes, costo, estado')
		.order('nombre');

	if (error) {
		console.log(error);
	}
	if (!data) {
		return [];
	}

	return data;
}
