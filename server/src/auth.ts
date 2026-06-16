import { betterAuth } from 'better-auth';

import { db } from './db.js';

// export const auth = betterAuth({
//   database: db,
//   emailAndPassword: {
//     enabled: true,
//     minPasswordLength: 6,
//   },
//   trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
// });

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: '.railway.app',
    },
  },
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
});
