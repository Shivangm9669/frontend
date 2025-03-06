import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

import { AiFillHeart } from 'react-icons/ai';
import '../style/wishlist-page-style.css'; // Import the CSS file

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products } = useProducts();

  // Enrich each wishlist item using product details from products context
  const wishlistWithProducts = wishlist.map((wItem) => {
    const product = products.find((p) => p.productId === wItem.productId);
    return {
      productId: wItem.productId,
      name: product?.name || 'Unknown Product',
      price: product?.price || 0,
      imageUrls: product?.imageUrls || ['https://via.placeholder.com/150']
    };
  });

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlistWithProducts.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items-container">
          {wishlistWithProducts.map((item) => (
            <div key={item.productId} className="wishlist-item">
              <img
                src={item.imageUrls[0]}
                alt={item.name}
                className="wishlist-item-image"
              />
              <div className="wishlist-item-details">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <button onClick={() => toggleWishlist(item.productId)}>
                  <AiFillHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
