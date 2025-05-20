
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './ui/button';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, recordView } = useStore();
  const navigate = useNavigate();

  const handleClick = () => {
    recordView(product.id);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col animate-fade-in">
      <div 
        className="w-full h-48 bg-gray-200 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div 
        className="flex-1 p-4 cursor-pointer"
        onClick={handleClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </div>
      <div className="p-4 pt-0 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">{product.price.toFixed(2)} MAD</p>
        <Button 
          size="sm" 
          className="transition-transform hover:scale-105 active:scale-95" 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
