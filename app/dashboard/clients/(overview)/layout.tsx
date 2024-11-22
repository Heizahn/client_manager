import NavFilter from '@/components/filters/navFilter';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex flex-col md:overflow-hidden mt-2'>
			<header className='flex flex-row justify-between items-center p-3 rounded-md bg-gray-800  sticky top-0 z-10'>
				<NavFilter />
			</header>
			{children}
		</main>
	);
}
