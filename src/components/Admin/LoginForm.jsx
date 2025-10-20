import React, { useState } from "react";
import { authService } from "../../services/adminApi";

const LoginForm = ({ onLogin }) => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const data = await authService.login(password);

			if (data.token) {
				localStorage.setItem("adminToken", data.token);
				onLogin();
			} else {
				setError(data.erro || "Erro ao fazer login");
			}
		} catch (error) {
			setError("Erro de conexão. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-container">
			<div className="login-form">
				<h2>Painel Administrativo</h2>
				<p>Entre com sua senha de administrador</p>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Senha de administrador"
							required
							className="form-input"
						/>
					</div>

					{error && <div className="error-message">{error}</div>}

					<button type="submit" className="btn btn-primary" disabled={loading}>
						{loading ? "Entrando..." : "Entrar"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
