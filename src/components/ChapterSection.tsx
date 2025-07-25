import React from 'react';
import { Lock, Unlock, Key, AlertCircle } from 'lucide-react';
import { Chapter } from '../types';
import MemoryCard from './MemoryCard';
import SecretInput from './SecretInput';

interface ChapterSectionProps {
  chapter: Chapter;
  onUnlock: (chapterId: number) => void;
}

const ChapterSection: React.FC<ChapterSectionProps> = ({ chapter, onUnlock }) => {
  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'discovery': return 'from-rose-gold/20 to-soft-red/10';
      case 'adventure': return 'from-gold/20 to-warm-gray/10';
      case 'maturity': return 'from-charcoal/10 to-medium-gray/10';
      case 'future': return 'from-gold/30 to-rose-gold/20';
      default: return 'from-soft-gray to-cream';
    }
  };

  const getAccentColor = (tone: string) => {
    switch (tone) {
      case 'discovery': return 'text-soft-red';
      case 'adventure': return 'text-gold';
      case 'maturity': return 'text-charcoal';
      case 'future': return 'text-gold';
      default: return 'text-medium-gray';
    }
  };

  if (!chapter.unlocked) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/50 rounded-3xl p-12 border-2 border-dashed border-warm-gray/40">
            <Lock className="text-medium-gray mx-auto mb-6" size={48} />
            <h2 className="font-dancing text-4xl text-medium-gray mb-4">
              {chapter.title}
            </h2>
            <p className="font-cormorant text-lg text-medium-gray/70 mb-8">
              {chapter.subtitle}
            </p>
            
            <div className="bg-gradient-to-br from-gold/10 to-rose-gold/10 rounded-2xl p-8 mb-8 border border-gold/20">
              <div className="flex items-center justify-center mb-4">
                <Key className="text-gold mr-2" size={20} />
                <p className="font-dancing text-xl text-charcoal">
                  Dica para encontrar o QR Code
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-4 border-l-4 border-gold">
                <p className="font-cormorant text-medium-gray italic text-center">
                  {/* A dica será passada pelo componente pai */}
                </p>
              </div>
            </div>
            
            <SecretInput 
              chapterId={chapter.id}
              onUnlock={onUnlock}
            />
          </div>
        </div>
      </section>
    );
  }

  if (chapter.tone === 'future') {
    return (
      <section className={`py-20 px-6 bg-gradient-to-br ${getToneColor(chapter.tone)}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Unlock className={`${getAccentColor(chapter.tone)} mx-auto mb-8 animate-glow`} size={56} />
            
            <h2 className={`font-dancing text-5xl md:text-6xl ${getAccentColor(chapter.tone)} mb-6`}>
              {chapter.title}
            </h2>
            
            <p className="font-dancing text-2xl text-charcoal/70 mb-8">
              {chapter.subtitle}
            </p>
            
            <div className="bg-white/80 rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto">
              <p className="font-cormorant text-xl text-charcoal leading-relaxed mb-8">
                {chapter.description}
              </p>
              
              <div className="space-y-6 text-charcoal">
                <p className="font-cormorant text-lg leading-relaxed">
                  Se você chegou até aqui, é porque percorreu todos os lugares que marcaram nossa história. 
                  Cada local visitado, cada QR code encontrado, cada memória relembrada nos trouxe até este momento.
                </p>
                
                <p className="font-cormorant text-lg leading-relaxed">
                  Agora chegou a hora de escrevermos juntos o próximo capítulo. Um capítulo em branco, 
                  cheio de possibilidades, sonhos e aventuras que ainda nem imaginamos.
                </p>
                
                <div className="bg-gold/20 rounded-2xl p-8 border-l-4 border-gold">
                  <p className="font-dancing text-2xl text-gold mb-4">
                    "As melhores histórias são aquelas que ainda estamos por viver..."
                  </p>
                  <p className="font-cormorant text-lg text-charcoal">
                    Que venham os próximos 36 capítulos, e todos os que virão depois. 
                    Porque nossa história não tem fim, só novos começos.
                  </p>
                </div>
                
                <p className="font-dancing text-xl text-rose-gold">
                  Com todo meu amor, para sempre e sempre ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-6 bg-gradient-to-br ${getToneColor(chapter.tone)}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <Unlock className={`${getAccentColor(chapter.tone)} mx-auto mb-6`} size={48} />
          
          <h2 className={`font-dancing text-4xl md:text-5xl ${getAccentColor(chapter.tone)} mb-4`}>
            {chapter.title}
          </h2>
          
          <p className="font-dancing text-xl text-charcoal/70 mb-6">
            {chapter.subtitle}
          </p>
          
          <p className="font-cormorant text-lg text-medium-gray max-w-2xl mx-auto leading-relaxed">
            {chapter.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapter.memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} chapterId={chapter.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChapterSection;