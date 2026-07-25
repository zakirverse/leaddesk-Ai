import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import { Shield, KeyRound, AlertCircle, LogIn } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('sarah.rep@leaddesk.io');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      login(res.data.data.user, res.data.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPreset = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800/90 border border-slate-750 p-8 rounded-2xl shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-50">Sign In to Dashboard</h2>
          <p className="text-xs text-slate-400">Enter your credentials to access assigned lead queues.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn className="w-4 h-4" /> Authenticate</>}
          </button>
        </form>

        {/* Demo Quick Presets */}
        <div className="pt-4 border-t border-slate-750">
          <p className="text-xs text-slate-400 font-semibold mb-2 flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> Demo Quick Credentials:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickPreset('sarah.rep@leaddesk.io')}
              className="px-3 py-2 bg-slate-900/80 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs text-slate-300 text-left font-mono"
            >
              <div className="font-semibold text-indigo-400">Sales Rep</div>
              <div className="text-[10px] text-slate-400">sarah.rep@leaddesk.io</div>
            </button>

            <button
              onClick={() => handleQuickPreset('admin@leaddesk.io')}
              className="px-3 py-2 bg-slate-900/80 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs text-slate-300 text-left font-mono"
            >
              <div className="font-semibold text-emerald-400">Super Admin</div>
              <div className="text-[10px] text-slate-400">admin@leaddesk.io</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
