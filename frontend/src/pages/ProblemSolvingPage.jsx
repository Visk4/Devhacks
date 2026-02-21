import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Code2, Flame, Coins, Bell, Star, Clock, Database, CheckCircle2, 
  ChevronDown, RotateCcw, Settings, Maximize, Play, CloudUpload, 
  Terminal, ListTodo, HelpCircle, AlertCircle, AlertTriangle, ChevronRight,
  Loader2, XCircle
} from 'lucide-react';
const baseURL = import.meta.env.VITE_BASE_URL;

const languageTemplates = {
  python: `class Solution:\n    def solve(self):\n        pass`,
  cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};`,
  java: `class Solution {\n    public void solve() {\n        \n    }\n}`
};

// Map verdicts to user-friendly text and colors
const getVerdictInfo = (status) => {
  switch(status) {
    case 'AC': return { text: 'Accepted', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <CheckCircle2 size={18} /> };
    case 'WA': return { text: 'Wrong Answer', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <XCircle size={18} /> };
    case 'TLE': return { text: 'Time Limit Exceeded', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: <Clock size={18} /> };
    case 'MLE': return { text: 'Memory Limit Exceeded', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <Database size={18} /> };
    case 'RE': return { text: 'Runtime Error', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: <AlertTriangle size={18} /> };
    case 'CE': return { text: 'Compile Error', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: <Code2 size={18} /> };
    case 'PENDING': 
    case 'RUNNING': return { text: 'Judging...', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: <Loader2 className="animate-spin" size={18} /> };
    case 'PENDING_MANUAL': return { text: 'Pending Manual Review', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: <Clock size={18} /> };
    default: return { text: status || 'Error', color: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-700', icon: <AlertCircle size={18} /> };
  }
};

const ProblemSolvingPage = () => {
  const { problemId } = useParams(); 
  
  // Data States
  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // UI States
  const [activeTab, setActiveTab] = useState('description');
  const [activeTestCase, setActiveTestCase] = useState(0); 
  const [consoleTab, setConsoleTab] = useState('testcases');

  // Monaco Editor State
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(languageTemplates.python);

  // Fetch problem data on mount
  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        
        const response = await axios.get(`${baseURL}/problem/${problemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProblemData(response.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError("Failed to load problem details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (problemId) {
      fetchProblemData();
    }
  }, [problemId]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
  };

  // --- SUBMISSION LOGIC ---
  const handleSubmit = async () => {
    if (!code.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setConsoleTab('result'); // Switch user's view to result tab automatically
    setSubmissionResult({ status: 'PENDING' }); // Show initial loading state
    
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // 1. Post the submission
      const postResponse = await axios.post(`${baseURL}/submissions`, {
        problemId: problemId,
        language: language,
        code: code
      }, { headers });

      const { submissionId } = postResponse.data;

      // 2. Poll the GET endpoint until judged
      let isJudged = false;
      let finalResult = null;

      while (!isJudged) {
        // Wait 1.5 seconds between polls
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        const getResponse = await axios.get(`${baseURL}/submissions/${submissionId}`, { headers });
        const currentStatus = getResponse.data.status;
        
        if (currentStatus !== 'PENDING' && currentStatus !== 'RUNNING') {
          isJudged = true;
          finalResult = getResponse.data;
        } else {
          // Update state so UI reflects RUNNING if it changes from PENDING
          setSubmissionResult(getResponse.data);
        }
      }

      setSubmissionResult(finalResult);

    } catch (err) {
      console.error("Submission failed:", err);
      setSubmissionResult({ status: 'ERROR', compileError: 'Network or server error occurred during submission.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helpers for text parsing
  const getCoreDescription = (fullDescription) => {
    if (!fullDescription) return "";
    const splitDesc = fullDescription.split(/###\s*(Input Format|Example|Constraints)/i)[0];
    return splitDesc.replace('## Problem Description', '').trim();
  };

  const getCleanConstraints = (constraintsStr) => {
    if (!constraintsStr) return [];
    return constraintsStr
      .replace('### Constraints', '')
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace('-', '').trim());
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#05070a] text-cyan-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading Arena Workspace...</p>
      </div>
    );
  }

  if (error || !problemData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#05070a]">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl max-w-md text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
          <p>{error || "Problem not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#05070a] text-slate-300 font-sans overflow-hidden selection:bg-purple-500/30">

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: 40% WIDTH - Problem Details */}
        <div className="w-[40%] flex flex-col border-r border-[#1a1f2e] bg-[#0b0f19]">
          
          <div className="h-[50px] flex items-center justify-between px-4 border-b border-[#1a1f2e] bg-[#0b0f19] shrink-0">
            <div className="flex items-center gap-4 text-[13px] font-semibold text-slate-400">
              <button 
                className={`flex items-center gap-1.5 h-full ${activeTab === 'description' ? 'text-white' : 'hover:text-slate-200'}`}
                onClick={() => setActiveTab('description')}
              >
                <div className={`w-2 h-2 rounded-full ${
                  problemData.difficulty === 'EASY' ? 'bg-emerald-500' : 
                  problemData.difficulty === 'MEDIUM' ? 'bg-yellow-500' : 'bg-pink-500'
                }`}></div> 
                {problemData.difficulty}
              </button>
              <button className="hover:text-slate-200">Solutions</button>
              <button className="hover:text-slate-200">Submissions</button>
            </div>
            <button className="flex items-center gap-1 text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">
              <Star size={14} /> Add to List
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3 flex flex-wrap items-center gap-3">
                {problemData.title}
                {problemData.topics?.map((topic, idx) => (
                  <span key={idx} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#1e2536] text-slate-300 font-medium">
                    #{topic}
                  </span>
                ))}
              </h2>
            </div>

            <div className="flex flex-col xl:flex-row flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <Clock size={14} className="text-purple-400" /> Time Limit: {problemData.timeLimitMs / 1000}s
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <Database size={14} className="text-cyan-400" /> Memory Limit: {problemData.memoryLimitMb}MB
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <CheckCircle2 size={14} className="text-emerald-500" /> Acceptance: {problemData.acceptanceRate}%
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-[#111624] w-fit px-3 py-1.5 rounded-lg border border-[#1a1f2e]">
                <Coins size={14} className="text-yellow-500" /> Points: {problemData.points}
              </div>
            </div>

            <div className="text-[14px] leading-relaxed text-slate-300 mb-8 space-y-4 whitespace-pre-wrap">
              {getCoreDescription(problemData.description)}
            </div>

            <div className="space-y-6 mb-8">
              {problemData.examples?.map((ex, idx) => (
                <div key={idx}>
                  <p className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">EXAMPLE {ex.order || idx + 1}</p>
                  <div className="bg-[#111624] border border-[#1a1f2e] rounded-xl p-4 font-mono text-[13px] space-y-3">
                    <div>
                      <span className="text-slate-500">Input:</span><br/>
                      <span className="text-white">{ex.input}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Output:</span><br/>
                      <span className="text-white">{ex.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <p className="text-[12px] font-bold text-yellow-500 tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle size={14} /> CONSTRAINTS
              </p>
              <ul className="list-disc list-inside space-y-2 text-[13px] font-mono text-slate-300 marker:text-slate-600">
                {getCleanConstraints(problemData.constraints).map((constraint, idx) => (
                  <li key={idx}><code className="bg-[#111624] px-1.5 py-0.5 rounded border border-[#1a1f2e]">{constraint}</code></li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#17112c] to-[#0d121c] border border-purple-500/20 rounded-xl p-5 flex items-center justify-between group cursor-pointer hover:border-purple-500/40 transition-colors">
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Stuck? Check Discussion</h4>
                <p className="text-slate-400 text-xs">See how top rankers solved this problem efficiently.</p>
              </div>
              <ChevronRight size={18} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: 60% WIDTH - Editor & Console */}
        <div className="w-[60%] flex flex-col bg-[#05070a] relative">
          
          <div className="h-[50px] flex items-center justify-between px-4 border-b border-[#1a1f2e] bg-[#0b0f19] shrink-0">
            <div className="flex items-center gap-3">
              
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

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 bg-[#1e2536] hover:bg-[#2a3143] text-slate-200 text-[13px] font-bold px-4 py-1.5 rounded-lg transition-colors">
                <Play size={14} className="text-emerald-400 fill-emerald-400" /> Run
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-[13px] font-bold px-4 py-1.5 rounded-lg shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <CloudUpload size={14} />} 
                {isSubmitting ? 'Judging...' : 'Submit'}
              </button>
            </div>
          </div>

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
            {consoleTab === 'testcases' && problemData.examples && (
              <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-2 mb-4">
                  {problemData.examples.map((ex, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveTestCase(idx)} 
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTestCase === idx ? 'bg-[#1e2536] text-white border border-[#2a3143]' : 'text-slate-400 hover:bg-[#111624]'}`}
                    >
                      Case {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wider mb-2">INPUT =</label>
                    <textarea 
                      value={problemData.examples[activeTestCase]?.input || ""} 
                      readOnly
                      rows={2}
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-slate-300 font-mono text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500/50 resize-none custom-scrollbar"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wider mb-2">EXPECTED OUTPUT =</label>
                    <input 
                      type="text" 
                      value={problemData.examples[activeTestCase]?.output || ""} 
                      readOnly
                      className="w-full bg-[#05070a] border border-[#1a1f2e] text-slate-300 font-mono text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Result Area */}
            {consoleTab === 'result' && (
              <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                {!submissionResult && !isSubmitting ? (
                  <p className="text-slate-500 text-sm flex items-center h-full justify-center">Run or Submit your code to see the evaluation results.</p>
                ) : (
                  <div>
                    {/* Active Verdict Status Banner */}
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border mb-4 ${getVerdictInfo(submissionResult?.status).bg} ${getVerdictInfo(submissionResult?.status).border}`}>
                      <span className={getVerdictInfo(submissionResult?.status).color}>
                        {getVerdictInfo(submissionResult?.status).icon}
                      </span>
                      <h3 className={`text-lg font-bold ${getVerdictInfo(submissionResult?.status).color}`}>
                        {getVerdictInfo(submissionResult?.status).text}
                      </h3>
                    </div>

                    {/* Performance Stats (Hide if pending or compile error) */}
                    {submissionResult?.status !== 'PENDING' && submissionResult?.status !== 'RUNNING' && submissionResult?.status !== 'CE' && submissionResult?.status !== 'ERROR' && (
                      <div className="flex gap-6 mb-4 px-2">
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 mb-1 tracking-wider uppercase">Runtime</p>
                          <p className="text-slate-300 font-mono text-sm">{submissionResult.timeMs || 0} ms</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 mb-1 tracking-wider uppercase">Memory</p>
                          <p className="text-slate-300 font-mono text-sm">{submissionResult.memoryKb || 0} KB</p>
                        </div>
                      </div>
                    )}

                    {/* Compile Error Output */}
                    {submissionResult?.compileError && (
                      <div className="mt-4">
                        <p className="text-[11px] font-bold text-pink-400 mb-2 tracking-wider uppercase">Compiler Output</p>
                        <pre className="bg-pink-500/5 border border-pink-500/20 text-pink-200/80 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                          {submissionResult.compileError}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
          
          <button className="absolute bottom-[40px] right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all z-30">
            <HelpCircle size={16} /> Help
          </button>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="h-[30px] flex items-center justify-between px-4 border-t border-[#1a1f2e] bg-[#0b0f19] text-[11px] font-medium text-slate-400 shrink-0 select-none z-10 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-white"><Terminal size={12} /> master</span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-white"><AlertCircle size={12} className="text-red-400" /> 0 Errors</span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-white"><AlertTriangle size={12} className="text-yellow-500" /> 0 Warnings</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="capitalize">{language}</span>
          <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Connected
          </span>
        </div>
      </footer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #05070a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1f2e; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2a3143; }
      `}} />
    </div>
  );
};

export default ProblemSolvingPage;