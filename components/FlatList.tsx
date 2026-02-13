
import React from 'react';
import { Flat, FlatStatus } from '../types';
import { updateFlat, deleteFlat } from '../api';

interface FlatListProps {
  flats: Flat[];
  onUpdate: () => void;
  loading: boolean;
}

const FlatList: React.FC<FlatListProps> = ({ flats, onUpdate, loading }) => {
  const handleToggleStatus = async (flat: Flat) => {
    try {
      const newStatus = flat.status === FlatStatus.AVAILABLE ? FlatStatus.SOLD : FlatStatus.AVAILABLE;
      await updateFlat(flat._id, { status: newStatus });
      onUpdate();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteFlat(id);
        onUpdate();
      } catch (err) {
        alert('Failed to delete flat');
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white h-72 rounded-2xl border border-slate-100 shadow-sm"></div>
        ))}
      </div>
    );
  }

  if (flats.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No Properties Found</h3>
        <p className="text-slate-500 mt-1">Start by adding a new property using the form.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {flats.map((flat) => (
        <div key={flat._id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={flat.imageUrl || `https://picsum.photos/seed/${flat._id}/800/600`} 
              alt={flat.flatNo} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              flat.status === FlatStatus.AVAILABLE ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {flat.status}
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{flat.flatNo || 'N/A'}</h3>
                <p className="text-sm text-slate-500 font-medium">{flat.type || 'Standard'}</p>
              </div>
              <p className="text-xl font-bold text-indigo-600">${(flat.price || 0).toLocaleString()}</p>
            </div>
            
            <div className="mt-auto pt-6 flex gap-2">
              <button
                onClick={() => handleToggleStatus(flat)}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition-all text-sm ${
                  flat.status === FlatStatus.AVAILABLE 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {flat.status === FlatStatus.AVAILABLE ? 'Mark Sold' : 'Make Avail.'}
              </button>
              
              <button
                onClick={() => handleDelete(flat._id)}
                className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-all"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlatList;
