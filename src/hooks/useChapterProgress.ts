import { useState, useEffect } from 'react';
import { chaptersData } from '../data/chapters';

export const useChapterProgress = () => {
  const [chapters, setChapters] = useState(chaptersData);

  // Carrega o progresso salvo do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('nossos-36-capitulos-progress');
    if (savedProgress) {
      const unlockedChapterIds = JSON.parse(savedProgress);
      setChapters(prevChapters =>
        prevChapters.map(chapter => ({
          ...chapter,
          unlocked: unlockedChapterIds.includes(chapter.id) || chapter.id === 1
        }))
      );
    }
  }, []);

  const unlockChapter = (chapterId: number) => {
    setChapters(prevChapters => {
      const updatedChapters = prevChapters.map(chapter =>
        chapter.id === chapterId ? { ...chapter, unlocked: true } : chapter
      );

      // Salva o progresso no localStorage
      const unlockedChapterIds = updatedChapters
        .filter(chapter => chapter.unlocked)
        .map(chapter => chapter.id);
      localStorage.setItem('nossos-36-capitulos-progress', JSON.stringify(unlockedChapterIds));

      return updatedChapters;
    });
  };

  const getUnlockedCount = () => {
    return chapters.filter(chapter => chapter.unlocked).length;
  };

  return {
    chapters,
    unlockChapter,
    unlockedCount: getUnlockedCount()
  };
};