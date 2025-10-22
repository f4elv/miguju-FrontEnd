const API_BASE_URL = process.env.API_BASE_URL;

const apiRequest = async (endpoint, options = {}) => {
	try {
		const url = `${API_BASE_URL}${endpoint}`;
		console.log("Fazendo request para:", url);

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		});

		if (!response.ok) {
			throw new Error(`Erro ${response.status}: ${response.statusText}`);
		}

		const data = await response.json();
		console.log("Resposta da API:", data);
		return data;
	} catch (error) {
		console.error("Erro na requisição API:", error);
		throw error;
	}
};

export const amigurumiService = {
	list: (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		return apiRequest(`/api/users/amigurumis?${queryParams}`);
	},
	getById: (id) => {
		return apiRequest(`/api/users/amigurumis/${id}`);
	},

	listByCategory: (categoryId, params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		return apiRequest(`/api/users/category/${categoryId}/amigurumis?${queryParams}`);
	},
};

export const categoryService = {
	list: (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		return apiRequest(`/api/users/categories?${queryParams}`);
	},
};
