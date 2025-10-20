import React, { useState, useEffect } from "react";
import { adminAmigurumiService, adminCategoryService } from "../../services/adminApi";

const Dashboard = () => {
	const [stats, setStats] = useState({
		totalAmigurumis: 0,
		totalCategories: 0,
		recentAmigurumis: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		try {
			const [amigurumisData, categoriesData] = await Promise.all([adminAmigurumiService.list({ limit: 5 }), adminCategoryService.list()]);

			setStats({
				totalAmigurumis: amigurumisData.total || 0,
				totalCategories: categoriesData.total || 0,
				recentAmigurumis: amigurumisData.amigurumis || [],
			});
		} catch (error) {
			console.error("Erro ao carregar dashboard:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div className="loading">Carregando dashboard...</div>;
	}

	return (
		<div className="dashboard">
			<div className="stats-grid">
				<div className="stat-card">
					<div className="stat-icon">🧶</div>
					<div className="stat-info">
						<h3>{stats.totalAmigurumis}</h3>
						<p>Total de Amigurumis</p>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon">🏷️</div>
					<div className="stat-info">
						<h3>{stats.totalCategories}</h3>
						<p>Categorias</p>
					</div>
				</div>
			</div>

			<div className="admin-card">
				<h3>Amigurumis Recentes</h3>
				{stats.recentAmigurumis.length > 0 ? (
					<div className="recent-list">
						{stats.recentAmigurumis.map((amigurumi) => (
							<div key={amigurumi.id} className="recent-item">
								<img src={amigurumi.fotos?.[0]?.url || "/placeholder.jpg"} alt={amigurumi.name} className="recent-image" />
								<div className="recent-info">
									<h4>{amigurumi.name}</h4>
									<p>{amigurumi.category?.map((cat) => cat.name).join(", ") || "Sem categoria"}</p>
								</div>
								<span className="recent-date">{new Date(amigurumi.createdAt).toLocaleDateString()}</span>
							</div>
						))}
					</div>
				) : (
					<p>Nenhum amigurumi cadastrado</p>
				)}
			</div>

			<div className="admin-card">
				<h3>Ações Rápidas</h3>
				<div className="quick-actions">
					<button className="btn btn-primary">➕ Novo Amigurumi</button>
					<button className="btn btn-secondary">🏷️ Nova Categoria</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
