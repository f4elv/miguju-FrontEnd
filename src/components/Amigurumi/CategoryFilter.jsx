import React, { useState } from "react";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

	const handleCategorySelect = (categoryId) => {
		onCategoryChange(categoryId);
		setIsOpen(false);
		setSearchTerm("");
	};

	const clearFilter = () => {
		onCategoryChange("");
		setIsOpen(false);
		setSearchTerm("");
	};

	const selectedCategoryName = categories.find((cat) => cat.id === selectedCategory)?.name || "Todas as categorias";

	return (
		<div className="category-filter-dropdown">
			<button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
				<span>{selectedCategoryName}</span>
				<span className="dropdown-arrow">▼</span>
			</button>

			{isOpen && (
				<div className="dropdown-menu">
					<div className="dropdown-search">
						<input
							type="text"
							placeholder="Buscar categoria..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
						/>
					</div>

					<div className="dropdown-options">
						<button className={`dropdown-option ${!selectedCategory ? "active" : ""}`} onClick={clearFilter}>
							Todas as categorias
						</button>

						{filteredCategories.map((category) => (
							<button
								key={category.id}
								className={`dropdown-option ${selectedCategory === category.id ? "active" : ""}`}
								onClick={() => handleCategorySelect(category.id)}
							>
								{category.name}
							</button>
						))}

						{filteredCategories.length === 0 && <div className="no-categories">Nenhuma categoria encontrada</div>}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryFilter;
