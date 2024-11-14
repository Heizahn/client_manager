'use client';
import { useState } from 'react';
import NewClient from './newClient';
export default function ShowFormNewClient() {
	const [show, setShow] = useState(false);

	const handleClick = () => {
		setShow(!show);
	};
	return (
		<>
			<button
				onClick={handleClick}
				className='hover:underline hover:underline-offset-4 px-3 transition-all duration-300 ease-linear'
			>
				Nuevo Cliente
			</button>
			{show && <NewClient setShow={setShow} />}
		</>
	);
}
