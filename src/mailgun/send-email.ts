import Mailgun from 'mailgun-js';
import moment from 'moment';

import { UserType } from '../types';

const mailgun = Mailgun({
	apiKey: process.env.MAILGUN_API_KEY || '',
	domain: process.env.MAILGUN_DOMAIN || ''
});

const month = moment().format("MMMM")

export const generateEmail = (user: UserType, url: string): string => {
	return (

		`Hi ${user.first_name}!

Your payslip for ${month} is available on FreeAgent at ${url}.

Best wishes
${process.env.FROM_NAME}

---

Please note: This is an automated email. If you want to speak to someone, drop an email to ${process.env.FROM_EMAIL}.`

	);
}

export const sendEmail = async (email: string, text: string) => {
	await new Promise((resolve, reject) => {
		mailgun
			.messages()
			.send({
				from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
				to: [email],
				subject: `Payslip for ${month}`,
				text,
			}, (err, body) => {
				if (err) reject(err);
				resolve(body);
			})
	})
}