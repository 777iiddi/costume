
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
  onSubmit: (data: any) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      name: ""
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Ajouter une Catégorie</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la Catégorie</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez le nom de la catégorie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Ajouter Catégorie
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
