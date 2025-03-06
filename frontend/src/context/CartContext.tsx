import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Define CartItem type
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrls: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => useContext(CartContext)!;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🛒 Fetch cart function (moved outside useEffect for reuse)
  const fetchCart = async () => {
    if (user && token) {
      console.log('Fetching cart for user ID:', user.userId);
      console.log('Token:', token);
      try {
        const response = await axios.get(`http://localhost:5008/api/Cart/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetch cart response:', response.data.items);
        setCart(response.data.items);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    }
  };

  // 🛒 Fetch cart on user or token change
  useEffect(() => {
    fetchCart();
  }, [user, token]);

  // ➕ Add to cart with auto-refresh
  const addToCart = async (item: CartItem) => {
    if (!user || !token) return;
    try {
      const response = await axios.post(
        `http://localhost:5008/api/Cart/${user.userId}/add`,
        { productId: item.productId, quantity: item.quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Add to cart response:', response.data);
      await fetchCart();  // 🔄 Refresh cart after adding
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // ❌ Remove from cart with auto-refresh
  const removeFromCart = async (productId: number) => {
    if (!user || !token) return;
    try {
      const response = await axios.delete(
        `http://localhost:5008/api/Cart/${user.userId}/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Remove from cart response:', response);
      await fetchCart();  // 🔄 Refresh cart after removal
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  // 🗑️ Clear cart with auto-refresh
  const clearCart = async () => {
    if (!user || !token) return;
    try {
      const response = await axios.delete(`http://localhost:5008/api/Cart/${user.userId}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Clear cart response:', response.data);
      setCart([]);  // Optional: clear cart immediately
      await fetchCart();  // 🔄 Refresh cart after clearing
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
