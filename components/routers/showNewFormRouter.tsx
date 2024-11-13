'use client';

import { useState } from 'react';
import NewRouter from './newRouter';

export default function ShowNewFormRouter() {
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
				Nuevo Router
			</button>
			{show && <NewRouter setShow={setShow} />}
		</>
	);
}
