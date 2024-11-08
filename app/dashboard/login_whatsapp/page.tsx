'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { redirect } from 'next/navigation';
import { HOST_WS } from '@/ENV';

export default function Page() {
	const [qrCode, setQrCode] = useState('');
	const [loading, setLoading] = useState(true);
	const socket = io('http://localhost:3000/');

	socket.connect();

	useEffect(() => {
		socket.on('auth', () => {
			setQrCode('');
			setLoading(false);
			redirect('/dashboard/send_whatsapp');
		});
		socket.on('qr_code', (data) => {
			setQrCode(data.qr_code);
			setLoading(false);
		});

		fetch(`${HOST_WS}/api/v1/login_whatsapp`)
			.then((res) => res.json())
			.then((data) => {
				if (data === 'Authenticated') {
					redirect('/dashboard/send_whatsapp');
				}
			});
	}, [qrCode, socket]);

	return (
		<div>
			{loading && (
				<div className='absolute h-screen w-full top-0 left-0 flex items-center justify-center bg-black/50 p-8'>
					<p>Loading...</p>
				</div>
			)}
			{qrCode && (
				<div className='flex flex-col gap-4 items-center'>
					<p>QR Code:</p>
					<div className='w-96 h-96 bg-white rounded-lg flex items-center justify-center'>
						<QRCode value={qrCode} />
					</div>
				</div>
			)}
		</div>
	);
}
