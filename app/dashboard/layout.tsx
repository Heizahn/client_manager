import { ButtonLogout } from '@/components/Logout';
import NavLink from '@/components/NavLink';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
			<div className='w-full flex-none md:w-64'>
				<SideNav />
			</div>
			<div className='flex-grow p-6 pt-0 md:overflow-y-auto md:p12'>
				<div className='w-full pt-6'>{children}</div>
			</div>
		</div>
	);
}

function SideNav() {
	return (
		<div className='flex h-full flex-col px-3 py-4 md:px-2'>
			<Link
				href='/dashboard'
				className='mb-2 flex h-20 items-center justify-center rounded-md bg-gray-800 p-4 md:h-40'
			>
				<h1 className='text-white font-bold text-3xl'>Clientes LV</h1>
			</Link>
			<div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
				<NavLinks />
				{/* <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div> */}
				<div className='flex flex-col space-x-2'>
					<ButtonLogout />
				</div>
			</div>
		</div>
	);
}

function NavLinks() {
	return (
		<div className='flex flex-col space-y-2'>
			<NavLink href='/dashboard/clients' title='Clientes' name='clients' />
			<NavLink href='/dashboard/pays' title='Pagos' name='pays' />
			<NavLink href='/dashboard/send_whatsapp' title='Whatsapp' name='send_whatsapp' />
			<NavLink href='/dashboard/services' title='Servicios' name='services' />
			<NavLink href='/dashboard/sectors' title='Sectores' name='sectors' />
			<NavLink href='/dashboard/routers' title='Routers' name='routers' />
		</div>
	);
}
