
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </main>
          
          <footer className="bg-white border-t border-slate-200 p-4 text-center text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} Prime Estates Admin. All rights reserved. Professional Property Management System.
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
