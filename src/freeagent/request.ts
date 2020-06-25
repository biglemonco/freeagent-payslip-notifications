import fetch, { RequestInit } from 'node-fetch';

import { requestAccessToken } from './access-token';
import { TokenDataType } from '../types';

export const freeAgentRequest = async (
	uri: string,
	method: string = 'GET',
	body: object = {}
): Promise<any> => {
	try {
		// TODO: #1 Stop refreshing the access token on every request (15/minute limit)
		const token: TokenDataType = await requestAccessToken();
		return freeAgentRequestWithToken(`Bearer ${token.access_token}`, uri, method, JSON.stringify(body));
	} catch (e) {
		console.error(e);
	}
};

export const freeAgentRequestWithToken = async (
	Authorization: string,
	uri: string,
	method: string,
	body: RequestInit['body'],
): Promise<any> => {
	try {
		const headers: RequestInit['headers'] = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization
		}
		const url: string = uri.includes('http') ? uri : process.env.FREEAGENT_API_URL + uri;
		const res = await fetch(url, {
			method: method || 'GET',
			headers,
			body,
		});
		if (!res) throw new Error('No response');
		if (!res.ok) throw new Error(res.statusText);
		return res.json();
	} catch (e) {
		console.error(e);
	}
};
