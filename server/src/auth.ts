import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';

export const auth = betterAuth({
  database: new Database('database.sqlite'),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
});
