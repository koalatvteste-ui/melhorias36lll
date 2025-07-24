import React, { useState } from 'react';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="animate-fade-in bg-white rounded-2xl shadow-lg overflow-hidden border border-warm-gray/20 hover:shadow-xl transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={memory.image}
          alt={memory.caption}
          className={`w-full h-64 md:h-80 object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="font-dancing text-2xl text-charcoal mb-3">
          {memory.caption}
        </h3>
        
        <div className="space-y-2 mb-4">
          {memory.location && (
            <div className="flex items-center text-medium-gray">
              <MapPin size={16} className="mr-2 text-rose-gold" />
              <span className="font-cormorant text-sm">{memory.location}</span>
            </div>
          )}
          
          {memory.date && (
            <div className="flex items-center text-medium-gray">
              <Calendar size={16} className="mr-2 text-rose-gold" />
              <span className="font-cormorant text-sm">{memory.date}</span>
            </div>
          )}
        </div>
        
        {memory.note && (
          <div className="bg-soft-gray p-4 rounded-lg border-l-4 border-rose-gold">
            <div className="flex items-start">
              <Heart size={16} className="text-rose-gold mr-2 mt-1 flex-shrink-0" />
              <p className="font-cormorant text-sm text-charcoal italic leading-relaxed">
                {memory.note}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;