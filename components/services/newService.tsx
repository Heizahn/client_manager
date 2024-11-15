'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { schemaValidate } from './schemaValidate';
import { CreateService } from '@/interfaces';
import { fetchCreateService } from '@/lib/fetchDataSystems';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ButtonSubmit from '../buttonSubmit';

export default function NewService({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [loading, setLoading] = useState(false);
	const [loadService, setLoadService] = useState(false);

	const handlerSubmit = (values: CreateService) => {
		setLoading(true);
		fetchCreateService(values)
			.then((res) => {
				if (typeof res === 'string') {
					toast.success(res);
					setShow(false);
				}
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
				<Formik
					initialValues={{ nombre: '', tipo: '', costo: 0 }}
					onSubmit={handlerSubmit}
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
						<h3 className='text-2xl font-bold text-center mb-3'>Nuevo Servicio</h3>
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
								placeholder='Nombre'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							/>
						</div>
						<div className='flex flex-col gap-1 mb-3'>
							<label htmlFor='tipo'>
								Tipo:{' '}
								<span className='text-red-500'>
									<ErrorMessage name='tipo' />
								</span>
							</label>
							<Field
								as='select'
								name='tipo'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							>
								<option value=''>Seleccione...</option>
								<option value='Fibra Óptica'>Fibra Óptica</option>
								<option value='Inalámbrico'>Inalámbrico</option>
							</Field>
						</div>
						<div className='flex flex-col gap-1 mb-3'>
							<label htmlFor='costo'>
								Costo:{' '}
								<span className='text-red-500'>
									<ErrorMessage name='costo' />
								</span>
							</label>
							<Field
								type='number'
								name='costo'
								placeholder='30'
								step={1}
								min={0}
								max={30}
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							/>
						</div>
						<ButtonSubmit loading={loading}>Crear</ButtonSubmit>
					</Form>
				</Formik>
			</div>
		</>
	);
}
