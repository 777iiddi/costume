
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Category } from '../types';
import { products as initialProducts } from '../data/products';
import { toast } from '@/components/ui/sonner';

// Updated categories to match the requested suit categories
const initialCategories: Category[] = [
  { id: '1', name: 'Tuxedos' },
  { id: '2', name: 'Business' },
  { id: '3', name: 'Casual' },
  { id: '4', name: 'Modern' },
  { id: '5', name: 'Promotions' }
];

// Sample initial orders
const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { 
        product: initialProducts[0], 
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Noir'
      }
    ],
    total: initialProducts[0].price,
    status: 'completed',
    date: '2025-05-15'
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { 
        product: initialProducts[1], 
        quantity: 2,
        selectedSize: 'L',
        selectedColor: 'Bleu'
      }
    ],
    total: initialProducts[1].price * 2,
    status: 'pending',
    date: '2025-05-16'
  }
];

// Update products to match our categories
const updatedProducts = initialProducts.map((product, index) => {
  // Distribute products among our four categories
  const categoryIndex = index % 4;
  const category = initialCategories[categoryIndex].name;
  
  // Add sizes and colors to products
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Noir', 'Bleu', 'Gris', 'Marron'];
  
  return { 
    ...product, 
    category,
    sizes: sizes.slice(0, 3 + (index % 4)), // Give different products different size options
    colors: colors.slice(0, 2 + (index % 3)) // Give different products different color options
  };
});

interface StoreContextProps {
  products: Product[];
  recommendedProducts: Product[];
  cart: CartItem[];
  categories: Category[];
  orders: Order[];
  addToCart: (product: Product & { selectedSize?: string, selectedColor?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  recordView: (productId: string) => void;
  recordPurchase: (productId: string) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  submitOrder: (customerName: string, customerEmail: string, city: string) => Order | void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// Load data from localStorage or use initial data
const loadFromStorage = <T,>(key: string, initialData: T): T => {
  if (typeof window === 'undefined') return initialData;
  
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : initialData;
};

// Save data to localStorage
const saveToStorage = <T,>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => 
    loadFromStorage<Product[]>('store_products', updatedProducts)
  );
  
  const [cart, setCart] = useState<CartItem[]>(() => 
    loadFromStorage<CartItem[]>('store_cart', [])
  );
  
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  
  const [categories, setCategories] = useState<Category[]>(() => 
    loadFromStorage<Category[]>('store_categories', initialCategories)
  );
  
  const [orders, setOrders] = useState<Order[]>(() => 
    loadFromStorage<Order[]>('store_orders', initialOrders)
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage('store_products', products);
  }, [products]);
  
  useEffect(() => {
    saveToStorage('store_cart', cart);
  }, [cart]);
  
  useEffect(() => {
    saveToStorage('store_categories', categories);
  }, [categories]);
  
  useEffect(() => {
    saveToStorage('store_orders', orders);
    console.log("Orders updated and saved to localStorage:", orders);
  }, [orders]);

  // Update recommendations whenever product scores change
  useEffect(() => {
    const sorted = [...products].sort((a, b) => b.score - a.score);
    setRecommendedProducts(sorted.slice(0, 4)); // Top 4 products
  }, [products]);

  // Record a view (score +1)
  const recordView = (productId: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, score: product.score + 1 } 
          : product
      )
    );
  };

  // Record a purchase (score +5)
  const recordPurchase = (productId: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, score: product.score + 5 } 
          : product
      )
    );
  };

  const addToCart = (product: Product & { selectedSize?: string, selectedColor?: string }) => {
    const { selectedSize, selectedColor, ...productData } = product;
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => 
        item.product.id === productData.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
      );
      
      if (existingItemIndex >= 0) {
        return prevCart.map((item, index) => 
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        toast.success(`${productData.name} ajouté au panier`);
        return [...prevCart, { 
          product: productData, 
          quantity: 1,
          selectedSize,
          selectedColor
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    toast.success(`Produit ${product.name} ajouté`);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, ...updatedProduct } 
          : product
      )
    );
    toast.success("Produit mis à jour");
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success("Produit supprimé");
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
    toast.success(`Catégorie ${category.name} ajoutée`);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    toast.success("Catégorie supprimée");
  };

  const submitOrder = (customerName: string, customerEmail: string, city: string): Order | void => {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: `ORD${orders.length + 1}`.padStart(6, '0'),
      customerName,
      customerEmail,
      items: [...cart],
      total,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update the orders state immediately
    setOrders(prevOrders => [...prevOrders, newOrder]);
    
    // Record purchases for all items in cart
    cart.forEach(item => {
      recordPurchase(item.product.id);
    });
    
    clearCart();
    console.log("New order added:", newOrder);
    return newOrder;
  };

  return (
    <StoreContext.Provider value={{ 
      products, 
      recommendedProducts,
      cart, 
      categories,
      orders,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      recordView,
      recordPurchase,
      clearCart,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      deleteCategory,
      submitOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
