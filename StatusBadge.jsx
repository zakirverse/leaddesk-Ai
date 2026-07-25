import React from 'react';

export const ScoreBadge = ({ tier, score }) => {
  const styles = {
    Hot: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Warm: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Cold: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[tier] || styles.Cold}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {tier} ({score})
    </span>
  );
};

export const StatusPill = ({ status }) => {
  const styles = {
    New: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Contacted: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Qualified: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Proposal Sent': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Closed Won': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Closed Lost': 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[status] || styles.New}`}>
      {status}
    </span>
  );
};
