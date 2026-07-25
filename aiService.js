import { ScoringEngine } from './scoringEngine.js';

export class AIService {
  /**
   * Analyzes lead submission data and computes AI intent score,
   * sentiment classification, concise summary, and AI outreach email draft.
   */
  static analyzeLead({ full_name, email, company, budget, message }) {
    // 1. Calculate intent score and tier using scoring engine
    const { score, tier } = ScoringEngine.evaluateLead({ budget, email, message });

    const lowerMessage = (message || '').toLowerCase();

    // 2. Determine sentiment
    let sentiment = 'Neutral';
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      sentiment = 'Urgent';
    } else if (tier === 'Hot' || lowerMessage.includes('demo') || lowerMessage.includes('buy') || lowerMessage.includes('contract')) {
      sentiment = 'Positive';
    } else if (tier === 'Cold' || lowerMessage.includes('just asking') || lowerMessage.includes('curious')) {
      sentiment = 'Hesitant';
    }

    // 3. Generate concise AI summary
    const numBudget = Number(budget) || 0;
    const formattedBudget = numBudget > 0 ? `$${numBudget.toLocaleString()}` : 'unspecified budget';
    const summary = `${tier} prospect from ${company || 'Unknown Company'} with ${formattedBudget}.`;

    // 4. Generate AI Outreach Email Draft for Sales Rep
    const firstName = full_name ? full_name.split(' ')[0] : 'there';
    const emailSubject = `Tailored AI Demo & CRM Strategy for ${company || 'your team'}`;
    const emailBody = `Hi ${firstName},

Thank you for reaching out to LeadDesk AI! We reviewed your inquiry regarding "${message.trim()}".

Based on your team's goals and estimated budget of ${formattedBudget}, LeadDesk AI CRM can help streamline your sales pipeline, automate lead scoring, and boost conversion rates by up to 35%.

Would you be open for a brief 15-minute product demonstration later this week?

Best regards,
The Sales Operations Team
LeadDesk AI CRM`;

    return {
      score_value: score,
      score_tier: tier,
      sentiment,
      summary,
      ai_email_subject: emailSubject,
      ai_email_body: emailBody
    };
  }
}
