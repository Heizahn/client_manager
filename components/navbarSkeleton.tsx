const SkeletonFilterStatusClient = () => (
	<div className='flex items-center gap-1 animate-pulse'>
		<div className='h-4 w-14 bg-gray-300 rounded'></div> {/* Placeholder para el título */}
		<div className='h-4 w-3 bg-gray-300 rounded-full'></div>{' '}
		{/* Placeholder para el contador */}
	</div>
);

const SkeletonNav = () => (
	<nav className='flex flex-row gap-4 px-4 py-4 mt-2 bg-gray-800 rounded-md'>
		{/* Repite el Skeleton para simular los diferentes filtros */}
		<SkeletonFilterStatusClient />
		<SkeletonFilterStatusClient />
		<SkeletonFilterStatusClient />
		<SkeletonFilterStatusClient />
	</nav>
);

export default SkeletonNav;
