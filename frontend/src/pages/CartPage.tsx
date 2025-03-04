import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty 🛒</div>;
  }

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
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
