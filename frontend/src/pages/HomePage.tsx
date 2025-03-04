import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const HomePage: React.FC = () => {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesRating = selectedRating === 'all' || product.rating >= selectedRating;
    return matchesCategory && matchesRating;
  });

  return (
    <div className="home-page">
      <h2>Products</h2>

      {/* Filters */}
      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
          }
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedRating}
          onChange={(e) =>
            setSelectedRating(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
          }
        >
          <option value="all">All Ratings</option>
          <option value="1">1 Star & Above</option>
          <option value="2">2 Stars & Above</option>
          <option value="3">3 Stars & Above</option>
          <option value="4">4 Stars & Above</option>
          <option value="5">5 Stars Only</option>
        </select>
      </div>

      {/* Products */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.productId} className="product-card">
            <img src={product.imageUrls[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
