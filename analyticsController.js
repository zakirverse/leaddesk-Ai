import { inMemoryDB } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const activeLeads = inMemoryDB.leads.filter(l => !l.deleted_at);
  const total_leads = activeLeads.length;
  const hot_leads_count = activeLeads.filter(l => l.score_tier === 'Hot').length;
  const warm_leads_count = activeLeads.filter(l => l.score_tier === 'Warm').length;
  const cold_leads_count = activeLeads.filter(l => l.score_tier === 'Cold').length;
  const closed_won_count = activeLeads.filter(l => l.status === 'Closed Won').length;

  const conversion_rate_percentage = total_leads > 0 ? Number(((closed_won_count / total_leads) * 100).toFixed(1)) : 0;

  res.status(200).json({
    success: true,
    data: {
      total_leads,
      hot_leads_count,
      warm_leads_count,
      cold_leads_count,
      closed_won_count,
      conversion_rate_percentage,
      avg_response_time_minutes: 1.8
    }
  });
});
