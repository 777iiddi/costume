
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <p className="text-center">Produit non trouvé</p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product, 
      selectedSize: selectedSize || undefined, 
      selectedColor: selectedColor || undefined
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden animate-fade-in">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
            
            {product.category === "promotions" && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                -20%
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">{(product.price).toFixed(2)} MAD</p>
            <p className="text-gray-600">{product.description}</p>
            
            {/* Category Badge */}
            <div className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
              {product.category}
            </div>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Taille:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-md transition-all ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Couleur:</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const colorMap: Record<string, string> = {
                      'noir': 'bg-black',
                      'blanc': 'bg-white',
                      'bleu': 'bg-blue-500',
                      'rouge': 'bg-red-500',
                      'vert': 'bg-green-500',
                      'gris': 'bg-gray-500',
                      'marron': 'bg-amber-800',
                      'navy': 'bg-indigo-900',
                    };
                    
                    const bgColor = colorMap[color.toLowerCase()] || 'bg-gray-300';
                    
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full ${bgColor} transition-all hover:scale-110 ${
                          selectedColor === color
                            ? 'ring-2 ring-offset-2 ring-blue-500'
                            : ''
                        }`}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart} 
              size="lg" 
              className="w-full mt-6 hover-scale transition-transform"
            >
              Ajouter au Panier
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
