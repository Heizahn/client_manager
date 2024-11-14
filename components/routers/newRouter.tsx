'use client';
import { fetchCreateRouter, fetchSectorsCreateRouter } from '@/lib/fetchDataSystems';
import { schemaRouter } from './schemaRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { CreateRouterSchema } from '@/interfaces';

export default function NewRouter({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [sectors, setSectors] = useState<{ id: string; nombre: string }[]>([]);
	const handlerSubmit = (values: CreateRouterSchema) => {
		fetchCreateRouter({
			...values,
			ip: `${values.part1}.${values.part2}.${values.part3}.${values.part4}`,
		})
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
		fetchSectorsCreateRouter().then((res) => setSectors(res));
	}, []);

	return (
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
			<Formik
				initialValues={{
					nombre: '',
					sector: '',
					part1: '',
					part2: '',
					part3: '',
					part4: '',
				}}
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
							onInput={(e: any) =>
								// remover los espacios convertir a mayusculas y solo permitir caracteres alfanuméricos y pisos
								(e.target.value = e.target.value
									.toUpperCase()
									.replace(/[^A-Z0-9\_]/g, ''))
							}
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>

					<div className='flex flex-col gap-1 mb-3'>
						<label>
							IP:{' '}
							<span className='text-red-500'>
								<ErrorMessage name='ip' />
							</span>
						</label>
						<div className='flex items-end gap-0.5'>
							<div className='flex flex-col'>
								<span className='text-red-500'>
									<ErrorMessage name='part1' />
								</span>
								<Field
									name='part1'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='192'
									maxLength={3}
									minLength={1}
									id='part1'
									onInput={(e: any) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyDown={(e: any) => {
										if (
											e.key === '.' &&
											e.target.value.length >= e.target.minLength
										) {
											document.getElementById('part2')?.focus();
										} else if (e.key === '.' && e.target.value === '') {
											e.preventDefault();
										}
									}}
									onKeyUp={(e: any) => {
										if (e.target.value.length === 3) {
											e.preventDefault();
											document.getElementById('part2')?.focus();
										}
									}}
								/>
							</div>
							.
							<div className='flex flex-col'>
								<span className='text-red-500'>
									<ErrorMessage name='part2' />
								</span>
								<Field
									name='part2'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='168'
									maxLength={3}
									minLength={1}
									id='part2'
									onInput={(e: any) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyDown={(e: any) => {
										if (e.key === '.' && e.target.value.length >= 1) {
											document.getElementById('part3')?.focus();
										} else if (e.key === '.' && e.target.value === '') {
											e.preventDefault();
										}
									}}
									onKeyUp={(e: any) => {
										if (e.target.value.length >= 3) {
											document.getElementById('part3')?.focus();
										}
										if (e.key === 'Backspace' && e.target.value === '') {
											document.getElementById('part1')?.focus();
										}
									}}
								/>
							</div>
							.
							<div className='flex flex-col'>
								<span className='text-red-500'>
									<ErrorMessage name='part3' />
								</span>
								<Field
									name='part3'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='1'
									maxLength={3}
									minLength={1}
									id='part3'
									onInput={(e: any) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyDown={(e: any) => {
										if (
											e.key === '.' &&
											e.target.value.length >= e.target.minLength
										) {
											document.getElementById('part4')?.focus();
										} else if (e.key === '.' && e.target.value === '') {
											e.preventDefault();
										}
									}}
									onKeyUp={(e: any) => {
										if (e.target.value.length === 3) {
											e.preventDefault();
											document.getElementById('part4')?.focus();
										}
										if (e.key === 'Backspace' && e.target.value === '') {
											document.getElementById('part2')?.focus();
										}
									}}
								/>
							</div>
							.
							<div className='flex flex-col'>
								<span className='text-red-500'>
									<ErrorMessage name='part4' />
								</span>
								<Field
									name='part4'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='1'
									maxLength={3}
									minLength={1}
									id='part4'
									onInput={(e: any) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyUp={(e: any) => {
										if (e.key === 'Backspace' && e.target.value === '') {
											document.getElementById('part3')?.focus();
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='sector'>
							Sector:{' '}
							<span className='text-red-500'>
								<ErrorMessage name='sector' />
							</span>
						</label>
						<Field
							as='select'
							name='sector'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						>
							<option value=''>Seleccione...</option>
							{sectors.map((sector) => (
								<option key={sector.id} value={sector.id}>
									{sector.nombre}
								</option>
							))}
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
