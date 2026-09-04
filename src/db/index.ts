import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This is required for Next.js to not complain about missing env vars at build time when prerendering
const sql = neon(process.env.DATABASE_URL || 'postgresql://dummy:dummy@dummy/dummy');
export const db = drizzle(sql, { schema });
