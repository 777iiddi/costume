
import React from 'react';
import { Category } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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

interface CategoryListProps {
  categories: Category[];
  onDelete: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Liste des Catégories</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmer la suppression</DialogTitle>
                      <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer cette catégorie? Cette action est irréversible.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                      </DialogClose>
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          onDelete(category.id);
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

export default CategoryList;
