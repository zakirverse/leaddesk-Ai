import React, { useState } from 'react';
import { ScoreBadge, StatusPill } from './StatusBadge';
import { Search, Filter, RefreshCw, ChevronRight, MessageSquare, Building, DollarSign } from 'lucide-react';
import apiClient from '../services/apiClient';

export const LeadTable = ({ leads, onStatusChange, onRefresh, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [activeLeadModal, setActiveLeadModal] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesTier = selectedTier === 'All' || lead.score_tier === selectedTier;

    return matchesSearch && matchesStatus && matchesTier;
  });

  const handleStatusSelect = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    try {
      await apiClient.patch(`/leads/${leadId}/status`, { status: newStatus });
      onStatusChange(leadId, newStatus);
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-slate-800/90 border border-slate-750 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
      
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-6 border-b border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, company..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              <option value="New" className="bg-slate-900">New</option>
              <option value="Contacted" className="bg-slate-900">Contacted</option>
              <option value="Qualified" className="bg-slate-900">Qualified</option>
              <option value="Proposal Sent" className="bg-slate-900">Proposal Sent</option>
              <option value="Closed Won" className="bg-slate-900">Closed Won</option>
              <option value="Closed Lost" className="bg-slate-900">Closed Lost</option>
            </select>
          </div>

          {/* Score Tier Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <span className="text-emerald-400 font-semibold">Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Tiers</option>
              <option value="Hot" className="bg-slate-900">Hot</option>
              <option value="Warm" className="bg-slate-900">Warm</option>
              <option value="Cold" className="bg-slate-900">Cold</option>
            </select>
          </div>

          <button
            onClick={onRefresh}
            className="p-2 bg-slate-750 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-xs text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-750">
            <tr>
              <th className="px-6 py-3.5">Prospect</th>
              <th className="px-6 py-3.5">Company & Budget</th>
              <th className="px-6 py-3.5">AI Intent Score</th>
              <th className="px-6 py-3.5">Pipeline Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-750">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                  No leads found matching current criteria.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-750/50 transition-colors">
                  
                  {/* Prospect Info */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-100">{lead.full_name}</div>
                    <div className="text-xs text-slate-400 font-mono">{lead.email}</div>
                  </td>

                  {/* Company & Budget */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {lead.company || 'Individual Prospect'}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono mt-0.5">
                      <DollarSign className="w-3 h-3" />
                      {Number(lead.budget).toLocaleString()} USD
                    </div>
                  </td>

                  {/* AI Score */}
                  <td className="px-6 py-4">
                    <ScoreBadge tier={lead.score_tier} score={lead.score_value} />
                  </td>

                  {/* Pipeline Status & Quick Select */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusPill status={lead.status} />
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusSelect(lead.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setActiveLeadModal(lead)}
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline"
                    >
                      View Context <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Context Modal */}
      {activeLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-700 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-50">{activeLeadModal.full_name}</h3>
                <p className="text-xs text-slate-400">{activeLeadModal.email} • {activeLeadModal.phone || 'No Phone'}</p>
              </div>
              <button
                onClick={() => setActiveLeadModal(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><span className="text-slate-400">Company:</span> <span className="text-slate-200 font-medium">{activeLeadModal.company}</span></p>
              <p><span className="text-slate-400">Budget:</span> <span className="text-emerald-400 font-semibold">${Number(activeLeadModal.budget).toLocaleString()}</span></p>
              <p><span className="text-slate-400">AI Intent Score:</span> <span className="text-indigo-400 font-bold">{activeLeadModal.score_value} / 100 ({activeLeadModal.score_tier})</span></p>
              {activeLeadModal.sentiment && (
                <p><span className="text-slate-400">AI Sentiment:</span> <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{activeLeadModal.sentiment}</span></p>
              )}
              {activeLeadModal.summary && (
                <div className="p-2.5 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-indigo-200 text-xs">
                  <span className="font-semibold text-indigo-300">✨ AI Executive Summary:</span> {activeLeadModal.summary}
                </div>
              )}
              <p><span className="text-slate-400">Ingested At:</span> <span className="text-slate-300">{new Date(activeLeadModal.created_at).toLocaleString()}</span></p>
            </div>

            <div className="p-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs">
              <p className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Inquiry Message:
              </p>
              <p className="text-slate-200 italic">"{activeLeadModal.message}"</p>
            </div>

            {activeLeadModal.ai_email_body && (
              <div className="p-3 bg-slate-900 border border-indigo-500/30 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-indigo-400">✉️ AI Suggested Sales Reply</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Subject: ${activeLeadModal.ai_email_subject}\n\n${activeLeadModal.ai_email_body}`);
                      alert('AI Outreach Draft copied to clipboard!');
                    }}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-[11px] transition-colors"
                  >
                    Copy AI Email
                  </button>
                </div>
                <div className="text-slate-300 bg-slate-950/70 p-2.5 rounded-lg whitespace-pre-wrap font-mono text-[11px] border border-slate-800">
                  {activeLeadModal.ai_email_body}
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveLeadModal(null)}
              className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs rounded-xl"
            >
              Close Context Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
