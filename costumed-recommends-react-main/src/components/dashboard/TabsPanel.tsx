
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import OrderList from './OrderList';
import { Product, Category, Order } from '@/types';
import { toast } from "@/components/ui/sonner";

interface TabsPanelProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  onSendEmail: (order: Order) => void;
}

const TabsPanel: React.FC<TabsPanelProps> = ({
  products,
  categories,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onDeleteCategory,
  onSendEmail
}) => {
  const handleProductSubmit = (data: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image || "https://images.unsplash.com/photo-1508253578933-20b529302151?auto=format&fit=crop&q=80&w=500",
      category: data.category,
      score: 0,
      sizes: data.sizes,
      colors: data.colors
    };
    
    onAddProduct(newProduct);
  };

  const handleCategorySubmit = (data: any) => {
    // Check if category name already exists
    if (categories.some(cat => cat.name.toLowerCase() === data.name.toLowerCase())) {
      toast.error("Cette catégorie existe déjà");
      return;
    }
    
    const newCategory: Category = {
      id: Date.now().toString(),
      name: data.name
    };
    
    onAddCategory(newCategory);
    toast.success(`Catégorie ${data.name} ajoutée avec succès`);
  };

  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="orders">Commandes</TabsTrigger>
        <TabsTrigger value="products">Produits</TabsTrigger>
        <TabsTrigger value="categories">Catégories</TabsTrigger>
      </TabsList>
      
      <TabsContent value="products" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductForm 
            categories={categories}
            onSubmit={handleProductSubmit}
          />
          
          <ProductList 
            products={products}
            categories={categories}
            onEdit={onUpdateProduct}
            onDelete={onDeleteProduct}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="categories" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CategoryForm onSubmit={handleCategorySubmit} />
          
          <CategoryList 
            categories={categories}
            onDelete={onDeleteCategory}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="orders" className="space-y-6">
        <OrderList 
          orders={orders}
          onSendEmail={onSendEmail}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsPanel;
