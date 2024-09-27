import { apiRequest } from './apiRequest';

export const getWeapons = async (limit?: number, skip?: number) => {
	const params = new URLSearchParams();
	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));

	return apiRequest({
		endpoint: '/destiny',
		params: params,
	});
};

export const getDailyWeapon = async () => {
	return apiRequest({
		endpoint: '/daily',
	})
}
