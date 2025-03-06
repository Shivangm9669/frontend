import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import '../style/cart-page-style.css';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { products } = useProducts();

  // Map cart items to their corresponding product details
  const cartItems = cart.map(cartItem => {
    const product = products.find(p => p.productId === cartItem.productId);
    return {
      ...cartItem,
      ...product
    };
  });

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="cart-empty">Your cart is empty 🛒</div>;
  }

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.productId}>
            <div className="item-info">
              <img src={item.imageUrls[0]} alt={item.name} className="item-image" />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.productId)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total Price: ₹{totalPrice}</p>
        <button className="clear-button" onClick={clearCart}>Clear Cart 🗑️</button>
      </div>
    </div>
  );
};

export default CartPage;
