'use client';

import { useEffect, useState } from 'react';
import NewPay from './newPay';
import { getUserName } from '@/lib/actions';

export default function ShowFormPay({ clientId }: { clientId: string }) {
	const [show, setShow] = useState(false);
	const [user, setUser] = useState({ id: '', name: '' });

	const handleClick = () => {
		setShow(!show);
	};

	useEffect(() => {
		setShow(false);
		getUserName().then((res) =>
			setUser({ id: res?.id as string, name: res?.name as string }),
		);
	}, [clientId]);
	return (
		<>
			<button
				onClick={handleClick}
				className='hover:underline hover:underline-offset-4 px-3 transition-all duration-300 ease-linear'
			>
				Nuevo Pago
			</button>
			{show && <NewPay user={user} clientId={clientId} setShow={setShow} />}
		</>
	);
}
