import { NextResponse } from 'next/server';
import { db } from '@/db';
import { enquiries } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, guestsCount, preferredDate, accommodationType, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const newEnquiry = await db.insert(enquiries).values({
      reference: 'ENQ-' + Date.now().toString().slice(-6),
      name: name,
      phone: phone,
      email: email || '',
      message: message || '',
      checkIn: preferredDate ? new Date(preferredDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      adults: parseInt(guestsCount) || 2,
      groupSize: parseInt(guestsCount) || 2,
      productNameSnapshot: accommodationType || 'General Enquiry',
      status: 'new',
    }).returning();

    return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await db.select().from(enquiries).orderBy(enquiries.createdAt);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
