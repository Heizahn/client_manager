'use server';
import { createClient } from '../supabase/client';
import { formatMoney } from '@/components/formatMoney';
import twilio from 'twilio';

interface WhatsappPayment {
	client_id: string;
	motivo: string;
	monto_ref: number;
	monto_bs: number;
	reference: string;
}

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_ID;
const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

if (!accountSid || !authToken) {
	throw new Error('No se encontró credenciales de Twilio');
}

const clientWhatsapp = twilio(accountSid, authToken);

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
	await sendWhatsappMessage({
		tlf: client?.telefono,
		client: client?.nombre,
		motivo: values.motivo,
		mount_ref: values.monto_ref,
		mount_bs: values.monto_bs,
		reference: values.reference,
	});
	try {
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		throw new Error('Error al enviar mensaje del pago');
	}

	return 'Mensaje enviado exitosamente';
}

async function sendWhatsappMessage(values: {
	tlf: string;
	client: string;
	motivo: string;
	mount_ref: number;
	mount_bs?: number;
	reference: string;
}) {
	clientWhatsapp.messages
		.create({
			from: `whatsapp:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
			contentSid: `${
				values.mount_bs
					? process.env.NEXT_PUBLIC_CONTENT_BS_SID
					: process.env.NEXT_PUBLIC_CONTENT_SID
			}`,
			contentVariables: values.mount_bs
				? `{"1":"${values.client}", "2":"${values.motivo}", "3":"${formatMoney(
						values.mount_ref,
				  )}", "4":"${formatMoney(values.mount_bs)}", "5":"${values.reference}"}`
				: `{"1":"${values.client}", "2":"${values.motivo}", "3":"${formatMoney(
						values.mount_ref,
				  )}", "4":"${values.reference}"}`,
			to: `whatsapp:+${values.tlf.replace('0', '58')}`,
		})
		.then((message) => {
			console.log(message);
		})
		.catch((error) => {
			console.error(error);
			return 'Error al enviar mensaje';
		});
}
