'use client';
import { schemaRouter } from './schemaRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function NewRouter({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const handlerSubmit = (values: any) => {
		console.log(values);
		setShow(false);
	};

	return (
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
			<Formik
				initialValues={{ nombre: '', ip: '', sector: '' }}
				onSubmit={handlerSubmit}
				validationSchema={schemaRouter}
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
					<h3 className='text-2xl font-bold text-center mb-3'>Nuevo Router</h3>
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
							placeholder='RB_VEGAS'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>

					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='ip'>
							IP:{' '}
							<span className='text-red-500'>
								<ErrorMessage name='ip' />
							</span>
						</label>
						<Field
							type='text'
							name='ip'
							placeholder='192.168.1.1'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='ip'>
							Sector:{' '}
							<span className='text-red-500'>
								<ErrorMessage name='ip' />
							</span>
						</label>
						<Field
							as='select'
							name='ip'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							value=''
						>
							<option value=''>Seleccione...</option>
							<option value='Fibra Óptica'>Fibra Óptica</option>
							<option value='Inalámbrico'>Inalámbrico</option>
						</Field>
					</div>
					<button
						type='submit'
						className='mt-2 w-full py-1 bg-blue-700 flex flex-row items-center justify-center rounded-md text-white hover:bg-blue-800 transition-all duration-150 ease-linear'
					>
						Crear
					</button>
				</Form>
			</Formik>
		</div>
	);
}
