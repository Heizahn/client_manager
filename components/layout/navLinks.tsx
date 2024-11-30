import NavLink from '@/components/layout/NavLink';

export default function NavLinks() {
	return (
		<div className='flex flex-col space-y-2'>
			<NavLink href='/dashboard/clients' title='Clientes' name='clients' />
			<NavLink href='/dashboard/services' title='Servicios' name='services' />
			<NavLink href='/dashboard/sectors' title='Sectores' name='sectors' />
			<NavLink href='/dashboard/routers' title='Routers' name='routers' />
		</div>
	);
}
