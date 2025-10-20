import React, { useState, useEffect } from "react";
import { adminAmigurumiService, adminCategoryService } from "../../services/adminApi";

const AmigurumiForm = ({ amigurumi, onClose, onSuccess }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: [],
	});
	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [existingPhotos, setExistingPhotos] = useState([]);
	const [photosToRemove, setPhotosToRemove] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchCategories();
		if (amigurumi) {
			setFormData({
				name: amigurumi.name || "",
				description: amigurumi.description || "",
				category: amigurumi.category?.map((cat) => cat.id) || [],
			});
			setSelectedCategories(amigurumi.category?.map((cat) => cat.id) || []);
			setExistingPhotos(amigurumi.fotos || []);
		}
	}, [amigurumi]);

	const fetchCategories = async () => {
		try {
			const data = await adminCategoryService.list({ limit: 50 });
			setCategories(data.categories || []);
		} catch (error) {
			console.error("Erro ao carregar categorias:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCategoryToggle = (categoryId) => {
		setSelectedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]));
	};

	const handlePhotoChange = (e) => {
		const files = Array.from(e.target.files);
		setPhotos((prev) => [...prev, ...files]);
	};

	const handleRemoveNewPhoto = (index) => {
		setPhotos((prev) => prev.filter((_, i) => i !== index));
	};

	const handleRemoveExistingPhoto = (photoId) => {
		setPhotosToRemove((prev) => [...prev, photoId]);
		setExistingPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const submitData = new FormData();
			submitData.append("name", formData.name);
			submitData.append("description", formData.description);

			// Adicionar categorias selecionadas
			selectedCategories.forEach((categoryId) => {
				submitData.append("category", JSON.stringify([{ id: categoryId }]));
			});

			// Adicionar novas fotos
			photos.forEach((photo) => {
				submitData.append("fotos", photo);
			});

			// Adicionar fotos para remover (apenas edição)
			if (amigurumi && photosToRemove.length > 0) {
				submitData.append("removeFotos", JSON.stringify(photosToRemove));
			}

			let response;
			if (amigurumi) {
				response = await adminAmigurumiService.update(amigurumi.id, submitData);
			} else {
				response = await adminAmigurumiService.create(submitData);
			}

			if (response.ok) {
				alert(amigurumi ? "Amigurumi atualizado com sucesso!" : "Amigurumi criado com sucesso!");
				onSuccess();
			} else {
				throw new Error("Erro na requisição");
			}
		} catch (error) {
			setError("Erro ao salvar amigurumi. Tente novamente.");
			console.error("Erro:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h3>{amigurumi ? "Editar Amigurumi" : "Novo Amigurumi"}</h3>
					<button onClick={onClose} className="btn-close">
						×
					</button>
				</div>

				<form onSubmit={handleSubmit} className="amigurumi-form">
					<div className="form-group">
						<label>Nome *</label>
						<input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" />
					</div>

					<div className="form-group">
						<label>Descrição *</label>
						<textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4" className="form-textarea" />
					</div>

					<div className="form-group">
						<label>Categorias</label>
						<div className="categories-checkbox">
							{categories.map((category) => (
								<label key={category.id} className="checkbox-label">
									<input
										type="checkbox"
										checked={selectedCategories.includes(category.id)}
										onChange={() => handleCategoryToggle(category.id)}
									/>
									<span className="checkmark"></span>
									{category.name}
								</label>
							))}
						</div>
					</div>

					<div className="form-group">
						<label>Fotos {!amigurumi && "*"} </label>

						{/* Fotos existentes (edição) */}
						{existingPhotos.length > 0 && (
							<div className="existing-photos">
								<h4>Fotos Atuais</h4>
								<div className="photos-grid">
									{existingPhotos.map((photo) => (
										<div key={photo.id} className="photo-item">
											<img src={photo.url} alt="Preview" />
											<button type="button" onClick={() => handleRemoveExistingPhoto(photo.id)} className="btn-remove-photo">
												×
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Novas fotos */}
						<div className="new-photos">
							<input type="file" multiple accept="image/*" onChange={handlePhotoChange} className="file-input" />

							{photos.length > 0 && (
								<div className="photos-preview">
									<h4>Novas Fotos</h4>
									<div className="photos-grid">
										{photos.map((photo, index) => (
											<div key={index} className="photo-item">
												<img src={URL.createObjectURL(photo)} alt="Preview" />
												<button type="button" onClick={() => handleRemoveNewPhoto(index)} className="btn-remove-photo">
													×
												</button>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{error && <div className="error-message">{error}</div>}

					<div className="form-actions">
						<button type="button" onClick={onClose} className="btn btn-secondary">
							Cancelar
						</button>
						<button type="submit" disabled={loading} className="btn btn-primary">
							{loading ? "Salvando..." : amigurumi ? "Atualizar" : "Criar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AmigurumiForm;
