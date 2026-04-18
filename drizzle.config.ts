import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({ path: '.env.local' });
config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found in env');
}

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
