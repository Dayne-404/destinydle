const API_BASE_URL = 'http://localhost:3000/api';

interface ApiRequestProps {
	endpoint: string;
	method?: string;
	params?: URLSearchParams;
	body?: string;
	tokenRequired?: boolean;
}

export const apiRequest = async ({
	endpoint,
	method = 'GET',
	params,
	body,
}: ApiRequestProps) => {
	let uri = `${API_BASE_URL}${endpoint}`;

	if (params) uri += `?${params.toString()}`;

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		...(body && { body: body }),
	};

	const res = await fetch(uri, options);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};
