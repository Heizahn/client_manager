'use client';
import { Client } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function ClientDetails({ client }: { client: Client }) {
	const router = useRouter();
	const handleClick = (id: string) => {
		router.push(`/dashboard/client/${id}`);
	};
	return (
		<div className='flex flex-col gap-4 items-center'>
			<div className='flex flex-row items-center justify-between'>
				<p>Cliente: {client.nombre}</p>
				<button
					onClick={() => handleClick(client.id)}
					className='hover:underline hover:underline-offset-2'
				>
					X
				</button>
			</div>
			<div className='flex flex-row justify-between items-center'>
				<p>Identificacion: {client.identificacion}</p>
				<p>Telefono: {client.telefono}</p>
			</div>
			<div className='flex flex-row justify-between items-center'>
				<p>Sector: {client.sector}</p>
				<p>IPV4: {client.ipv4}</p>
			</div>
			<div className='flex flex-row justify-between items-center'>
				<p>Plan: {client.plan}</p>
				<p>Saldo: {client.saldo.toFixed(2)}</p>
			</div>
			<div className='flex flex-row justify-between items-center'>
				<p>Estado: {client.estado}</p>
			</div>
		</div>
	);
}
