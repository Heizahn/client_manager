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
		<div className='flex flex-col w-80 mx-auto justify-center h-screen'>
			<Login />
		</div>
	);
}
