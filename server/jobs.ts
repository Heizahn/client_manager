import { createInvoicesAutomatic } from '../lib/invoices/createInvoicesAutomatic';
import cron from 'node-cron';

cron.schedule(
	'* * * * *',
	async () => {
		await createInvoicesAutomatic();
	},
	{ timezone: 'America/Caracas' },
);
