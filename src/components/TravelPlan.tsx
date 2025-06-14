
import React from 'react';
import { Hotel, Map, Ticket } from 'lucide-react';
import IconSection from './IconSection';
import { motion } from 'framer-motion';

export interface TravelPlanData {
  destination: string;
  flights: { airline: string; price: string };
  hotel: { name: string; rating: number };
  activities: string[];
  nearby: string[];
}

interface TravelPlanProps {
  plan: TravelPlanData;
}

const TravelPlan: React.FC<TravelPlanProps> = ({ plan }) => {
  return (
    <motion.div 
      className="space-y-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-4xl font-bold text-center text-gray-800 tracking-tight"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Your Adventure in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">{plan.destination}</span> Awaits
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IconSection icon={<Ticket size={24} />} title="Flights" delay={0.4}>
          <p>Airline: <strong>{plan.flights.airline}</strong></p>
          <p>Estimated price: <strong>{plan.flights.price}</strong> (round trip)</p>
        </IconSection>

        <IconSection icon={<Hotel size={24} />} title="Suggested Accommodation" delay={0.5}>
          <p>Hotel: <strong>{plan.hotel.name}</strong></p>
          <p>Rating: <strong>{'★'.repeat(plan.hotel.rating)}{'☆'.repeat(5 - plan.hotel.rating)}</strong></p>
        </IconSection>

        <IconSection icon={<Map size={24} />} title="Must-Do Activities" delay={0.6}>
          <ul className="list-disc list-inside space-y-1">
            {plan.activities.map((activity, index) => <li key={index}>{activity}</li>)}
          </ul>
        </IconSection>

        <IconSection icon={<Map size={24} />} title="Explore Nearby" delay={0.7}>
           <ul className="list-disc list-inside space-y-1">
            {plan.nearby.map((place, index) => <li key={index}>{place}</li>)}
          </ul>
        </IconSection>
      </div>
    </motion.div>
  );
};

export default TravelPlan;
