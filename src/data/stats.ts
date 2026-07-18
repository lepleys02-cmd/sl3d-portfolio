import { software } from './software';

export interface Stat {
  value: string | number;
  /** Rendered as a separate span so only the numeric part counts up. */
  suffix?: string;
  label: string;
}

// Owner-confirmed numbers only — do not add or infer stats beyond these three.
export const stats: Stat[] = [
  {
    value: 10,
    suffix: '+',
    label: 'years experience',
  },
  {
    value: 3,
    label: 'industries',
  },
  {
    // Derived from the software marquee so it can never drift out of sync.
    value: software.length,
    label: 'tools in daily use',
  },
];
