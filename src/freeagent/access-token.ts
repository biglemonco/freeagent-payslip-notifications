import { freeAgentRequestWithToken } from './request';

import { TokenDataType } from '../types';

export const requestAccessToken = async (): Promise<TokenDataType> => {
	return freeAgentRequestWithToken(
		`Basic ${Buffer.from(`${process.env.FREEAGENT_CLIENT_ID}:${process.env.FREEAGENT_CLIENT_SECRET}`).toString('base64')}`,
		'/token_endpoint',
		'POST',
		JSON.stringify({
			grant_type: 'refresh_token',
			refresh_token: process.env.FREEAGENT_REFRESH_TOKEN,
		}),
	);
};
