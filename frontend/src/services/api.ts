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
  return response.data;
};


export const fetchCategories = async () => {
  const response = await api.get('/Category');
  return response.data;
};

export const fetchWishlist = async (userId: number) => {
  const response = await api.get(`/Wishlist/${userId}`);
  return response.data;
};

export const updateWishlist = async (wishlistId: number, productIds: number[]) => {
  await api.put(`/Wishlist/${wishlistId}`, { productIds });
};
