import React from 'react';
import { 
  Code2, Clock, LogOut, List, Trophy, Filter, 
  Users, CheckCircle2, Hourglass, Circle, HelpCircle, 
  ArrowUp, ChevronRight 
} from 'lucide-react';

// --- MOCK DATA ---
const problemsData = [
  { letter: 'A', title: 'Binary Sequence Restoration', difficulty: 'Easy', rating: 800, time: '2 sec', memory: '256 MB', acceptance: '84.2%', status: 'solved' },
  { letter: 'B', title: 'Grid Path Optimization', difficulty: 'Easy-Medium', rating: 1100, time: '1 sec', memory: '256 MB', acceptance: '62.5%', status: 'solved' },
  { letter: 'C', title: 'Dynamic String Matching', difficulty: 'Medium', rating: 1500, time: '2 sec', memory: '512 MB', acceptance: '34.1%', status: 'pending', active: true },
  { letter: 'D', title: 'Graph Connectivity Queries', difficulty: 'Hard', rating: 1900, time: '3 sec', memory: '256 MB', acceptance: '12.8%', status: 'unattempted' },
  { letter: 'E', title: 'Advanced Tree Decomposition', difficulty: 'Very Hard', rating: 2400, time: '4 sec', memory: '1024 MB', acceptance: '3.5%', status: 'unattempted' },
];

const leaderboardData = [
  { rank: 1, user: 'tourist', avatarText: 'T', avatarColor: 'text-yellow-500 bg-yellow-500/10', score: 5000, time: '45m' },
  { rank: 2, user: 'Benq', avatarText: 'B', avatarColor: 'text-slate-300 bg-slate-500/10', score: 4850, time: '52m' },
  { rank: 3, user: 'Petr', avatarText: 'P', avatarColor: 'text-orange-500 bg-orange-500/10', score: 4600, time: '58m' },
  { rank: 4, user: 'Um_nik', avatarText: 'U', avatarColor: 'text-red-500 bg-red-500/10', score: 4200, time: '65m' },
  { rank: 5, user: 'ksun48', avatarText: 'K', avatarColor: 'text-purple-500 bg-purple-500/10', score: 4150, time: '68m' },
];

