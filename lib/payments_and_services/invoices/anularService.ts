import { createClient } from '../../supabase/client';

export async function anularService(service_id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('service_receivable')
		.select('payment_id, deuda, monto')
		.eq('id', service_id);

	if (error) {
		throw new Error('Error al anular el servicio' + error.message);
	}

	if (data.length === 0) {
		throw new Error('No se pudo encontrar el servicio');
	}

	const { data: paymentData, error: paymentError } = await supabase
		.from('payments')
		.select('id')
		.eq('service_receivable_id', service_id);

	if (paymentError) {
		throw new Error('Error al anular el servicio' + paymentError.message);
	}

	if (!(paymentData.length === 0)) {
		const { data: dataPrepayment } = await supabase
			.from('prepayments')
			.select('amount')
			.eq('pay_id', paymentData?.[0].id);

		let amount = 0;

		if (!(dataPrepayment?.length === 0)) {
			amount = dataPrepayment?.[0].amount;
		}

		let devolution = data[0].deuda + (data[0].monto + amount);
		await supabase.from('prepayments').delete().eq('pay_id', paymentData?.[0].id);

		if (devolution > 0) {
			data[0].payment_id.forEach(async (payment_id: string) => {
				const { data } = await supabase
					.from('payments')
					.select('monto_ref, client_id')
					.eq('id', payment_id);

				if (devolution > data?.[0].monto_ref) {
					devolution -= data?.[0].monto_ref;
					await supabase.from('prepayments').insert({
						amount: data?.[0].monto_ref,
						client_id: data?.[0].client_id,
						pay_id: payment_id,
					});
				} else if (devolution > 0) {
					await supabase.from('prepayments').insert({
						amount: devolution,
						client_id: data?.[0].client_id,
						pay_id: payment_id,
					});
				}
			});
		}
	}
	await supabase.from('service_receivable').update({ estado: false }).eq('id', service_id);

	return 'Servicio anulado exitosamente';
}
