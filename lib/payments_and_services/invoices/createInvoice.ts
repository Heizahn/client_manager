import { createClientExterno } from '../../supabase/clientExterno';

interface Values {
	clientId: string;
	motivo: string;
	monto: number;
	deuda: number;
}

export async function createInvoice({ clientId, motivo, monto, deuda }: Values) {
	const supabase = await createClientExterno();

	const { error } = await supabase.from('service_receivable').insert({
		cliente: clientId,
		motivo,
		monto,
		deuda,
	});

	if (error) {
		throw new Error(error.message);
	}

	return 'Invoice created successfully';
}
