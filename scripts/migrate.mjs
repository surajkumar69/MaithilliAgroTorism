import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  try {
    console.log("Creating section_images table...");
    await sql`
      CREATE TABLE IF NOT EXISTS section_images (
        id SERIAL PRIMARY KEY,
        section_key VARCHAR(255) NOT NULL UNIQUE,
        image_url TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    console.log("Updating stays table...");
    await sql`ALTER TABLE stays ADD COLUMN IF NOT EXISTS main_image_url TEXT`;
    await sql`ALTER TABLE stays ADD COLUMN IF NOT EXISTS additional_images_urls JSONB DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE stays DROP COLUMN IF EXISTS cover_media_id`;

    console.log("Updating packages table...");
    await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS main_image_url TEXT`;
    await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS additional_images_urls JSONB DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE packages DROP COLUMN IF EXISTS cover_media_id`;

    console.log("Updating attractions table...");
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS main_image_url TEXT`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS additional_images_urls JSONB DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE attractions DROP COLUMN IF EXISTS cover_media_id`;

    console.log("Updating gallery_items table...");
    await sql`ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS image_url TEXT`;
    await sql`ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS title VARCHAR(255)`;
    await sql`ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS category VARCHAR(255)`;
    await sql`ALTER TABLE gallery_items DROP COLUMN IF EXISTS media_id`;
    await sql`ALTER TABLE gallery_items DROP COLUMN IF EXISTS album`;

    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration error:", err);
  }
}

run();
