'use client';

import { useEffect, useState } from 'react';
import NewPay from './newPay';
import { getUserName } from '@/lib/actions';

export default function ShowFormPay({
	title,
	clientId,
}: {
	clientId: string;
	title: React.ReactNode;
}) {
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
			<button onClick={handleClick}>{title}</button>
			{show && <NewPay user={user} clientId={clientId} setShow={setShow} />}
		</>
	);
}
