
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ProductGrid from '../components/ProductGrid';
import WhatsAppButton from '../components/WhatsAppButton';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, categories } = useStore();
  
  // Create a special "Best Sales/Promotions" category with selected products
  const bestSalesProducts = products
    .filter((_, index) => index % 5 === 0 || index % 7 === 0) // Just a way to select some products
    .slice(0, 3);
  
  // Group products by category
  const groupedProducts = categories.reduce((groups: {[key: string]: typeof products}, category) => {
    const categoryProducts = products.filter(p => p.category === category.name).slice(0, 3);
    if (categoryProducts.length > 0) {
      groups[category.name] = categoryProducts;
    }
    return groups;
  }, {});

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };
  
  return (
    <Layout>
      <Banner />
      
      <div className="space-y-12">
        {/* Best Sales/Promotions section with distinct styling */}
        <div className="py-4 px-6 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
          <h2 
            className="text-2xl font-semibold mb-6 text-red-800 cursor-pointer hover:underline transition-all flex items-center"
            onClick={() => handleCategoryClick('promotions')}
          >
            Promotions & Meilleures Ventes
            <span className="ml-2 text-sm">(Voir tout)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSalesProducts.map(product => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  -20%
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Regular categories */}
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="py-4">
            <h2 
              className="text-2xl font-semibold mb-6 cursor-pointer hover:underline transition-all flex items-center"
              onClick={() => handleCategoryClick(category)}
            >
              Collection {category}
              <span className="ml-2 text-sm">(Voir tout)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <WhatsAppButton />
    </Layout>
  );
};

export default HomePage;
