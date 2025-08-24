'use client';

import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';

const AIAssistantButton = () => {
  return (
    <Link href="/ai-companion">
      <button
        className="fixed bottom-48 md:bottom-32 right-4 md:right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 hover:from-slate-700 hover:via-slate-600 hover:to-slate-700 text-white px-4 md:px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-600/30 backdrop-blur-sm"
        aria-label="Open AI Companion"
      >
        <div className="relative">
          <FaRobot className="text-xl text-blue-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <span className="font-semibold text-sm md:text-base tracking-wide">AI Companion</span>
        <div className="hidden md:block w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      </button>
    </Link>
  );
};

export default AIAssistantButton; 