import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { ShoppingBag, Info, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const { cart, categories } = useStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold text-gray-900 hover:scale-105 transition-transform">
              Laika
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger asChild>
                    <button className={navigationMenuTriggerStyle()}>
                      Articles <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48 p-2">
                    <DropdownMenuItem
                      className="cursor-pointer font-medium text-red-600 hover:text-red-800"
                      onClick={() => handleCategoryClick('promotions')}
                    >
                      Promotions
                    </DropdownMenuItem>
                    {categories.map(category => (
                      <DropdownMenuItem
                        key={category.id}
                        className="cursor-pointer"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Info className="mr-2 h-4 w-4" /> À propos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/mehdi">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    🌟 Mehdi
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/youness">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    🌟 Youness
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/checkout">
                  <Button variant="outline" className="relative group">
                    <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
