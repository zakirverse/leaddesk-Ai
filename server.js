import app from './src/app.js';
import dotenv from 'dotenv';
import { initSqliteDatabase } from './src/config/sqliteDb.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

initSqliteDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 LeadDesk AI CRM Backend running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('[DB] SQLite Initialization Error:', err);
  app.listen(PORT, () => {
    console.log(`🚀 LeadDesk AI CRM Backend running on http://localhost:${PORT}`);
  });
});
