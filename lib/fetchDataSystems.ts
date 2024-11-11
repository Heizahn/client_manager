'use server';
import type { Router, Sector } from '@/interfaces';
import { createClient } from './supabase/client';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

export async function fetchRouters(): Promise<Router[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('routers')
		.select('id, nombre, ip, sector, clientes, estado')
		.order('nombre');

	if (error) {
		console.log(error);
	}

	return data || [];
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
	const { error } = await supabase.from('sectors').insert({ nombre, estado: true });

	if (error) {
		return Error(error.message);
	}
	revalidatePath('/dashboard/sectors');
	return 'Sector creado exitosamente';
}
