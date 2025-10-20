import React from "react";
import { Link } from "react-router-dom";

const AmigurumiCard = ({ amigurumi }) => {
	const mainPhoto = amigurumi.fotos?.[0]?.url || "/placeholder-image.jpg";

	return (
		<div className="amigurumi-card card">
			<div className="card-image">
				<img src={mainPhoto} alt={amigurumi.name} />
				<div className="card-overlay">
					<Link to={`/amigurumi/${amigurumi.id}`} className="btn btn-primary">
						Ver Detalhes
					</Link>
				</div>
			</div>
			<div className="card-content">
				<h3>{amigurumi.name}</h3>
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
			</div>
		</div>
	);
};

export default AmigurumiCard;
