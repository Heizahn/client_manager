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

export async function getUserName(): Promise<{ id: string; name: string } | null> {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		console.log(error || 'No user found');
		return null;
	}

	const { id } = data.user;
	const { data: profileData } = await supabase.from('profiles').select('name').eq('id', id);

	const { name } = profileData![0];

	return { id, name } as { id: string; name: string };
}
