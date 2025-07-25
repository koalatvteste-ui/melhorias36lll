// src/data/mediaManifest.ts

export const mainImages: { [key: string]: string } = {
  // Mapeia o ID do capítulo e o ID da memória para a sua imagem principal
  // Formato: 'chapterId-memoryId'
  "1-1": "/capitulo1/principal/memoria01.jpg",
  "1-2": "/capitulo1/principal/memoria02.jpg",
  "1-3": "/capitulo1/principal/memoria03.jpg",
  "1-4": "/capitulo1/principal/memoria04.jpg",
  "1-5": "/capitulo1/principal/memoria05.jpg",
  "1-6": "/capitulo1/principal/memoria06.jpg",
  "1-7": "/capitulo1/principal/memoria07.jpg",
  "1-8": "/capitulo1/principal/memoria08.jpg",
  "1-9": "/capitulo1/principal/memoria09.jpg",
  
  // Capítulo 2 - adicione conforme necessário
  "2-10": "/capitulo2/principal/memoria10.jpg",
  "2-11": "/capitulo2/principal/memoria11.jpg",
  "2-12": "/capitulo2/principal/memoria12.jpg",
  "2-13": "/capitulo2/principal/memoria13.jpg",
  "2-14": "/capitulo2/principal/memoria14.jpg",
  "2-15": "/capitulo2/principal/memoria15.jpg",
  "2-16": "/capitulo2/principal/memoria16.jpg",
  "2-17": "/capitulo2/principal/memoria17.jpg",
  "2-18": "/capitulo2/principal/memoria18.jpg",
  
  // Capítulo 3 - adicione conforme necessário
  "3-19": "/capitulo3/principal/memoria19.jpg",
  "3-20": "/capitulo3/principal/memoria20.jpg",
  "3-21": "/capitulo3/principal/memoria21.jpg",
  "3-22": "/capitulo3/principal/memoria22.jpg",
  "3-23": "/capitulo3/principal/memoria23.jpg",
  "3-24": "/capitulo3/principal/memoria24.jpg",
  "3-25": "/capitulo3/principal/memoria25.jpg",
  "3-26": "/capitulo3/principal/memoria26.jpg",
  "3-27": "/capitulo3/principal/memoria27.jpg",

  // Capítulo 4 - adicione conforme necessário
  "4-19": "/capitulo3/principal/memoria19.jpg",
  "4-20": "/capitulo3/principal/memoria20.jpg",
  "4-21": "/capitulo3/principal/memoria21.jpg",
  "4-22": "/capitulo3/principal/memoria22.jpg",
  "4-23": "/capitulo3/principal/memoria23.jpg",
  "4-24": "/capitulo3/principal/memoria24.jpg",
  "4-25": "/capitulo3/principal/memoria25.jpg",
  "4-26": "/capitulo3/principal/memoria26.jpg",
  "4-27": "/capitulo3/principal/memoria27.jpg",

  // Capítulo 5 - adicione conforme necessário
  "5-19": "/capitulo3/principal/memoria19.jpg",
  "5-20": "/capitulo3/principal/memoria20.jpg",
  "5-21": "/capitulo3/principal/memoria21.jpg",
  "5-22": "/capitulo3/principal/memoria22.jpg",
  "5-23": "/capitulo3/principal/memoria23.jpg",
  "5-24": "/capitulo3/principal/memoria24.jpg",
  "5-25": "/capitulo3/principal/memoria25.jpg",
  "5-26": "/capitulo3/principal/memoria26.jpg",
  "5-27": "/capitulo3/principal/memoria27.jpg",
};

export const galleryCounts: { [key: string]: number } = {
  // Mapeia o ID do capítulo e o ID da memória para a QUANTIDADE de fotos na galeria
  // Formato: 'chapterId-memoryId'
  
  // Capítulo 1
  "1-1": 5, // memória 1 do capítulo 1 tem 5 fotos
  "1-2": 8, // memória 2 do capítulo 1 tem 8 fotos
  "1-3": 3, // memória 3 do capítulo 1 tem 3 fotos
  "1-4": 0, // memória 4 do capítulo 1 não tem galeria
  "1-5": 0, // memória 5 do capítulo 1 não tem galeria
  "1-6": 0, // memória 6 do capítulo 1 não tem galeria
  "1-7": 0, // memória 7 do capítulo 1 não tem galeria
  "1-8": 0, // memória 8 do capítulo 1 não tem galeria
  "1-9": 0, // memória 9 do capítulo 1 não tem galeria
  
  // Capítulo 2 - adicione conforme necessário
  "2-10": 0,
  "2-11": 0,
  "2-12": 0,
  "2-13": 0,
  "2-14": 0,
  "2-15": 0,
  "2-16": 0,
  "2-17": 0,
  "2-18": 0,
  
  // Capítulo 3 - adicione conforme necessário
  "3-19": 0,
  "3-20": 0,
  "3-21": 0,
  "3-22": 0,
  "3-23": 0,
  "3-24": 0,
  "3-25": 0,
  "3-26": 0,
  "3-27": 0,
};

export const videoFiles: { [key: string]: string[] } = {
  // Mapeia o ID do capítulo e o ID da memória para os arquivos de vídeo
  // Formato: 'chapterId-memoryId': ['video1.mp4', 'video2.mp4']
  
  // Exemplo:
  // "1-1": ["memoria01_video.mp4"],
  // "1-2": ["memoria02_video_01.mp4", "memoria02_video_02.mp4"],
};

// Função helper para obter a chave do manifesto
export const getMediaKey = (chapterId: number, memoryId: number): string => {
  return `${chapterId}-${memoryId}`;
};

// Função para verificar se uma memória tem galeria
export const hasGalleryContent = (chapterId: number, memoryId: number): boolean => {
  const key = getMediaKey(chapterId, memoryId);
  const galleryCount = galleryCounts[key] || 0;
  const videos = videoFiles[key] || [];
  return galleryCount > 0 || videos.length > 0;
};

// Função para obter a contagem total de itens de mídia
export const getTotalMediaCount = (chapterId: number, memoryId: number): number => {
  const key = getMediaKey(chapterId, memoryId);
  const galleryCount = galleryCounts[key] || 0;
  const videoCount = (videoFiles[key] || []).length;
  return galleryCount + videoCount;
};