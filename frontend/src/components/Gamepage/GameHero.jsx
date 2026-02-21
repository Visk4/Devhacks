import React from 'react';
import { Swords, Play, Users } from 'lucide-react';

const GameHero = () => {
  return (
    <div className="relative min-h-screen bg-[#0b0614] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Grid & Stars Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Season Pill */}
        <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/20">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          {/* Added font-display here for the badge */}
          <span className="text-xs tracking-widest text-purple-300 uppercase font-display">
            Season 5 Live Now
          </span>
        </div>

        {/* Main Title Area */}
        <div className="flex flex-col items-center leading-none mb-6">
          <div className="flex items-center gap-4 text-white">
            <Swords className="w-12 h-12 md:w-16 md:h-16 text-gray-300" strokeWidth={1.5} />
            {/* Added text-white and font-display to CODE */}
            <h1 className="text-6xl md:text-8xl tracking-tighter uppercase text-white font-display font-bold">Code</h1>
          </div>
          
          <div className="relative mt-2">
            {/* Added text-white and font-display to BATTLES */}
            <h1 className="text-6xl md:text-8xl tracking-tighter uppercase text-white font-display font-bold">Battles</h1>
            {/* Colorful underline effect under BATTLES */}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-cyan-400 to-transparent rounded-full"></div>
          </div>
          
          {/* Added font-display to ARENA (kept text-gray-300 to match your original screenshot's style) */}
          <h1 className="text-6xl md:text-8xl tracking-tighter text-gray-300 mt-4 uppercase font-display font-bold">Arena</h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl">
          Compete. Fix. Dominate. <span className="text-purple-400">Join the ultimate coding battleground.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          {/* Added font-display to the Quick Match button */}
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-md transition-all transform hover:scale-105 font-display text-sm tracking-wider uppercase">
            <Play className="w-5 h-5 fill-current" />
            Quick Match
          </button>
          
          {/* Added font-display to the Create Squad button */}
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-md transition-all font-display text-sm tracking-wider uppercase">
            <Users className="w-5 h-5" />
            Create Squad
          </button>
        </div>

      </div>
    </div>
  );
};

export default GameHero;