
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CartItem, moroccanCities } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
}

const CheckoutPage = () => {
  const { cart, clearCart, submitOrder } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();
  
  // Calculate cart total
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const formatCartItems = (items: CartItem[]) => {
    return items.map(item => 
      `${item.product.name} x ${item.quantity} - Size: ${item.selectedSize || 'N/A'} - Color: ${item.selectedColor || 'N/A'} - ${(item.product.price * item.quantity).toFixed(2)} MAD`
    ).join('\n');
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (cart.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    
    if (!selectedCity) {
      toast.error("Veuillez sélectionner une ville");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create the order in our system with the selected city
      const order = submitOrder(data.name, data.email, selectedCity);
      
      // Only proceed with email if we have a valid order
      if (order) {
        // Prepare email data for EmailJS
        const emailData = {
          to_email: "yassinzguiouar@gmail.com", // Admin email
          from_name: data.name,
          from_email: data.email,
          subject: `New Order #${order.id}`,
          message: `
            Client: ${data.name}
            Email: ${data.email}
            Adresse: ${data.address}, ${selectedCity}, ${data.zip}
            
            Produits Commandés:
            ${formatCartItems(cart)}
            
            Total: ${total.toFixed(2)} MAD
            
            Notes Supplémentaires:
            ${data.notes || 'Aucune'}
          `
        };
        
        // Note: In a real implementation, you would send this to EmailJS
        // This is a simulated email sending (for demo purposes)
        console.log("Sending email with data:", emailData);
      }
      
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Commande passée avec succès!");
      navigate('/');
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Un problème est survenu lors du traitement de votre commande. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Finaliser la Commande</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Informations de Livraison</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom Complet</Label>
                    <Input 
                      id="name"
                      {...register('name', { required: "Le nom est requis" })}
                      placeholder="John Doe"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: "L'email est requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Adresse email invalide"
                        }
                      })}
                      placeholder="john@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address"
                    {...register('address', { required: "L'adresse est requise" })}
                    placeholder="123 Main St"
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Select onValueChange={setSelectedCity} value={selectedCity}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez une ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {moroccanCities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!selectedCity && <p className="text-amber-500 text-sm">Veuillez sélectionner une ville</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zip">Code Postal</Label>
                    <Input 
                      id="zip"
                      {...register('zip', { required: "Le code postal est requis" })}
                      placeholder="20000"
                      className={errors.zip ? "border-red-500" : ""}
                    />
                    {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes de Commande (Optionnel)</Label>
                  <Textarea 
                    id="notes"
                    {...register('notes')}
                    placeholder="Instructions spéciales pour la livraison"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isProcessing || cart.length === 0}
                >
                  {isProcessing ? "Traitement en cours..." : `Finaliser la Commande - ${total.toFixed(2)} MAD`}
                </Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
              
              {cart.length === 0 ? (
                <p>Votre panier est vide</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {(item.product.price * item.quantity).toFixed(2)} MAD
                        </span>
                      </div>
                      {item.selectedSize && (
                        <div className="text-sm text-gray-600">
                          Taille: {item.selectedSize}
                        </div>
                      )}
                      {item.selectedColor && (
                        <div className="text-sm text-gray-600">
                          Couleur: {item.selectedColor}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} MAD</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
