'use client';

import { useState } from 'react';

export default function NewService({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [errors, setErrors] = useState({
		nombre: '',
	});

	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShow(false);
	};
	return (
		<>
			<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
				<form
					onSubmit={handlerSubmit}
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
					<h3 className='text-2xl font-bold text-center mb-3'>Nuevo Servicio</h3>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='nombre'>Nombre:</label>
						<input
							type='text'
							name='nombre'
							placeholder='Nombre'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>
					<button
						type='submit'
						disabled={errors.nombre != ''}
						className={`mt-2 w-full py-1 bg-blue-700 flex flex-row items-center justify-center rounded-md text-white hover:bg-blue-800 transition-all duration-150 ease-linear ${
							errors.nombre != ''
								? 'opacity-50 bg-blue-950 hover:bg-blue-950'
								: ''
						}`}
					>
						Crear
					</button>
				</form>
			</div>
		</>
	);
}
