export interface Memory {
  id: number;
  caption: string;
  location?: string;
  date?: string;
  note?: string;
  hasGallery?: boolean;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  unlocked: boolean;
  memories: Memory[];
  tone: 'discovery' | 'adventure' | 'maturity' | 'future';
}

export type ChapterTone = 'discovery' | 'adventure' | 'maturity' | 'future';