import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchWishlist, addProducttoWishlist, removeProductFromWishlist } from '../services/api';
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
      console.log('Loading wishlist for user ID:', user.userId);
      const response = await fetchWishlist(user.userId);
      console.log('Wishlist loaded:', response);
      console.log('Wishlist loaded:', response.products);
      setWishlist(response.products);
    }
  };

  const toggleWishlist = async (productId: number) => {
    if (user) {
      const isProductInWishlist = wishlist.some(item => item.productId === productId);
      console.log('Toggling wishlist for product ID:', productId, 'Is in wishlist:', isProductInWishlist);
      if (isProductInWishlist) {
        await removeProductFromWishlist(user.userId, productId);
        console.log('Product removed from wishlist:', productId);
      } else {
        await addProducttoWishlist(user.userId, productId);
        console.log('Product added to wishlist:', productId);
      }
      await loadWishlist();
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
