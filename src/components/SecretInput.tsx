import React, { useState } from 'react';
import { Key, CheckCircle, AlertCircle, Unlock } from 'lucide-react';
import { chapterSecrets, chapterHints } from '../data/secrets';

interface SecretInputProps {
  chapterId: number;
  onUnlock: (chapterId: number) => void;
}

const SecretInput: React.FC<SecretInputProps> = ({ chapterId, onUnlock }) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Obter o segredo necessário para desbloquear este capítulo
  // O segredo está no capítulo anterior (chapterId - 1)
  const requiredSecret = chapterSecrets[chapterId - 1];
  const hint = chapterHints[chapterId];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError('Por favor, digite o código encontrado no QR code');
      return;
    }

    setIsValidating(true);
    setError('');

    // Simular um pequeno delay para dar feedback visual
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verificar se o código está correto (case-insensitive)
    if (inputValue.trim().toLowerCase() === requiredSecret?.toLowerCase()) {
      setSuccess(true);
      setError('');
      
      // Delay para mostrar o sucesso antes de desbloquear
      setTimeout(() => {
        onUnlock(chapterId);
      }, 1500);
    } else {
      setError('Código incorreto. Verifique o QR code e tente novamente.');
      setInputValue('');
    }

    setIsValidating(false);
  };

  if (success) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 border border-green-200">
          <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
          <h3 className="font-dancing text-2xl text-green-800 mb-2">
            Código Correto! ✨
          </h3>
          <p className="font-cormorant text-green-700">
            Desbloqueando capítulo...
          </p>
          <div className="mt-4">
            <Unlock className="text-green-600 mx-auto animate-pulse" size={32} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Dica */}
      {hint && (
        <div className="bg-gradient-to-br from-gold/10 to-rose-gold/10 rounded-2xl p-6 mb-6 border border-gold/20">
          <div className="flex items-center justify-center mb-3">
            <Key className="text-gold mr-2" size={18} />
            <p className="font-dancing text-lg text-charcoal">
              Dica para encontrar o QR Code
            </p>
          </div>
          <div className="bg-white/60 rounded-lg p-4 border-l-4 border-gold">
            <p className="font-cormorant text-medium-gray italic text-center text-sm">
              {hint}
            </p>
          </div>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-cormorant text-sm text-charcoal mb-2 text-center">
            Digite o código encontrado no QR Code:
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError('');
              }}
              placeholder="Digite o código secreto..."
              className="w-full px-4 py-3 rounded-lg border border-warm-gray/40 bg-white/80 font-cormorant text-center focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              disabled={isValidating}
            />
            <Key className="absolute right-3 top-1/2 -translate-y-1/2 text-medium-gray" size={18} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center animate-fade-in">
            <AlertCircle className="text-red-500 mr-2 flex-shrink-0" size={16} />
            <p className="font-cormorant text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isValidating || !inputValue.trim()}
          className="w-full bg-gradient-to-r from-gold to-rose-gold hover:from-gold/90 hover:to-rose-gold/90 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-lg font-cormorant font-medium transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isValidating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Verificando...
            </>
          ) : (
            <>
              <Unlock className="mr-2" size={18} />
              Desbloquear Capítulo
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="font-cormorant text-xs text-medium-gray/70">
          💡 Procure pelos QR codes nos locais especiais da nossa história
        </p>
      </div>
    </div>
  );
};

export default SecretInput;