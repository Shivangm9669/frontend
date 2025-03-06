import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../type';
 // Optional: Create this file later for styling

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (user) {
      addToCart({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrls: product.imageUrls,
      });
    } else {
      alert('Please login to add items to the cart.');
    }
  };

  const handleAddToWishlist = () => {
    if (user) {
      toggleWishlist(product.productId);
    } else {
      alert('Please login to add items to the wishlist.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrls[0]} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Price: ₹{product.price}</p>
        <p>Rating: ⭐{product.rating}</p>
        <div className="product-actions">
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={!user}
          >
            🛒 Add to Cart
          </button>
          <button 
            className="add-to-wishlist-btn" 
            onClick={handleAddToWishlist}
            disabled={!user}
          >
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
