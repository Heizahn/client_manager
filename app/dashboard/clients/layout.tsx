import NavFilter from '@/components/filters/navFilter';
import SkeletonNav from '@/components/navbarSkeleton';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex flex-col md:overflow-hidden '>
			<Suspense fallback={<SkeletonNav />}>
				<header className='flex flex-row justify-between items-center p-3 rounded-md bg-gray-800  sticky top-0 z-10'>
					<NavFilter />
				</header>
			</Suspense>
			{children}
		</main>
	);
}
