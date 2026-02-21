import React, { useState } from 'react';
import { 
  Code2, Bell, Search, Flame, Calendar, Clock, 
  Users, Zap, Check, RotateCcw, Trophy, 
  Github, Twitter, MessageSquare, HelpCircle,
  Plus, Hourglass, History, ChevronDown, Filter,
  Target, Layers, Crown
} from 'lucide-react';

import CreateContestModal from './CreateContestModal'; 
import RegisterContestModal from './RegisterContestModal';

const ContestsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // --- NEW STATE LOGIC FOR REGISTRATION ---
  // Tracks an array of contest IDs the user is registered for
  const [registeredContests, setRegisteredContests] = useState([]); 
  // Tracks which contest ID is currently trying to be registered via the modal
  const [activeRegisterId, setActiveRegisterId] = useState(null);

  // Fires when the modal successfully registers the user
  const handleRegistrationSuccess = () => {
    if (activeRegisterId && !registeredContests.includes(activeRegisterId)) {
      setRegisteredContests([...registeredContests, activeRegisterId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans relative overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        
        {/* Header Title & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] font-display">
              CONTESTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">ARENA</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base tracking-wide font-medium">Compete. Climb. Conquer.</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/50 hover:bg-purple-500/20 text-purple-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> Add Contest
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1 bg-[#111624] p-1 rounded-xl border border-[#1a1f2e]">
            <button className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-white/10 shadow-sm transition-colors">All Contests</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-white/5 transition-colors">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></span> Live Now
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
              <Hourglass size={14} /> Upcoming
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
              <History size={14} /> Past
            </button>
          </div>
          
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
            <Filter size={14} /> Sort by Date <ChevronDown size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: 2/3 WIDTH                     */}
          {/* ========================================== */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            
            {/* --- LIVE BATTLES (FEATURED) --- */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1.5 tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE
                </span>
                <h2 className="text-white font-bold text-lg uppercase tracking-wider">Battles</h2>
              </div>

              <div className="relative bg-[#0b0f19] rounded-2xl border border-[#1a1f2e] border-l-[3px] border-l-red-500 border-b-[3px] border-b-red-500/20 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] transition-all group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-3xl pointer-events-none rounded-full group-hover:bg-red-600/10 transition-colors duration-500"></div>

                <div className="flex-1 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-red-400 bg-red-500/10 px-2.5 py-1 rounded uppercase tracking-widest border border-red-500/20">Weekly Battle</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-[#111624] px-2.5 py-1 rounded border border-[#1a1f2e] uppercase tracking-widest">#IIC-402</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-red-50 transition-colors">Global Code Royale Finals</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">The ultimate showdown for the top 100 developers. Algorithms, data structures, and optimization challenges await.</p>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20"><Trophy size={14} className="text-yellow-500" /></div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Prize Pool</span>
                        <span className="text-white font-bold text-sm leading-none">$5,000 USD</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20"><Users size={14} className="text-blue-400" /></div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Participants</span>
                        <span className="text-white font-bold text-sm leading-none">1,240 <span className="text-emerald-500 text-[10px] ml-1">(+42/min)</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center md:items-end border-t md:border-t-0 md:border-l border-[#1a1f2e] pt-6 md:pt-0 md:pl-8 shrink-0 relative z-10">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Ending In</span>
                  <div className="text-3xl font-mono font-black text-red-500 mb-5 tracking-wider drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                    01<span className="text-red-500/50">:</span>42<span className="text-red-500/50">:</span>15
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-500 text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95 text-center">
                    Enter Battle &raquo;
                  </button>
                </div>
              </div>
            </section>

            {/* --- UPCOMING CHALLENGES --- */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} className="text-blue-400" />
                <h2 className="text-white font-bold text-lg uppercase tracking-wider">Upcoming Challenges</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Card 1: Bi-Weekly Contest */}
                <div className="bg-[#0b0f19] border border-[#1a1f2e] hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Bi-Weekly Contest 92</h3>
                      <p className="text-slate-400 text-xs">Starts: Oct 24, 18:00 UTC</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#111624] border border-[#1a1f2e] flex items-center justify-center text-yellow-500 font-bold"><span className="font-serif italic text-lg leading-none">P</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111624] rounded-lg p-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-white font-semibold text-sm">1h 30m</p>
                    </div>
                    <div className="bg-[#111624] rounded-lg p-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Registered</p>
                      <p className="text-white font-semibold text-sm">342 Users</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold"><Clock size={14} /> 2d 14h left</div>
                    
                    {/* CONDITIONAL BUTTON RENDER */}
                    {registeredContests.includes('bi-weekly-92') ? (
                      <button className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-2 rounded-lg text-sm font-bold cursor-default">
                        <Check size={16} /> Registered
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActiveRegisterId('bi-weekly-92')}
                        className="bg-blue-600/10 border border-blue-500 hover:bg-blue-600 hover:text-white text-blue-400 px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      >
                        Register Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Card 2: HackTheFuture */}
                <div className="bg-[#0b0f19] border border-[#1a1f2e] hover:border-yellow-500/30 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">HackTheFuture 2024</h3>
                      <p className="text-slate-400 text-xs">Starts: Nov 01, 09:00 UTC</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500"><Zap size={16} className="fill-yellow-500" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111624] rounded-lg p-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-white font-semibold text-sm">24h 00m</p>
                    </div>
                    <div className="bg-[#111624] rounded-lg p-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sponsor</p>
                      <p className="text-white font-semibold text-sm">TechCorp</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-yellow-500 text-xs font-bold"><Clock size={14} /> 1w 2d left</div>
                    
                    {/* CONDITIONAL BUTTON RENDER */}
                    {registeredContests.includes('hackthefuture') ? (
                      <button className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-2 rounded-lg text-sm font-bold cursor-default">
                        <Check size={16} /> Registered
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActiveRegisterId('hackthefuture')}
                        className="bg-transparent border border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-500 px-5 py-2 rounded-lg text-sm font-bold transition-all"
                      >
                        Register Now
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: SIDEBAR                      */}
          {/* ========================================== */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* TOP PLAYERS LEADERBOARD */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <Crown size={18} className="text-yellow-500" />
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm">Top Players</h3>
                </div>
                <span className="bg-red-500/10 text-red-500 text-[9px] font-black px-1.5 py-0.5 rounded border border-red-500/20 flex items-center gap-1 uppercase tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span> Live
                </span>
              </div>

              <div className="flex flex-col gap-1 mb-6 relative z-10">
                {/* Player 1 (Gold) */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 group cursor-pointer hover:bg-yellow-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 font-black w-4 text-center">1</span>
                    <img src="https://i.pravatar.cc/150?u=1" alt="Avatar" className="w-8 h-8 rounded-full border border-yellow-500/30" />
                    <div className="flex flex-col">
                      <span className="text-yellow-400 font-bold text-sm leading-tight group-hover:text-yellow-300">CyberNinja</span>
                      <span className="text-slate-400 text-[10px]">2,450 pts</span>
                    </div>
                  </div>
                </div>

                {/* Player 2 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#111624] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold w-4 text-center">2</span>
                    <img src="https://i.pravatar.cc/150?u=2" alt="Avatar" className="w-8 h-8 rounded-full border border-[#1a1f2e]" />
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-bold text-sm leading-tight group-hover:text-white">AlgoMaster</span>
                      <span className="text-slate-400 text-[10px]">2,380 pts</span>
                    </div>
                  </div>
                </div>

                {/* Player 3 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#111624] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold w-4 text-center">3</span>
                    <img src="https://i.pravatar.cc/150?u=3" alt="Avatar" className="w-8 h-8 rounded-full border border-[#1a1f2e]" />
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-bold text-sm leading-tight group-hover:text-white">SarahCodes</span>
                      <span className="text-slate-400 text-[10px]">2,100 pts</span>
                    </div>
                  </div>
                </div>

                {/* Player 4 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#111624] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold w-4 text-center">4</span>
                    <div className="w-8 h-8 rounded-full bg-[#1e2536] border border-[#2a3143] flex items-center justify-center text-xs font-bold text-slate-400">DB</div>
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-bold text-sm leading-tight group-hover:text-white">DebugBoy</span>
                      <span className="text-slate-400 text-[10px]">1,950 pts</span>
                    </div>
                  </div>
                </div>

                {/* Player 5 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#111624] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold w-4 text-center">5</span>
                    <div className="w-8 h-8 rounded-full bg-[#1e2536] border border-[#2a3143] flex items-center justify-center text-xs font-bold text-slate-400">KT</div>
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-bold text-sm leading-tight group-hover:text-white">KoolTech</span>
                      <span className="text-slate-400 text-[10px]">1,920 pts</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-[#111624] hover:bg-[#1a2035] text-purple-400 text-xs font-black tracking-widest uppercase rounded-xl border border-[#1a1f2e] hover:border-purple-500/30 transition-all relative z-10">
                View Full Leaderboard
              </button>
            </div>

            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Your Stats</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col items-center justify-center bg-[#111624] p-4 rounded-xl border border-[#1a1f2e]">
                  <span className="text-3xl font-black text-white mb-1">42</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Contests</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#111624] p-4 rounded-xl border border-[#1a1f2e]">
                  <span className="text-3xl font-black text-blue-400 mb-1">1580</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rating</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium">Global Rank</span>
                    <span className="text-white font-bold">Top 15%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 w-[85%] rounded-full shadow-[0_0_8px_rgba(192,38,211,0.5)]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium">Win Rate</span>
                    <span className="text-white font-bold">64%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[64%] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Embedded Modals */}
      <CreateContestModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      <RegisterContestModal 
        isOpen={!!activeRegisterId} // Open if an ID is set
        onClose={() => setActiveRegisterId(null)} 
        onSuccess={handleRegistrationSuccess} // Trigger state update
      />

    </div>
  );
};

export default ContestsPage;