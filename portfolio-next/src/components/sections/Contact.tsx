'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'fallback';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });

  function set(key: keyof typeof values, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!EMAIL.test(values.email.trim())) next.email = 'Please enter a valid email address.';
    if (values.message.trim().length < 10) next.message = 'Please add a little more detail.';
    return next;
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    values.subject || 'Project enquiry',
  )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.status === 503) {
        // No delivery endpoint wired up yet — hand off to the mail client.
        setStatus('fallback');
        return;
      }
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container contact">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView}>
          <motion.span className="eyebrow" variants={fadeUp}>Get in touch</motion.span>
          <motion.h2 className="title" variants={fadeUp} style={{ margin: '18px 0 16px' }}>
            Let&apos;s <span className="grad-text">Connect</span>
          </motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Based in the GCC, working across time zones. I reply to every serious enquiry within one
            business day.
          </motion.p>

          <motion.div className="contact__cards" variants={stagger(0.07)}>
            <motion.a className="card ccard" href={`mailto:${site.email}`} variants={fadeUp}>
              <span className="ccard__icon"><Icon name="mail" size={18} /></span>
              <span>
                <b>Email</b>
                <span>{site.email}</span>
              </span>
            </motion.a>
            <motion.a
              className="card ccard"
              href={site.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
            >
              <span className="ccard__icon"><Icon name="whatsapp" size={18} /></span>
              <span>
                <b>WhatsApp</b>
                <span>{site.phone}</span>
              </span>
            </motion.a>
            <motion.a
              className="card ccard"
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
            >
              <span className="ccard__icon"><Icon name="linkedin" size={18} /></span>
              <span>
                <b>LinkedIn</b>
                <span>/in/umarrajput</span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="card form"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: easeSoft }}
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '30px 0' }}
              >
                <h3 style={{ fontSize: '1.3rem', marginBottom: 10 }}>Message sent</h3>
                <p style={{ color: 'var(--muted)' }}>
                  Thanks — I&apos;ll get back to you within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
                  onChange={(e) => setValues((s) => ({ ...s, company: e.target.value } as never))}
                />

                <div className="form__row">
                  <div className={`field${errors.name ? ' field--bad' : ''}`}>
                    <label htmlFor="c-name">Your name</label>
                    <input
                      id="c-name"
                      value={values.name}
                      onChange={(e) => set('name', e.target.value)}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <span className="field__err">{errors.name}</span>}
                  </div>
                  <div className={`field${errors.email ? ' field--bad' : ''}`}>
                    <label htmlFor="c-email">Email address</label>
                    <input
                      id="c-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => set('email', e.target.value)}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      placeholder="jane@company.com"
                    />
                    {errors.email && <span className="field__err">{errors.email}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-subject">Subject</label>
                  <input
                    id="c-subject"
                    value={values.subject}
                    onChange={(e) => set('subject', e.target.value)}
                    placeholder="Technical audit, Shopify build, local SEO…"
                  />
                </div>

                <div className={`field${errors.message ? ' field--bad' : ''}`}>
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    value={values.message}
                    onChange={(e) => set('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    placeholder="A little about your site, your market, and what you're trying to fix…"
                  />
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
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg"
                    style={{ width: '100%' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                )}

                <p className="form__note">
                  {status === 'fallback'
                    ? 'Email delivery is not configured yet — this opens your mail app instead.'
                    : `Or email me directly at ${site.email}`}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
