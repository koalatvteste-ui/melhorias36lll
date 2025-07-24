import { MediaItem } from '../types';

// Função para obter a imagem principal de uma memória
export const getMainImage = (chapterId: number, memoryIndex: number): string => {
  const memoryNumber = String(memoryIndex + 1).padStart(2, '0');
  return `/public/capitulo${chapterId}/principal/memoria${memoryNumber}.jpg`;
};

// Função para obter imagem de fallback caso a principal não exista
export const getFallbackImage = (): string => {
  return "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800";
};

// Função para detectar arquivos de galeria de uma memória específica
export const getGalleryItems = async (chapterId: number, memoryIndex: number): Promise<MediaItem[]> => {
  const memoryNumber = String(memoryIndex + 1).padStart(2, '0');
  const basePath = `/public/capitulo${chapterId}/galeria/`;
  const items: MediaItem[] = [];

  // Lista de possíveis extensões de imagem e vídeo
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const videoExtensions = ['mp4', 'webm', 'mov'];

  // Função para verificar se um arquivo existe
  const checkFileExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Verificar imagens da galeria (memoria01_01.jpg, memoria01_02.jpg, etc.)
  for (let i = 1; i <= 10; i++) { // Máximo de 10 itens por galeria
    const itemNumber = String(i).padStart(2, '0');
    
    for (const ext of imageExtensions) {
      const imagePath = `${basePath}memoria${memoryNumber}_${itemNumber}.${ext}`;
      if (await checkFileExists(imagePath)) {
        items.push({
          type: 'image',
          src: imagePath,
          alt: `Galeria ${i}`
        });
        break; // Para na primeira extensão encontrada
      }
    }
  }

  // Verificar vídeos (memoria01_video.mp4, memoria01_video_01.mp4, etc.)
  for (let i = 0; i <= 5; i++) { // Máximo de 5 vídeos por memória
    const videoSuffix = i === 0 ? 'video' : `video_${String(i).padStart(2, '0')}`;
    
    for (const ext of videoExtensions) {
      const videoPath = `${basePath}memoria${memoryNumber}_${videoSuffix}.${ext}`;
      if (await checkFileExists(videoPath)) {
        items.push({
          type: 'video',
          src: videoPath,
          alt: `Vídeo ${i + 1}`
        });
        break; // Para na primeira extensão encontrada
      }
    }
  }

  return items;
};

// Função para verificar se uma memória tem galeria
export const hasGalleryContent = async (chapterId: number, memoryIndex: number): Promise<boolean> => {
  const galleryItems = await getGalleryItems(chapterId, memoryIndex);
  return galleryItems.length > 0;
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