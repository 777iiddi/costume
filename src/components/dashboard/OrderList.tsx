
import React, { useState } from 'react';
import { Order } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface OrderListProps {
  orders: Order[];
  onSendEmail: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onSendEmail }) => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Aucune commande disponible</h2>
        <p className="text-gray-500 text-center">Les commandes des clients s'afficheront ici une fois passées.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Commandes Clients ({orders.length})</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>ID Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <TableRow className="cursor-pointer" onClick={() => toggleOrderExpand(order.id)}>
                <TableCell>
                  {expandedOrders.includes(order.id) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total.toFixed(2)} MAD</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`
                  }>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSendEmail(order);
                    }}
                  >
                    Notifier
                  </Button>
                </TableCell>
              </TableRow>
              
              {expandedOrders.includes(order.id) && (
                <TableRow>
                  <TableCell colSpan={8} className="bg-gray-50 p-0">
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Détails de la commande</h3>
                      <div className="border rounded divide-y">
                        {order.items.map((item, index) => (
                          <div key={index} className="p-3 flex flex-wrap items-center">
                            <div className="w-16 h-16 mr-4">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                                <span>Quantité: {item.quantity}</span>
                                <span>Prix unitaire: {item.product.price.toFixed(2)} MAD</span>
                                <span>Total: {(item.product.price * item.quantity).toFixed(2)} MAD</span>
                              </div>
                              <div className="flex flex-wrap gap-3 mt-2">
                                {item.selectedSize && (
                                  <Badge variant="outline" className="bg-blue-50">
                                    Taille: {item.selectedSize}
                                  </Badge>
                                )}
                                {item.selectedColor && (
                                  <Badge variant="outline" className="bg-purple-50">
                                    Couleur: {item.selectedColor}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
