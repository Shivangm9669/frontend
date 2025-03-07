// src/services/api.ts

import axios from 'axios';
import {Product } from '../type';

const API_BASE_URL = 'http://localhost:5008/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = async (name: string, email: string, password: string) => {
  await api.post('/Auth/register', { name, email, password });
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/Auth/login', { email, password });
  return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/Product');
  console.log('api page Products:', response.data);
  return response.data;
};


export const fetchCategories = async () => {
  const response = await api.get('/Category');
  return response.data;
};

export const fetchWishlist = async (userId: number) => {
  const response = await api.get(`/Wishlist/user/${userId}`);
  return response.data;
};

export const addProducttoWishlist = async (userId: number, productId: number) => {
  console.log('addProducttoWishlist:', userId, productId);
  try {
    await api.post(`/Wishlist/${userId}/add`, productId);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error:', error.response?.data || error.message);
    } else {
      console.log('Error:', error);
    }
  }
};


export const removeProductFromWishlist = async (userId: number, productId: number) => {
  await api.delete(`/Wishlist/${userId}/remove/${productId}`, );
};

