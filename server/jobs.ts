import { createInvoicesAutomatic } from '../lib/payments_and_services/invoices/createInvoicesAutomatic';
import cron from 'node-cron';

cron.schedule(
	'0 5 1 * *',
	async () => {
		await createInvoicesAutomatic();
	},
	{ timezone: 'America/Caracas' },
);
