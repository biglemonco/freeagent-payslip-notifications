import moment from 'moment';

import { getTaxPeriod } from './payroll';

describe('tax period', () => {
	test('should make April tax month 0', () => {
		const { month, year } = getTaxPeriod(moment('2020-04-01'));
		expect(month).toEqual(0);
		expect(year).toEqual(2021);
	});

	test('should make September tax month 5', () => {
		const { month, year } = getTaxPeriod(moment('2020-09-01'));
		expect(month).toEqual(5);
		expect(year).toEqual(2021);
	});

	test('should make February tax month ', () => {
		const { month, year } = getTaxPeriod(moment('2020-02-01'));
		expect(month).toEqual(10);
		expect(year).toEqual(2020);
	});
});
