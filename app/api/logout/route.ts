import { cookies } from 'next/headers';

export async function POST() {
	const cookiesStore = cookies();
	(await cookiesStore).delete('session');
	return Response.json({ message: 'OK' });
}
