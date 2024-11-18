import { createClientExterno } from '../../supabase/clientExterno';

interface Values {
	clientId: string;
	motivo: string;
	monto: number;
	deuda: number;
}

export async function createInvoice({ clientId, motivo, monto, deuda }: Values) {
	const supabase = await createClientExterno();

	const res = await validatePrepayment(clientId, deuda);

	const { error } = await supabase.from('service_receivable').insert({
		client_id: clientId,
		motivo,
		monto,
		deuda: res,
	});

	if (error) {
		throw new Error('Error al crear la factura' + error.message);
	}

	return 'Orden de pago creada exitosamente';
}

export async function validatePrepayment(client_id: string, deuda: number): Promise<number> {
	const supabase = await createClientExterno();

	const { data, error } = await supabase
		.from('prepayments')
		.select('amount, client_id, pay_id')
		.eq('client_id', client_id);

	if (error) {
		throw new Error('Error al validar abonos' + error.message);
	}

	if (data.length === 0) {
		return deuda;
	}

	let prepayments_total = 0;
	let pay_id: string = data[0].pay_id;
	await supabase.from('prepayments').delete().eq('client_id', client_id);

	data.forEach(({ amount }) => {
		prepayments_total += amount;
	});

	const deudaActual = deuda + prepayments_total;

	console.log('Deuda actual', deudaActual);
	if (deudaActual <= 0) {
		return deudaActual;
	}

	await supabase.from('prepayments').insert({
		amount: deudaActual,
		client_id: client_id,
		pay_id,
	});

	return 0;
}
