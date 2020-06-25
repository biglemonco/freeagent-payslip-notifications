import cron from 'node-cron';

import { notifyFromPayroll } from './freeagent/payroll';

export default (): void => {
	if (process.env.PAYROLL_CRON_SCHEDULE) {
		cron.schedule(process.env.PAYROLL_CRON_SCHEDULE, notifyFromPayroll);
	}
};
