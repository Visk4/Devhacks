import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Mic, MicOff, Video as VideoIcon, VideoOff, 
  Bot, Volume2, RotateCcw, X, CheckCircle2, 
  AlertCircle
} from 'lucide-react';

// --- MOCK DATA ---
const questions = [
  {
    id: 1,
    difficulty: "Medium",
    text: "Tell me about your experience with Frontend Developer development. What technologies have you worked with and what challenges have you faced?",
    topics: ["technical knowledge", "problem solving", "experience"]
  },
  {
    id: 2,
    difficulty: "Hard",
    text: "Explain the concept of React Server Components and how they differ from traditional Client Components. What are the performance implications?",
    topics: ["react", "performance", "architecture"]
  }
];

const mockEvaluation = {
  overall: 8,
  metrics: [
    { label: "Technical", score: 6 },
    { label: "Communication", score: 8 },
    { label: "Depth", score: 6 },
    { label: "Video", score: 10 }
  ],
  strengths: "Addressed the question, Clear communication",
  improvements: "More technical details, Specific examples"
};

const MockInterviewPage = () => {
  // --- STATES ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [interviewState, setInterviewState] = useState('answering'); // 'answering', 'evaluating', 'feedback'
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // --- REFS ---
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const currentQuestion = questions[currentQIndex];

  // --- 1. WEBCAM INITIALIZATION ---
  useEffect(() => {
    const startCamera = async () => {
      try {
        if (isCameraOn) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          stopCamera();
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsCameraOn(false);
      }
    };
    startCamera();
    return () => stopCamera();
  }, [isCameraOn]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // --- 2. TEXT-TO-SPEECH (AI ASKING QUESTION) ---
  const speakQuestion = (text) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1;
    
    // Optional: Try to find a good English voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.includes('en-US') && voice.name.includes('Google')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // Read question aloud when it changes (Browser autoplay policies might block the very first one without user interaction)
  useEffect(() => {
    if (interviewState === 'answering') {
      speakQuestion(currentQuestion.text);
    } else {
      synthRef.current?.cancel();
    }
  }, [currentQIndex, interviewState]);


  // --- 3. SPEECH-TO-TEXT (USER ANSWERING) ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true; // Allows real-time text updates
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let currentInterim = '';
        let currentFinal = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentFinal += event.results[i][0].transcript + ' ';
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        // Append final sentences to the main transcript state
        if (currentFinal) {
          setTranscript(prev => prev + currentFinal);
        }
        // Store interim words so they show up as the user speaks, but disappear when final is appended
        setInterimTranscript(currentInterim);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error !== 'no-speech') setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        // Auto-restart if we are supposed to be recording (handles silent pauses)
        if (isRecording && isMicOn) {
          recognitionRef.current.start();
        } else {
          setIsRecording(false);
          setInterimTranscript('');
        }
      };
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [isRecording, isMicOn]);

  const toggleRecording = () => {
    if (!isMicOn) {
      alert("Please unmute your microphone first.");
      return;
    }
    
    if (isRecording) {
      setIsRecording(false);
      recognitionRef.current?.stop();
      setInterimTranscript('');
    } else {
      setIsRecording(true);
      synthRef.current?.cancel(); // Stop AI if it's talking while user starts recording
      setIsAiSpeaking(false);
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // --- TIMER ---
  useEffect(() => {
    let interval;
    if (interviewState === 'answering') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewState]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- HANDLERS ---
  const handleSubmit = () => {
    if (isRecording) toggleRecording();
    setInterviewState('evaluating');
    
    // Simulate AI processing time before showing feedback
    setTimeout(() => {
      setInterviewState('feedback');
    }, 2500);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setTranscript("");
      setInterimTranscript("");
      setTimeElapsed(0);
      setInterviewState('answering');
    } else {
      alert("Interview Completed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#111624] text-slate-300 font-sans flex flex-col selection:bg-blue-500/30">
      

      {/* --- MAIN INTERVIEW AREA --- */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* Ambient Background Particles (Decorative) */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500 rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-purple-500 rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-emerald-500 rounded-full blur-[3px] animate-pulse delay-700"></div>

        {/* ========================================== */}
        {/* LEFT COLUMN: AI INTERVIEWER & CONTEXT      */}
        {/* ========================================== */}
        <div className="flex flex-col gap-6 relative z-10">
          
          {/* AI Avatar Panel */}
          <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6 flex flex-col items-center relative overflow-hidden">
            <h2 className="text-white font-bold flex items-center gap-2 mb-8">
              <Bot size={20} className="text-blue-400" /> AI Interviewer
            </h2>
            
            {/* Pulsing Avatar */}
            <div className="relative mb-8">
              <div className={`absolute inset-0 bg-blue-600 rounded-full opacity-20 ${isAiSpeaking ? 'animate-ping' : interviewState === 'evaluating' ? 'animate-pulse' : ''}`}></div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <Bot size={48} className="text-white" />
              </div>
            </div>

            <div className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded border transition-colors ${
              isAiSpeaking ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
              isRecording ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
              'bg-[#1a1f2e] text-slate-400 border-transparent'
            }`}>
              AI: {isAiSpeaking ? 'Speaking...' : isRecording ? 'Listening...' : interviewState === 'evaluating' ? 'Thinking...' : 'Muted'}
            </div>
            
            <div className="text-center mt-auto">
              <p className="text-slate-400 text-sm font-semibold mb-2">Question {currentQIndex + 1} of {questions.length}</p>
              <span className={`text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest border 
                ${currentQuestion.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>

          {/* Current Question OR Feedback Panel */}
          {interviewState !== 'feedback' ? (
            <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Current Question:</h3>
                <div className="flex items-center gap-2 text-slate-500">
                  {/* Speaker Button: Read Question Aloud */}
                  <Volume2 
                    size={18} 
                    className={`cursor-pointer transition-colors ${isAiSpeaking ? 'text-blue-400' : 'hover:text-white'}`} 
                    onClick={() => speakQuestion(currentQuestion.text)}
                  />
                  {/* Reset Button: Clear Transcript */}
                  <RotateCcw 
                    size={16} 
                    className="cursor-pointer hover:text-white" 
                    title="Clear Answer"
                    onClick={() => { setTranscript(""); setInterimTranscript(""); }}
                  />
                </div>
              </div>
              <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
                {currentQuestion.text}
              </p>
              
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Expected Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.topics.map((topic, i) => (
                    <span key={i} className="bg-blue-600/20 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-bold">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Feedback Card
            <div className="bg-white rounded-2xl p-6 shadow-xl relative animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-[#1a1f2e] font-black text-xl mb-2">Previous Answer Score: {mockEvaluation.overall}/10</h3>
              <p className="text-slate-600 text-sm mb-6">
                Good attempt at answering the question about technical knowledge. Consider providing more specific details.
              </p>
              
              {/* Score Progress Bars */}
              <div className="grid grid-cols-4 gap-4 mb-6 text-center">
                {mockEvaluation.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] font-bold uppercase mb-1">{metric.label}</span>
                    <span className={`text-lg font-black ${metric.score >= 8 ? 'text-emerald-500' : metric.score >= 6 ? 'text-blue-500' : 'text-yellow-500'}`}>
                      {metric.score}/10
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-emerald-600 font-bold text-sm">Strengths:</h4>
                  <p className="text-emerald-700/80 text-sm font-medium">{mockEvaluation.strengths}</p>
                </div>
                <div>
                  <h4 className="text-orange-500 font-bold text-sm">Improvements:</h4>
                  <p className="text-orange-600/80 text-sm font-medium">{mockEvaluation.improvements}</p>
                </div>
              </div>

              <button 
                onClick={handleNextQuestion}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
              >
                Continue to Next Question
              </button>
            </div>
          )}

        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: USER WEBCAM & INPUT          */}
        {/* ========================================== */}
        <div className="bg-[#0b0f19] border border-[#1a1f2e] rounded-2xl p-6 flex flex-col h-full relative z-10">
          
          <h2 className="text-white font-bold flex items-center justify-center gap-2 mb-4">
             You
          </h2>

          {/* Webcam Feed Wrapper */}
          <div className="w-full h-[280px] bg-[#05070a] border border-[#1a1f2e] rounded-xl overflow-hidden relative mb-4">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover ${isCameraOn ? 'block' : 'hidden'}`}
            />
            {!isCameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <VideoOff size={48} className="mb-2" />
                <p className="text-sm font-medium">Camera Disabled</p>
              </div>
            )}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-white">
              Video: {isCameraOn ? 'ON' : 'OFF'}
            </div>
          </div>

          {/* Media Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button 
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isCameraOn ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {isCameraOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
            </button>
            <button 
              onClick={() => {
                if (isRecording) toggleRecording();
                setIsMicOn(!isMicOn);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMicOn ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
          </div>

          {/* Timers */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-b border-[#1a1f2e] pb-6">
            <div className="text-center">
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">Video On Time</p>
              <p className="text-white font-mono text-lg">{formatTime(timeElapsed)}</p>
            </div>
            <div className="text-center border-l border-[#1a1f2e]">
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">Total Time</p>
              <p className="text-white font-mono text-lg">{formatTime(timeElapsed)}</p>
            </div>
          </div>

          {/* Editable Transcript Area */}
          <div className="flex-1 flex flex-col mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-300">Your Answer</label>
              <div className="flex items-center gap-3">
                <select className="bg-[#111624] border border-[#1a1f2e] text-slate-300 text-[11px] rounded px-2 py-1 outline-none">
                  <option>English (US)</option>
                </select>
                
                {/* Voice Recording Toggle Button */}
                <button 
                  onClick={toggleRecording}
                  disabled={!isMicOn || interviewState !== 'answering'}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording 
                      ? 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]' 
                      : 'bg-[#111624] text-slate-400 border border-[#1a1f2e] hover:text-white'
                  }`}
                >
                  <Mic size={12} /> {isRecording ? 'Listening...' : 'Click to Speak'}
                </button>
              </div>
            </div>
            
            {/* The Textarea holds the final text + the currently spoken interim text */}
            <div className="relative w-full flex-1 min-h-[120px]">
              <textarea
                value={transcript + interimTranscript}
                onChange={(e) => {
                  // Only allow manual editing when not actively recording to prevent conflicts
                  if (!isRecording) setTranscript(e.target.value);
                }}
                placeholder={
                  !window.SpeechRecognition && !window.webkitSpeechRecognition 
                    ? "Speech recognition not supported in this browser. Please type here." 
                    : "Click 'Click to Speak' or start typing your answer here..."
                }
                className={`w-full h-full bg-[#111624] border border-[#1a1f2e] rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500/50 resize-none custom-scrollbar leading-relaxed ${isRecording ? 'text-slate-400 cursor-not-allowed' : 'text-slate-200'}`}
                readOnly={isRecording}
              ></textarea>
              
              {/* Recording indicator overlay */}
              {isRecording && (
                <div className="absolute bottom-3 right-4 flex items-center gap-2">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel OR Submit Button */}
          {interviewState === 'answering' ? (
            <div className="space-y-4 mt-auto">
              <div className="bg-white rounded-xl p-4 shadow-lg hidden lg:block">
                <h4 className="flex items-center gap-2 font-bold text-[#1a1f2e] text-sm mb-3">
                  💡 Interview Tips:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Speak clearly into your microphone</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Structure your answer (STAR method)</li>
                  <li className="flex items-center gap-2 text-orange-500"><AlertCircle size={12} /> You can stop recording and edit the text manually</li>
                </ul>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={transcript.length < 10 && interimTranscript.length < 10}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-[#1a1f2e] disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                Submit & Evaluate Answer
              </button>
            </div>
          ) : (
            <div className="bg-[#111624] border border-[#1a1f2e] rounded-xl p-4 text-center text-slate-400 text-sm font-semibold mt-auto">
              {interviewState === 'evaluating' ? (
                <div className="flex items-center justify-center gap-2">
                  <Bot size={16} className="animate-spin" /> Evaluating your response...
                </div>
              ) : (
                'Review feedback on the left panel.'
              )}
            </div>
          )}

        </div>
      </main>

      {/* Embedded CSS for scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a3143; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b4256; 
        }
      `}} />
    </div>
  );
};

export default MockInterviewPage;