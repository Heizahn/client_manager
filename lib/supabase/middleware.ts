import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function UpdateSession(request: NextRequest) {
	const supabaseResponse = NextResponse.next({
		request,
	});

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing environment variables');
	}

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options),
				);
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return NextResponse.redirect(new URL('/login', request.url));

	return supabaseResponse;
}
