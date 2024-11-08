import type { ClientDetails } from '@/interfaces';

export default function ClientDetails({
	client,
	showSection,
}: {
	client: ClientDetails | null;
	showSection: boolean;
}) {
	if (!client) {
		return;
	}
	return (
		showSection && (
			<div className='flex flex-col gap-4 items-center'>
				coming soon
				<div className='flex flex-row gap-4 items-center justify-between px-4 py-2'>
					<div className='flex flex-col'>{client.nombre}</div>
				</div>
			</div>
		)
	);
}
