'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from './supabase/server';

export async function login(formData: FormData) {
	const supabase = await createClient();
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.log(error);
	}

	revalidatePath('/dashboard');
	redirect('/dashboard');
}

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	revalidatePath('/login');
	redirect('/login');
}

export async function getUserName() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		console.log(error || 'No user found');
		return null;
	}

	const { id } = data.user;
	const { data: profileData } = await supabase.from('profiles').select('name').eq('id', id);

	const { name } = profileData![0];

	return name;
}

export async function getClientsForServiceReceivable() {
	const supabase = await createClient();
	const res = await supabase.from('clients').select('id, services(costo)');

	if (res.error) {
		console.log(res.error);
	}

	if (!res.data) {
		return [];
	}

	const clients = res.data;

	return clients.map((client) => {
		const { services } = client;
		const { costo } = services?.[0] || {};
		return {
			...client,
			monto: costo,
		};
	});
}

export async function createServiceReceivableAutomatic() {
	const clients = await getClientsForServiceReceivable();

	console.log(clients);
}
