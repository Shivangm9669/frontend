import{ createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

// Define CartContext type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

// Create CartContext
const CartContext = createContext<CartContextType | null>(null);

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext)!;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();  // Get user and token from AuthContext
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔄 Fetch cart data from API on mount if logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        try {
          const response = await axios.get(`http://localhost:5008/api/Cart/${user.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(response.data.products);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      }
    };
    fetchCart();
  }, [user, token]);


  const addToCart = async (item: CartItem) => {
    if (!user || !token) return; 
    try {
      const response = await axios.post(
        `http://localhost:5008/api/Cart/${user.userId}/add`,
        { productId: item.productId, quantity: item.quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.products);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // ❌ Remove item from cart API
  const removeFromCart = async (productId: number) => {
    if (!user || !token) return;
    try {
      const response = await axios.delete(
        `http://localhost:5008/api/Cart/${user.userId}/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.products);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  // 🗑️ Clear cart API
  const clearCart = async () => {
    if (!user || !token) return;
    try {
      await axios.delete(`http://localhost:5008/api/Cart/${user.userId}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
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
