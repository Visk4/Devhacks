import React from 'react';
import { 
  Code2, 
  Gamepad2, 
  Dumbbell, 
  Trophy, 
  Joystick, 
  BookOpen, 
  Briefcase, 
  Users 
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full h-[72px] bg-[#0b0f19] border-b border-[#1a1f2e] flex items-center justify-between px-4 lg:px-8 font-sans sticky top-0 z-50">
      
      {/* 1. Left Section - Logo */}
      <div className="flex items-center gap-3 cursor-pointer shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Code2 size={20} className="text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-xl font-black tracking-tight font-display uppercase flex items-center">
          <span className="text-white">CODE</span>
          <span className="text-cyan-400">ARENA</span>
        </h1>
      </div>

      {/* 2. Middle Section - Navigation Links */}
      <div className="hidden lg:flex items-center gap-1 xl:gap-2">
        {/* Arena (Active) */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 bg-[#1e2536] rounded-xl border border-[#2a3143] text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all">
          <Gamepad2 size={16} className="text-purple-400" fill="currentColor" fillOpacity={0.2} />
          Arena
        </button>
        
        {/* Practice */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-400 hover:text-white hover:bg-[#111724] rounded-xl font-medium text-sm transition-colors group">
          <Dumbbell size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          Practice
        </button>
        
        {/* Contest */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-400 hover:text-white hover:bg-[#111724] rounded-xl font-medium text-sm transition-colors group">
          <Trophy size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          Contest
        </button>

        {/* Games */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-400 hover:text-white hover:bg-[#111724] rounded-xl font-medium text-sm transition-colors group">
          <Joystick size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          Games
        </button>

        {/* Learn */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-400 hover:text-white hover:bg-[#111724] rounded-xl font-medium text-sm transition-colors group">
          <BookOpen size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          Learn
        </button>

        {/* Interview */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-400 hover:text-white hover:bg-[#111724] rounded-xl font-medium text-sm transition-colors group">
          <Briefcase size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          Interview
        </button>
        
        {/* Community */}
        <button className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-400 hover:text-white hover:bg-[#111724] rounded-xl font-medium text-sm transition-colors group">
          <Users size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          Community
        </button>
      </div>

      {/* 3. Right Section - Profile Only */}
      <div className="flex items-center shrink-0">
        
        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          {/* Text Info */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider">
              Pro Member
            </span>
            <span className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors">
              AlexCoder
            </span>
          </div>
          
          {/* Avatar with Status Ring & Dot */}
          <div className="relative">
            <img 
              src="https://i.pravatar.cc/150?u=alexcoder" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500 p-[2px] bg-[#0b0f19]"
            />
            {/* Online Status Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0b0f19] rounded-full"></span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;