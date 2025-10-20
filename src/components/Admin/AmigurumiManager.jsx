import React, { useState, useEffect } from "react";
import { adminAmigurumiService } from "../../services/adminApi";
import AmigurumiForm from "./AmigurumiForm";

const AmigurumiManager = () => {
	const [amigurumis, setAmigurumis] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingAmigurumi, setEditingAmigurumi] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		fetchAmigurumis();
	}, [currentPage, searchTerm]);

	const fetchAmigurumis = async () => {
		try {
			setLoading(true);
			const data = await adminAmigurumiService.list({
				page: currentPage,
				limit: 10,
				...(searchTerm && { search: searchTerm }),
			});
			setAmigurumis(data.amigurumis || []);
			setTotalPages(Math.ceil(data.total / data.limit));
		} catch (error) {
			console.error("Erro ao carregar amigurumis:", error);
			alert("Erro ao carregar amigurumis");
		} finally {
			setLoading(false);
		}
	};

	const handleCreate = () => {
		setEditingAmigurumi(null);
		setShowForm(true);
	};

	const handleEdit = (amigurumi) => {
		setEditingAmigurumi(amigurumi);
		setShowForm(true);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Tem certeza que deseja excluir este amigurumi?")) {
			try {
				await adminAmigurumiService.delete(id);
				alert("Amigurumi excluído com sucesso!");
				fetchAmigurumis();
			} catch (error) {
				alert("Erro ao excluir amigurumi");
			}
		}
	};

	const handleFormClose = () => {
		setShowForm(false);
		setEditingAmigurumi(null);
	};

	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingAmigurumi(null);
		fetchAmigurumis();
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

	if (loading) {
		return <div className="loading">Carregando amigurumis...</div>;
	}

	return (
		<div className="amigurumi-manager">
			<div className="manager-header">
				<h2>Gerenciar Amigurumis</h2>
				<button onClick={handleCreate} className="btn btn-primary">
					➕ Novo Amigurumi
				</button>
			</div>

			{/* Barra de Busca */}
			<div className="search-section">
				<div className="search-box-admin">
					<input
						type="text"
						placeholder="Buscar amigurumis... (Pressione Enter)"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyPress={handleKeyPress}
						className="search-input-admin"
					/>
					{(searchInput || searchTerm) && (
						<button onClick={handleClearSearch} className="btn-clear-search">
							✕
						</button>
					)}
				</div>
				{searchTerm && (
					<div className="search-info">
						<p>
							Buscando por: "<strong>{searchTerm}</strong>"
							<button onClick={handleClearSearch} className="btn-clear-text">
								Limpar
							</button>
						</p>
					</div>
				)}
			</div>

			{amigurumis.length === 0 ? (
				<div className="admin-card">
					<p>{searchTerm ? `Nenhum amigurumi encontrado para "${searchTerm}"` : "Nenhum amigurumi cadastrado."}</p>
				</div>
			) : (
				<>
					<div className="results-count">
						<p>
							{amigurumis.length} amigurumi(s) encontrado(s)
							{searchTerm && ` para "${searchTerm}"`}
						</p>
					</div>

					<div className="amigurumi-grid-admin">
						{amigurumis.map((amigurumi) => (
							<div key={amigurumi.id} className="amigurumi-card-admin">
								<div className="card-image">
									<img src={amigurumi.fotos?.[0]?.url || "/placeholder.jpg"} alt={amigurumi.name} />
								</div>
								<div className="card-content">
									<h4>{amigurumi.name}</h4>
									<p className="card-description">
										{amigurumi.description.length > 100 ? `${amigurumi.description.substring(0, 100)}...` : amigurumi.description}
									</p>
									<div className="card-categories">
										{amigurumi.category?.map((cat) => (
											<span key={cat.id} className="category-tag">
												{cat.name}
											</span>
										))}
									</div>
									<div className="card-actions">
										<button onClick={() => handleEdit(amigurumi)} className="btn-edit">
											✏️ Editar
										</button>
										<button onClick={() => handleDelete(amigurumi.id)} className="btn-delete">
											🗑️ Excluir
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}

			{totalPages > 1 && (
				<div className="pagination">
					<button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
						← Anterior
					</button>
					<span>
						Página {currentPage} de {totalPages}
					</span>
					<button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
						Próxima →
					</button>
				</div>
			)}

			{showForm && <AmigurumiForm amigurumi={editingAmigurumi} onClose={handleFormClose} onSuccess={handleFormSuccess} />}
		</div>
	);
};

export default AmigurumiManager;
