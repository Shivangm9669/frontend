import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, fetchWishlist, fetchCategories } from '../services/api';
import { useAuth } from './AuthContext';
import { Product } from '../type';

interface Category {
  categoryId: number;
  name: string;
}

interface ProductContextType {
  products: Product[];
  wishlist: Product[];
  categories: Category[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      console.log('Products:', data);
      setProducts(data);
    };

    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        const data = await fetchWishlist(user.userId);
        setWishlist(data.products);
      }
    };

    loadWishlist();
  }, [user]);

  return (
    <ProductContext.Provider value={{ products, wishlist, categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
