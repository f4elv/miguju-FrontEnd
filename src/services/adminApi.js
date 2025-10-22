const API_BASE_URL = "https://miguju-api.onrender.com/api";

const getAuthHeaders = () => {
	const token = localStorage.getItem("adminToken");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
};

const apiRequest = async (endpoint, options = {}) => {
	try {
		const url = `${API_BASE_URL}${endpoint}`;
		const response = await fetch(url, {
			headers: getAuthHeaders(),
			...options,
		});

		if (!response.ok) {
			throw new Error(`Erro ${response.status}: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Erro na requisição Admin API:", error);
		throw error;
	}
};

export const authService = {
	login: async (password) => {
		const response = await fetch(`${API_BASE_URL}/admin/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password }),
		});
		return await response.json();
	},

	logout: () => {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("adminUser");
	},

	isAuthenticated: () => {
		return !!localStorage.getItem("adminToken");
	},
};
export const adminAmigurumiService = {
	list: (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		return apiRequest(`/admin/amigurumis?${queryParams}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
		});
	},

	getById: (id) => {
		return apiRequest(`/admin/amigurumis/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
		});
	},

	create: (formData) => {
		return fetch(`${API_BASE_URL}/admin/amigurumis`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
			body: formData,
		});
	},

	update: (id, formData) => {
		return fetch(`${API_BASE_URL}/admin/amigurumis/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
			body: formData,
		});
	},

	delete: async (id) => {
		try {
			const token = localStorage.getItem("adminToken");
			const response = await fetch(`${API_BASE_URL}/admin/amigurumis/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Erro ${response.status}: ${response.statusText}`);
			}
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				return await response.json();
			} else {
				const text = await response.text();
				console.log("📄 Resposta não-JSON:", text);
				return { message: text || "Deletado com sucesso" };
			}
		} catch (error) {
			throw error;
		}
	},
};

export const adminCategoryService = {
	list: (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		return apiRequest(`/admin/categories?${queryParams}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
		});
	},

	create: (name) => {
		return apiRequest("/admin/categories", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
			body: JSON.stringify({ name }),
		});
	},

	delete: (id) => {
		return apiRequest(`/admin/categories/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
		});
	},
};
