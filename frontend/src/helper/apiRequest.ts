const apiUrl = import.meta.env.VITE_API_URL;
const backendSecretKey = import.meta.env.VITE_BACKEND_SECRET_KEY;

interface ApiRequestProps {
	endpoint: string;
	method?: string;
}

export const apiRequest = async ({
	endpoint,
	method = 'GET',
}: ApiRequestProps) => {
	const uri = `${apiUrl}${endpoint}`;

	console.log(apiUrl);

	const options: RequestInit = {
		method,
		headers: {
			'key': backendSecretKey,
			'Content-Type': 'application/json',
		},
	};

	const res = await fetch(uri, options);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};
