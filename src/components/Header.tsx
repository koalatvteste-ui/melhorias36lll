import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-6 bg-gradient-to-b from-cream to-soft-gray">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Heart className="text-rose-gold mr-3" size={32} />
          <h1 className="font-dancing text-5xl md:text-6xl text-charcoal">
            Nossos 36 Capítulos
          </h1>
          <Heart className="text-rose-gold ml-3" size={32} />
        </div>
        
        <p className="font-cormorant text-lg md:text-xl text-medium-gray max-w-2xl mx-auto leading-relaxed">
          Uma jornada através do tempo, revelando os momentos mais preciosos da nossa história. 
          Cada capítulo desbloqueado é uma nova descoberta, um novo motivo para sorrir.
        </p>
        
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-warm-gray/30">
          <p className="font-cormorant text-sm text-medium-gray">
            ✨ Escaneie os QR codes nos locais especiais para desbloquear cada capítulo ✨
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;