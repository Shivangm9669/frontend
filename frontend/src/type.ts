export interface User {
    userId: number;
    name: string;
    email: string;
    isPremium: boolean;
  }
  
  export interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    categoryId: number;
    imageUrls: string[];
  }
  
  export interface Category {
    categoryId: number;
    name: string;
  }