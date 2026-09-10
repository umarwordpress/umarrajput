'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { easeSoft } from '@/lib/motion';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'fallback';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const SITE_TYPES = [
  'Business website',
  'WordPress website',
  'E-commerce store',
  'Custom web application',
  'Website redesign',
  'Landing page',
  'Not sure yet',
];

/**
 * Quote form for the Pakistan landing page. Posts to the same /api/contact
 * route as the main contact form, with the extra fields folded into the
 * message body so there is one place enquiries arrive.
 */
export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [v, setV] = useState({
    name: '', email: '', phone: '', company: '', website: '', type: '', message: '',
  });

  function set(key: keyof typeof v, value: string) {
    setV((s) => ({ ...s, [key]: value }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function composed() {
    const detail = [
      v.company && `Business: ${v.company}`,
      v.website && `Current website: ${v.website}`,
      v.type && `Website type: ${v.type}`,
      v.phone && `Phone: ${v.phone}`,
    ].filter(Boolean).join('\n');
    return detail ? `${detail}\n\n${v.message}` : v.message;
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    'Website development quote',
  )}&body=${encodeURIComponent(`${composed()}\n\nFrom ${v.name} (${v.email})`)}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    const found: Errors = {};
    if (v.name.trim().length < 2) found.name = 'Please enter your name.';
    if (!EMAIL.test(v.email.trim())) found.email = 'Please enter a valid email address.';
    if (v.message.trim().length < 10) found.message = 'A few more details help me quote accurately.';
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v.name,
          email: v.email,
          subject: 'Website development quote',
          message: composed(),
        }),
      });
      if (res.status === 503) { setStatus('fallback'); return; }
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={`card form${compact ? ' form--compact' : ''}`} id="quote">
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeSoft }}
            style={{ textAlign: 'center', padding: '28px 0' }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: 10 }}>Thanks, I have your request</h3>
            <p style={{ color: 'var(--muted)' }}>
              I will look at your requirements and come back with a scope, a price and a realistic
              timeline.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }}>
            <h2 className="form__title">Get your website quote</h2>
            <p className="form__lede">
              Tell me what you need and I will come back with a scope, a price and a timeline.
            </p>

            <div className="form__row">
              <div className={`field${errors.name ? ' field--bad' : ''}`}>
                <label htmlFor="q-name">Name</label>
                <input id="q-name" value={v.name} autoComplete="name"
                       onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
                {errors.name && <span className="field__err">{errors.name}</span>}
              </div>
              <div className={`field${errors.email ? ' field--bad' : ''}`}>
                <label htmlFor="q-email">Business email</label>
                <input id="q-email" type="email" value={v.email} autoComplete="email"
                       onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" />
                {errors.email && <span className="field__err">{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="q-phone">Phone or WhatsApp</label>
                <input id="q-phone" type="tel" value={v.phone} autoComplete="tel"
                       onChange={(e) => set('phone', e.target.value)} placeholder="+92 300 0000000" />
              </div>
              <div className="field">
                <label htmlFor="q-company">Business name</label>
                <input id="q-company" value={v.company}
                       onChange={(e) => set('company', e.target.value)} placeholder="Optional" />
              </div>
              <div className="field">
                <label htmlFor="q-site">Current website</label>
                <input id="q-site" value={v.website}
                       onChange={(e) => set('website', e.target.value)} placeholder="Optional" />
              </div>
              <div className="field">
                <label htmlFor="q-type">Website type</label>
                <select id="q-type" value={v.type} onChange={(e) => set('type', e.target.value)}>
                  <option value="">Choose one</option>
                  {SITE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className={`field${errors.message ? ' field--bad' : ''}`}>
              <label htmlFor="q-message">Project requirements</label>
              <textarea id="q-message" value={v.message}
                        onChange={(e) => set('message', e.target.value)}
                        placeholder="What the site is for, roughly how many pages, anything it has to connect to." />
              {errors.message && <span className="field__err">{errors.message}</span>}
            </div>

            {status === 'error' && (
              <p className="field__err" style={{ marginBottom: 14 }}>
                Something went wrong sending that. Try again, or email me directly.
              </p>
            )}

            {status === 'fallback' ? (
              <a className="btn btn--primary btn--lg" style={{ width: '100%' }} href={mailto}>
                Open in your email app <Icon name="arrow-right" size={18} />
              </a>
            ) : (
              <button type="submit" className="btn btn--primary btn--lg"
                      style={{ width: '100%' }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Get My Website Quote'}
              </button>
            )}

            <p className="form__note">
              {status === 'fallback'
                ? 'Email delivery is not configured yet, so this opens your mail app instead.'
                : 'I reply to every enquiry. No mailing list, no sales sequence.'}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
