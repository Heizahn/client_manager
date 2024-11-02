'use client';

import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

	return (
		<form action={dispatch} className='space-y-3 border-2 border-gray-400 rounded-lg'>
			<div className='flex-1 rounded-lg px-6 pb-4 pt-8'>
				<h1 className={`mb-3 text-2xl`}>Inicio de sesión</h1>
				<div className='w-full'>
					<div>
						<label
							className='mb-3 mt-5 block text-xs font-medium '
							htmlFor='email'
						>
							Correo
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-950 placeholder:text-gray-500'
								id='email'
								type='email'
								name='email'
								placeholder='Ingrese su correo'
								required
							/>
							<AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					<div className='mt-4'>
						<label
							className='mb-3 mt-5 block text-xs font-medium '
							htmlFor='password'
						>
							Contraseña
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-950 placeholder:text-gray-500'
								id='password'
								type='password'
								name='password'
								placeholder='Ingresa la contraseña'
								required
								minLength={6}
							/>
							<KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
				</div>
				<LoginButton />
				<div className='flex h-8 items-end space-x-1'>
					{/* Add form errors here */}
					<div
						className='flex h-8 items-end space-x-1'
						aria-live='polite'
						aria-atomic='true'
					>
						{errorMessage && (
							<>
								<ExclamationCircleIcon className='h-5 w-5 text-red-500' />
								<p className='text-sm text-red-500'>{errorMessage}</p>
							</>
						)}
					</div>
				</div>
			</div>
		</form>
	);
}

function LoginButton() {
	const { pending } = useFormStatus();

	if (pending) {
		setTimeout(() => {
			location.reload();
		}, 2000);
	}
	return (
		<button
			className='mt-4 w-full py-2 bg-blue-700 flex flex-row items-center justify-center rounded-md text-white hover:bg-blue-800'
			aria-disabled={pending}
		>
			<span>Iniciar Sesión</span>{' '}
			<ArrowRightIcon className='ml-3 h-5 w-5 text-gray-50' />
		</button>
	);
}
