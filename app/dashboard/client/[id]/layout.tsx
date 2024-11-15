import { Metadata } from 'next';
import HeaderClient from '@/components/clientDetails/headerClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Detalles del Cliente',
};

export default function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	return (
		<>
			<Suspense fallback={<div>Loading feed...</div>}>
				<HeaderClient clientId={params.id} />
			</Suspense>
			{children}
		</>
	);
}
