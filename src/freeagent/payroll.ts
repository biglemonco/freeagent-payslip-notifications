import moment from 'moment';

import { freeAgentRequest } from './request';
import { generateEmail, sendEmail } from '../mailgun/send-email';
import { TaxPeriod, PayslipType, PeriodType, UserType, UserPayslip } from '../types';

export const getTaxPeriod = (date: moment.Moment): TaxPeriod => {
	let month = date.month() - 3;
	let year = date.year() + 1;
	if (month < 0) {
		month = 12 + month;
		year--;
	}
	return { month, year }
}

const getLastApril = (): moment.Moment => {
	const start = moment().startOf('month');
	while (start.month() !== 3) {
		start.subtract(1, 'month');
	}
	return start;
}

const getUserPayslips = async (payslip: PayslipType): Promise<UserPayslip> => {
	const userId = payslip.user.split('/users/')[1];
	const { user }: { user: UserType } = await freeAgentRequest(`/users/${userId}`);
	const startDate = getLastApril();
	const endDate = moment();
	const url = `${process.env.FREEAGENT_COMPANY_URL}/my_money/${userId}/salary/${startDate.format('Y-M-D')}_${endDate.format('Y-M-D')}`
	return {
		url,
		user
	}
}

const notifyPayslips = async (payslips: UserPayslip[]): Promise<void> => {
	Promise.all(
		payslips.map(async ({ user, url }: { user: UserType, url: string }): Promise<void> => {
			const text = generateEmail(user, url);
			if (process.env.NODE_ENV !== 'development') {
				await sendEmail(user.email, text);
				console.log(`An email has been sent to ${user.first_name} ${user.last_name} notifying them of their new payslip.`)
			} else {
				console.log(text, '\r\n')
			}
		})
	)
}

export const notifyFromPayroll = async (): Promise<void> => {
	try {
		const { year, month } = getTaxPeriod(moment());
		const { period }: { period: PeriodType } = await freeAgentRequest(`/payroll/${year}/${month}`);

		if (!period.payslips?.length) return console.warn('No payslips yet');
		if (period.status !== 'filed') return console.warn('Payroll not yet filed');

		const date = moment(period.dated_on);
		const today = moment().startOf('day')
		if (!date.isSame(today)) return console.warn('No payroll submitted today');

		const payslips = await Promise.all(period.payslips.map(getUserPayslips))
		await notifyPayslips(payslips);

	} catch (e) {
		console.error(e);
	}
};