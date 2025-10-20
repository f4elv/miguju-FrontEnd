import React, { useState, useEffect } from "react";
import { adminCategoryService } from "../../services/adminApi";
import CategoryForm from "./CategoryForm";

const CategoryManager = () => {
	const [categories, setCategories] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if (searchInput) {
			const filtered = categories.filter((category) => category.name.toLowerCase().includes(searchInput.toLowerCase()));
			setFilteredCategories(filtered);
		} else {
			setFilteredCategories(categories);
		}
	}, [searchInput, categories]);

	const fetchCategories = async () => {
		try {
			setLoading(true);
			const data = await adminCategoryService.list({ limit: 50 });
			setCategories(data.categories || []);
			setFilteredCategories(data.categories || []);
		} catch (error) {
			console.error("Erro ao carregar categorias:", error);
			alert("Erro ao carregar categorias");
		} finally {
			setLoading(false);
		}
	};

	const handleCreate = () => {
		setEditingCategory(null);
		setShowForm(true);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
			try {
				await adminCategoryService.delete(id);
				alert("Categoria excluída com sucesso!");
				fetchCategories();
			} catch (error) {
				alert("Erro ao excluir categoria");
			}
		}
	};

	const handleFormClose = () => {
		setShowForm(false);
		setEditingCategory(null);
	};

	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingCategory(null);
		fetchCategories();
	};

	// Busca em tempo real para categorias (mais simples)
	const handleSearchChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleClearSearch = () => {
		setSearchInput("");
	};

	if (loading) {
		return <div className="loading">Carregando categorias...</div>;
	}

	return (
		<div className="category-manager">
			<div className="manager-header">
				<h2>Gerenciar Categorias</h2>
				<button onClick={handleCreate} className="btn btn-primary">
					➕ Nova Categoria
				</button>
			</div>

			{/* Barra de Busca para Categorias */}
			<div className="search-section">
				<div className="search-box-admin">
					<input type="text" placeholder="Buscar categorias..." value={searchInput} onChange={handleSearchChange} className="search-input-admin" />
					{searchInput && (
						<button onClick={handleClearSearch} className="btn-clear-search">
							✕
						</button>
					)}
				</div>
				{searchInput && (
					<div className="search-info">
						<p>
							{filteredCategories.length} categoria(s) encontrada(s)
							<button onClick={handleClearSearch} className="btn-clear-text">
								Limpar
							</button>
						</p>
					</div>
				)}
			</div>

			{filteredCategories.length === 0 ? (
				<div className="admin-card">
					<p>{searchInput ? `Nenhuma categoria encontrada para "${searchInput}"` : "Nenhuma categoria cadastrada."}</p>
				</div>
			) : (
				<div className="categories-list">
					{filteredCategories.map((category) => (
						<div key={category.id} className="category-item">
							<span className="category-name">{category.name}</span>
							<div className="category-actions">
								<button onClick={() => handleDelete(category.id)} className="btn-delete">
									🗑️ Excluir
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{showForm && <CategoryForm category={editingCategory} onClose={handleFormClose} onSuccess={handleFormSuccess} />}
		</div>
	);
};

export default CategoryManager;
