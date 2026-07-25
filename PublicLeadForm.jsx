import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import apiClient from '../services/apiClient';
import { Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const leadSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.coerce.number().min(0, 'Budget cannot be negative'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export const PublicLeadForm = () => {
  const [submittedLead, setSubmittedLead] = useState(null);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      budget: 50000,
      message: 'Interested in enterprise AI CRM implementation.'
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    setSubmittedLead(null);
    try {
      const res = await apiClient.post('/leads', data);
      setSubmittedLead(res.data.data);
      reset();
    } catch (err) {
      setServerError(err.response?.data?.error?.message || 'Failed to submit lead request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
      
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Instant AI Intent Scoring Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-50">Request Enterprise Demo</h2>
        <p className="text-sm text-slate-400 mt-1">Submit your details to connect with a senior solutions engineer within 2 minutes.</p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {submittedLead ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-50">Request Received Successfully!</h3>
          <p className="text-sm text-slate-300 mt-1">
            Thank you, <span className="font-semibold text-emerald-400">{submittedLead.full_name}</span>. Our AI routing engine assigned your request to our priority queue.
          </p>
          
          <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 inline-block text-left text-xs font-mono text-slate-300">
            <p><span className="text-slate-500">Lead ID:</span> {submittedLead.id}</p>
            <p><span className="text-slate-500">AI Score:</span> {submittedLead.score_value} / 100</p>
            <p><span className="text-slate-500">Assigned Tier:</span> <span className="font-bold text-emerald-400">{submittedLead.score_tier}</span></p>
          </div>

          <button
            onClick={() => setSubmittedLead(null)}
            className="mt-6 block w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm rounded-xl transition-all"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
              <input
                {...register('full_name')}
                placeholder="e.g. Alexander Wright"
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.full_name && <p className="text-xs text-rose-400 mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="alex@acmecorp.com"
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                {...register('company')}
                placeholder="Acme Corporation"
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Budget (USD) *</label>
              <input
                {...register('budget')}
                type="number"
                placeholder="50000"
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.budget && <p className="text-xs text-rose-400 mt-1">{errors.budget.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details / Message *</label>
            <textarea
              {...register('message')}
              rows={3}
              placeholder="Describe your lead management needs..."
              className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit Request & Trigger AI Engine
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
