export type Role = {
  id: string;
  company: string;
  period: string;
  note?: string;
  current?: boolean;
  logo: { src: string; alt: string; width: number; height: number; raw?: boolean };
  /** TODO: job title + one-line description, pending from Umar. */
  title?: string;
  body?: string;
};

export const career: Role[] = [
  {
    id: 'hwt',
    company: 'Hello World Technologies',
    period: 'Jun 2023 — Jul 2024',
    logo: {
      src: '/assets/logos/helloworldtechnologies.png',
      alt: 'Hello World Technologies logo',
      width: 520,
      height: 117,
    },
  },
  {
    id: 'itcentre',
    company: 'IT Centre',
    period: 'Jun 2023 — Jul 2024',
    note: 'Rahim Yar Khan',
    logo: {
      src: '/assets/logos/itcentre-mark.png',
      alt: 'IT Centre logo',
      width: 113,
      height: 113,
    },
  },
  {
    id: 'faj',
    company: 'FAJ IT Solutions',
    period: 'Aug 2024 — Feb 2025',
    logo: { src: '/assets/logos/faj.png', alt: 'FAJ IT Solutions logo', width: 80, height: 80 },
  },
  {
    id: 'navttc',
    company: 'NAVTTC',
    period: 'Mar 2025 — Dec 2025',
    logo: {
      src: '/assets/logos/navttc.png',
      alt: 'NAVTTC logo',
      width: 259,
      height: 300,
      raw: true,
    },
  },
  {
    id: 'centnine',
    company: 'CentNine',
    period: 'Feb 2026 — Present',
    current: true,
    logo: { src: '/assets/logos/centnine.png', alt: 'CentNine logo', width: 520, height: 115 },
  },
];
