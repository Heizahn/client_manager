import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const cookiesStore = await cookies();
	const session = cookiesStore.get('session');

	if (!session) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: '/dashboard/:path*',
};
