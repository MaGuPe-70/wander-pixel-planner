
import React, { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import TravelPlan, { TravelPlanData } from '@/components/TravelPlan';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

// Datos de ejemplo para simular la respuesta de la IA
const sampleTravelPlan: TravelPlanData = {
  destination: 'París, Francia',
  flights: { airline: 'Air France', price: '$750' },
  hotel: { name: 'Le Bristol Paris', rating: 5 },
  activities: [
    'Visita a la Torre Eiffel y el Louvre',
    'Paseo en barco por el río Sena',
    'Explorar el barrio de Montmartre',
    'Disfrutar de la gastronomía en Le Marais',
  ],
  nearby: [
    'Excursión de un día al Palacio de Versalles',
    'Visita a los jardines de Giverny de Monet',
  ],
};

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlanData | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setIsLoading(true);
    setTravelPlan(null); // Limpiar plan anterior
    
    // Simular el procesamiento de la IA
    setTimeout(() => {
      setTravelPlan(sampleTravelPlan);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-white text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="inline-flex items-center gap-3"
          >
            <Compass className="text-blue-500" size={40} />
            <h1 className="text-5xl font-extrabold tracking-tight">
              Aventura IA
            </h1>
          </motion.div>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Sube una foto de un lugar y deja que nuestra IA cree el plan de viaje perfecto para ti.
          </motion.p>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {!travelPlan ? (
              <motion.div
                key="uploader"
                exit={{ opacity: 0, y: -50 }}
              >
                <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
              </motion.div>
            ) : (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <TravelPlan plan={travelPlan} />
                  <div className="text-center mt-8">
                    <button
                        onClick={() => setTravelPlan(null)}
                        className="bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Planear otro viaje
                    </button>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="text-center mt-16 text-sm text-gray-500">
            <p>Creado con ❤️ por Lovable.dev</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
