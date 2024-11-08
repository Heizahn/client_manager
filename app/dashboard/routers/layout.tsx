export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-row justify-center items-center py-2 rounded-md bg-gray-800  mt-2'>
				<h2 className='text-center text-2xl font-bold'>Routers</h2>
			</div>
			{children}
		</>
	);
}
