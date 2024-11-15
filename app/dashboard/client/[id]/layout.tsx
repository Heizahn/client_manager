import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Detalles del Cliente',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
