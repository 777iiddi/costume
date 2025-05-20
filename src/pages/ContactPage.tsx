
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form submission:", data);
      toast.success("Message envoyé avec succès!");
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-3 text-blue-800">Contactez-nous</h1>
          <p className="text-blue-600">Nous sommes là pour vous aider. N'hésitez pas à nous contacter.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} className="hover:border-blue-300 focus:border-blue-500 transition-colors" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Votre email" 
                          {...field} 
                          className="hover:border-blue-300 focus:border-blue-500 transition-colors" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Sujet de votre message" 
                          {...field} 
                          className="hover:border-blue-300 focus:border-blue-500 transition-colors" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Écrivez votre message ici" 
                          className="min-h-[200px] hover:border-blue-300 focus:border-blue-500 transition-colors" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span>Envoyer le message</span>
                  )}
                  <span className="absolute bottom-0 left-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-lg text-white shadow-lg mb-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start transform hover:translate-x-2 transition-transform">
                  <MapPin className="h-6 w-6 mr-3 text-white" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-blue-100">Siège social<br />Casablanca, Maroc</p>
                  </div>
                </div>
                
                <div className="flex items-start transform hover:translate-x-2 transition-transform">
                  <Phone className="h-6 w-6 mr-3 text-white" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-blue-100">+212 610 284 374</p>
                  </div>
                </div>
                
                <div className="flex items-start transform hover:translate-x-2 transition-transform">
                  <Mail className="h-6 w-6 mr-3 text-white" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-blue-100">contact@laika.ma</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
              <h3 className="font-medium mb-3">Heures d'ouverture</h3>
              <div className="space-y-2">
                <p className="flex justify-between border-b pb-2">
                  <span>Lundi - Vendredi:</span> 
                  <span className="font-medium">9h - 18h</span>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <span>Samedi:</span> 
                  <span className="font-medium">10h - 16h</span>
                </p>
                <p className="flex justify-between">
                  <span>Dimanche:</span> 
                  <span className="font-medium">Fermé</span>
                </p>
              </div>
              
              <div className="mt-8 h-48 w-full rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.1467961375966!2d-7.6335238242670945!3d33.59931647333296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2e9d036d01f%3A0x7ac946ed7408d97f!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1716300171303!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Laika Store Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
