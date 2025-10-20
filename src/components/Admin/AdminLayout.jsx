import React from "react";
import { authService } from "../../services/adminApi";

const AdminLayout = ({ children, activeSection, onSectionChange, onLogout }) => {
	const menuItems = [
		{ id: "dashboard", label: "Dashboard", icon: "📊" },
		{ id: "amigurumis", label: "Amigurumis", icon: "🧶" },
		{ id: "categories", label: "Categorias", icon: "🏷️" },
	];

	return (
		<div className="admin-layout">
			<aside className="admin-sidebar">
				<div className="sidebar-header">
					<h2>🧶 Miguju Admin</h2>
				</div>

				<nav className="sidebar-nav">
					{menuItems.map((item) => (
						<button key={item.id} className={`nav-item ${activeSection === item.id ? "active" : ""}`} onClick={() => onSectionChange(item.id)}>
							<span className="nav-icon">{item.icon}</span>
							<span className="nav-label">{item.label}</span>
						</button>
					))}
				</nav>

				<div className="sidebar-footer">
					<button onClick={onLogout} className="btn-logout">
						🚪 Sair
					</button>
				</div>
			</aside>

			<main className="admin-main">
				<header className="admin-header">
					<h1>Painel Administrativo</h1>
				</header>

				<div className="admin-content">{children}</div>
			</main>
		</div>
	);
};

export default AdminLayout;
