import { ClientsForServiceReceivable } from './clientsInvoices';

export async function createInvoicesAutomatic() {
	{
		const clients = await ClientsForServiceReceivable();
		if (!clients) {
			return;
		}

		console.log(clients);
	}
}
