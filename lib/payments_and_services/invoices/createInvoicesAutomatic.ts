import { ClientsForServiceReceivable } from './clientsInvoices';
import { createInvoice } from './createInvoice';
import { months } from './months';

export async function createInvoicesAutomatic() {
	{
		const clients = await ClientsForServiceReceivable();

		if (!clients || clients.length === 0) {
			console.error('No client found');
			return;
		}

		for (const client of clients) {
			const title = `${client.services?.nombre_service} Residencial - `;

			if (client.services?.costo > 0) {
				await createInvoice({
					clientId: client.id,
					motivo: title + months[new Date().getMonth()],
					monto: client.services?.costo,
					deuda: -client.services?.costo,
				})
					.then((res) => console.info(res))
					.catch((err) => console.error(err.message));
			}
		}
	}
}
