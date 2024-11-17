import Link from 'next/link';
import { ButtonLogout } from '@/components/Logout';
import NavLinks from './navLinks';
import { getUserName } from '@/lib/actions';

export default async function SideNav() {
	const user = await getUserName();

	return (
		<div className='flex h-full flex-col px-3 py-4 md:px-2'>
			<Link
				href='/dashboard'
				className='mb-2 flex h-20 justify-center rounded-md bg-gray-800 p-4 md:h-40'
			>
				<div className='flex flex-col justify-center'>
					<h1 className='text-white font-bold text-2xl tex'>Clientes LV</h1>

					{user?.name && <span className='text-white text-lg'>{user?.name} </span>}
				</div>
			</Link>
			<div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
				<NavLinks />
				{/* <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div> */}
				<div className=''>
					<ButtonLogout />
				</div>
			</div>
		</div>
	);
}
