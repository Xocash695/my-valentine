"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const quotes = [
    "You don't find love. You build it.",
    "Love is a gift of one's innermost soul to another so both can be whole. - Buddha",
    "You, yourself, as much as anybody in the entire universe, deserve your love and affection. - Buddha",
    "You call it madness, but I call it love. - Donnie Darko",
    "Love is shown more in deeds than in words -Saint Ignatius",
    "Love is the emblem of eternity; it confounds all notion of time; effaces all memory of a beginning, all fear of an end. - Madame de Stael",
    "The love we give away is the only love we keep - Elbert Hubbard",
    "Tell me whom you love and I will tell you who you are -Houssaye",
    "Life is the first gift, love is the second, and understanding the third. - Marge Piercy",
    "You never lose by loving. You always lose by holding back. - Barbara De Angelis",
    "Love is the only force capable of transforming an enemy into a friend. - Martin Luther King Jr.",
    "Kindness in words creates confidence. Kindness in thinking creates profundity. Kindness in giving creates love. - Lao Tzu",
    "Love is like pi a natural, irrational, and very important. - Lisa Hoffman",
    "There is always some madness in love. But there is also always some reason in madness. - Friedrich Nietzsche",
    " I love you more than coffee, but please don't make me prove it. - Elizabeth"
  ];

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    // Select random quote when component mounts
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    if (attempts >= 50) {
      setPosition({ x: 0, y: 0 });
      return;
    }
    
    const buttonElement = e.currentTarget;
    const rect = buttonElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    if (mouseX >= -100 && mouseX <= rect.width + 100 && 
        mouseY >= -100 && mouseY <= rect.height + 100) {
      
      setAttempts(prev => prev + 1);
      
      const intensity = Math.min(attempts * 40, 500);
      
      const maxMoveX = Math.min(
        intensity,
        viewportWidth - rect.right - 50,
        rect.left - 50
      );
      
      const maxMoveY = Math.min(
        intensity,
        viewportHeight - rect.bottom - 50,
        rect.top - 50
      );
      
      let newX = (Math.random() - 0.5) * maxMoveX * 2;
      let newY = (Math.random() - 0.5) * maxMoveY * 2;
      
      if (mouseX < rect.width / 2) {
        newX = Math.abs(newX);
      } else {
        newX = -Math.abs(newX);
      }
      
      if (mouseY < rect.height / 2) {
        newY = Math.abs(newY);
      } else {
        newY = -Math.abs(newY);
      }
      
      const finalX = Math.max(
        -rect.left + 50,
        Math.min(newX, viewportWidth - rect.right - 50)
      );
      const finalY = Math.max(
        -rect.top + 50,
        Math.min(newY, viewportHeight - rect.bottom - 50)
      );
      
      setPosition({ x: finalX, y: finalY });
    }
  };

  const handleTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMobile) return;
    
    if (attempts >= 5) {
      window.location.href = '/no';
      return;
    }
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setYesButtonSize(1 + (newAttempts * 0.3));
  };

  const handleClick = (e) => {
    if (!isMobile) {
      if (attempts >= 50) {
        window.location.href = '/no';
      } else {
        e.preventDefault();
      }
    }
  };

  const handleSecretClick = () => {
    const currentTime = new Date().getTime();
    
    if (currentTime - lastClickTime > 2000) {  // Reset if more than 2 seconds between clicks
      setSecretClicks(1);
    } else {
      setSecretClicks(prev => prev + 1);
    }
    
    setLastClickTime(currentTime);

    if (secretClicks === 4) {  // Navigate on 5th click
      window.location.href = '/secret';
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 sm:cursor-heart">
      <div className="grid grid-rows-[20px_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <Image
            className="rounded-lg"
            src="/images/Heart-Bowl.jpg"
            alt="A heart-shaped bowl filled with candy hearts"
            width={180} 
            height={38}
            priority
          />
          <h1 className="text-2xl sm:text-4xl font-bold typewriter">Will you be my Valentine?</h1>
          <p className="text-lg sm:text-xl text-center italic text-pink-700">{randomQuote}</p>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-all flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/yes"
              style={{
                transform: isMobile ? `scale(${yesButtonSize})` : 'none',
                transition: 'transform 0.3s ease-out',
                zIndex: isMobile ? '10' : '1'
              }}
            >
              <Image
                className=""
                src="/heart.svg"
                alt="Heart icon"
                width={20}
                height={20}
              />
              Yes, I'll be your valentine!
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-white hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 whitespace-nowrap"
              href="#"
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouch}
              onTouchEnd={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              style={{
                transform: isMobile ? 'none' : `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              No'll pass on being your valentine
            </a>
          </div>
        </main>
        <p 
          onClick={handleSecretClick}
          className="text-xs text-gray-500 row-start-3 mb-2 sm:cursor-heart hover:text-gray-600 transition-colors"
        >
          Created by Xocash695 Source Code: https://github.com/Xocash695/my-valentine.git
        </p>
      </div>
    </div>
  );
}
