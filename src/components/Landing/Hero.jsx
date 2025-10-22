import React from "react";
import { Link } from "react-router-dom";

const instagramUrl = "https://instagram.com/miguju_";

const Hero = () => {
	return (
		<section className="hero" id="hero">
			<div className="container">
				<div className="hero-content">
					<div className="hero-text">
						<h1 className="hero-title">Miguju</h1>
						<h2>Artesanato com muito amor... e nós</h2>
						<p>Descubra nossa coleção exclusiva de amigurumis artesanais, onde cada um tem sua própria história, venha escolher o seu.</p>
						<div className="hero-buttons">
							<Link to="/gallery" className="btn btn-primary">
								Ver Galeria
							</Link>
							<a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-instagram">
								Instagram
							</a>
						</div>
					</div>
					<div className="hero-image">
						<img src="logo.png" alt="Miguju Logo" className="logo-image" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
