'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';
import { HOST_WS } from '@/ENV';

export default function Page() {
	const [qrCode, setQrCode] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const socket = io(HOST_WS);
	const router = useRouter();

	const redirect = (path: string) => {
		router.push(path);
	};

	socket.connect();

	useEffect(() => {
		socket.on('auth', (data) => {
			setQrCode('');
			setMessage(data.message);
			setLoading(false);
			socket.disconnect();
		});
		socket.on('qr_code', (data) => {
			setMessage('');
			setQrCode(data.qr_code);
			setLoading(false);
		});

		fetch(`${HOST_WS}/api/v1/login_whatsapp`)
			.then((res) => res.json())
			.then((data) => {
				if (data === 'Authenticated') {
					redirect('/dashboard/send_whatsapp');
					setMessage(data);
					setLoading(false);
					socket.disconnect();
				}
			});
	}, [qrCode, message, socket]);

	return (
		<div>
			<h2>Login Whatsapp</h2>
			{loading && <p>Loading...</p>}
			{qrCode && (
				<div className='flex flex-col gap-4 items-center'>
					<p>QR Code:</p>
					<div className='w-96 h-96 bg-white rounded-lg flex items-center justify-center'>
						<QRCode value={qrCode} />
					</div>
				</div>
			)}
			{message && <p>Connection: {message}</p>}
		</div>
	);
}
