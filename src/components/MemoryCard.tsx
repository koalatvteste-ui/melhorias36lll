import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Heart, Camera, Play, ExternalLink, Music, Navigation, Instagram } from 'lucide-react';
import { Memory, MediaItem } from '../types';
import { getMainImage, getFallbackImage, getGalleryItems, hasGalleryContent } from '../utils/mediaUtils';
import { getTotalMediaCount } from '../data/mediaManifest';
import MediaModal from './MediaModal';

interface MemoryCardProps {
  memory: Memory;
  chapterId: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, chapterId }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasGallery, setHasGallery] = useState(false);
  const [totalMediaCount, setTotalMediaCount] = useState(0);

  const mainImageSrc = imageError ? getFallbackImage() : getMainImage(chapterId, memory.id);

  // Carregar itens da galeria
  useEffect(() => {
    const loadGalleryItems = async () => {
      const hasContent = await hasGalleryContent(chapterId, memory.id);
      setHasGallery(hasContent);
      
      if (hasContent) {
        const items = await getGalleryItems(chapterId, memory.id);
        setGalleryItems(items);
        setTotalMediaCount(getTotalMediaCount(chapterId, memory.id));
      }
    };

    loadGalleryItems();
  }, [chapterId, memory.id]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    if (hasGallery && galleryItems.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'maps': return <Navigation size={14} />;
      case 'music': return <Music size={14} />;
      case 'social': return <Instagram size={14} />;
      default: return <ExternalLink size={14} />;
    }
  };

  const getLinkColor = (type: string) => {
    switch (type) {
      case 'maps': return 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      case 'music': return 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700';
      case 'social': return 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700';
      default: return 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
    }
  };
  return (
    <>
      <div 
        className={`group animate-fade-in bg-white rounded-2xl shadow-lg overflow-hidden border border-warm-gray/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 transform hover:-translate-y-2 ${
          hasGallery ? 'cursor-pointer' : ''
        } hover:border-rose-gold/30`}
        style={{ animationDelay: `${(memory.id - 1) * 0.1}s` }}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={mainImageSrc}
            alt={memory.caption}
            className={`w-full h-64 md:h-80 object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
          
          {/* Overlay com indicador de galeria */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            {hasGallery && (
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {galleryItems.some(item => item.type === 'video') ? (
                  <Play className="text-white" size={16} />
                ) : (
                  <Camera className="text-white" size={16} />
                )}
              </div>
            )}
          </div>
          
          {/* Indicador de quantidade de itens */}
          {hasGallery && totalMediaCount > 0 && (
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-cormorant transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
              +{totalMediaCount}
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
            <div className="bg-soft-gray p-4 rounded-lg border-l-4 border-rose-gold mb-4">
              <div className="flex items-start">
                <Heart size={16} className="text-rose-gold mr-2 mt-1 flex-shrink-0" />
                <p className="font-cormorant text-sm text-charcoal italic leading-relaxed">
                  {memory.note}
                </p>
              </div>
            </div>
          )}
          
          {/* Botão de Link */}
          {memory.link && (
            <div className="mb-4">
              <button
                onClick={(e) => handleLinkClick(e, memory.link!.url)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-cormorant font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${getLinkColor(memory.link.type)} shadow-md hover:shadow-lg`}
              >
                {getLinkIcon(memory.link.type)}
                <span className="ml-2">{memory.link.text}</span>
              </button>
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