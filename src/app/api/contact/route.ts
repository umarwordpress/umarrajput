import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot, real users never fill this. */
  company?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Forwards a contact enquiry to whatever is configured in the environment.
 *
 *   CONTACT_WEBHOOK_URL , any endpoint that accepts JSON (Zapier, Make,
 *                          a Slack incoming webhook, your own CRM).
 *
 * With nothing configured the route answers 503 and the form falls back to
 * opening the visitor's mail client, so an enquiry is never silently lost.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Silently accept honeypot hits so bots do not learn anything.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const subject = body.subject?.trim() ?? '';

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email address.';
  if (message.length < 10) errors.message = 'Please add a little more detail.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Validation failed.', errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        error: 'not_configured',
        message: 'No delivery endpoint is configured for this form yet.',
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error('[contact] delivery failed', err);
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
