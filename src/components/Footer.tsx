import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <Heart className="text-rose-gold mr-3" size={20} />
          <p className="font-dancing text-2xl">
            Nossa História Continua...
          </p>
          <Heart className="text-rose-gold ml-3" size={20} />
        </div>
        
        <p className="font-cormorant text-sm text-cream/70 mb-4">
          Cada memória aqui guardada é um pedacinho do nosso coração.
        </p>
        
        <p className="font-cormorant text-xs text-cream/50">
          Feito com ❤️ para celebrar nossos 3 anos juntos
        </p>
      </div>
    </footer>
  );
};

export default Footer;