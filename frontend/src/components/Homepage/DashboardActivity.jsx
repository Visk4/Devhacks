import React from 'react';
import { Activity, Code, Crown, Trophy, GitCommit } from 'lucide-react';

const DashboardActivity = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans mt-8">
      
      {/* LEFT COLUMN: Live in the Arena (Takes up 2 columns on large screens) */}
      <div className="lg:col-span-2 bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-5 md:p-6 flex flex-col hover:border-[#2a3143] transition-colors duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
            <h2 className="text-white font-bold text-lg">Live in the Arena</h2>
          </div>
          <a href="#" className="text-cyan-500 hover:text-cyan-300 text-sm font-medium transition-all duration-300 hover:translate-x-1 inline-block">
            View All Events &rarr;
          </a>
        </div>

        {/* Featured Live Event Card */}
        <div className="w-full bg-gradient-to-r from-[#17112c] to-[#0d121c] border border-purple-500/20 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(168,85,247,0.3)] hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
          
          {/* Subtle background glow that brightens on hover */}
          <div className="absolute top-0 left-10 w-40 h-40 bg-purple-600/10 group-hover:bg-purple-600/20 blur-3xl pointer-events-none rounded-full transition-colors duration-500"></div>

          <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
            {/* Circular Timer Ring - Gentle pulse on hover */}
            <div className="w-[72px] h-[72px] rounded-full border-4 border-[#241b3d] border-t-purple-500 border-l-purple-500 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-sm tracking-tight">04:12</span>
              <span className="text-[8px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Ends In</span>
            </div>

            {/* Event Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-purple-500/20 text-purple-400 text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider border border-purple-500/20">
                  Hard
                </span>
                <span className="text-slate-400 text-xs font-medium group-hover:text-slate-300 transition-colors">Squad Battle • 4v4</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-purple-100 transition-colors">
                Dynamic Programming Championship
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                Solve 5 complex DP problems. Top 3 squads win exclusive badges.
              </p>
              
              {/* Avatars & Count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/150?u=11" alt="User" className="w-6 h-6 rounded-full border-2 border-[#17112c] group-hover:translate-x-1 transition-transform duration-300 delay-75" />
                  <img src="https://i.pravatar.cc/150?u=12" alt="User" className="w-6 h-6 rounded-full border-2 border-[#17112c] group-hover:translate-x-1 transition-transform duration-300 delay-100" />
                  <img src="https://i.pravatar.cc/150?u=13" alt="User" className="w-6 h-6 rounded-full border-2 border-[#17112c] group-hover:translate-x-1 transition-transform duration-300 delay-150" />
                  <div className="w-6 h-6 rounded-full border-2 border-[#17112c] bg-[#1e2536] flex items-center justify-center text-[9px] font-bold text-slate-300 group-hover:translate-x-1 transition-transform duration-300 delay-200">
                    +42
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">Competing now</span>
              </div>
            </div>
          </div>

          {/* Call to Action - Scales up slightly */}
          <button className="w-full md:w-auto bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Watch Live
          </button>
        </div>

        {/* Secondary Events List */}
        <div className="flex flex-col gap-3 mt-4">
          
          {/* Python Speed Run */}
          <div className="group bg-[#111624] border border-[#1a1f2e] hover:border-[#2a3143] rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black/20 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <Code size={18} className="text-blue-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-0.5 group-hover:text-blue-100 transition-colors">Python Speed Run</h4>
                <p className="text-slate-400 text-xs">Starts in 15 mins • 200 registered</p>
              </div>
            </div>
            <button className="bg-[#1a2035] group-hover:bg-blue-600 group-hover:text-white text-blue-400 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95">
              Register
            </button>
          </div>

          {/* King of the Hill */}
          <div className="group bg-[#111624] border border-[#1a1f2e] hover:border-[#2a3143] rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black/20 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-300">
                <Crown size={18} className="text-yellow-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-0.5 group-hover:text-yellow-100 transition-colors">King of the Hill</h4>
                <p className="text-slate-400 text-xs">Live Now • 12 Active Players</p>
              </div>
            </div>
            <button className="bg-[#1e2536] group-hover:bg-yellow-500 group-hover:text-black text-white px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 active:scale-95">
              Spectate
            </button>
          </div>

        </div>

      </div>


      {/* RIGHT COLUMN: Community Pulse */}
      <div className="lg:col-span-1 bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-5 md:p-6 flex flex-col hover:border-[#2a3143] transition-colors duration-500">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 group cursor-pointer">
          <Activity size={18} className="text-red-500 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-white font-bold text-lg">Community Pulse</h2>
        </div>

        {/* Timeline Feed */}
        <div className="relative border-l border-[#1a1f2e] ml-3 mt-2 flex-1 space-y-7 pb-4">
          
          {/* Feed Item 1 */}
          <div className="relative pl-5 group cursor-pointer">
            <div className="absolute -left-[14px] top-0.5 w-7 h-7 bg-[#0b0f19] rounded-full flex items-center justify-center border-4 border-[#0b0f19] group-hover:border-[#1a1f2e] transition-colors duration-300">
              <img src="https://i.pravatar.cc/150?u=21" alt="Sarah" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <p className="text-sm text-slate-300 leading-snug group-hover:text-white transition-colors">
                <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">Sarah_Dev</span> solved <span className="text-red-400 font-medium">Hard Problem #231</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400">2 minutes ago</p>
            </div>
          </div>

          {/* Feed Item 2 */}
          <div className="relative pl-5 group cursor-pointer">
            <div className="absolute -left-[14px] top-0.5 w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center border-4 border-[#0b0f19] group-hover:scale-110 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300">
              <Trophy size={10} />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <p className="text-sm text-slate-300 leading-snug group-hover:text-white transition-colors">
                <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">Team Alpha</span> won the <span className="text-yellow-400 font-medium">Squad Battle</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400">15 minutes ago</p>
            </div>
          </div>

          {/* Feed Item 3 */}
          <div className="relative pl-5 group cursor-pointer">
            <div className="absolute -left-[14px] top-0.5 w-7 h-7 bg-[#0b0f19] rounded-full flex items-center justify-center border-4 border-[#0b0f19] group-hover:border-[#1a1f2e] transition-colors duration-300">
              <img src="https://i.pravatar.cc/150?u=22" alt="David" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <p className="text-sm text-slate-300 leading-snug group-hover:text-white transition-colors">
                <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">DavidK</span> reached <span className="text-cyan-400 font-medium">Grandmaster</span> rank
              </p>
              <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400">42 minutes ago</p>
            </div>
          </div>

          {/* Feed Item 4 */}
          <div className="relative pl-5 group cursor-pointer">
            <div className="absolute -left-[14px] top-0.5 w-7 h-7 bg-[#1e2536] text-slate-400 rounded-full flex items-center justify-center border-4 border-[#0b0f19] group-hover:bg-[#2a3143] group-hover:text-white transition-all duration-300">
              <GitCommit size={12} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <p className="text-sm text-slate-300 leading-snug group-hover:text-white transition-colors">
                New contest <span className="text-white font-medium group-hover:text-purple-400 transition-colors">Bi-Weekly 84</span> is now open for registration
              </p>
              <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400">1 hour ago</p>
            </div>
          </div>

        </div>

        {/* View Full Feed Button */}
        <button className="w-full mt-4 bg-[#111724] hover:bg-[#1a2133] border border-[#1a1f2e] text-slate-300 hover:text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95">
          View Full Feed
        </button>

      </div>
    </div>
  );
};

export default DashboardActivity;