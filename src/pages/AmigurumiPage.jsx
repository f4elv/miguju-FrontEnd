import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { amigurumiService } from "../services/api";

const AmigurumiPage = () => {
	const { id } = useParams();
	const [amigurumi, setAmigurumi] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedImage, setSelectedImage] = useState(0);

	useEffect(() => {
		fetchAmigurumi();
	}, [id]);

	const fetchAmigurumi = async () => {
		try {
			setLoading(true);
			setError("");
			const data = await amigurumiService.getById(id);
			setAmigurumi(data.amigurumi);
		} catch (error) {
			console.error("Erro ao buscar amigurumi:", error);
			setError("Erro ao carregar amigurumi. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	// Links para redes sociais (substitua pelos links reais)
	const instagramUrl = "https://instagram.com/miguju_";

	if (loading) {
		return (
			<div className="container">
				<div className="loading">Carregando amigurumi...</div>
			</div>
		);
	}

	if (error || !amigurumi) {
		return (
			<div className="container">
				<div className="error-message">{error || "Amigurumi não encontrado"}</div>
				<Link to="/gallery" className="btn btn-primary">
					Voltar para Galeria
				</Link>
			</div>
		);
	}

	const mainPhoto = amigurumi.fotos?.[selectedImage]?.url;
	const hasMultiplePhotos = amigurumi.fotos && amigurumi.fotos.length > 1;

	return (
		<div className="amigurumi-detail-page">
			<div className="container">
				<Link to="/gallery" className="back-link">
					← Voltar para Galeria
				</Link>

				<div className="amigurumi-detail">
					{/* Lado Esquerdo - Imagens */}
					<div className="detail-images">
						{amigurumi.fotos && amigurumi.fotos.length > 0 ? (
							<div className="image-gallery">
								<div className="main-image">
									<img src={mainPhoto} alt={amigurumi.name} />
								</div>
								{hasMultiplePhotos && (
									<div className="thumbnail-grid">
										{amigurumi.fotos.map((foto, index) => (
											<div
												key={index}
												className={`thumbnail ${selectedImage === index ? "active" : ""}`}
												onClick={() => setSelectedImage(index)}
											>
												<img src={foto.url} alt={`${amigurumi.name} ${index + 1}`} />
											</div>
										))}
									</div>
								)}
							</div>
						) : (
							<div className="no-image">
								<div className="placeholder-image">📷</div>
								<p>Sem imagem disponível</p>
							</div>
						)}
					</div>

					{/* Lado Direito - Informações */}
					<div className="detail-info">
						<h1>{amigurumi.name}</h1>

						<div className="categories">
							{amigurumi.category?.map((cat) => (
								<span key={cat.id} className="category-tag large">
									{cat.name}
								</span>
							))}
						</div>

						<div className="description">
							<h3>Descrição</h3>
							<p>{amigurumi.description}</p>
						</div>

						<div className="action-buttons">
							<a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-instagram">
								⌯⌲ Encomendar pelo Instagram
							</a>
						</div>

						<div className="contact-info">
							<h4>💫 Como encomendar:</h4>
							<p>1. Entre em contato pelo botão acima</p>
							<p>2. Combine cores e detalhes</p>
							<p>3. Aguarde o orçamento!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AmigurumiPage;