const ContestArena = () => {

  const getDifficultyColor = (difficulty) => {
    if (difficulty.includes('Easy')) return 'text-emerald-400';
    if (difficulty === 'Medium') return 'text-yellow-400';
    if (difficulty === 'Hard') return 'text-orange-500';
    if (difficulty === 'Very Hard') return 'text-red-500';
    return 'text-slate-400';
  };

  const getLetterBoxStyle = (status, active) => {
    if (active) return 'bg-blue-600/20 text-blue-400 border border-blue-500/50';
    if (status === 'solved') return 'bg-[#111624] text-emerald-500 border border-[#1a1f2e]';
    return 'bg-[#111624] text-slate-400 border border-[#1a1f2e]';
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans pb-20 selection:bg-blue-500/30">
      
      

      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8">
        
        {/* --- CONTEST HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1.5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> LIVE
              </span>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Div. 2 • Rated
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
              Weekly Code Battle #104
            </h1>
            <p className="text-slate-400 text-sm">
              Organized by <span className="text-blue-400 font-semibold">CodeBattle Official</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Time Remaining</span>
              <div className="flex items-center gap-2 text-3xl font-mono font-black text-white">
                <div className="bg-[#111624] border border-[#1a1f2e] rounded-lg px-3 py-1.5 shadow-inner">01</div>
                <span className="text-slate-500 pb-1">:</span>
                <div className="bg-[#111624] border border-[#1a1f2e] rounded-lg px-3 py-1.5 shadow-inner">42</div>
                <span className="text-slate-500 pb-1">:</span>
                <div className="bg-[#111624] border border-[#1a1f2e] rounded-lg px-3 py-1.5 shadow-inner text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">35</div>
              </div>
            </div>
            
            <div className="h-12 w-[1px] bg-[#1a1f2e] hidden md:block"></div>
            
            <button className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold">
              Exit Contest <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Problems & Performance */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            {/* PROBLEMS LIST */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <List size={20} className="text-blue-400" /> Problems
                </h2>
                <span className="text-xs text-slate-500 font-semibold">5 Problems</span>
              </div>

              <div className="flex flex-col gap-3">
                {problemsData.map((problem) => (
                  <div 
                    key={problem.letter} 
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer border ${problem.active ? 'bg-blue-600/5 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-[#05070a] border-[#1a1f2e] hover:border-[#2a3143]'}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Letter Box */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black shrink-0 ${getLetterBoxStyle(problem.status, problem.active)}`}>
                        {problem.letter}
                      </div>
                      
                      {/* Problem Details */}
                      <div className="flex flex-col gap-1">
                        <h3 className={`font-bold ${problem.active ? 'text-white' : 'text-slate-200'} text-base leading-tight`}>
                          {problem.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`font-bold ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty} • {problem.rating}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500">{problem.time} / {problem.memory}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-semibold">Acceptance</span>
                        <span className="text-white font-bold text-sm">{problem.acceptance}</span>
                      </div>
                      
                      {/* Status Icon */}
                      <div className="w-6 flex justify-center shrink-0">
                        {problem.status === 'solved' && <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 size={18} className="text-emerald-500" /></div>}
                        {problem.status === 'pending' && <div className="w-7 h-7 rounded-full bg-yellow-500/10 flex items-center justify-center"><Hourglass size={16} className="text-yellow-500" /></div>}
                        {problem.status === 'unattempted' && <Circle size={18} className="text-slate-700" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* YOUR PERFORMANCE */}
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-6">
                <span className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-purple-500"></span></span>
                Your Performance
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                
                {/* Solved Card */}
                <div className="bg-[#05070a] border border-[#1a1f2e] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Solved</span>
                  <div className="text-2xl font-black text-white mb-2">2<span className="text-slate-500 text-lg">/5</span></div>
                  <div className="w-full h-1.5 bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[40%] rounded-full"></div>
                  </div>
                </div>

                {/* Current Rank Card */}
                <div className="bg-[#05070a] border border-[#1a1f2e] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Rank</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-white">428</span>
                    <span className="flex items-center bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      <ArrowUp size={10} strokeWidth={3} /> 12
                    </span>
                  </div>
                </div>

                {/* Total Score Card */}
                <div className="bg-[#05070a] border border-[#1a1f2e] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Score</span>
                  <span className="text-3xl font-black text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">1900</span>
                </div>

                {/* Submissions Card */}
                <div className="bg-[#05070a] border border-[#1a1f2e] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Submissions</span>
                  <span className="text-2xl font-black text-white">5</span>
                </div>

                {/* Accuracy Card */}
                <div className="bg-[#05070a] border border-[#1a1f2e] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</span>
                  <span className="text-2xl font-black text-white">40%</span>
                </div>

                {/* Penalty Card */}
                <div className="bg-[#05070a] border border-[#1a1f2e] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Penalty</span>
                  <span className="text-2xl font-black text-red-400">20<span className="text-sm font-semibold text-red-400/70">m</span></span>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Leaderboard */}
          <div className="xl:col-span-1">
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
              
              {/* Leaderboard Header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <Trophy size={20} className="text-yellow-500" /> Top 10
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-white bg-[#111624] rounded-lg transition-colors"><Filter size={16} /></button>
                  <button className="p-1.5 text-slate-400 hover:text-white bg-[#111624] rounded-lg transition-colors"><Users size={16} /></button>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[30px_1fr_60px] gap-2 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                <div className="text-center">#</div>
                <div>User</div>
                <div className="text-right">Score</div>
              </div>

              {/* Leaderboard List */}
              <div className="flex flex-col gap-1 mb-4 flex-1">
                {leaderboardData.map((item) => (
                  <div key={item.rank} className="grid grid-cols-[30px_1fr_60px] gap-2 items-center p-2 rounded-lg hover:bg-[#111624] transition-colors cursor-pointer">
                    <div className={`text-center font-bold text-sm ${item.rank === 1 ? 'text-yellow-500' : item.rank === 2 ? 'text-slate-300' : item.rank === 3 ? 'text-orange-500' : 'text-slate-500'}`}>
                      {item.rank}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black shrink-0 ${item.avatarColor}`}>
                        {item.avatarText}
                      </div>
                      <span className="text-slate-200 font-semibold text-sm truncate">{item.user}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-white font-bold text-sm leading-tight">{item.score}</span>
                      <span className="text-slate-500 text-[9px] leading-tight">{item.time}</span>
                    </div>
                  </div>
                ))}

                {/* Ellipsis separator */}
                <div className="text-center text-slate-600 font-bold tracking-widest my-1">...</div>

                {/* Current User Highlighted Row */}
                <div className="grid grid-cols-[30px_1fr_60px] gap-2 items-center p-2 rounded-lg bg-blue-600/10 border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.15)] relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></div>
                  <div className="text-center font-bold text-blue-400 text-sm ml-1">
                    428
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=alexcoder" alt="You" className="w-6 h-6 rounded shrink-0 border border-blue-500/30" />
                    <span className="text-white font-bold text-sm">You</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white font-bold text-sm leading-tight">1900</span>
                    <span className="text-blue-400/80 text-[9px] leading-tight">124m</span>
                  </div>
                </div>

                {/* Row below user */}
                <div className="grid grid-cols-[30px_1fr_60px] gap-2 items-center p-2 rounded-lg hover:bg-[#111624] transition-colors cursor-pointer mt-1 opacity-70">
                  <div className="text-center font-bold text-slate-500 text-sm">429</div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-black shrink-0 text-slate-400 bg-slate-500/10">R</div>
                    <span className="text-slate-300 font-semibold text-sm truncate">Radewoosh</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-slate-300 font-bold text-sm leading-tight">1850</span>
                    <span className="text-slate-500 text-[9px] leading-tight">110m</span>
                  </div>
                </div>
              </div>

              {/* View Full Leaderboard Link */}
              <div className="pt-4 border-t border-[#1a1f2e] mt-auto">
                <button className="text-blue-400 hover:text-blue-300 text-xs font-bold flex items-center gap-1 transition-colors">
                  View Full Leaderboard <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </main>

    </div>
  );
};

export default ContestArena;