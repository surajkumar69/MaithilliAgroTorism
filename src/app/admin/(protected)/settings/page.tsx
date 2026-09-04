import React from 'react';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { revalidatePath } from 'next/cache';

async function updateSettings(formData: FormData) {
  'use server';
  const businessName = formData.get('businessName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;

  // Since we only have one row, we just update all
  await db.update(siteSettings).set({
    businessName,
    phone,
    email,
  });

  revalidatePath('/admin/settings');
}

export default async function SettingsAdmin() {
  const settingsRow = await db.select().from(siteSettings).limit(1);
  const settings = settingsRow[0] || {};

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif text-forest-900 mb-8">Site Settings</h1>
      
      <Card className="p-6">
        <form action={updateSettings} className="space-y-6">
          <Input 
            id="businessName"
            name="businessName"
            label="Business Name"
            defaultValue={settings.businessName || ''}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              id="phone"
              name="phone"
              label="Primary Phone"
              defaultValue={settings.phone || ''}
              required
            />
            <Input 
              id="email"
              name="email"
              type="email"
              label="Contact Email"
              defaultValue={settings.email || ''}
              required
            />
          </div>
          <div className="pt-4 border-t border-earth-200 flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
