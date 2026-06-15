import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  database: new Database('database.sqlite'),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
});
