"use client"
import { useState } from 'react';

export default function NoPage() {
  const [showMessage, setShowMessage] = useState(false);

  const handleBrokenHeartClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Shows for 10 seconds
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-pink-100">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-3xl font-bold">
          I understand 
          <span 
            onClick={handleBrokenHeartClick}
            className="cursor-pointer hover:scale-110 inline-block transition-transform"
          >
            💔

          </span>
        </h1>
        <p className="text-xl">oh well, you'll never know what you missed. But if you don't mind, consider messaging me on your preferred platform on what you think of this website?</p>
        <a 
          href="/"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Go Back Home
        </a>

        {showMessage && (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in max-w-md">
            <p className="text-gray-800 text-lg">
              Thank you for your honesty. Your worth is beyond measure, and I wish you all the happiness you deserve.
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 