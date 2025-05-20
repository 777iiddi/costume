
import React, { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Category } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductFormProps {
  categories: Category[];
  onSubmit: (data: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ categories, onSubmit }) => {
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: ""
    }
  });

  const handleSubmit = (data: any) => {
    // Include sizes and colors in the submitted data
    const formData = {
      ...data,
      sizes: sizes.length > 0 ? sizes : undefined,
      colors: colors.length > 0 ? colors : undefined
    };
    
    onSubmit(formData);
    form.reset();
    setSizes([]);
    setColors([]);
  };

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      setNewSize('');
    }
  };

  const removeSize = (size: string) => {
    setSizes(sizes.filter(s => s !== size));
  };

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor('');
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter(c => c !== color));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Ajouter un Produit</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du Produit</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez le nom du produit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Entrez le prix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <select 
                    className="w-full border border-gray-300 rounded-md p-2"
                    {...field}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                    <option value="promotions">Promotions</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de l'image</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez l'URL de l'image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Sizes Input */}
          <div className="space-y-2">
            <FormLabel>Tailles</FormLabel>
            <div className="flex gap-2">
              <Input 
                value={newSize} 
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Ajouter une taille (ex: S, M, L)" 
              />
              <Button type="button" onClick={addSize} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {sizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((size) => (
                  <Badge key={size} variant="outline" className="flex items-center gap-1">
                    {size}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSize(size)} 
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Colors Input */}
          <div className="space-y-2">
            <FormLabel>Couleurs</FormLabel>
            <div className="flex gap-2">
              <Input 
                value={newColor} 
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Ajouter une couleur (ex: Noir, Bleu)" 
              />
              <Button type="button" onClick={addColor} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color) => (
                  <Badge key={color} variant="outline" className="flex items-center gap-1">
                    {color}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeColor(color)} 
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Entrez la description du produit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Ajouter Produit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
