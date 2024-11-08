import SideNav from '@/components/sideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
			<div className='w-full flex-none md:w-64'>
				<SideNav />
			</div>
			<div className='flex-grow pl-1 pr-3 pt-0 md:overflow-y-auto '>
				<div className='w-full pt-2'>{children}</div>
			</div>
		</div>
	);
}
