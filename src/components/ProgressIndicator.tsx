import React from 'react';
import { Check, Lock } from 'lucide-react';

interface ProgressIndicatorProps {
  totalChapters: number;
  unlockedChapters: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  totalChapters, 
  unlockedChapters 
}) => {
  return (
    <div className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border border-warm-gray/30">
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalChapters }, (_, index) => {
          const chapterNumber = index + 1;
          const isUnlocked = chapterNumber <= unlockedChapters;
          
          return (
            <div
              key={chapterNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-cormorant font-medium transition-all duration-300 ${
                isUnlocked
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-warm-gray/30 text-medium-gray'
              }`}
            >
              {isUnlocked ? (
                chapterNumber === 4 && unlockedChapters === 4 ? (
                  <Check size={14} />
                ) : (
                  chapterNumber
                )
              ) : (
                <Lock size={12} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-2">
        <p className="text-xs font-cormorant text-medium-gray">
          {unlockedChapters} de {totalChapters}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;