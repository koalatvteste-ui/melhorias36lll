import { MediaItem } from '../types';
import { mainImages, galleryCounts, videoFiles, getMediaKey, hasGalleryContent as hasGalleryFromManifest } from '../data/mediaManifest';

// Função para obter a imagem principal de uma memória
export const getMainImage = (chapterId: number, memoryId: number): string => {
  const key = getMediaKey(chapterId, memoryId);
  return mainImages[key] || getFallbackImage();
};

// Função para obter imagem de fallback caso a principal não exista
export const getFallbackImage = (): string => {
  return "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800";
};

// Função para obter itens de galeria baseado no manifesto
export const getGalleryItems = async (chapterId: number, memoryId: number): Promise<MediaItem[]> => {
  const key = getMediaKey(chapterId, memoryId);
  const basePath = `/public/capitulo${chapterId}/galeria/`;
  const memoryNumber = String(memoryId).padStart(2, '0');
  const items: MediaItem[] = [];

  // Obter contagem de imagens do manifesto
  const galleryCount = galleryCounts[key] || 0;

  // Adicionar imagens da galeria
  for (let i = 1; i <= galleryCount; i++) {
    const itemNumber = String(i).padStart(2, '0');
    const imagePath = `${basePath}memoria${memoryNumber}_${itemNumber}.jpg`;
    items.push({
      type: 'image',
      src: imagePath,
      alt: `Galeria ${i}`
    });
  }

  // Adicionar vídeos do manifesto
  const videos = videoFiles[key] || [];
  videos.forEach((videoFile, index) => {
    items.push({
      type: 'video',
      src: `${basePath}${videoFile}`,
      alt: `Vídeo ${index + 1}`
    });
  });

  return items;
};

// Função para verificar se uma memória tem galeria (usando manifesto)
export const hasGalleryContent = async (chapterId: number, memoryId: number): Promise<boolean> => {
  return hasGalleryFromManifest(chapterId, memoryId);
};

// Função auxiliar para verificar se um arquivo existe (mantida para compatibilidade)
export const checkFileExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};


// Função para obter formato de arquivo
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Função para verificar se é um arquivo de vídeo
export const isVideoFile = (filename: string): boolean => {
  const videoExtensions = ['mp4', 'webm', 'mov', 'avi'];
  const extension = getFileExtension(filename);
  return videoExtensions.includes(extension);
};

// Função para verificar se é um arquivo de imagem
export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const extension = getFileExtension(filename);
  return imageExtensions.includes(extension);
};