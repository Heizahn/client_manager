'use client';

export function ButtonLogout() {
	const handlerLogout = () => {
		fetch('/api/logout', {
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'OK') {
					window.location.reload();
				}
			});
	};

	return (
		<button
			type='button'
			onClick={handlerLogout}
			className='flex h-12 items-center justify-center rounded-md bg-red-600 px-4 text-white hover:bg-red-700'
		>
			Logout
		</button>
	);
}
