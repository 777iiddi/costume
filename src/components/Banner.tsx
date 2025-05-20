
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=2000",
    alt: "Premium Suit Collection"
  },
  {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000",
    alt: "Elegant Business Attire"
  },
  {
    url: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=2000",
    alt: "Luxury Formal Wear"
  }
];

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-96 overflow-hidden relative mb-8">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {bannerImages.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center flex-col">
                <h2 className="text-4xl font-bold text-white mb-2 text-center">Laika - L'élégance sur mesure</h2>
                <p className="text-xl text-white text-center max-w-2xl px-4">
                  Révélez votre style avec notre collection exclusive de costumes de haute qualité
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default Banner;
