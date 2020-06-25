
export type AccessTokenType = string | null | undefined;

export type TokenDataType = {
	access_token?: AccessTokenType
}

export type PayslipType = {
	user: string
}

export type PeriodType = {
	payslips: PayslipType[]
	dated_on: Date
	status: string
}

export type UserType = {
	url: string
	first_name: string
	last_name: string
	email: string
}

export type TaxPeriod = {
	month: number
	year: number
}

export type UserPayslip = {
	user: UserType
	url: string
}