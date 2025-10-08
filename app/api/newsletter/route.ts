import { NextResponse } from 'next/server';
import MailerLite from '@mailerlite/mailerlite-nodejs';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Initialize MailerLite with API key from environment variable
    const mailerlite = new MailerLite({
      api_key: process.env.MAILERLITE_API_KEY || '',
    });

    // Add subscriber to group 167646643611502076
    const params = {
      email: email,
      groups: ['167646643611502076'],
    };

    await mailerlite.subscribers.createOrUpdate(params);

    return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('MailerLite API error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
