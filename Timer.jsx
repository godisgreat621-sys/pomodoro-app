import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ mode, setMode, onSessionComplete }) => {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('pomodoro-timeLeft');
    return savedTime ? parseInt(savedTime) : WORK_TIME;
  });
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);
  const isFirstRender = useRef(true);

  // حسابات الدائرة (إضافة المتغيرات المفقودة)
  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('pomodoro-timeLeft', timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsActive(false);
      onSessionComplete();
      alert(mode === 'work' ? "حان وقت الراحة!" : "لنعد للعمل!");
      setMode(mode === 'work' ? 'break' : 'work');
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progress = timeLeft / (mode === 'work' ? WORK_TIME : BREAK_TIME);
  const offset = circumference - progress * circumference;

  return (
    <div className="relative bg-black/20 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-gray-700 text-center overflow-hidden">
      {/* تأثير خلفية مضيئة خلف الدائرة */}
      <div className={`absolute -top-20 -left-20 w-40 h-40 blur-[80px] rounded-full ${mode === 'work' ? 'bg-red-700/30' : 'bg-teal-700/30'}`}></div>
      
      <div className="flex justify-center gap-4 mb-6">
        <button 
          onClick={() => setMode('work')}
          className={`px-6 py-2 rounded-2xl transition-all duration-300 ${mode === 'work' ? 'bg-red-700 text-white font-bold shadow-lg scale-105' : 'bg-white/10 hover:bg-white/20'}`}
        >تركيز</button>
        <button 
          onClick={() => setMode('break')}
          className={`px-6 py-2 rounded-2xl transition-all duration-300 ${mode === 'break' ? 'bg-teal-700 text-white font-bold shadow-lg scale-105' : 'bg-white/10 hover:bg-white/20'}`}
        >راحة</button>
      </div>

      <div className="relative flex items-center justify-center mb-10">
        {/* الدائرة التقدمية SVG */}
        <svg width="280" height="280" className="transform -rotate-90">
          <circle
            cx="140" cy="140" r={radius}
            stroke="currentColor" strokeWidth="8"
            fill="transparent" className="text-white/5"
          />
          <circle
            cx="140" cy="140" r={radius}
            stroke="currentColor" strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
            strokeLinecap="round"
            className={`progress-ring__circle ${mode === 'work' ? 'text-red-400' : 'text-teal-400'} transition-all duration-500`}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-black tracking-tighter tabular-nums drop-shadow-md">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm font-medium opacity-60 mt-1 uppercase tracking-widest">
            {mode === 'work' ? 'Focus' : 'Break'}
          </span>
        </div>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="bg-white/20 text-white px-12 py-5 rounded-[1.5rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        >
          {isActive ? 'إيقاف مؤقت' : 'ابدأ الآن'}
        </button>
        <button 
          onClick={() => { setIsActive(false); setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME); }}
          className="bg-white/10 p-5 rounded-2xl hover:bg-white/20 hover:rotate-45 transition-all duration-300 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Timer;