import React from 'react';
import { Users, Flame, CheckCircle, Zap } from 'lucide-react';

export const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Active Leads',
      value: stats?.total_leads || 0,
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Hot Priority Tier',
      value: stats?.hot_leads_count || 0,
      icon: Flame,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversion_rate_percentage || 0}%`,
      icon: CheckCircle,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Avg Response SLA',
      value: `${stats?.avg_response_time_minutes || 1.8}m`,
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div key={idx} className="bg-slate-800/80 border border-slate-750 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">{card.title}</p>
              <h4 className="text-2xl font-bold text-slate-50 mt-1">{card.value}</h4>
            </div>
            <div className={`p-3 rounded-xl border ${card.bg}`}>
              <IconComponent className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
