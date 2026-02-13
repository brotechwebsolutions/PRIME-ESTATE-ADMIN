
import React, { useState, useEffect } from 'react';
import { getFlats } from '../api';

const Header: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  const checkStatus = async () => {
    try {
      await getFlats();
      setStatus('online');
    } catch (err) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleGlobalRefresh = () => {
    window.dispatchEvent(new CustomEvent('prime-estates-refresh'));
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Prime Estates Admin</h1>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
          <span className={`relative flex h-2 w-2`}>
            {status === 'online' && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              status === 'online' ? 'bg-emerald-500' : status === 'offline' ? 'bg-red-500' : 'bg-amber-500'
            }`}></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {status === 'online' ? 'Server Live' : status === 'offline' ? 'Server Down' : 'Checking...'}
          </span>
        </div>

        <button 
          onClick={handleGlobalRefresh}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          title="Refresh All Data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-700">Admin User</span>
            <span className="text-xs text-slate-500">Super Admin</span>
          </div>
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Avatar" 
            className="w-10 h-10 rounded-full border-2 border-slate-100 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
