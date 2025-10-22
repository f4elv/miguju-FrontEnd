import React from "react";

const About = () => {
	return (
		<section className="about">
			<div className="container">
				<div className="about-content reversed">
					<div className="about-photo">
						<div className="owner-photo">
							<div className="photo-placeholder">
								<img src="/owner.png" alt="" />
							</div>
						</div>
					</div>
					<div className="about-text">
						<h2>Sobre a Miguju</h2>
						<p>
							Bem-vindo à Miguju! Sou apaixonada por criar amigurumis únicos e especiais. Cada peça é feita manualmente com muito carinho e
							atenção aos detalhes.
						</p>
						<p>A Miguju nasceu e vive até hoje no coração de uma bióloga que queria dar vida aos animaizinhos que tanto ama.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
