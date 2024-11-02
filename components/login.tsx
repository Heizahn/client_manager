'use client';
export default function Login() {
	const handlerLogin = () => {
		fetch('/api/login', {
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
			onClick={handlerLogin}
			className='bg-blue-700 px-6 py-2 rounded-md text-white hover:bg-blue-800'
		>
			Log in
		</button>
	);
}
