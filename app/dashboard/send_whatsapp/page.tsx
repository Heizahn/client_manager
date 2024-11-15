'use client';

import { HOST_WS } from '@/ENV';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
	const [message, setMessage] = useState({
		phone_number: '',
		message_title: '',
		message_body: '',
	});

	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch(`${HOST_WS}/api/v1/send_message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: {
					tlf: message.phone_number,
					title: message.message_title,
					body: message.message_body,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				if (err.message === 'Failed to fetch') {
					toast.error('Error al conectar con la API de Whatsapp');
					return;
				}
				toast.error(err.message);
			});
	};

	useEffect(() => {
		fetch(`${HOST_WS}/api/v1/login_whatsapp`)
			.then((res) => res.json())
			.then((data) => {
				if (data !== 'Authenticated') {
					redirect('/dashboard/login_whatsapp');
				}
			})
			.catch((err) => {
				if (err.message === 'Failed to fetch') {
					toast.error('Error al conectar con la API de Whatsapp');
					return;
				}
				toast.error(err.message);
			});
	}, []);
	return (
		<div>
			<h2>Send Whatsapp</h2>

			<form
				onSubmit={handlerSubmit}
				className='flex flex-col gap-4 mx-auto w-96 text-black'
			>
				<input
					type='text'
					name='phone_number'
					placeholder='Phone Number'
					onChange={(e) => setMessage({ ...message, phone_number: e.target.value })}
				/>

				<input
					type='text'
					name='message_title'
					placeholder='Title'
					onChange={(e) => setMessage({ ...message, message_title: e.target.value })}
				/>
				<input
					type='text'
					name='message_body'
					placeholder='Message'
					onChange={(e) => setMessage({ ...message, message_body: e.target.value })}
				/>
				<button type='submit' className='bg-blue-700'>
					Send
				</button>
			</form>
		</div>
	);
}
