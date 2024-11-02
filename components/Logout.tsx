import { logout } from '@/lib/actions';

export function ButtonLogout() {
	return (
		<form className='flex flex-col space-x-2'>
			<button
				formAction={logout}
				className='flex h-12 items-center justify-center rounded-md bg-red-600 px-4 text-white hover:bg-red-700'
			>
				Logout
			</button>
		</form>
	);
}
