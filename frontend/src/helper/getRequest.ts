import { apiRequest } from './apiRequest';

export const getWeapons = async () => {
	return apiRequest({
		endpoint: '/daily/all',
	});
};

export const getDailyWeapon = async () => {
	return apiRequest({
		endpoint: '/daily',
	})
}
