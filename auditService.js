import { inMemoryDB } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export class AuditService {
  static async log({ actor_id = null, lead_id = null, action, previous_state = null, new_state = null, ip_address = '127.0.0.1' }) {
    const auditEntry = {
      id: uuidv4(),
      actor_id,
      lead_id,
      action,
      previous_state,
      new_state,
      ip_address,
      created_at: new Date().toISOString()
    };

    inMemoryDB.auditLogs.push(auditEntry);
    console.log(`[AUDIT] Action: ${action} | Lead: ${lead_id} | Actor: ${actor_id}`);
    return auditEntry;
  }
}
