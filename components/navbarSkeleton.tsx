const SkeletonFilterStatusClient = () => (
	<div className='flex items-center gap-2 animate-pulse'>
		<div className='h-4 w-16 bg-gray-300 rounded'></div> {/* Placeholder para el título */}
		<div className='h-6 w-6 bg-gray-300 rounded-full'></div>{' '}
		{/* Placeholder para el contador */}
	</div>
);

const SkeletonNav = () => (
	<nav className='flex flex-row gap-4'>
		{/* Repite el Skeleton para simular los diferentes filtros */}
		<SkeletonFilterStatusClient />
		<SkeletonFilterStatusClient />
		<SkeletonFilterStatusClient />
		<SkeletonFilterStatusClient />
	</nav>
);

export default SkeletonNav;
