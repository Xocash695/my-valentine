"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function SecretPage() {
  const [showFortune, setShowFortune] = useState(false);
  const [currentFortune, setCurrentFortune] = useState('');

  const fortunes = [
    "Love is just around the corner! 💕",
    "Your smile will bring joy to someone special today! ✨",
    "A romantic surprise awaits you in the near future! 🌹",
    "Your heart's desire will soon become reality! 💫",
    "Someone is thinking about you right now! 💭",
    "A meaningful connection will blossom soon! 🌸",
    "Your love life will take an exciting turn! 💝",
    "A secret admirer will soon reveal themselves! 👀",
    "The love you give will return tenfold! ❤️",
    "Your next adventure in love begins soon! 🚀"
  ];

  const revealFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setCurrentFortune(randomFortune);
    setShowFortune(true);
    setTimeout(() => setShowFortune(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8">
        <main className="flex flex-col gap-8 items-center text-white text-center relative w-full">
          <h1 className="text-4xl font-bold mb-4">🌟 You Found The Secret Page! 🌟</h1>
          <p className="text-xl mb-8">
            Congratulations on discovering this hidden gem! You must be really curious... 
            or maybe you just like clicking things? Either way, you're awesome! 💖
          </p>
          
          {showFortune && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg transform animate-bounce">
                <p className="text-purple-600 text-xl font-bold">{currentFortune}</p>
              </div>
            </div>
          )}

          <div className="space-y-4 mt-8">
            <p className="text-lg">Fun fact: This page was created as an easter egg!</p>
            <p className="text-lg">There might be another secret waiting to be found... 😉</p>
          </div>
          
          <Link 
            href="/"
            className="mt-8 px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Return to Valentine's Page
          </Link>
        </main>
        <p 
          onClick={revealFortune}
          className="text-white/60 text-sm mb-4 cursor-pointer hover:text-white/80 transition-colors"
        >
          Secret pages make everything more fun! 🎉
        </p>
      </div>
    </div>
  );
} 