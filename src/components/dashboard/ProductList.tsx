
import React, { useState } from 'react';
import { Product, Category } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, PenLine, Trash, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onEdit: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, categories, onEdit, onDelete }) => {
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  
  const editProductForm = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: ""
    }
  });

  React.useEffect(() => {
    if (editingProduct) {
      editProductForm.reset({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        description: editingProduct.description,
        image: editingProduct.image,
        category: editingProduct.category
      });
      
      // Initialize sizes and colors if they exist
      setSizes(editingProduct.sizes || []);
      setColors(editingProduct.colors || []);
    }
  }, [editingProduct, editProductForm]);

  const handleEditProductSubmit = (data: any) => {
    if (!editingProduct) return;
    
    onEdit(editingProduct.id, {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image,
      category: data.category,
      sizes: sizes.length > 0 ? sizes : undefined,
      colors: colors.length > 0 ? colors : undefined
    });
    
    setEditingProduct(null);
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
    <div className="bg-white p-6 rounded-lg shadow max-h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Liste des Produits</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Propriétés</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.score}</TableCell>
              <TableCell className="text-xs">
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-1">
                    Tailles: {product.sizes.join(', ')}
                  </div>
                )}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    Couleurs: {product.colors.join(', ')}
                  </div>
                )}
              </TableCell>
              <TableCell className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier le Produit</DialogTitle>
                      <DialogDescription>
                        Modifiez les détails du produit et cliquez sur Enregistrer.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...editProductForm}>
                      <form onSubmit={editProductForm.handleSubmit(handleEditProductSubmit)} className="space-y-4">
                        <FormField
                          control={editProductForm.control}
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
                          control={editProductForm.control}
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
                          control={editProductForm.control}
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
                          control={editProductForm.control}
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
                          control={editProductForm.control}
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
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                          </DialogClose>
                          <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmer la suppression</DialogTitle>
                      <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer ce produit? Cette action est irréversible.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                      </DialogClose>
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          onDelete(product.id);
                          document.querySelector('[data-state="open"]')?.setAttribute('data-state', 'closed');
                        }}
                      >
                        Supprimer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
