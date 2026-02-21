import React, { useState } from 'react';
import { 
  Search, Shuffle, CheckCircle2, Flame, 
  Wrench, Circle, ChevronDown, PieChart, 
  Bot, Timer, X, Filter
} from 'lucide-react';

// --- MOCK DATA ---
const problemsData = [
  { id: 1, title: "Two Sum", tags: ["Array", "Hash Table"], acceptance: 48.5, difficulty: "Easy", status: "solved" },
  { id: 2, title: "Add Two Numbers", tags: ["Linked List", "Math", "Recursion"], acceptance: 39.2, difficulty: "Medium", status: "todo", hot: true },
  { id: 3, title: "Median of Two Sorted Arrays", tags: ["Array", "Binary Search"], acceptance: 34.6, difficulty: "Hard", status: "attempted" },
  { id: 4, title: "Longest Palindromic Substring", tags: ["String", "DP"], acceptance: 31.8, difficulty: "Medium", status: "todo" },
  { id: 5, title: "Regular Expression Matching", tags: ["String", "DP", "Recursion"], acceptance: 28.0, difficulty: "Hard", status: "todo" },
  { id: 6, title: "Container With Most Water", tags: ["Array", "Two Pointers"], acceptance: 52.7, difficulty: "Medium", status: "todo" }
];

// --- SUB-COMPONENTS ---

