
import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import Layout from '@/components/Layout';
import { toast } from "@/components/ui/sonner";
import { Order } from '@/types';

// Import the refactored components
import LoginForm from '@/components/dashboard/LoginForm';
import TabsPanel from '@/components/dashboard/TabsPanel';

const DashboardPage = () => {
  const { 
    products, 
    addProduct, 
    updateProduct,
    deleteProduct,
    addCategory, 
    deleteCategory,
    categories, 
    orders 
  } = useStore();

  // Basic auth simulation
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Log orders to debug
    console.log("Available orders in dashboard:", orders);
  }, [orders]);

  const handleSendEmail = (order: Order) => {
    // Logic for sending email would go here (Email.js integration)
    toast.success(`Notification envoyée à ${order.customerEmail}`);
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <TabsPanel 
          products={products}
          categories={categories}
          orders={orders}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
          onSendEmail={handleSendEmail}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;
