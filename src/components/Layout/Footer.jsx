import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<div className="container">
				<div className="footer-content">
					<div className="footer-center">
						<p>&copy; 2025 Miguju. Todos os direitos reservados.</p>
					</div>
					<Link to="/admin" className="btn-admin">
						Área Admin
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
