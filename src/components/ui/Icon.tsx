type Name =
  | 'search' | 'file' | 'layout' | 'bag' | 'pen' | 'trend' | 'app' | 'automation'
  | 'arrow-right' | 'linkedin' | 'instagram' | 'x' | 'whatsapp'
  | 'mail' | 'phone' | 'pin' | 'download';

const paths: Record<Name, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4.3-4.3" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  bag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></>,
  pen: <><path d="M12 19l7-7 3 3-7 7-3-3Z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" /><path d="m2 2 7.6 7.6" /><circle cx="11" cy="11" r="2" /></>,
  trend: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
  app: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8.5h18M7.5 12.5h9M7.5 16h5" /></>,
  automation: <><path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" /></>,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  x: <path d="M4 4l16 16M20 4 4 20" />,
  whatsapp: <><path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.8-5.3A8.5 8.5 0 1 1 21 11.5Z" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
};

export function Icon({ name, size = 20 }: { name: Name; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
