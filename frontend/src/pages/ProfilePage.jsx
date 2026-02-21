import React from 'react';
import { 
  Code2, Bell, Search, MapPin, Check, X, Clock, 
  Trophy, Flame, Zap, Bug, Crown, Users, Link2, 
  UserPlus, MoreHorizontal 
} from 'lucide-react';

// --- MOCK DATA ---
const recentSubmissions = [
  { id: 1, status: 'AC', problem: 'Dynamic Graph Partitioning', difficulty: 'Hard', language: 'C++20', time: '45ms', submitted: '2 mins ago' },
  { id: 2, status: 'WA', problem: 'Dynamic Graph Partitioning', difficulty: 'Hard', language: 'C++20', time: '42ms', submitted: '15 mins ago' },
  { id: 3, status: 'AC', problem: 'Binary Tree Cameras', difficulty: 'Medium', language: 'Python 3', time: '128ms', submitted: '2 hours ago' },
  { id: 4, status: 'TLE', problem: 'Maximum Subarray Sum', difficulty: 'Medium', language: 'Java', time: '2000ms', submitted: '5 hours ago' },
  { id: 5, status: 'AC', problem: 'Two Sum IV', difficulty: 'Easy', language: 'Rust', time: '2ms', submitted: 'Yesterday' },
];

