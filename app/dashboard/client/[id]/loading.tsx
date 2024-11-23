import LoaderHeader from '@/components/clientDetails/loaderHeader';
import SkeletonDetail from '@/components/clientDetails/skeletonDetail';

export default function Loading() {
	return (
		<main className='flex flex-col md:overflow-hidden'>
			{/* Header */}
			<div className='mt-2 flex flex-row justify-center items-center py-2 rounded-md bg-gray-800'>
				<h2 className='text-center text-2xl font-bold'>Detalles del Cliente</h2>
			</div>
			<LoaderHeader />
			<SkeletonDetail />
		</main>
	);
}
