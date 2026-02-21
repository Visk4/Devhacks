import React from 'react';
import { Play, FileCode2, Terminal } from 'lucide-react';

const EditorPanel = ({ code, setCode, onRun, output, language }) => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between bg-[#181825] border-b border-gray-800 px-4 py-2 shrink-0">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e2e] rounded-t border-t border-cyan-500 text-gray-300 text-sm">
            <FileCode2 className="w-4 h-4 text-gray-400" />
            solution.{language.toLowerCase().replace(' ', '')}
          </div>
        </div>
        <button 
          onClick={onRun}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          <Play className="w-4 h-4 fill-current" /> Run & Test
        </button>
      </div>

      <div className="flex-1 overflow-hidden bg-[#1e1e2e] relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          className="w-full h-full bg-transparent text-gray-300 font-mono text-[15px] p-6 resize-none focus:outline-none custom-scrollbar leading-relaxed"
          style={{ tabSize: 4 }}
        />
      </div>

      <div className="h-56 bg-[#0b0b13] border-t border-gray-800 flex flex-col shrink-0">
        <div className="flex bg-[#181825] border-b border-gray-800 px-4 pt-2">
          <button className="px-4 py-2 text-sm text-white border-b-2 border-purple-500 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Console Output
          </button>
        </div>
        
        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
          {output.length === 0 && <span className="text-gray-600">Click "Run & Test" to evaluate your code against the server...</span>}
          {output.map((line, idx) => (
            <div key={idx} className={`
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'success' ? 'text-green-400 font-bold' : ''}
              ${line.type === 'info' ? 'text-gray-400' : ''}
            `}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;