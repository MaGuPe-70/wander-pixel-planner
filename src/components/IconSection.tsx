
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface IconSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}

const IconSection: React.FC<IconSectionProps> = ({ icon, title, children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="bg-white/60 backdrop-blur-sm border-blue-100/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-300 p-3 rounded-lg text-white shadow-md">
            {icon}
          </div>
          <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600">{children}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IconSection;
