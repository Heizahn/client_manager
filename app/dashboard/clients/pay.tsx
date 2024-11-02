'use client';
import { useState } from 'react';

interface Props {
	client: {
		nombre: string;
		phone_number: string;
	};
}

interface Payment {
	tlf: string;
	client: string;
	amountUSD: number;
	amountBs?: number;
	reference: string;
}

export default function ShowPayment({ client }: Props) {
	const [loading, setLoading] = useState(false);
	const [showPayment, setShowPayment] = useState(false);
	const [pay, setPay] = useState({
		phone_number: client.phone_number,
		client: client.nombre,
		amountUSD: 0,
		amountBs: 0,
		reference: '',
	});

	const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setShowPayment(false);

		const paySend: Payment = {
			tlf: pay.phone_number,
			client: pay.client,
			amountUSD: pay.amountUSD,
			amountBs: pay.amountBs,
			reference: pay.reference,
		};
		const res = await fetch('http://localhost:3000/api/v1/pay_notification', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				payment: paySend,
			}),
		});

		if (res.ok) {
			setPay({
				phone_number: client.phone_number,
				client: client.nombre,
				amountUSD: 0,
				amountBs: 0,
				reference: '',
			});
			setLoading(false);
		} else {
			setLoading(false);
			console.log('Error', res);
		}
	};
	return (
		<>
			<button onClick={() => setShowPayment(true)}>Pay</button>
			{showPayment && (
				<div className='flex items-center absolute top-0 left-0 w-full h-full bg-black/20 p-8 rounded-lg'>
					<div className='w-96 rounded-lg flex flex-col gap-4 justify-center mx-auto border-white/20 border-2 p-8'>
						<div className='flex flex-row items-center  justify-between'>
							<p>Payment for {client.nombre}</p>
							<button
								onClick={() => setShowPayment(false)}
								className='hover:text-red-600'
							>
								X
							</button>
						</div>
						<form
							onSubmit={handlePayment}
							className='flex flex-col gap-4 text-black'
						>
							<input
								type='number'
								name='amountUSD'
								min={0}
								step={0.01}
								placeholder='Amount USD'
								onChange={(e) =>
									setPay({ ...pay, amountUSD: Number(e.target.value) })
								}
							/>
							<input
								type='number'
								name='amountBs'
								min={0}
								step={0.01}
								placeholder='Amount Bs'
								onChange={(e) =>
									setPay({ ...pay, amountBs: Number(e.target.value) })
								}
							/>
							<input
								type='text'
								name='reference'
								placeholder='Reference'
								onChange={(e) => setPay({ ...pay, reference: e.target.value })}
							/>
							<div className='flex gap-4 items-center justify-end text-white'>
								<button
									className='hover:underline'
									onClick={() => setShowPayment(false)}
								>
									Cancelar
								</button>
								<button type='submit' className='bg-blue-700 px-6 rounded-md '>
									Pay
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{loading && (
				<div className='flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/50 p-8 rounded-lg'>
					Loading...
				</div>
			)}
		</>
	);
}
