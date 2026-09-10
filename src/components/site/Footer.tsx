import Link from 'next/link';
import { site } from '@/lib/site';
import { services } from '@/data/services';

export function Footer() {
  return (
    <footer className="ftr" id="contact-footer">
      <div className="container">
        <div className="ftr__top">
          <div>
            <Link href="/" className="brand" aria-label="Umar Rajput, home">
              <span className="brand__mark" aria-hidden>
                UR
              </span>
              <span className="brand__name">
                Umar Rajput<span className="grad-text">.</span>
              </span>
            </Link>
            <p className="ftr__blurb">
              I build websites, custom web applications and business automations, with SEO to bring
              the right people in.
            </p>
          </div>

          <div>
            <h3>Navigate</h3>
            <ul>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#work">Work</Link></li>
              <li><Link href="/work">Full portfolio</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link href="/#services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Elsewhere</h3>
            <ul>
              <li><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={site.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={site.socials.x} target="_blank" rel="noopener noreferrer">X</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
