import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AmigurumiCard from "./AmigurumiCard";
import CategoryFilter from "./CategoryFilter";
import { amigurumiService, categoryService } from "../../services/api.js";

const AmigurumiList = () => {
	const [amigurumis, setAmigurumis] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [searchInput, setSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchAmigurumis();
		fetchCategories();
	}, [selectedCategory, searchTerm, currentPage]);

	const fetchAmigurumis = async () => {
		try {
			setLoading(true);
			setError("");

			const params = {
				page: currentPage,
				limit: 12,
				...(searchTerm && { search: searchTerm }),
			};

			let data;
			if (selectedCategory) {
				data = await amigurumiService.listByCategory(selectedCategory, params);
			} else {
				data = await amigurumiService.list(params);
			}

			setAmigurumis(data.amigurumis || []);
			setTotalPages(Math.ceil(data.total / data.limit));
		} catch (error) {
			console.error("Erro ao buscar amigurumis:", error);
			setError("Erro ao carregar amigurumis. Tente novamente.");
			setAmigurumis([]);
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const data = await categoryService.list({ limit: 50 });
			setCategories(data.categories || []);
		} catch (error) {
			console.error("Erro ao buscar categorias:", error);
			setCategories([]);
		}
	};

	const handleCategoryChange = (categoryId) => {
		console.log(categoryId);
		setSelectedCategory(categoryId);
		setCurrentPage(1);
	};
	// Busca quando pressiona Enter
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			setSearchTerm(searchInput);
			setCurrentPage(1);
		}
	};

	// Limpar busca
	const handleClearSearch = () => {
		setSearchInput("");
		setSearchTerm("");
		setCurrentPage(1);
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (loading && amigurumis.length === 0) {
		return (
			<div className="container">
				<div className="loading">Carregando amigurumis...</div>
			</div>
		);
	}

	return (
		<div className="amigurumi-list-page">
			<div className="container">
				<div className="page-header">
					<h1>Nossa Galeria</h1>
					<p>Encontre o amigurumi perfeito para você.</p>
				</div>

				{error && <div className="error-message">{error}</div>}

				<div className="filters-section">
					<div className="search-box">
						<input
							type="text"
							placeholder="Buscar amigurumis... (Pressione Enter)"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							onKeyPress={handleKeyPress}
							className="search-input"
						/>
						{(searchInput || searchTerm) && (
							<button onClick={handleClearSearch} className="btn-clear-search">
								✕
							</button>
						)}
					</div>

					<CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
				</div>

				{!loading && (
					<div className="results-info">
						<p>
							{amigurumis.length} amigurumi(s) encontrado(s)
							{selectedCategory && ` na categoria selecionada`}
							{searchTerm && ` para "${searchTerm}"`}
						</p>
					</div>
				)}

				<div className="amigurumi-grid">
					{amigurumis.map((amigurumi) => (
						<AmigurumiCard key={amigurumi.id} amigurumi={amigurumi} />
					))}
				</div>

				{amigurumis.length === 0 && !loading && (
					<div className="no-results">
						<h3>Nenhum amigurumi encontrado</h3>
						<p>Tente alterar os filtros de busca ou categoria</p>
					</div>
				)}

				{totalPages > 1 && (
					<div className="pagination">
						<button className="pagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
							← Anterior
						</button>

						<span className="pagination-info">
							Página {currentPage} de {totalPages}
						</span>

						<button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
							Próxima →
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AmigurumiList;
