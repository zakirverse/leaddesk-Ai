import React from 'react';
import { PublicLeadForm } from '../components/PublicLeadForm';
import { Sparkles, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Next-Gen Enterprise Lead Management
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-50 tracking-tight leading-tight">
          Turn Chaotic Inbound Traffic into High-Velocity <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Sales Pipelines</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          LeadDesk AI CRM ingests, qualifies, scores, and routes inbound sales inquiries in sub-100ms with enterprise RBAC and audit logging.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-750 flex items-start gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Sub-100ms Ingestion</h3>
            <p className="text-xs text-slate-400 mt-1">Zero-latency API ingestion built on Node.js and Supabase PostgreSQL.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-750 flex items-start gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Automated AI Scoring</h3>
            <p className="text-xs text-slate-400 mt-1">Instant intent classification into Hot, Warm, and Cold lead priority queues.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-750 flex items-start gap-4">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Enterprise Governance</h3>
            <p className="text-xs text-slate-400 mt-1">JWT authentication, Bcrypt password hashing, and PostgreSQL audit trails.</p>
          </div>
        </div>
      </div>

      {/* Live Form Component */}
      <PublicLeadForm />

    </div>
  );
};
