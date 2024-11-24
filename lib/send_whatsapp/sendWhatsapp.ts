'use server';
import { HOST_WS } from '@/ENV';
import { createClient } from '../supabase/client';
import { formatMoney } from '@/components/formatMoney';
interface WhatsappPayment {
	client_id: string;
	motivo: string;
	monto_ref: number;
	monto_bs: number;
	reference: string;
}

export default async function sendWhatsappPayment(values: WhatsappPayment) {
	const supabase = await createClient();

	const { data } = await supabase
		.from('clients')
		.select('telefono, nombre')
		.eq('id', values.client_id);

	if (data?.length === 0) {
		throw new Error('Client not found');
	}

	const client = data?.[0];
	console.log(client);
	const res = await fetch(`${HOST_WS}/api/v1/pay_notification`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			tlf: client?.telefono,
			client: client?.nombre,
			motivo: values.motivo,
			amountUSD: formatMoney(values.monto_ref),
			amountBs: values.monto_bs > 0 ? formatMoney(values.monto_bs) : null,
			reference: values.reference,
		}),
	});

	const dataRes = await res.json();

	if (res.status === 400) {
		throw new Error(dataRes.message);
	}
	if (res.status === 500) {
		throw new Error(dataRes.message);
	}

	return dataRes.message;
}
