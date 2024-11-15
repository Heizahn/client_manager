'use server';

import cron from 'node-cron';

export function startCronJob(cronTime: string, callback: () => void) {
	cron.schedule(cronTime, callback);
}
