'use client';

import { useEffect, useState, useCallback } from 'react';

interface FartEmoji {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

const fartEmojis = ['💨', '🌬️', '💨', '🌪️', '💨'];

export default function FartApp() {
  const [farts, setFarts] = useState<FartEmoji[]>([]);
  const [nextId, setNextId] = useState(0);

  const createFart = useCallback(() => {
    const newFart: FartEmoji = {
      id: nextId,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      emoji: fartEmojis[Math.floor(Math.random() * fartEmojis.length)],
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4, // Random scale between 0.8 and 1.2
    };

    setFarts(prev => [...prev, newFart]);
    setNextId(prev => prev + 1);

    // Remove fart after 3 seconds
    setTimeout(() => {
      setFarts(prev => prev.filter(fart => fart.id !== newFart.id));
    }, 3000);
  }, [nextId]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        createFart();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [createFart]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Orange grid background */}
      <div className="absolute inset-0 bg-orange-500" style={{
        backgroundImage: `
          linear-gradient(rgba(255,165,0,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,165,0,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Main content */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1 className="text-center text-[clamp(32px,8vw,80px)] font-bold tracking-tight mb-8 text-white">
          💨 Fart App 💨
        </h1>
        
        <div className="text-center text-white/80 text-xl md:text-2xl font-light mb-8">
          Press <kbd className="px-3 py-1 bg-white/20 rounded-lg font-mono text-lg">SPACE</kbd> for farts!
        </div>

        {farts.length === 0 && (
          <div className="text-center text-white/60 text-lg animate-pulse">
            Press spacebar to start the fun! 🎉
          </div>
        )}
      </main>
      
      {/* Fart emojis */}
      {farts.map((fart) => (
        <div
          key={fart.id}
          className="absolute pointer-events-none animate-bounce"
          style={{
            left: fart.x,
            top: fart.y,
            transform: `rotate(${fart.rotation}deg) scale(${fart.scale})`,
            fontSize: '4rem',
            animation: 'fartAnimation 3s ease-out forwards',
          }}
        >
          {fart.emoji}
        </div>
      ))}

      {/* Custom CSS for fart animation */}
      <style jsx>{`
        @keyframes fartAnimation {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
          80% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) rotate(540deg);
          }
        }
      `}</style>
    </div>
  );
}


