import React from 'react';
import { db } from '@/db';
import { enquiries } from '@/db/schema';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { revalidatePath } from 'next/cache';
import { eq, desc } from 'drizzle-orm';
import { Calendar, Phone, MessageSquare, Check, X } from 'lucide-react';

async function updateStatus(id: number, status: string) {
  'use server';
  await db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
  revalidatePath('/admin/enquiries');
}

export default async function EnquiriesAdmin() {
  const allEnquiries = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif text-forest-900 mb-8">Enquiries Inbox</h1>

      <div className="grid grid-cols-1 gap-6">
        {allEnquiries.length === 0 && (
          <p className="text-forest-700 italic">No enquiries received yet.</p>
        )}
        {allEnquiries.map((enq) => (
          <Card key={enq.id} className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl text-forest-900">{enq.name}</h3>
                  <div className="text-sm text-forest-700 flex items-center space-x-4 mt-2">
                    <span className="flex items-center space-x-1"><Phone size={14} /> <span>{enq.phone}</span></span>
                    {enq.checkIn && <span className="flex items-center space-x-1"><Calendar size={14} /> <span>{new Date(enq.checkIn).toLocaleDateString()}</span></span>}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  enq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                  enq.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {enq.status.toUpperCase()}
                </div>
              </div>
              
              <div className="bg-earth-100 p-4 rounded-lg text-sm">
                <p className="font-medium text-forest-900 mb-1">Interest: {enq.productNameSnapshot}</p>
                {enq.message && <p className="text-forest-800 italic">"{enq.message}"</p>}
              </div>
              <div className="text-xs text-forest-600">
                Received: {new Date(enq.createdAt).toLocaleString()} | Ref: {enq.reference}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a 
                href={`https://wa.me/91${enq.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageSquare size={16} />
                <span>Message</span>
              </a>
              {enq.status === 'new' && (
                <>
                  <form action={updateStatus.bind(null, enq.id, 'confirmed')}>
                    <Button variant="outline" className="w-full justify-center border-emerald-500 text-emerald-700 hover:bg-emerald-50">
                      <Check size={16} className="mr-2" /> Mark Confirmed
                    </Button>
                  </form>
                  <form action={updateStatus.bind(null, enq.id, 'cancelled')}>
                    <Button variant="outline" className="w-full justify-center border-red-300 text-red-600 hover:bg-red-50">
                      <X size={16} className="mr-2" /> Cancel
                    </Button>
                  </form>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
