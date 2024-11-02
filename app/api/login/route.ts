import { cookies } from 'next/headers';

export async function POST() {
	const cookiesStore = cookies();
	(await cookiesStore).set('session', 'Authenticated');
	return Response.json({ message: 'OK' });
}
