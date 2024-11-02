import { type NextRequest } from 'next/server';
import { UpdateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
	return await UpdateSession(request);
}

export const config = {
	matcher: '/dashboard/:path*',
};
