import { createInvoicesAutomatic } from '../lib/payments_and_services/invoices/createInvoicesAutomatic';
import cron from 'node-cron';

cron.schedule(
	'* * * * *',
	async () => {
		await createInvoicesAutomatic();
	},
	{ timezone: 'America/Caracas' },
);
