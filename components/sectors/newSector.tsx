'use client';

import { fetchCreateSector } from '@/lib/fetchDataSystems';
import { useEffect, useState } from 'react';

export default function NewSector({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [nombre, setNombre] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchCreateSector(nombre)
			.then((res) => {
				if (res) {
					alert(res);
					setShow(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (nombre == '') {
			setError('*');
		} else {
			setError('');
		}
	}, [nombre]);
	return (
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 w-72 pb-8'
			>
				<div className='flex flex-row items-center justify-end mt-2'>
					<button
						onClick={() => setShow(false)}
						className='py-1 px-2 flex flex-row items-center justify-center rounded-md text-white hover:bg-gray-800 transition-all duration-150 ease-linear'
					>
						X
					</button>
				</div>
				<h3 className='text-2xl font-bold text-center mb-3'>Nuevo Sector</h3>
				<div className='flex flex-col gap-1 mb-3'>
					<label htmlFor='nombre'>
						Nombre: {error && <span className='text-red-500'>{error}</span>}
					</label>
					<input
						type='text'
						name='nombre'
						placeholder='Nombre'
						className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<button
					type='submit'
					disabled={error != ''}
					className={`mt-2 w-full py-1 bg-blue-700 flex flex-row items-center justify-center rounded-md text-white hover:bg-blue-800 transition-all duration-150 ease-linear ${
						error != '' ? 'opacity-50 bg-blue-950 hover:bg-blue-950' : ''
					}`}
				>
					Crear
				</button>
			</form>
		</div>
	);
}
