
import React, { useState, useEffect, useCallback } from 'react';
import { getFlats } from '../api';
import FlatForm from '../components/FlatForm';
import FlatList from '../components/FlatList';

const Dashboard = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchFlats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFlats();
      setFlats(data);
    } catch (error) {
      console.error('Error fetching flats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSuccess = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchFlats();
  }, [fetchFlats, refreshKey]);

  useEffect(() => {
    const handleGlobalRefresh = () => handleSuccess();
    window.addEventListener('prime-estates-refresh', handleGlobalRefresh);
    return () => window.removeEventListener('prime-estates-refresh', handleGlobalRefresh);
  }, [handleSuccess]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Property Management</h1>
          <p className="text-slate-500 mt-1">Manage your real estate inventory efficiently.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-sm font-semibold text-slate-700">{flats.length} Total Units</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <FlatForm onSuccess={handleSuccess} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold text-slate-800">Recent Listings</h2>
             <button 
               onClick={handleSuccess}
               className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
               {loading ? 'Refreshing...' : 'Refresh List'}
             </button>
          </div>
          <FlatList flats={flats} onUpdate={handleSuccess} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
