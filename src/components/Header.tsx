import React from 'react';
import { Heart, Clock } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

const Header: React.FC = () => {
  // Data de início do relacionamento - 25/07/2022
  const [days, hours, minutes, seconds] = useCountdown('2022-07-25T00:00:00');

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
        
        {/* Contador Regressivo */}
        <div className="mb-8 p-6 bg-white/70 rounded-2xl border border-warm-gray/30 max-w-xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Clock className="text-gold mr-2" size={20} />
            <p className="font-dancing text-xl text-charcoal text-center">
              Tempo juntos desde 25 de julho de 2022
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gradient-to-b from-rose-gold/20 to-rose-gold/10 rounded-lg p-3">
              <div className="font-dancing text-2xl md:text-3xl text-charcoal font-bold">
                {days}
              </div>
              <div className="font-cormorant text-xs text-medium-gray uppercase tracking-wide">
                Dias
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-gold/20 to-gold/10 rounded-lg p-3">
              <div className="font-dancing text-2xl md:text-3xl text-charcoal font-bold">
                {hours}
              </div>
              <div className="font-cormorant text-xs text-medium-gray uppercase tracking-wide">
                Horas
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-rose-gold/20 to-rose-gold/10 rounded-lg p-3">
              <div className="font-dancing text-2xl md:text-3xl text-charcoal font-bold">
                {minutes}
              </div>
              <div className="font-cormorant text-xs text-medium-gray uppercase tracking-wide">
                Minutos
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-gold/20 to-gold/10 rounded-lg p-3">
              <div className="font-dancing text-2xl md:text-3xl text-charcoal font-bold">
                {seconds}
              </div>
              <div className="font-cormorant text-xs text-medium-gray uppercase tracking-wide">
                Segundos
              </div>
            </div>
          </div>
          
          <p className="font-cormorant text-sm text-medium-gray/70 mt-4 text-center">
            Cada segundo é mais uma prova do nosso amor ❤️
          </p>
        </div>
        
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