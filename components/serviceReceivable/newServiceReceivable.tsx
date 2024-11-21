'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InitialValues, schemaValidate } from './schemaValidate';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ButtonSubmit from '../buttonSubmit';
import montoPermitido from '@/lib/montoPermitido';
import { createInvoice } from '@/lib/payments_and_services/invoices/createInvoice';
import { useRouter } from 'next/navigation';

export default function NewServiceReceivable({
	clientId,
	setShow,
}: {
	clientId: string;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleSubmit = (values: { motivo: string; monto: number }) => {
		setLoading(true);

		createInvoice({
			clientId: clientId,
			motivo: values.motivo,
			monto: Math.round(values.monto * 100),
			deuda: -Math.round(values.monto * 100),
		})
			.then((res) => {
				if (res) {
					router.refresh();
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
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-20'>
			<Formik
				initialValues={InitialValues}
				onSubmit={handleSubmit}
				validationSchema={schemaValidate}
			>
				<Form className='flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 pb-8'>
					<div className='flex flex-row items-center justify-end mt-2'>
						<button
							onClick={() => setShow(false)}
							className='py-1 px-2 flex flex-row items-center justify-center rounded-md text-white hover:bg-gray-800 transition-all duration-150 ease-linear'
						>
							X
						</button>
					</div>
					<h3 className='text-2xl font-bold text-center mb-3'>
						Nueva cuenta por cobrar
					</h3>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='motivo'>
							Motivo:{' '}
							<span className='text-red-500 text-xs'>
								<ErrorMessage name='motivo' />
							</span>
						</label>
						<Field
							type='text'
							name='motivo'
							placeholder='Algún motivo para la cuenta'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='monto'>
							Monto:{' '}
							<span className='text-red-500 text-xs'>
								<ErrorMessage name='monto' />
							</span>
						</label>
						<Field
							type='text'
							name='monto'
							placeholder='25'
							className='w-16 rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							onInput={montoPermitido}
						/>
					</div>
					<ButtonSubmit loading={loading} className='mt-5'>
						Crear
					</ButtonSubmit>
				</Form>
			</Formik>
		</div>
	);
}
