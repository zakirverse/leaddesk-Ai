/**
 * AI Intent Scoring Engine
 * Formula: Score = S_budget + S_domain + S_intent
 */
export class ScoringEngine {
  static evaluateLead({ budget, email, message }) {
    let score = 0;

    // 1. Budget Evaluation (Max 40 points)
    const numBudget = Number(budget) || 0;
    if (numBudget >= 50000) {
      score += 40;
    } else if (numBudget >= 10000) {
      score += 25;
    } else {
      score += 10;
    }

    // 2. Email Domain Evaluation (Max 30 points)
    const domain = email.split('@')[1]?.toLowerCase() || '';
    const genericDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    if (domain && !genericDomains.includes(domain)) {
      score += 30; // Corporate domain bonus
    } else {
      score += 10;
    }

    // 3. Message Intent Keyword Evaluation (Max 30 points)
    const highIntentKeywords = ['enterprise', 'demo', 'pricing', 'quote', 'contract', 'implementation', 'crm', 'team'];
    const lowerMessage = (message || '').toLowerCase();
    const matches = highIntentKeywords.filter(kw => lowerMessage.includes(kw));

    if (matches.length >= 2) {
      score += 30;
    } else if (matches.length === 1) {
      score += 20;
    } else {
      score += 10;
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Assign Tier
    let tier = 'Cold';
    if (score >= 70) {
      tier = 'Hot';
    } else if (score >= 40) {
      tier = 'Warm';
    }

    return { score, tier };
  }
}
