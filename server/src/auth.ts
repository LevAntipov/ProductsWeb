import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';

import { db } from './db.js';

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
});
