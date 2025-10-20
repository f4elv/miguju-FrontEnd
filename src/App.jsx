import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import AmigurumiPage from "./pages/AmigurumiPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./styles/global.css";
import "./styles/components.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/gallery" element={<Gallery />} />
						<Route path="/amigurumi/:id" element={<AmigurumiPage />} />
						<Route path="/admin" element={<AdminPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
