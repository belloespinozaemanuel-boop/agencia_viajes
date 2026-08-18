import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/drizzle/Schema/*.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});