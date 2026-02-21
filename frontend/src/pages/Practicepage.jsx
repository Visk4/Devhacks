import React, { useState, useEffect } from 'react';
import { 
  Search, Shuffle, CheckCircle2, Flame, 
  Wrench, Circle, ChevronDown, PieChart, 
  Bot, Timer, X, Filter, Loader2
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    {/* Header Stats */}
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
    </div>
  </div>
);

const ProblemRow = ({ problem, onClick }) => {
  // Helper to format backend uppercase difficulty to Title Case
  const formatDifficulty = (diff) => {
    if (!diff) return 'Unknown';
    return diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase();
  };

  const difficultyTitle = formatDifficulty(problem.difficulty);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 border-emerald-500/30';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'text-pink-500 border-pink-500/30';
      default: return 'text-slate-400 border-slate-500/30';
    }
  };

  // Defaulting status since backend doesn't provide user progress yet
  const status = problem.status || 'todo';
  const getStatusIcon = (status) => {
    switch(status) {
      case 'solved': return <CheckCircle2 size={16} className="text-emerald-400" />;
      case 'attempted': return <Wrench size={14} className="text-yellow-500" />;
      default: return <Circle size={14} className="text-slate-600" />;
    }
  };

  const leftBorderClass = status === 'solved' 
    ? "border-l-emerald-500" 
    : "border-l-transparent group-hover:border-l-cyan-400";

  return (
    <div 
      onClick={() => onClick(problem.id)}
      className={`group grid grid-cols-[50px_1fr_120px_100px_120px] gap-4 items-center bg-[#0b0f19] border border-[#1a1f2e] border-l-2 ${leftBorderClass} rounded-xl p-4 transition-all duration-300 hover:bg-[#111624] mb-3 cursor-pointer`}
    >
      
      {/* Status */}
      <div className="flex justify-center">
        {getStatusIcon(status)}
      </div>

      {/* Title & Tags */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
            {problem.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Handling topics mapping safely from backend */}
          {problem.topics && problem.topics.length > 0 ? (
            problem.topics.map((tag, idx) => (
              <span key={idx} className="bg-[#1e2536] text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded">
                {tag}
              </span>
            ))
          ) : (
            <span className="bg-[#1e2536] text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded">
              Algorithms
            </span>
          )}
        </div>
      </div>

      {/* Points (Swapped from Acceptance to match backend) */}
      <div className="flex flex-col gap-1.5">
        <span className="text-white font-semibold text-xs">{problem.points} pts</span>
      </div>

      {/* Difficulty */}
      <div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getDifficultyColor(difficultyTitle)}`}>
          {difficultyTitle}
        </span>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents double-firing since the parent div also has an onClick
            onClick(problem.id);
          }}
          className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(37,99,235,0.3)] active:scale-95"
        >
          Solve Now
        </button>
      </div>

    </div>
  );
};

const RightSidebar = () => (
  // (Sidebar remains unchanged, keeping it static for the mockup)
  <div className="flex flex-col gap-6">
    <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-6">
        <PieChart size={18} className="text-purple-500" />
        <h3 className="text-white font-bold">Your Progress</h3>
      </div>
      <div className="flex flex-col gap-4">
        {/* ... (Progress Bars) ... */}
      </div>
    </div>
  </div>
);


// --- MAIN PAGE LAYOUT ---

const Practicepage = () => {
  const navigate = useNavigate();
  const [problemsData, setProblemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch problems from backend on component mount
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        
        // Include Authorization header in case the route is protected
        const response = await axios.get("http://localhost:8080/api/problems", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setProblemsData(response.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError("Failed to load problems. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Handler for clicking a problem row or the Solve Now button
  const handleProblemClick = (problemId) => {
    // Navigate directly to the dynamic problem route
    navigate(`/problem/${problemId}`);
  };

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
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Points</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Difficulty</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right pr-2">Action</div>
            </div>

            {/* Problem List Display */}
            <div className="flex flex-col min-h-[300px]">
              {isLoading ? (
                // Loading State
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                  <p className="text-slate-400 text-sm font-medium">Loading Arena Challenges...</p>
                </div>
              ) : error ? (
                // Error State
                <div className="flex justify-center items-center h-48">
                  <p className="text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 text-sm">
                    {error}
                  </p>
                </div>
              ) : problemsData.length === 0 ? (
                // Empty State
                <div className="flex justify-center items-center h-48">
                  <p className="text-slate-500 text-sm">No problems found in the arena.</p>
                </div>
              ) : (
                // Data Display
                problemsData.map(problem => (
                  <ProblemRow 
                    key={problem.id} 
                    problem={problem} 
                    onClick={handleProblemClick} 
                  />
                ))
              )}
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