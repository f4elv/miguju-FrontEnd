import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
	const [isVisible, setIsVisible] = useState(false);
	const location = useLocation();

	useEffect(() => {
		// Mostrar header imediatamente quando não está na home
		if (location.pathname !== "/") {
			setIsVisible(true);
			return;
		}

		// Lógica original só para a home
		const handleScroll = () => {
			const heroSection = document.getElementById("hero");
			if (heroSection) {
				const heroHeight = heroSection.offsetHeight;
				const heroMiddle = heroHeight / 2;
				const scrollPosition = window.scrollY;

				if (scrollPosition > heroMiddle) {
					setIsVisible(true);
				} else {
					setIsVisible(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [location.pathname]);

	const isGalleryPage = location.pathname === "/gallery";
	const isAmigurumiPage = location.pathname.startsWith("/amigurumi/");

	const isAPageWithNoGalleryBtn = isAmigurumiPage || isGalleryPage;

	return (
		<header className={`header ${isVisible ? "visible" : ""} ${isAPageWithNoGalleryBtn ? "gallery-header" : ""}`}>
			<div className="container">
				<nav className="nav">
					<Link to="/" className="logo">
						Miguju
					</Link>
					<ul className="nav-links">
						{!isAPageWithNoGalleryBtn && (
							<li>
								<Link to="/gallery">Galeria</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
