import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, Shield, UserCheck, LayoutDashboard, FileText } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-slate-50 tracking-tight flex items-center gap-1">
              LeadDesk <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">AI CRM</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-mono">ENTERPRISE v1.0</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60">
            <FileText className="w-4 h-4" /> Lead Form
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 px-3.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors">
                <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Dashboard
              </Link>

              <div className="h-4 w-px bg-slate-800 my-auto" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-200">{user.full_name}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 capitalize">
                    <Shield className="w-3 h-3" /> {user.role.replace('_', ' ')}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg shadow-sm shadow-indigo-600/30 transition-all"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