const achievements = [
  { id: 1, title: 'Contest Winner', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { id: 2, title: '100 Day Streak', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 3, title: 'Speed Demon', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 4, title: 'Bug Hunter', icon: Bug, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 5, title: 'Grandmaster', icon: Crown, color: 'text-slate-400', bg: 'bg-slate-500/10', inactive: true },
  { id: 6, title: 'Community Pillar', icon: Users, color: 'text-slate-400', bg: 'bg-slate-500/10', inactive: true },
];

const ProfilePage = () => {
  // Helper to generate heatmap squares
  const renderHeatmap = () => {
    const squares = [];
    for (let i = 0; i < 364; i++) {
      const rand = Math.random();
      let colorClass = 'bg-[#1a1f2e]'; // Empty
      if (rand > 0.9) colorClass = 'bg-emerald-400';
      else if (rand > 0.7) colorClass = 'bg-emerald-500';
      else if (rand > 0.4) colorClass = 'bg-emerald-800';
      else if (rand > 0.2) colorClass = 'bg-emerald-900/50';

      squares.push(<div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${colorClass}`}></div>);
    }
    return squares;
  };

  return (
    // Added relative and overflow-hidden to contain the absolute glow elements
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans pb-20 relative overflow-hidden">
      
      {/* --- NEW: Ambient Background Glow --- */}
      {/* Top-left purple glow */}
      <div className="fixed top-0 left-0 w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"></div>
      {/* Bottom-right cyan glow */}
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/3 z-0"></div>


      {/* --- MAIN CONTENT --- */}
      {/* Added relative z-10 to ensure content sits above the background glow */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 relative z-10">
        
        {/* Profile Header */}
        <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-purple-600"></div>
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=12" alt="Profile" className="w-20 h-20 rounded-xl object-cover border border-[#1a1f2e]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#05070a] border border-[#1a1f2e] rounded-full px-2 py-0.5 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white tracking-tight">alex_coder_99</h2>
                <span className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                  Grandmaster
                </span>
                <span className="text-lg">🇺🇸</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <span>Rank: <span className="text-white font-bold">#42</span></span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>Rating: <span className="text-red-400 font-bold">2845</span></span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="flex items-center gap-1"><MapPin size={14} /> San Francisco</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="hidden sm:flex items-center gap-2 bg-[#111624] border border-[#1a1f2e] rounded-xl px-4 py-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Streak</span>
              <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                <Flame size={16} className="text-orange-500 fill-orange-500/20" /> 142 Days
              </div>
            </div>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
              <UserPlus size={16} /> Follow
            </button>
            <button className="bg-[#111624] hover:bg-[#1a1f2e] border border-[#1a1f2e] text-slate-400 p-2.5 rounded-xl transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Global Rank</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-white">42</p>
              <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                ↑ 5
              </div>
            </div>
          </div>
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Rating</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-red-500">2845</p>
              <span className="text-[10px] text-slate-500 font-medium pb-1">Max: 2910</span>
            </div>
          </div>
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Problems Solved</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-white">1,248</p>
              <span className="text-[10px] text-slate-500 font-medium pb-1">Top 0.5%</span>
            </div>
          </div>
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Win Rate</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-cyan-400">68.4%</p>
              <span className="text-[10px] text-slate-500 font-medium pb-1">1v1 Battles</span>
            </div>
          </div>
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contribution</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-white">+842</p>
              <Link2 size={14} className="text-slate-600 mb-1" />
            </div>
          </div>
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contests</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-white">156</p>
              <span className="text-[10px] text-slate-500 font-medium pb-1">Since 2021</span>
            </div>
          </div>
        </div>

        {/* Layout Grid (Left 2/3, Right 1/3) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* ---- LEFT COLUMN ---- */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            {/* Recent Submissions */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Clock size={16} className="text-purple-400" /> RECENT SUBMISSIONS
                </h3>
                <a href="#" className="text-cyan-500 text-xs font-bold hover:underline">View All</a>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-[#1a1f2e]">
                    <tr>
                      <th className="pb-3 px-4 font-bold">Status</th>
                      <th className="pb-3 px-4 font-bold">Problem</th>
                      <th className="pb-3 px-4 font-bold text-center">Difficulty</th>
                      <th className="pb-3 px-4 font-bold text-center">Language</th>
                      <th className="pb-3 px-4 font-bold text-center">Time</th>
                      <th className="pb-3 px-4 font-bold text-right">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubmissions.map((sub, index) => (
                      <tr key={sub.id} className={`border-b border-[#1a1f2e]/50 hover:bg-[#111624] transition-colors ${index === recentSubmissions.length - 1 ? 'border-none' : ''}`}>
                        <td className="py-3.5 px-4 font-bold">
                          {sub.status === 'AC' && <span className="flex items-center gap-1.5 text-emerald-500"><Check size={14} /> AC</span>}
                          {sub.status === 'WA' && <span className="flex items-center gap-1.5 text-red-500"><X size={14} /> WA</span>}
                          {sub.status === 'TLE' && <span className="flex items-center gap-1.5 text-yellow-500"><Clock size={14} /> TLE</span>}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-200 hover:text-cyan-400 cursor-pointer transition-colors">
                          {sub.problem}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider border
                            ${sub.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                            ${sub.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                            ${sub.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                          `}>
                            {sub.difficulty}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-400 text-xs">{sub.language}</td>
                        <td className="py-3.5 px-4 text-center text-slate-300 font-mono text-xs">{sub.time}</td>
                        <td className="py-3.5 px-4 text-right text-slate-500 text-xs">{sub.submitted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Year (Heatmap) */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <Check size={16} className="text-emerald-400" /> Activity Year
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  Less 
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1a1f2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900/50"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400"></div>
                  </div>
                  More
                </div>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                  {renderHeatmap()}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">1,248 contributions in the last year</p>
            </div>

            {/* Achievements */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <Trophy size={16} className="text-yellow-500" /> Achievements
                </h3>
                <span className="text-xs text-slate-400">12 / 50 Unlocked</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {achievements.map((ach) => {
                  const Icon = ach.icon;
                  return (
                    <div key={ach.id} className={`flex flex-col items-center justify-center p-4 rounded-xl border ${ach.inactive ? 'bg-[#05070a] border-[#1a1f2e] opacity-50' : 'bg-[#111624] border-[#1a1f2e] hover:border-slate-600 cursor-pointer transition-colors'} text-center gap-3`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ach.bg}`}>
                        <Icon size={20} className={ach.color} />
                      </div>
                      <span className={`text-[10px] font-bold leading-tight ${ach.inactive ? 'text-slate-500' : 'text-slate-200'}`}>
                        {ach.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ---- RIGHT COLUMN ---- */}
          <div className="flex flex-col gap-6">
            
            {/* Solved Stats */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <PieChartIcon className="text-purple-400" /> Solved
                </h3>
                <div className="flex gap-1 bg-[#111624] p-1 rounded-lg">
                  <button className="bg-[#1e2536] text-white text-[10px] font-bold px-2 py-1 rounded">All</button>
                  <button className="text-slate-400 hover:text-white text-[10px] font-bold px-2 py-1 rounded">E</button>
                  <button className="text-slate-400 hover:text-white text-[10px] font-bold px-2 py-1 rounded">M</button>
                  <button className="text-slate-400 hover:text-white text-[10px] font-bold px-2 py-1 rounded">H</button>
                </div>
              </div>

              {/* Big Number Display (Mocking a donut chart center) */}
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 rounded-full border-8 border-[#1a1f2e] border-t-emerald-500 border-r-orange-500 border-b-red-500 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">1,248</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Solved</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-emerald-500">Easy</span>
                    <span className="text-slate-400"><span className="text-emerald-500">512</span> / 600</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_8px_#10b981]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-orange-500">Medium</span>
                    <span className="text-slate-400"><span className="text-orange-500">486</span> / 800</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[60%] rounded-full shadow-[0_0_8px_#f97316]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-red-500">Hard</span>
                    <span className="text-slate-400"><span className="text-red-500">250</span> / 400</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[62%] rounded-full shadow-[0_0_8px_#ef4444]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Analysis (Radar Chart Mockup) */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm mb-6">
                <Zap size={16} className="text-fuchsia-500" /> Skill Analysis
              </h3>
              
              <div className="relative w-full aspect-square max-w-[240px] mx-auto mb-6">
                {/* SVG Radar Chart Background */}
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  {/* Web Lines */}
                  {[20, 40, 60, 80, 100].map(r => (
                    <polygon key={r} points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#1a1f2e" strokeWidth="0.5" transform={`scale(${r/100}) translate(${(100-r)/2}, ${(100-r)/2})`} />
                  ))}
                  {/* Axis Lines */}
                  <line x1="50" y1="50" x2="50" y2="0" stroke="#1a1f2e" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="93.3" y2="25" stroke="#1a1f2e" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="93.3" y2="75" stroke="#1a1f2e" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="100" stroke="#1a1f2e" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="6.7" y2="75" stroke="#1a1f2e" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="6.7" y2="25" stroke="#1a1f2e" strokeWidth="0.5" />
                  
                  {/* Data Polygon */}
                  <polygon points="50,10 80,30 85,75 50,85 20,60 25,20" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1.5" />
                  
                  {/* Data Points */}
                  <circle cx="50" cy="10" r="1.5" fill="#a855f7" />
                  <circle cx="80" cy="30" r="1.5" fill="#a855f7" />
                  <circle cx="85" cy="75" r="1.5" fill="#a855f7" />
                  <circle cx="50" cy="85" r="1.5" fill="#a855f7" />
                  <circle cx="20" cy="60" r="1.5" fill="#a855f7" />
                  <circle cx="25" cy="20" r="1.5" fill="#a855f7" />
                </svg>
                
                {/* Labels */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">DP</span>
                <span className="absolute top-1/4 -right-6 text-[9px] text-slate-400">Graphs</span>
                <span className="absolute bottom-1/4 -right-6 text-[9px] text-slate-400">Greedy</span>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">Strings</span>
                <span className="absolute bottom-1/4 -left-4 text-[9px] text-slate-400">Math</span>
                <span className="absolute top-1/4 -left-6 text-[9px] text-slate-400">Geometry</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#111624] border border-[#1a1f2e] p-3 rounded-xl">
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Strongest</p>
                  <p className="text-white text-xs font-bold">Dynamic Programming</p>
                </div>
                <div className="bg-[#111624] border border-[#1a1f2e] p-3 rounded-xl">
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Weakest</p>
                  <p className="text-white text-xs font-bold">Geometry</p>
                </div>
              </div>
            </div>

            {/* Upcoming Contests */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <Clock size={16} className="text-blue-400" /> Upcoming
                </h3>
                <a href="#" className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest hover:underline">Calendar</a>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-black text-purple-400 uppercase leading-none">Feb</span>
                    <span className="text-lg font-black text-white leading-none mt-0.5">24</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-bold">Weekly Battle #84</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Starts in 4h 30m</p>
                  </div>
                  <button className="bg-[#1e2536] hover:bg-[#2a3143] text-slate-200 text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                    Register
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-black text-blue-400 uppercase leading-none">Feb</span>
                    <span className="text-lg font-black text-white leading-none mt-0.5">28</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-bold">Global Championship Qualifiers</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Starts in 4 days</p>
                  </div>
                  <button className="bg-[#1e2536] hover:bg-[#2a3143] text-slate-200 text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
      
      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all z-30">
        <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black">?</div>
        Help
      </button>

    </div>
  );
};

// Simple PieChart Icon Component
const PieChartIcon = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

export default ProfilePage;