const PracticeHeader = () => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
    <div>
      <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 font-display">
        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Problems</span>
      </h1>
      <p className="text-slate-400 text-sm">
        Sharpen your skills. Level up your game. Enter the arena.
      </p>
    </div>

    {/* Header Stats & Search */}
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
      <div className="flex items-center gap-3">
        {/* Solved Stat */}
        <div className="flex items-center gap-3 bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-3 px-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Solved Today</span>
            <span className="text-white font-bold text-sm leading-none">3 <span className="text-slate-500 font-medium text-xs">/ 5 goal</span></span>
          </div>
        </div>
        
        {/* Streak Stat */}
        <div className="flex items-center gap-3 bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-3 px-4">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
            <Flame size={16} className="text-yellow-500 fill-yellow-500/20" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Streak</span>
            <span className="text-white font-bold text-sm leading-none">12 <span className="text-slate-500 font-medium text-xs">days</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SearchAndFilters = () => (
  <div className="flex flex-col gap-4 mb-6">
    {/* Search Bar */}
    <div className="flex items-center gap-3 w-full bg-[#0b0f19] border border-[#1a1f2e] rounded-xl p-2 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
      <Search size={18} className="text-slate-500 ml-3 shrink-0" />
      <input 
        type="text" 
        placeholder="Search for problems by title, tag, or ID..." 
        className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-slate-600 px-2"
      />
      <button className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white bg-[#111724] px-4 py-2 rounded-lg text-xs font-bold transition-colors">
        <Shuffle size={14} /> Random
      </button>
      <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
        Search
      </button>
    </div>

    {/* Filter Row */}
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1a1f2e] pb-4">
      <div className="flex flex-wrap items-center gap-6">
        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2">
            <Filter size={12} /> Difficulty:
          </span>
          <button className="text-slate-400 hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors">Easy</button>
          <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-semibold">Medium</button>
          <button className="text-slate-400 hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors">Hard</button>
        </div>

        <div className="w-[1px] h-4 bg-[#1a1f2e] hidden md:block"></div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2">Status:</span>
          <button className="flex items-center gap-1.5 text-slate-400 hover:text-white border border-[#1a1f2e] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors">
            <Circle size={10} /> Todo
          </button>
          <button className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-semibold">
            <CheckCircle2 size={12} /> Solved
          </button>
          <button className="flex items-center gap-1.5 text-yellow-500 hover:text-yellow-400 border border-[#1a1f2e] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors">
            <Wrench size={10} /> Attempted
          </button>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 text-slate-400 hover:text-white border border-[#1a1f2e] px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
          Tags <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-white border border-[#1a1f2e] px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
          ↓ Sort: Popularity
        </button>
      </div>
    </div>

    {/* Active Filters */}
    <div className="flex items-center justify-between pt-2 mb-2">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-slate-500 mr-2">Active Filters:</span>
        <span className="flex items-center gap-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded text-[10px] font-bold cursor-pointer hover:bg-purple-500/20 transition-colors">
          Dynamic Programming <X size={10} />
        </span>
        <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-1 rounded text-[10px] font-bold cursor-pointer hover:bg-cyan-500/20 transition-colors">
          Arrays <X size={10} />
        </span>
      </div>
      <button className="text-slate-500 hover:text-slate-300 text-xs underline transition-colors">Clear all</button>
    </div>
  </div>
);

const ProblemRow = ({ problem }) => {
  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 border-emerald-500/30';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'text-pink-500 border-pink-500/30';
      default: return 'text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'solved': return <CheckCircle2 size={16} className="text-emerald-400" />;
      case 'attempted': return <Wrench size={14} className="text-yellow-500" />;
      default: return <Circle size={14} className="text-slate-600" />;
    }
  };

  // Logic to determine left border color based on hover or active status
  const leftBorderClass = problem.status === 'solved' 
    ? "border-l-emerald-500" 
    : "border-l-transparent group-hover:border-l-cyan-400";

  return (
    <div className={`group grid grid-cols-[50px_1fr_120px_100px_120px] gap-4 items-center bg-[#0b0f19] border border-[#1a1f2e] border-l-2 ${leftBorderClass} rounded-xl p-4 transition-all duration-300 hover:bg-[#111624] mb-3`}>
      
      {/* Status */}
      <div className="flex justify-center">
        {getStatusIcon(problem.status)}
      </div>

      {/* Title & Tags */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors cursor-pointer">
            {problem.title}
          </h3>
          {problem.hot && <Flame size={14} className="text-yellow-500 fill-yellow-500/20" />}
        </div>
        <div className="flex items-center gap-2">
          {problem.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#1e2536] text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Acceptance */}
      <div className="flex flex-col gap-1.5">
        <span className="text-white font-semibold text-xs">{problem.acceptance}%</span>
        <div className="w-10 h-0.5 bg-[#1a1f2e] rounded-full overflow-hidden">
          <div className="h-full bg-slate-500" style={{ width: `${problem.acceptance}%` }}></div>
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(37,99,235,0.3)] active:scale-95">
          Solve Now
        </button>
      </div>

    </div>
  );
};

const RightSidebar = () => (
  <div className="flex flex-col gap-6">
    
    {/* Your Progress */}
    <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-6">
        <PieChart size={18} className="text-purple-500" />
        <h3 className="text-white font-bold">Your Progress</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Easy */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-emerald-400 font-bold">Easy</span>
            <span className="text-slate-400 font-medium">12 / 45</span>
          </div>
          <div className="w-full h-1.5 bg-[#1a1f2e] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[26%] rounded-full shadow-[0_0_8px_#34d399]"></div>
          </div>
        </div>
        {/* Medium */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-yellow-400 font-bold">Medium</span>
            <span className="text-slate-400 font-medium">8 / 120</span>
          </div>
          <div className="w-full h-1.5 bg-[#1a1f2e] rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 w-[6%] rounded-full shadow-[0_0_8px_#facc15]"></div>
          </div>
        </div>
        {/* Hard */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-pink-500 font-bold">Hard</span>
            <span className="text-slate-400 font-medium">1 / 50</span>
          </div>
          <div className="w-full h-1.5 bg-[#1a1f2e] rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 w-[2%] rounded-full shadow-[0_0_8px_#ec4899]"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Recommended For You */}
    <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-5">
      <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3">
        Recommended For You
      </h4>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold">Dynamic Programming</h3>
        <Bot size={16} className="text-slate-600" />
      </div>
      <p className="text-slate-400 text-xs leading-relaxed mb-5">
        Based on your recent activity, we recommend practicing DP problems to improve your skills.
      </p>
      <button className="w-full border border-[#2a3143] hover:bg-[#111724] text-slate-300 py-2.5 rounded-xl text-xs font-bold transition-colors">
        View 12 Problems
      </button>
    </div>

    {/* Weekly Contest */}
    <div className="bg-[#170e24] border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl pointer-events-none rounded-full"></div>
      
      <div className="relative z-10 flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
          Weekly Contest 384
        </h4>
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></span>
      </div>
      <h3 className="text-white font-bold text-lg mb-1 relative z-10">
        Starts in 2h 15m
      </h3>
      <p className="text-slate-400 text-xs mb-5 relative z-10">
        Compete globally and win exclusive badges.
      </p>
      <button className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(192,38,211,0.4)] transition-all active:scale-95 relative z-10">
        Register Now
      </button>
    </div>

  </div>
);


// --- MAIN PAGE LAYOUT ---

const Practicepage = () => {
  return (
    <div className="min-h-screen bg-[#05070a] font-sans pb-20">
      
      {/* Subtle Ambient Background Glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[400px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <PracticeHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          
          {/* Left Column: Problems */}
          <div className="flex flex-col">
            <SearchAndFilters />
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[50px_1fr_120px_100px_120px] gap-4 items-center px-4 py-3 border-b border-[#1a1f2e] mb-2">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Title</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Acceptance</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Difficulty</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right pr-2">Action</div>
            </div>

            {/* Problem List */}
            <div className="flex flex-col">
              {problemsData.map(problem => (
                <ProblemRow key={problem.id} problem={problem} />
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="hidden xl:block">
            <RightSidebar />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Practicepage;