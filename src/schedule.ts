import cron from 'node-cron';

import { notifyFromPayroll } from './freeagent/payroll';

export default (): void => {
	cron.schedule(process.env.CRON_SCHEDULE || "0 17 * * *", notifyFromPayroll);
};
