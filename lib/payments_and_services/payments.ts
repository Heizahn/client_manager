import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '../supabase/client';
import { LastPayment, PayValues, PrePayment } from '@/interfaces';

async function createPrepayment(valuesPrePay: PrePayment) {
	const supabase = await createClient();
	const { error } = await supabase.from('prepayments').insert({
		...valuesPrePay,
	});

	if (error) {
		await supabase.from('payments').delete().eq('id', valuesPrePay.pay_id);
		throw new Error('Error al crear abono' + error.message);
	}

	return 'Abono creado exitosamente';
}

export async function ExecutePrepayment() {
	noStore();
	const supabase = await createClient();

	const { data } = await supabase
		.from('payments')
		.select('id, monto_ref, client_id')
		.order('created_at', { ascending: false })
		.limit(1);

	const { id, monto_ref, client_id } = data?.[0] as LastPayment;

	const res = await createPrepayment({
		amount: monto_ref,
		client_id: client_id,
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
		throw new Error('Error al insertar pago ' + errorInsert.message);
	}

	if (!values.service_receivable_id) {
		const res = await ExecutePrepayment();
		return res;
	}

	await validatePaymentService({
		client_id: values.client_id,
		service_receivable_id: values.service_receivable_id,
		monto_ref: values.monto_ref,
	});

	return 'Pago creado exitosamente';
}

interface ValidatePaymentService {
	client_id: string;
	service_receivable_id: string;
	monto_ref: number;
}

export async function validatePaymentService(values: ValidatePaymentService) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('payments')
		.select('id, service_receivable_id, client_id, monto_ref')
		.eq('service_receivable_id', values.service_receivable_id);

	if (error) {
		throw new Error('Error al validar pago de factura ' + error.message);
	}

	if (data.length === 0) {
		throw new Error('No se encontró el pago de la factura');
	}

	const { id, service_receivable_id, client_id, monto_ref } = data[0];

	await serviceReceivablePaid({
		client_id,
		service_receivable_id,
		monto_ref,
		pay_id: id,
	});
}

export async function serviceReceivablePaid(values: {
	client_id: string;
	service_receivable_id: string;
	monto_ref: number;
	pay_id: string;
}): Promise<void> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('service_receivable')
		.select('client_id, deuda')
		.eq('id', values.service_receivable_id);

	if (error) {
		throw new Error('Error al actualizar factura ' + error.message);
	}

	if (data.length === 0) {
		throw new Error('No se encontró la factura');
	}

	const { client_id, deuda } = data[0];

	const deudaActual = Math.round(deuda + values.monto_ref);

	if (deudaActual <= 0) {
		await supabase
			.from('service_receivable')
			.update({ deuda: deudaActual })
			.eq('id', values.service_receivable_id);
	}

	if (deudaActual > 0) {
		await supabase
			.from('service_receivable')
			.update({ deuda: 0 })
			.eq('id', values.service_receivable_id);

		const other_service_receivable = await otherServiceReceivablePaid(client_id);

		if (other_service_receivable.length === 0) {
			await createPrepayment({
				amount: deudaActual,
				client_id,
				pay_id: values.pay_id,
			});

			return;
		}

		await serviceReceivablePaid({
			client_id,
			service_receivable_id: other_service_receivable?.[0]?.id,
			monto_ref: deudaActual,
			pay_id: values.pay_id,
		});
	}
}

export async function otherServiceReceivablePaid(client_id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('service_receivable')
		.select('id, client_id, deuda')
		.eq('client_id', client_id)
		.lt('deuda', 0)
		.order('created_at', { ascending: true })
		.limit(1);

	if (error) {
		throw new Error('Error al obtener factura ' + error.message);
	}

	return data;
}
