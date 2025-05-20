
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFound from "./pages/NotFound";

// Create a new QueryClient for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StoreProvider>
  </QueryClientProvider>
);

export default App;
