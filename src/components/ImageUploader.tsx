
import React, { useState, useRef, DragEvent } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-8 border-2 border-dashed transition-all duration-300 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } ${preview ? 'border-solid' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview && (
        <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-20" />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        {preview ? (
            <ImageIcon size={48} className="text-blue-500" />
        ) : (
            <UploadCloud size={48} className="text-gray-400" />
        )}
        <h3 className="text-xl font-semibold text-gray-700">
          {preview ? '¡Imagen Cargada!' : 'Arrastra y suelta la foto de tu destino'}
        </h3>
        <p className="text-gray-500">o si prefieres</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          disabled={isLoading}
        />
        <button
          onClick={handleBrowseClick}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analizando...' : 'Busca en tu dispositivo'}
        </button>
        {isLoading && <p className="text-sm text-gray-500 animate-pulse">Generando tu aventura...</p>}
      </div>
    </motion.div>
  );
};

export default ImageUploader;
