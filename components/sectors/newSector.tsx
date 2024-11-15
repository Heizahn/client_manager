'use client';

import { fetchCreateSector } from '@/lib/fetchDataSystems';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InitialValues, schemaValidate } from './schemaValidate';
import { toast } from 'react-toastify';
import { useState } from 'react';
export default function NewSector({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [loading, setLoading] = useState(false);
	const handleSubmit = (value: { nombre: string }) => {
		setLoading(true);
		fetchCreateSector(value.nombre)
			.then((res) => {
				if (res) {
					toast.success('Sector creado exitosamente');
					setShow(false);
				}
			})
			.catch(() => {
				toast.error('Error al crear el sector');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
			<Formik
				initialValues={InitialValues}
				onSubmit={handleSubmit}
				validationSchema={schemaValidate}
			>
				<Form className='flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 w-72 pb-8'>
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
							Nombre:{' '}
							<span className='text-red-500'>
								<ErrorMessage name='nombre' />
							</span>
						</label>
						<Field
							type='text'
							name='nombre'
							id='nombre'
							placeholder='Nombre'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className={`mt-2 w-full py-1 bg-blue-700 flex flex-row items-center justify-center rounded-md text-white hover:bg-blue-800 transition-all duration-150 ease-linear ${
							loading ? 'opacity-50 bg-blue-950 hover:bg-blue-950' : ''
						}`}
					>
						Crear
					</button>
				</Form>
			</Formik>
		</div>
	);
}
