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
		deuda: res.deuda,
		payment_id: res.pay_id,
	});

	const { data } = await supabase
		.from('service_receivable')
		.select('id')
		.eq('client_id', clientId)
		.order('created_at', { ascending: false })
		.limit(1);

	if (data?.length === 0) {
		throw new Error('No se pudo crear la factura');
	}

	res.pay_id.forEach(async (pay_id: string) => {
		await supabase
			.from('payments')
			.update({ service_receivable_id: data?.[0].id })
			.eq('id', pay_id);
	});

	if (error) {
		throw new Error('Error al crear la factura' + error.message);
	}

	return 'Orden de pago creada exitosamente';
}

export async function validatePrepayment(
	client_id: string,
	deuda: number,
): Promise<{ pay_id: string[]; deuda: number }> {
	const supabase = await createClientExterno();

	const { data, error } = await supabase
		.from('prepayments')
		.select('amount, client_id, pay_id')
		.eq('client_id', client_id);

	if (error) {
		throw new Error('Error al validar abonos' + error.message);
	}

	if (data.length === 0) {
		return {
			pay_id: [],
			deuda,
		};
	}

	let prepayments_total = 0;
	let id_pays: string[] = [];
	const pay_id: string = data[0].pay_id;

	data.forEach(({ pay_id, amount }) => {
		prepayments_total += amount;
		id_pays.push(pay_id);
	});

	const deudaActual = deuda + prepayments_total;

	await supabase.from('prepayments').delete().eq('client_id', client_id);
	if (deudaActual <= 0) {
		return {
			pay_id: id_pays,
			deuda: deudaActual,
		};
	}

	await supabase.from('prepayments').insert({
		amount: deudaActual,
		client_id: client_id,
		pay_id,
	});

	return {
		pay_id: id_pays,
		deuda: 0,
	};
}
