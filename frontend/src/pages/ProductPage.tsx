import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';


const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useProducts();

  const product = products.find((p) => p.productId === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <h1>Product Details</h1>
      <ProductCard product={product} />
    </div>
  );
};

export default ProductPage;