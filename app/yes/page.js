"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function YesPage() {
  const [showSecret, setShowSecret] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');
  const [secretMessage, setSecretMessage] = useState('');

  const handleHeartClick = () => {
    setShowCodeInput(true);
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/secret-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      
      if (data.message) {
        // Lock scrolling more aggressively
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.width = '100%';
        document.documentElement.style.height = '100%';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        setSecretMessage(data.message);
        setShowSecret(true);
        setShowCodeInput(false);
        setCode('');
        setTimeout(() => {
          setShowSecret(false);
          setSecretMessage('');
          // Restore scrolling
          document.documentElement.style.position = '';
          document.documentElement.style.width = '';
          document.documentElement.style.height = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
        }, 10000);
      } else {
        alert('Incorrect code!');
      }
    } catch (error) {
      console.error('Failed to verify code');
      alert('Failed to verify code');
    }
  };

  return (
    <div className="min-h-screen bg-pink-100">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* Fireworks */}
        <div className="firework" style={{"--x": "0vmin"}}></div>
        <div className="firework" style={{"--x": "20vmin"}}></div>
        <div className="firework" style={{"--x": "-20vmin"}}></div>
        <div className="firework" style={{"--x": "40vmin"}}></div>
        <div className="firework" style={{"--x": "-40vmin"}}></div>
        <div className="firework" style={{"--x": "10vmin", "--initialY": "70vmin"}}></div>
        <div className="firework" style={{"--x": "-30vmin", "--initialY": "80vmin"}}></div>
        <div className="firework" style={{"--x": "30vmin", "--initialY": "75vmin"}}></div>
      
        <main className="flex flex-col gap-8 row-start-2 items-center text-center z-10">
          <div className="text-center space-y-6 relative">
          <span className="absolute top-[-40px] right-2 text-[10px] text-pink-400/20 hover:text-pink-500 transition-colors">
            hint: 1435
          </span>
            
            <h1 className="text-3xl font-bold">Thank you so much! 
              <span 
                onClick={handleHeartClick}
                className="cursor-pointer hover:scale-110 inline-block transition-transform"
              >
                ❤️
              </span>
            </h1>
            <p className="text-xl">I'm glad you said yes! Maybe consider messaging me on your preferred platform on what you think of this website?</p>
            <div className="flex flex-col items-center gap-8">
              <Link 
                href="/"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Go Back Home
              </Link>
              
              {showSecret && (
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in">
                  <p className="text-pink-600 text-lg font-bold">
                    You found the secret message! 💝
                    <br />
                    {secretMessage || "Loading..."}
                  </p>
                </div>
              )}

              {showCodeInput && (
                <form onSubmit={handleSubmitCode} className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter the secret code"
                    className="px-4 py-2 border rounded-lg mr-2"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 