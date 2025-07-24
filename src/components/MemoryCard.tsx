import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Heart, Camera, Play } from 'lucide-react';
import { Memory, MediaItem } from '../types';
import { getMainImage, getFallbackImage, getGalleryItems } from '../utils/mediaUtils';
import MediaModal from './MediaModal';

interface MemoryCardProps {
  memory: Memory;
  index: number;
  chapterId: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index, chapterId }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasGallery, setHasGallery] = useState(false);

  const mainImageSrc = imageError ? getFallbackImage() : getMainImage(chapterId, index);

  // Carregar itens da galeria
  useEffect(() => {
    const loadGalleryItems = async () => {
      if (memory.hasGallery) {
        const items = await getGalleryItems(chapterId, index);
        setGalleryItems(items);
        setHasGallery(items.length > 0);
      }
    };

    loadGalleryItems();
  }, [chapterId, index, memory.hasGallery]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    if (hasGallery && galleryItems.length > 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`animate-fade-in bg-white rounded-2xl shadow-lg overflow-hidden border border-warm-gray/20 hover:shadow-xl transition-all duration-300 ${
          hasGallery ? 'cursor-pointer' : ''
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={mainImageSrc}
            alt={memory.caption}
            className={`w-full h-64 md:h-80 object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
          
          {/* Overlay com indicador de galeria */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            {hasGallery && (
              <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                {galleryItems.some(item => item.type === 'video') ? (
                  <Play className="text-white" size={16} />
                ) : (
                  <Camera className="text-white" size={16} />
                )}
              </div>
            )}
          </div>
          
          {/* Indicador de quantidade de itens */}
          {hasGallery && galleryItems.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-cormorant">
              +{galleryItems.length}
            </div>
          )}
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
          
          {hasGallery && (
            <div className="mt-4 text-center">
              <p className="font-cormorant text-xs text-medium-gray">
                Clique para ver mais fotos e vídeos
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de galeria */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={galleryItems}
        initialIndex={0}
        memoryCaption={memory.caption}
      />
    </>
  );
};

export default MemoryCard;