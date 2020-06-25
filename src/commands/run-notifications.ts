import { config } from 'dotenv';
config();

import { notifyFromPayroll } from '../freeagent/payroll';

notifyFromPayroll();