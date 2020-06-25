import cron from 'node-cron';
import moment from 'moment';

import { notifyFromPayroll } from './freeagent/payroll';

export default (): void => {
	console.log('Scheduling cron. Now: ', moment().toDate())
	cron.schedule(process.env.CRON_SCHEDULE || "0 17 * * *", notifyFromPayroll);
};
