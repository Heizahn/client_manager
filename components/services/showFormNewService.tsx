'use client';
import { useState } from 'react';
import NewService from './newService';
export default function ShowFormNewSector() {
	const [show, setShow] = useState(false);

	const handleClick = () => {
		setShow(!show);
	};
	return (
		<>
			<button
				onClick={handleClick}
				className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'
			>
				Nuevo Servicio
			</button>
			{show && <NewService setShow={setShow} />}
		</>
	);
}
