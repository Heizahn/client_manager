'use server';
import type {
	Router,
	Sector,
	CreateRouter,
	Service,
	CreateService,
	DataSelectSector,
	DataSelectRouter,
	DataSelectService,
	DataSelectProfile,
} from '@/interfaces';
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
		sectors(nombre_sector)`);

	if (consulta.error) {
		console.error(consulta.error);
	}

	if (!consulta.data) {
		return [];
	}

	const routers = consulta.data;

	return routers as unknown as Router[];
}

export async function fetchSectors(): Promise<Sector[] | string> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('sectors')
		.select('id, nombre_sector, created_at, clientes, estado')
		.order('nombre_sector');

	if (error) {
		return error.message;
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
		.insert({ nombre_sector: nombre, estado: true, created_by: id });

	if (error) {
		throw new Error();
	}
	revalidatePath('/dashboard/sectors');
	return 'Sector creado exitosamente';
}

export async function fetchCreateRouter({ nombre, ip, sector }: CreateRouter) {
	const supabase = await createClient();
	const supabaseServer = await createClientServer();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		throw new Error('Debes estar logeado para crear un router');
	}

	const { id } = user;
	const { error } = await supabase
		.from('routers')
		.insert({ nombre, ip, sector_id: sector, created_by: id, estado: true });

	if (error) {
		return Error('Error al crear el router');
	}
	revalidatePath('/dashboard/routers');
	return 'Sector creado exitosamente';
}

export async function fetchServices(): Promise<Service[] | string> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('services')
		.select('id, nombre_service, tipo, clientes, costo, estado')
		.order('tipo');

	if (error) {
		return error.message;
	}
	if (!data) {
		return [];
	}

	return data;
}

export async function fetchCreateService(values: CreateService) {
	const supabase = await createClient();
	const supabaseServer = await createClientServer();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		throw new Error('Debes estar logeado para crear un servicio');
	}

	const { id } = user;
	const { nombre, tipo, costo } = values;
	const { error } = await supabase
		.from('services')
		.insert({ nombre_service: nombre, tipo, costo: costo * 100, created_by: id });

	if (error) {
		throw new Error('Error al crear el servicio');
	}
	revalidatePath('/dashboard/services');
	return 'Servicio creado exitosamente';
}

export async function fetchDataSelectRouter(): Promise<DataSelectRouter[]> {
	noStore();
	const supabase = await createClient();
	const res = await supabase
		.from('routers')
		.select(`id, nombre`)
		.order('nombre', { ascending: true });

	if (res.error) {
		throw new Error('Error al obtener los routers');
	}
	if (!res.data) {
		return [];
	}

	return res.data as unknown as DataSelectRouter[];
}

export async function fetchDataSelectSector(): Promise<DataSelectSector[]> {
	noStore();
	const supabase = await createClient();

	const res = await supabase
		.from('sectors')
		.select(`id, nombre_sector`)
		.order('nombre_sector', { ascending: true });

	if (res.error) {
		throw new Error('Error al obtener los sectores');
	}
	if (!res.data) {
		return [];
	}

	return res.data as unknown as DataSelectSector[];
}

export async function fetchDataSelectService(): Promise<DataSelectService[]> {
	noStore();
	const supabase = await createClient();
	const res = await supabase
		.from('services')
		.select(`id, nombre_service, tipo`)
		.order('tipo', { ascending: true });

	if (res.error) {
		throw new Error('Error al obtener los servicios');
	}
	if (!res.data) {
		return [];
	}

	return res.data as unknown as DataSelectService[];
}

export async function fetchDataSelectProfile() {
	noStore();
	const supabase = await createClient();
	const res = await supabase.from('profiles').select(`id, name`).order('name');

	if (res.error) {
		throw new Error('Error al obtener los perfiles');
	}
	if (!res.data) {
		return [];
	}

	return res.data as unknown as DataSelectProfile[];
}
