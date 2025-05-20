
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { products } = useStore();
  
  // Filter products by category name from URL parameter
  const categoryProducts = categoryName === 'promotions' 
    ? products.filter((_, index) => index % 5 === 0 || index % 7 === 0) // For promotions
    : products.filter(product => product.category === categoryName);
  
  const title = categoryName === 'promotions' 
    ? 'Promotions & Meilleures Ventes' 
    : `Collection ${categoryName}`;
  
  const isPromotions = categoryName === 'promotions';
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        
        <div className={`py-6 px-8 mb-8 rounded-lg ${isPromotions ? 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200' : 'bg-gray-50'}`}>
          <h1 className={`text-3xl font-bold ${isPromotions ? 'text-red-800' : ''}`}>
            {title}
            <span className="block text-lg font-normal mt-2">
              {categoryProducts.length} articles disponibles
            </span>
          </h1>
        </div>
        
        {categoryProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
