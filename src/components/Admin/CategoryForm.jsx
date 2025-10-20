import React, { useState, useEffect } from "react";
import { adminCategoryService } from "../../services/adminApi";

const CategoryForm = ({ category, onClose, onSuccess }) => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (category) {
			setName(category.name || "");
		}
	}, [category]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim()) {
			setError("Nome da categoria é obrigatório");
			return;
		}

		setLoading(true);
		setError("");

		try {
			if (category) {
				// Editar categoria (se seu backend tiver essa rota)
				// await adminCategoryService.update(category.id, { name });
				alert("Edição de categoria ainda não implementada");
			} else {
				await adminCategoryService.create(name);
				alert("Categoria criada com sucesso!");
			}
			onSuccess();
		} catch (error) {
			setError(error.message || "Erro ao salvar categoria");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h3>{category ? "Editar Categoria" : "Nova Categoria"}</h3>
					<button onClick={onClose} className="btn-close">
						×
					</button>
				</div>

				<form onSubmit={handleSubmit} className="category-form">
					<div className="form-group">
						<label>Nome da Categoria *</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Ex: Animais, Personagens, etc."
							required
							className="form-input"
						/>
					</div>

					{error && <div className="error-message">{error}</div>}

					<div className="form-actions">
						<button type="button" onClick={onClose} className="btn btn-secondary">
							Cancelar
						</button>
						<button type="submit" disabled={loading} className="btn btn-primary">
							{loading ? "Salvando..." : category ? "Atualizar" : "Criar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CategoryForm;
