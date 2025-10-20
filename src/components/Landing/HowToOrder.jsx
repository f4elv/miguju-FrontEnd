import React from "react";

const HowToOrder = () => {
	return (
		<section className="how-to-order">
			<div className="container">
				<h2>Como Encomendar?</h2>
				<div className="steps-grid">
					<div className="step-card">
						<div className="step-number">1</div>
						<h3>Escolha seu Amigurumi</h3>
						<p>Navegue pela nossa galeria e escolha o modelo que mais combina com você</p>
					</div>
					<div className="step-card">
						<div className="step-number">2</div>
						<h3>Entre em contato</h3>
						<p>Envie uma mensagem pelo Instagram informando o modelo desejado</p>
					</div>
					<div className="step-card">
						<div className="step-number">3</div>
						<h3>Personalize do seu jeito</h3>
						<p>Combine cores, tamanhos e detalhes especiais para deixar único</p>
					</div>
					<div className="step-card">
						<div className="step-number">4</div>
						<h3>Receba em sua casa</h3>
						<p>Aguarde a confecção e receba seu amigurumi com todo o cuidado</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowToOrder;
