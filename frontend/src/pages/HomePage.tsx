import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Product } from '../type';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { useWishlist } from '../context/WishlistContext';
import "../style/home-page-styles.css";

const HomePage: React.FC = () => {
  const { products, categories } = useProducts();
  const { wishlist, toggleWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  // Check whether a product is in the wishlist based on productId
  const isProductInWishlist = (productId: number) => 
    wishlist.some(item => item.productId === productId);

  // Handler calling the context toggle function
  const handleWishlistToggle = async (product: Product) => {
    await toggleWishlist(product.productId);
  };

  // Filter products based on selected category and rating criteria
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesRating = selectedRating === 'all' || product.rating >= selectedRating;
    return matchesCategory && matchesRating;
  });

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const carouselItems = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
      title: "Summer Collection 2024",
      description: "Up to 40% off on all summer essentials",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg",
      title: "New Arrivals",
      description: "Check out our latest fashion trends",
      buttonText: "Explore More"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
      title: "Tech Deals",
      description: "Get the best deals on the latest gadgets",
      buttonText: "Shop Now"
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          showDots={true}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="carousel-item">
              <img src={item.image} alt={item.title} />
              <div className="carousel-content">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button className="carousel-button">{item.buttonText}</button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <h2>Discover Our Products</h2>

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
          <option value="all">Filter by Rating</option>
          <option value="1">1★ & Above</option>
          <option value="2">2★ & Above</option>
          <option value="3">3★ & Above</option>
          <option value="4">4★ & Above</option>
          <option value="5">5★ Only</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.productId} className="product-card">
            <img src={product.imageUrls[0]} alt={product.name} />
            <div className="product-card-content">
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className="rating">Rating: {product.rating.toFixed(2)} ★</div>
              <button 
                className={`wishlist-button ${isProductInWishlist(product.productId) ? 'in-wishlist' : ''}`}
                onClick={() => handleWishlistToggle(product)}
              >
                {isProductInWishlist(product.productId) ? <AiFillHeart /> : <FiHeart />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;