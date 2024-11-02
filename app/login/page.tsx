import Login from '@/components/login';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Page() {
	const cookiesStore = await cookies();
	const session = cookiesStore.get('session');

	if (session) {
		redirect('/dashboard');
	}
	return (
		<div>
			<h2>Login</h2>
			<p>Login</p>
			<Login />
		</div>
	);
}
