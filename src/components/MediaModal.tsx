import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  initialIndex: number;
  memoryCaption: string;
}

const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex,
  memoryCaption
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentItem = items[currentIndex];

  // Reset quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Navegação por teclado
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      case ' ':
        e.preventDefault();
        if (currentItem?.type === 'video') {
          togglePlay();
        }
        break;
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Controle do body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setLoading(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setLoading(true);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setLoading(true);
  };

  const togglePlay = () => {
    const video = document.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = document.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const video = document.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      if (!isFullscreen) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Overlay para fechar */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />

      {/* Container do modal */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex-1">
            <h3 className="font-dancing text-2xl md:text-3xl text-white mb-1">
              {memoryCaption}
            </h3>
            <p className="font-cormorant text-sm text-white/70">
              {currentIndex + 1} de {items.length}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-6">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Loading spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Conteúdo de mídia */}
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                onLoad={handleImageLoad}
                style={{ display: loading ? 'none' : 'block' }}
              />
            ) : (
              <div className="relative">
                <video
                  className="modal-video w-full h-full object-contain rounded-lg shadow-2xl"
                  src={currentItem.src}
                  onLoadedData={handleVideoLoad}
                  style={{ display: loading ? 'none' : 'block' }}
                  muted={isMuted}
                  playsInline
                />
                
                {/* Controles de vídeo customizados */}
                {!loading && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={togglePlay}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="text-white" size={16} />
                          ) : (
                            <Play className="text-white" size={16} />
                          )}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="text-white" size={16} />
                          ) : (
                            <Volume2 className="text-white" size={16} />
                          )}
                        </button>
                      </div>
                      
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <Maximize className="text-white" size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botões de navegação */}
            {items.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="text-white" size={24} />
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="text-white" size={24} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {items.length > 1 && (
          <div className="p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-gold shadow-lg scale-110'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/50 flex items-center justify-center">
                      <Play className="text-white" size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaModal;