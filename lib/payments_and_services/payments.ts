import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '../supabase/client';
import { PayValues } from '@/interfaces';

interface PrePayment {
	amount: number;
	client_id: string;
	pay_id: string;
}

async function createPrepayment(valuesPrePay: PrePayment) {
	const supabase = await createClient();
	const { error } = await supabase.from('prepayments').insert({
		...valuesPrePay,
	});

	if (error) {
		await supabase.from('payments').delete().eq('id', valuesPrePay.pay_id);
		throw new Error(error.message);
	}

	return 'Abono creado exitosamente';
}

export async function ExecutePrepayment() {
	noStore();
	const supabase = await createClient();

	interface Data {
		id: string;
		monto_ref: number;
		cliente: string;
	}

	const { data } = await supabase
		.from('payments')
		.select('id, monto_ref, cliente')
		.order('created_at', { ascending: false })
		.limit(1);

	const { id, monto_ref, cliente } = data?.[0] as Data;

	const res = await createPrepayment({
		amount: monto_ref,
		client_id: cliente,
		pay_id: id,
	});

	return res;
}

export async function fetchClientPay(values: PayValues) {
	noStore();
	const supabase = await createClient();

	const { error: errorInsert } = await supabase.from('payments').insert({
		...values,
		service_receivable_id: values.service_receivable_id || null,
	});
	if (errorInsert) {
		throw new Error(errorInsert.message);
	}

	if (!values.service_receivable_id) {
		const res = await ExecutePrepayment();
		return res;
	}

	return 'Pago creado exitosamente';
}
