'use client';

import { HOST_WS } from '@/ENV';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
	const [message, setMessage] = useState({
		phone_number: '',
		message_title: '',
		message_body: '',
	});
	const [sending, setSending] = useState(false);

	const router = useRouter();

	const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSending(true);

		try {
			const res = await fetch(`${HOST_WS}/api/v1/send_message`, {
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
			});
			const data = await res.json();

			if (res.status === 400) {
				toast.error(data.message);
				return;
			}
			if (res.status === 200) {
				toast.success(data.message);

				return;
			}
		} catch (err) {
			if (err instanceof Error) {
				if (err.message === 'Failed to fetch') {
					toast.error('Error al conectar con la API de Whatsapp');
					return;
				}
				toast.error(err.message);
			}
		} finally {
			setSending(false);
			setMessage({
				phone_number: '',
				message_title: '',
				message_body: '',
			});
		}
	};

	useEffect(() => {
		const isLoggedIn = async () => {
			try {
				const res = await fetch(`${HOST_WS}/api/v1/login_whatsapp`);

				if (res.status === 401) {
					toast.error('Whatsapp no está autenticado');
					router.push('/dashboard/login_whatsapp');
				}
			} catch (err) {
				if (err instanceof Error) {
					if (err.message === 'Failed to fetch') {
						toast.error('Error al conectar con la API de Whatsapp');
						return;
					}
					toast.error(err.message);
				}
			}
		};

		isLoggedIn();
	}, [router]);
	return (
		<div>
			<h2>Send Whatsapp</h2>

			<form
				onSubmit={handlerSubmit}
				className='flex flex-col gap-4 mx-auto w-96 text-black'
			>
				<input
					type='text'
					value={message.phone_number}
					name='phone_number'
					placeholder='Phone Number'
					onChange={(e) => setMessage({ ...message, phone_number: e.target.value })}
				/>

				<input
					type='text'
					value={message.message_title}
					name='message_title'
					placeholder='Title'
					onChange={(e) => setMessage({ ...message, message_title: e.target.value })}
				/>
				<input
					type='text'
					name='message_body'
					value={message.message_body}
					placeholder='Message'
					onChange={(e) => setMessage({ ...message, message_body: e.target.value })}
				/>
				<button
					disabled={sending}
					type='submit'
					className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
						sending ? 'cursor-not-allowed bg-blue-700' : ''
					}`}
				>
					Send
				</button>
			</form>
		</div>
	);
}
