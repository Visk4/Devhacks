import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { useNavigate } from 'react-router-dom'; // <-- Added for routing
import { 
  Code2, Flame, Coins, Bell, Star, Clock, Database, CheckCircle2, 
  ChevronDown, RotateCcw, Settings, Maximize, Play, CloudUpload, 
  Terminal, ListTodo, HelpCircle, AlertCircle, AlertTriangle, ChevronRight 
} from 'lucide-react';
import SolutionModal from '../components/Practice/SolutionModal'; // <-- Added import

const languageTemplates = {
  python: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,

  cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> seen;
        for(int i = 0; i < nums.size(); i++){
            int complement = target - nums[i];
            if(seen.count(complement)){
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,

  java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for(int i = 0; i < nums.length; i++){
            int complement = target - nums[i];
            if(seen.containsKey(complement)){
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`
};

const ProblemSolvingPage = () => {
  const navigate = useNavigate(); // <-- Added router hook
  
  const [activeTab, setActiveTab] = useState('description');
  const [activeTestCase, setActiveTestCase] = useState(1);
  const [consoleTab, setConsoleTab] = useState('testcases');
  const [isSolutionOpen, setIsSolutionOpen] = useState(false); // <-- Added modal state

  // Monaco Editor State
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(languageTemplates.python);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
  };

  return (
    <div className="h-screen flex flex-col bg-[#05070a] text-slate-300 font-sans overflow-hidden selection:bg-purple-500/30">

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ========================================== */}
        {/* LEFT PANEL: 40% WIDTH - Problem Details    */}
        {/* ========================================== */}
        <div className="w-[40%] flex flex-col border-r border-[#1a1f2e] bg-[#0b0f19]">
          
          {/* Sub-Navbar for Left Panel */}
          <div className="h-[50px] flex items-center justify-between px-4 border-b border-[#1a1f2e] bg-[#0b0f19] shrink-0">
            <div className="flex items-center gap-4 text-[13px] font-semibold text-slate-400">
              <button 
                className={`flex items-center gap-1.5 h-full ${activeTab === 'description' ? 'text-white' : 'hover:text-slate-200'}`}
                onClick={() => setActiveTab('description')}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> EASY
              </button>
              
              {/* --- UPDATED BUTTONS HERE --- */}
              <button 
                className="hover:text-slate-200 transition-colors"
                onClick={() => setIsSolutionOpen(true)}
              >
                Solutions
              </button>
              <button 
                className="hover:text-slate-200 transition-colors"
                onClick={() => navigate('/problemsolving/submissions')}
              >
                Submissions
              </button>
              {/* ---------------------------- */}

            </div>
            <button className="flex items-center gap-1 text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">
              <Star size={14} /> Add to List
            </button>
          </div>

          {/* Scrollable Problem Description */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            
            {/* Title & Tags */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                1. Two Sum
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#1e2536] text-slate-300 font-medium">#Array</span>
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#1e2536] text-slate-300 font-medium">#HashTable</span>
              </h2>
            </div>

            {/* Meta Stats */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <Clock size={14} className="text-purple-400" /> Time Limit: 2s
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <Database size={14} className="text-cyan-400" /> Memory Limit: 256MB
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <CheckCircle2 size={14} className="text-emerald-500" /> Acceptance: 48.2%
              </div>
            </div>

            {/* Show Topics Button */}
            <button className="flex items-center gap-2 text-[13px] font-bold text-purple-400 hover:text-purple-300 mb-8 border border-purple-500/30 bg-purple-500/10 px-4 py-2 rounded-lg transition-colors">
              <ListTodo size={16} /> Show Topics
            </button>

            {/* Problem Text */}
            <div className="text-[14px] leading-relaxed text-slate-300 mb-8 space-y-4">
              <p>
                Given an array of integers <code className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">nums</code> and an integer <code className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">target</code>, return <em>indices of the two numbers such that they add up to <code className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">target</code></em>.
              </p>
              <p>
                You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.
              </p>
              <p>
                You can return the answer in any order.
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-6 mb-8">
              {/* Example 1 */}
              <div>
                <p className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">EXAMPLE 1</p>
                <div className="bg-[#111624] border border-[#1a1f2e] rounded-xl p-4 font-mono text-[13px] space-y-3">
                  <div>
                    <span className="text-slate-500">Input:</span><br/>
                    <span className="text-white">nums = [2,7,11,15], target = 9</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Output:</span><br/>
                    <span className="text-white">[0,1]</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Explanation:</span><br/>
                    <span className="text-white">Because nums[0] + nums[1] == 9, we return [0, 1].</span>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div>
                <p className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">EXAMPLE 2</p>
                <div className="bg-[#111624] border border-[#1a1f2e] rounded-xl p-4 font-mono text-[13px] space-y-3">
                  <div>
                    <span className="text-slate-500">Input:</span><br/>
                    <span className="text-white">nums = [3,2,4], target = 6</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Output:</span><br/>
                    <span className="text-white">[1,2]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div className="mb-8">
              <p className="text-[12px] font-bold text-yellow-500 tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle size={14} /> CONSTRAINTS
              </p>
              <ul className="list-disc list-inside space-y-2 text-[13px] font-mono text-slate-300 marker:text-slate-600">
                <li><code className="bg-[#111624] px-1.5 py-0.5 rounded border border-[#1a1f2e]">2 &lt;= nums.length &lt;= 10^4</code></li>
                <li><code className="bg-[#111624] px-1.5 py-0.5 rounded border border-[#1a1f2e]">-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
                <li><code className="bg-[#111624] px-1.5 py-0.5 rounded border border-[#1a1f2e]">-10^9 &lt;= target &lt;= 10^9</code></li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>

            {/* CTA Card */}
            <div 
              onClick={() => setIsSolutionOpen(true)}
              className="bg-gradient-to-br from-[#17112c] to-[#0d121c] border border-purple-500/20 rounded-xl p-5 flex items-center justify-between group cursor-pointer hover:border-purple-500/40 transition-colors"
            >
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Stuck? Check Discussion & Solutions</h4>
                <p className="text-slate-400 text-xs">See how top rankers solved this problem with O(n) complexity.</p>
              </div>
              <ChevronRight size={18} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT PANEL: 60% WIDTH - Editor & Console */}
        {/* ========================================== */}
        <div className="w-[60%] flex flex-col bg-[#05070a] relative">
          
          {/* Top Editor Toolbar */}
          <div className="h-[50px] flex items-center justify-between px-4 border-b border-[#1a1f2e] bg-[#0b0f19] shrink-0">
            {/* Left side tools */}
            <div className="flex items-center gap-3">
              
              {/* Language Dropdown */}
              <div className="relative flex items-center">
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-[#1e2536] text-slate-300 text-[13px] font-semibold pl-3 pr-8 py-1.5 rounded-lg border border-[#2a3143] hover:bg-[#2a3143] focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                >
                  <option value="python">Python 3</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
                <ChevronDown size={14} className="text-slate-500 absolute right-2.5 pointer-events-none" />
              </div>

              <div className="w-[1px] h-4 bg-[#1a1f2e] mx-1"></div>
              
              <button className="text-slate-400 hover:text-white transition-colors"><RotateCcw size={16} /></button>
              <button className="text-slate-400 hover:text-white transition-colors"><Settings size={16} /></button>
              <button className="text-slate-400 hover:text-white transition-colors"><Maximize size={16} /></button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-[13px] font-mono font-medium mr-2">
                <Clock size={14} /> 00:00:27
              </div>
              <button className="flex items-center gap-1.5 bg-[#1e2536] hover:bg-[#2a3143] text-slate-200 text-[13px] font-bold px-4 py-1.5 rounded-lg transition-colors">
                <Play size={14} className="text-emerald-400 fill-emerald-400" /> Run
              </button>
              <button className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-[13px] font-bold px-4 py-1.5 rounded-lg shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all">
                <CloudUpload size={14} /> Submit
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 14,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  useShadows: false,
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                }
              }}
            />
          </div>

          {/* Bottom Console Panel */}
          <div className="h-[250px] flex flex-col border-t border-[#1a1f2e] bg-[#0b0f19] shrink-0">
            {/* Console Tabs */}
            <div className="flex items-center gap-6 px-4 border-b border-[#1a1f2e] bg-[#0b0f19]">
              <button 
                className={`flex items-center gap-2 py-3 text-[13px] font-bold border-b-2 transition-colors ${consoleTab === 'testcases' ? 'text-cyan-400 border-cyan-400' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
                onClick={() => setConsoleTab('testcases')}
              >
                <Terminal size={14} /> Test Cases
              </button>
              <button 
                className={`flex items-center gap-2 py-3 text-[13px] font-bold border-b-2 transition-colors ${consoleTab === 'result' ? 'text-cyan-400 border-cyan-400' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
                onClick={() => setConsoleTab('result')}
              >
                <ListTodo size={14} /> Result
              </button>
            </div>

            {/* Test Cases Area */}
            {consoleTab === 'testcases' && (
              <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                
                {/* Case Selector */}
                <div className="flex items-center gap-2 mb-4">
                  <button onClick={() => setActiveTestCase(1)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTestCase === 1 ? 'bg-[#1e2536] text-white border border-[#2a3143]' : 'text-slate-400 hover:bg-[#111624]'}`}>
                    Case 1
                  </button>
                  <button onClick={() => setActiveTestCase(2)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTestCase === 2 ? 'bg-[#1e2536] text-white border border-[#2a3143]' : 'text-slate-400 hover:bg-[#111624]'}`}>
                    Case 2
                  </button>
                  <button onClick={() => setActiveTestCase(3)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTestCase === 3 ? 'bg-[#1e2536] text-white border border-[#2a3143]' : 'text-slate-400 hover:bg-[#111624]'}`}>
                    Case 3
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-purple-400 hover:bg-purple-500/10 transition-colors ml-2">
                    + Custom
                  </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wider mb-2">NUMS =</label>
                    <input 
                      type="text" 
                      value={activeTestCase === 1 ? "[2,7,11,15]" : activeTestCase === 2 ? "[3,2,4]" : "[3,3]"} 
                      readOnly
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-slate-300 font-mono text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wider mb-2">TARGET =</label>
                    <input 
                      type="text" 
                      value={activeTestCase === 1 ? "9" : activeTestCase === 2 ? "6" : "6"} 
                      readOnly
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-slate-300 font-mono text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
          
          {/* Floating Help Button in Bottom Right */}
          <button className="absolute bottom-[40px] right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all z-30">
            <HelpCircle size={16} /> Help
          </button>

        </div>
      </div>

      {/* --- MODAL MOUNT POINT --- */}
      <SolutionModal isOpen={isSolutionOpen} onClose={() => setIsSolutionOpen(false)} />

      {/* --- FOOTER --- */}
      <footer className="h-[30px] flex items-center justify-between px-4 border-t border-[#1a1f2e] bg-[#0b0f19] text-[11px] font-medium text-slate-400 shrink-0 select-none z-10 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-white"><Terminal size={12} /> master</span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-white"><AlertCircle size={12} className="text-red-400" /> 0 Errors</span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-white"><AlertTriangle size={12} className="text-yellow-500" /> 0 Warnings</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 14, Col 28</span>
          <span>UTF-8</span>
          <span className="capitalize">{language}</span>
          <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Connected
          </span>
        </div>
      </footer>

      {/* Custom Styles for scrollbar specifically for this component to match theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #05070a; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1f2e; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a3143; 
        }
      `}} />
    </div>
  );
};

export default ProblemSolvingPage;