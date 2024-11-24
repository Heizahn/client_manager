'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { schemaValidate, InitialValues, PaymentValues } from './schemaValidate';
import ButtonSubmit from '../buttonSubmit';
import { useEffect, useState } from 'react';
import { ClientPayment, DataSelectProfile } from '@/interfaces';
import { fetchDataSelectProfile } from '@/lib/fetchDataSystems';
import { toast } from 'react-toastify';
import { fetchClientPayment } from '@/lib/fetchData';
import { fetchClientPay } from '@/lib/payments_and_services/payments';
import SkeletonPay from './skeletonPay';
import montoPermitido from '@/lib/montoPermitido';
import { useRouter } from 'next/navigation';
import sendWhatsappPayment from '@/lib/send_whatsapp/sendWhatsapp';

export default function NewPay({
	user,
	clientId,
	setShow,
}: {
	user: { id: string; name: string };
	clientId: string;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [loading, setLoading] = useState(true);
	const [registerPay, setRegisterPay] = useState(false);
	const [profiles, setProfiles] = useState<DataSelectProfile[]>([]);
	const [client, setClient] = useState<ClientPayment | null>(null);
	const router = useRouter();

	useEffect(() => {
		fetchClientPayment(clientId)
			.then((res) => setClient(res))
			.catch((err) => toast.error(err.message));
		fetchDataSelectProfile()
			.then((res) => setProfiles(res))
			.catch((err) => toast.error(err.message))
			.finally(() => {
				setProfiles((prev) => prev.filter((profile) => profile.id !== user.id));
				setLoading(false);
			});
	}, [clientId, user.id]);
	return (
		<div className='absolute top-0 left-0 w-screen h-screen flex flex-col gap-4 items-center justify-center bg-black/50 z-20'>
			{loading ? (
				<SkeletonPay />
			) : (
				<Formik
					initialValues={{
						...InitialValues,
						recibido_por: user.id,
						motivo: client?.service_receivable?.[0]?.motivo || 'Abono',
						service_receivable_id: client?.service_receivable?.[0]?.id || '',
					}}
					onSubmit={(values: PaymentValues) => {
						setRegisterPay(true);
						fetchClientPay({
							client_id: clientId,
							created_by: user.id,
							monto_bs: Math.round(values.monto_bs * 100),
							monto_ref: Math.round(values.monto_ref * 100),
							referencia: values.referencia,
							service_receivable_id: values.service_receivable_id,
							tipo: values.tipo,
							recibido_por: values.recibido_por,
							motivo: values.motivo,
						})
							.then((res) => {
								router.refresh();
								toast.success(res);
							})
							.catch((err) => toast.error(err.message))
							.finally(() => {
								setShow(false);
								setRegisterPay(false);
								sendWhatsappPayment({
									client_id: clientId,
									monto_bs: Math.round(values.monto_bs * 100),
									monto_ref: Math.round(values.monto_ref * 100),
									reference: values.referencia,
									motivo: values.motivo,
								})
									.then((res) => {
										toast.success(res);
									})
									.catch((err) => toast.error(err.message));
							});
					}}
					validationSchema={schemaValidate}
				>
					{({ values }) => (
						<Form className='w-[420px] flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 pb-4'>
							<div className='flex flex-row items-center justify-end mt-2'>
								<button
									onClick={() => setShow(false)}
									className='py-1 px-2 flex flex-row items-center justify-center rounded-md text-white hover:bg-gray-800 transition-all duration-150 ease-linear'
								>
									X
								</button>
							</div>
							<div>
								<h3 className='text-xl font-bold text-center mb-1'>
									Datos del pago
								</h3>
								<h4 className='text-left text-base flex flex-col'>
									<strong>Cliente:</strong>{' '}
									<span className='text-balance'>
										{client?.nombre} {client?.identificacion}
									</span>
								</h4>
							</div>

							<div>
								<div className='flex flex-col gap-1 mt-3'>
									<h3 className='text-lg'>Moneda:</h3>
									<div className='grid grid-cols-2 gap-6'>
										<div
											className={`flex border-2 border-transparent px-1 hover:border-2 hover:border-blue-500 rounded-md ${
												values.moneda === 'REF'
													? 'border-blue-500'
													: ''
											}`}
										>
											<Field
												type='radio'
												name='moneda'
												value='REF'
												id='REF'
												className='w-6'
											/>
											<label htmlFor='REF' className='pl-6 w-full'>
												Dolares
											</label>
										</div>
										<div
											className={`flex border-2 border-transparent px-1  hover:border-2 hover:border-blue-500 rounded-md ${
												values.moneda === 'BS' ? 'border-blue-500' : ''
											}`}
										>
											<Field
												type='radio'
												name='moneda'
												value='BS'
												id='BS'
												className='w-6'
											/>
											<label htmlFor='BS' className='pl-6 w-full'>
												Bolivares
											</label>
										</div>
									</div>
								</div>

								<div className='flex flex-col gap-1 mb-3 mt-6'>
									<h3 className='text-lg'>
										Tipo de Pago:
										<span className='text-red-500 text-xs'>
											<ErrorMessage name='tipo' />
										</span>
									</h3>
									<div className='grid grid-cols-2 gap-6'>
										<div
											className={`flex border-2 border-transparent px-2 hover:border-2 hover:border-blue-500 rounded-md ${
												values.tipo === 'Efectivo'
													? 'border-blue-500'
													: ''
											}`}
										>
											<Field
												type='radio'
												name='tipo'
												value='Efectivo'
												id='Efectivo'
												className='w-6'
											/>
											<label htmlFor='Efectivo' className='pl-6 w-full'>
												Efectivo
											</label>
										</div>
										<div
											className={`flex border-2 border-transparent px-2  hover:border-2 hover:border-blue-500 rounded-md ${
												values.tipo === 'Digital'
													? 'border-blue-500'
													: ''
											}`}
										>
											<Field
												type='radio'
												name='tipo'
												value='Digital'
												id='Digital'
												className='w-6'
											/>
											<label htmlFor='Digital' className='pl-6 w-full'>
												Digital
											</label>
										</div>
									</div>
								</div>
							</div>

							<div className='mt-5'>
								<label htmlFor='motivo'>
									Motivo:{' '}
									<span className='text-red-500 text-xs'>
										<ErrorMessage name='motivo' />
									</span>
								</label>
								{client?.service_receivable &&
								client?.service_receivable.length > 0 ? (
									<Field
										as='select'
										className='mt-1 w-full rounded-md px-3 py-2 outline-2 outline-gray-600 text-gray-950'
										name='service_receivable_id'
										onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
											(values.motivo = client?.service_receivable?.find(
												(service) => service.id === e.target.value,
											)?.motivo as string)
										}
									>
										{client?.service_receivable.map((service) => (
											<option key={service.id} value={service.id}>
												{service.motivo}
											</option>
										))}
									</Field>
								) : (
									<Field
										type='text'
										name='motivo'
										value='Abono'
										placeholder='Motivo'
										className='w-full mt-1 rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									/>
								)}
							</div>

							<div className='mt-5'>
								<label htmlFor='recibido_por'>
									Recibido por:{' '}
									<span className='text-red-500 text-xs'>
										<ErrorMessage name='recibido_por' />
									</span>
								</label>
								<Field
									as='select'
									name='recibido_por'
									className='w-full rounded-md px-3 py-2 outline-2 outline-gray-600 text-gray-950'
								>
									<option value={user.id}>{user.name}</option>
									{profiles.length > 0 && (
										<>
											{profiles.map((profile) => (
												<option key={profile.id} value={profile.id}>
													{profile.name}
												</option>
											))}
										</>
									)}
								</Field>
							</div>
							<div className='grid grid-cols-2 gap-4 mt-5'>
								<div className='flex flex-col'>
									<label htmlFor='monto_ref'>
										Monto (REF):{' '}
										<span className='text-red-500 text-xs'>
											<ErrorMessage name='monto_ref' />
										</span>
									</label>
									<Field
										type='text'
										name='monto_ref'
										placeholder='25'
										onInput={montoPermitido}
										className='w-24 mt-1 rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									/>
								</div>
								{values.moneda === 'BS' && (
									<div className='flex flex-col'>
										<label htmlFor='monto_bs'>
											Monto (Bs):{' '}
											<span className='text-red-500 text-xs'>
												<ErrorMessage name='monto_bs' />
											</span>
										</label>
										<Field
											type='text'
											name='monto_bs'
											placeholder='1024'
											onInput={montoPermitido}
											className='w-24 mt-1 rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
										/>
									</div>
								)}
							</div>
							<div className='mt-5'>
								<label htmlFor='referencia'>
									Referencia:{' '}
									<span className='text-red-500 text-xs'>
										<ErrorMessage name='referencia' />
									</span>
								</label>
								<Field
									type='text'
									name='referencia'
									placeholder='Referencia'
									className='w-full mt-1 rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
								/>
							</div>
							<ButtonSubmit loading={loading || registerPay} className='mt-5'>
								Crear
							</ButtonSubmit>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
}
