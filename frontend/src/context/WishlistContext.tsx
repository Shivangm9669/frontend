import { createContext, useContext, useState, ReactNode } from 'react';
import { fetchWishlist, updateWishlist } from '../services/api';
import { useAuth } from './AuthContext';

interface WishlistItem {
  productId: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  categoryId: number;
  imageUrls: string[];
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (productId: number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => useContext(WishlistContext)!;

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { user } = useAuth();

  const loadWishlist = async () => {
    if (user) {
      const response = await fetchWishlist(user.userId);
      setWishlist(response.data.products);
    }
  };

  const toggleWishlist = async (productId: number) => {
    if (user) {
      await updateWishlist(user.userId, [productId]);
      await loadWishlist();
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
