
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { motion } from "@/components/ui/motion";

const AboutPage: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1615310119353-aa4179bad1a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Elegant Tailor Studio"
    },
    {
      url: "https://images.unsplash.com/photo-1626497624772-f66d8a368801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Premium Suit Fabric"
    },
    {
      url: "https://images.unsplash.com/photo-1541346183200-e8e117d945b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Luxury Suit Store"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="w-full h-96 overflow-hidden relative mb-12 rounded-lg shadow-xl">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {bannerImages.map((image, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h2 className="text-4xl font-bold animate-fade-in">Laïka - Collection de Luxe</h2>
                      <p className="text-xl mt-2 animate-fade-in">Élégance et qualité depuis 1990</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-center animate-fade-in">À propos de Laïka</h1>
        
        <div className="prose max-w-none bg-white p-8 rounded-lg shadow-lg">
          <motion.p className="text-lg mb-6 leading-relaxed">
            La société Laïka a été créée en 1990. Elle commercialise et distribue des produits haut de gamme 
            pour homme (costume, veste, pantalon, chemise et accessoires) sous l'enseigne 303. 
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12 my-12">
            <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1590330297563-0a2e21917542?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Elegance in tailoring"
                className="w-full h-64 object-cover object-center"
              />
            </div>
            <div>
              <p className="mb-6 leading-relaxed">
                Une boutique à Agadir, 3 à Casablanca, un corner aux galeries lafayette, 1 à Marrakech, 
                2 à Rabat ainsi que 2 destockers forment aujourd'hui pour Laïka une plate forme cohérente 
                d'attaque du marché marocain.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-12 mb-6 border-b pb-2">Nos marques</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-inner">
            <p className="mb-6 leading-relaxed">
              Les principales marques commercialisées par la société Laïka sont : John Ray, VG, Daniel Hechter, 
              Emporio Uomo, Bdelssarini, Dielmar, Otto Kern, Jupiter, Pionier.
            </p>
          </div>
          
          <p className="mb-6 leading-relaxed">
            Elle regroupe à travers ses licences des produits importés et fabriqués par ses partenaires internationaux. 
            L'ensemble est organisé par le siège de la société situé à Casablanca.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg my-8 shadow-sm">
            <p className="mb-6 leading-relaxed">
              Ce réseau bénéficie d'une assistance merchandising et d'une communication destinés à valoriser l'enseigne. 
              Pour fédérer, fidéliser, contrôler les opérateurs des différents réseaux, Laïka, développe des 
              programmes d'assitance, de soutien, de relance et de suivi de sa clientèle.
            </p>
          </div>
          
          <p className="mb-6 font-medium text-lg">
            La formation de la force de vente est aujourdh'ui un complément indispensable à la commercialisation.
          </p>
          
          <p className="mb-6 leading-relaxed">
            Pour maintenir ces acquis et mieux répondre à une demande de plus en plus segmentée accrue de diversification, 
            Laïka est en prise direct avec les tendances internationales de la mode masculine.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-6 border-b pb-2 flex items-center">
            <span className="animate-pulse mr-2">📍</span> Notre emplacement
          </h2>
          
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg mb-8 hover:shadow-xl transition-all">
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
          
          <div className="grid md:grid-cols-2 gap-12 my-12">
            <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1594938298612-8cde98582e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" 
                alt="Premium suit display"
                className="w-full h-64 object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Visitez nos boutiques</h3>
              <p className="mb-6 leading-relaxed">
                Découvrez l'élégance Laïka dans l'une de nos boutiques au Maroc. Nos conseillers vous accompagneront 
                pour trouver le costume qui vous correspond parfaitement. Nous offrons également un service de retouche 
                sur mesure pour garantir un ajustement impeccable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
