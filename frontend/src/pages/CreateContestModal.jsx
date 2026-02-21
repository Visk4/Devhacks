import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Building2, Calendar as CalendarIcon, Sliders, 
  Wrench, Rocket, Plus, Search, ListChecks, Trash2 
} from 'lucide-react';

// Mock Database of Questions
const mockDatabase = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', points: 100, tags: ['Array', 'Hash Table'] },
  { id: '2', title: 'Dynamic String Matching', difficulty: 'Medium', points: 300, tags: ['DP', 'String'] },
  { id: '3', title: 'Graph Connectivity Queries', difficulty: 'Hard', points: 500, tags: ['Graph', 'DFS'] },
  { id: '4', title: 'Binary Sequence Restoration', difficulty: 'Easy', points: 150, tags: ['Math', 'Greedy'] },
  { id: '5', title: 'Advanced Tree Decomposition', difficulty: 'Very Hard', points: 800, tags: ['Trees', 'Advanced'] },
  { id: '6', title: 'Grid Path Optimization', difficulty: 'Medium', points: 250, tags: ['DP', 'Matrix'] },
  { id: '7', title: 'Maximum Subarray Sum', difficulty: 'Medium', points: 200, tags: ['Array', 'Divide & Conquer'] },
];

const CreateContestModal = ({ isOpen = true, onClose }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [enableTimer, setEnableTimer] = useState(true);
  
  // New State for Problem Selection
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  if (!isOpen) return null;

  // Filter out already selected questions and match search query
  const filteredQuestions = mockDatabase.filter(q => 
    !selectedQuestions.find(sq => sq.id === q.id) &&
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddQuestion = (question) => {
    if (selectedQuestions.length < 5) {
      setSelectedQuestions([...selectedQuestions, question]);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleRemoveQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const getDifficultyColor = (diff) => {
    if (diff.includes('Easy')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (diff === 'Medium') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    if (diff.includes('Hard')) return 'text-red-400 bg-red-400/10 border-red-400/20';
    return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden font-sans">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1f2e] shrink-0 bg-[#0b0f19] z-10">
          <div>
            <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Create Contest</h2>
            <p className="text-slate-400 text-sm">Configure your competitive event details and rules.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-[#1a1f2e] rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- BODY (SCROLLABLE) --- */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
          <div className="space-y-10 max-w-2xl mx-auto">
            
            {/* BASIC INFO */}
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-slate-300 mb-2">Contest Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Winter Code Sprint 2024" 
                  className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-300 mb-2">Short Description</label>
                <textarea 
                  rows="3"
                  placeholder="Briefly describe the theme and goals of this contest..." 
                  className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors placeholder-slate-600 resize-none custom-scrollbar"
                ></textarea>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-300 mb-2">Organization / School Name</label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="University or Organization Name" 
                    className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors placeholder-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* PROBLEM SELECTION (NEW) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[11px] font-black text-purple-400 uppercase tracking-widest">
                  <ListChecks size={14} /> Problem Selection
                </div>
                <div className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedQuestions.length === 5 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-[#111624] text-slate-400 border-[#1a1f2e]'}`}>
                  {selectedQuestions.length} / 5 Selected
                </div>
              </div>

              {/* Search Bar for Questions */}
              <div className="relative mb-4">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder={selectedQuestions.length >= 5 ? "Maximum questions reached" : "Search problem database..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    disabled={selectedQuestions.length >= 5}
                    className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors placeholder-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Dropdown Results */}
                {isSearchFocused && searchQuery && filteredQuestions.length > 0 && selectedQuestions.length < 5 && (
                  <div className="absolute top-full mt-2 w-full bg-[#111624] border border-[#1a1f2e] rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredQuestions.map(q => (
                      <div 
                        key={q.id}
                        onClick={() => handleAddQuestion(q)}
                        className="flex items-center justify-between p-3 border-b border-[#1a1f2e] last:border-0 hover:bg-[#1a2035] cursor-pointer transition-colors group"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{q.title}</span>
                          <span className="text-[10px] text-slate-500">{q.tags.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </span>
                          <button className="bg-purple-600 hover:bg-purple-500 text-white p-1 rounded-md transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Backdrop to close search dropdown */}
                {isSearchFocused && (
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchFocused(false)}></div>
                )}
              </div>

              {/* Selected Questions List */}
              <div className="flex flex-col gap-2 relative z-10">
                {selectedQuestions.length === 0 ? (
                  <div className="bg-[#05070a] border border-[#1a1f2e] border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-slate-500">
                    <ListChecks size={24} className="mb-2 opacity-50" />
                    <p className="text-sm font-medium">No problems selected yet.</p>
                    <p className="text-xs">Search and add exactly 5 problems to this contest.</p>
                  </div>
                ) : (
                  selectedQuestions.map((q, index) => (
                    <div key={q.id} className="flex items-center justify-between bg-[#111624] border border-[#1a1f2e] p-3.5 rounded-xl group">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded bg-[#0b0f19] border border-[#1a1f2e] flex items-center justify-center text-xs font-black text-slate-500">
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white leading-tight">{q.title}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getDifficultyColor(q.difficulty)}`}>
                              {q.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{q.points} Pts</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Remove question"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SCHEDULE */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4">
                <CalendarIcon size={14} /> Schedule
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2">Start Date & Time</label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2">End Date & Time</label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2">Registration Deadline</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                    />
                  </div>
                </div>
                <div className="flex items-center text-[11px] text-slate-500 mt-2 md:mt-7">
                  <span className="bg-[#1a1f2e] text-slate-400 rounded-full w-4 h-4 flex items-center justify-center mr-2 shrink-0">i</span>
                  Participants can register until this date. Late entries require admin approval.
                </div>
              </div>
            </div>

            {/* SETTINGS */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4">
                <Sliders size={14} /> Settings
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* Custom Toggle Switch */}
                <div className="flex items-center justify-between bg-[#05070a] border border-[#1a1f2e] p-4 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">Public Contest</p>
                    <p className="text-[11px] text-slate-500">Visible to everyone on the platform</p>
                  </div>
                  <button 
                    onClick={() => setIsPublic(!isPublic)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${isPublic ? 'bg-purple-600' : 'bg-[#1a1f2e]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2 mt-1 md:mt-0">Overall Difficulty</label>
                  <select className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer">
                    <option>Easy (Beginner)</option>
                    <option selected>Medium (Standard)</option>
                    <option>Hard (Advanced)</option>
                    <option>Extreme (Expert)</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[12px] font-bold text-slate-300 mb-2">Allowed Languages</label>
                <div className="w-full bg-[#05070a] border border-[#1a1f2e] rounded-xl p-2 flex flex-wrap gap-2 min-h-[50px] items-center">
                  <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-[11px] font-bold">
                    C++ <button className="hover:text-blue-200"><X size={12} /></button>
                  </span>
                  <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-lg text-[11px] font-bold">
                    Python 3 <button className="hover:text-yellow-200"><X size={12} /></button>
                  </span>
                  <span className="flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1.5 rounded-lg text-[11px] font-bold">
                    Java <button className="hover:text-orange-200"><X size={12} /></button>
                  </span>
                  <button className="flex items-center gap-1 text-slate-400 hover:text-white hover:bg-[#1a1f2e] px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2">Max Participants</label>
                  <input 
                    type="text" 
                    placeholder="0 for unlimited" 
                    className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors placeholder-slate-600"
                  />
                </div>
                
                <div className="flex items-center justify-between bg-[#05070a] border border-[#1a1f2e] p-4 rounded-xl mt-[26px]">
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">Enable Timer</p>
                    <p className="text-[11px] text-slate-500">Strict countdown for participants</p>
                  </div>
                  <button 
                    onClick={() => setEnableTimer(!enableTimer)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${enableTimer ? 'bg-purple-600' : 'bg-[#1a1f2e]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enableTimer ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>

            </div>

            {/* RULES & CONFIG */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4">
                <Wrench size={14} /> Rules & Config
              </div>

              <div className="mb-5 relative">
                <label className="block text-[12px] font-bold text-slate-300 mb-2">Contest Rules</label>
                <textarea 
                  rows="4"
                  defaultValue={"1. No plagiarism allowed\n2. Use of AI tools is restricted to..."} 
                  className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors placeholder-slate-600 resize-none font-mono custom-scrollbar pb-8"
                ></textarea>
                <div className="absolute bottom-3 right-4 text-[10px] text-slate-500 font-medium">
                  Markdown supported
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6">
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2">Leaderboard Visibility</label>
                  <select className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer">
                    <option>Public (Live Updates)</option>
                    <option>Private (Hidden until end)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-2">Test Case Visibility</label>
                  <select className="w-full bg-[#05070a] border border-[#1a1f2e] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer">
                    <option>Show all feedback</option>
                    <option>Hide hidden test cases</option>
                  </select>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* --- FOOTER (FIXED) --- */}
        <div className="px-6 py-4 border-t border-[#1a1f2e] bg-[#0b0f19] flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-medium text-slate-500">
            {selectedQuestions.length < 5 ? (
              <span className="text-yellow-500">Please select {5 - selectedQuestions.length} more questions to proceed.</span>
            ) : (
              <span className="text-emerald-500 flex items-center gap-1.5"><ListChecks size={14}/> 5/5 Questions ready</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 text-sm font-bold text-white bg-transparent border border-[#2a3143] hover:bg-[#1a1f2e] rounded-xl transition-colors">
              Save Draft
            </button>
            <button 
              disabled={selectedQuestions.length !== 5}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all ${selectedQuestions.length === 5 ? 'bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] active:scale-95' : 'bg-purple-600/50 cursor-not-allowed opacity-50'}`}
            >
              <Rocket size={16} /> Create Contest
            </button>
          </div>
        </div>

      </div>

      {/* Embedded CSS for scrollbar inside modal */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1f2e; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a3143; 
        }
      `}} />
    </div>
  );
};

export default CreateContestModal;