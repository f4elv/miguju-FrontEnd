import React, { useState, useEffect } from "react";
import { authService } from "../services/adminApi";
import LoginForm from "../components/Admin/LoginForm";
import AdminLayout from "../components/Admin/AdminLayout";
import Dashboard from "../components/Admin/Dashboard";
import AmigurumiManager from "../components/Admin/AmigurumiManager";
import CategoryManager from "../components/Admin/CategoryManager";

const AdminPage = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [activeSection, setActiveSection] = useState("dashboard");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = () => {
			const authenticated = authService.isAuthenticated();
			setIsAuthenticated(authenticated);
			setLoading(false);
		};

		checkAuth();
	}, []);

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		authService.logout();
		setIsAuthenticated(false);
	};

	const renderSection = () => {
		switch (activeSection) {
			case "dashboard":
				return <Dashboard />;
			case "amigurumis":
				return <AmigurumiManager />;
			case "categories":
				return <CategoryManager />;
			default:
				return <Dashboard />;
		}
	};

	if (loading) {
		return (
			<div className="container">
				<div className="loading">Carregando...</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <LoginForm onLogin={handleLogin} />;
	}

	return (
		<AdminLayout activeSection={activeSection} onSectionChange={setActiveSection} onLogout={handleLogout}>
			{renderSection()}
		</AdminLayout>
	);
};

export default AdminPage;
