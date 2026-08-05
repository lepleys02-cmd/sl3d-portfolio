import { software } from './software';

/** Key into `ui[lang].numbers` — the label itself is translated, the number isn't. */
export type StatLabel = 'yearsExperience' | 'industries' | 'toolsInUse';

export interface Stat {
  value: string | number;
  /** Rendered as a separate span so only the numeric part counts up. */
  suffix?: string;
  label: StatLabel;
}

// Owner-confirmed numbers only — do not add or infer stats beyond these three.
export const stats: Stat[] = [
  {
    value: 10,
    suffix: '+',
    label: 'yearsExperience',
  },
  {
    value: 3,
    label: 'industries',
  },
  {
    // Derived from the software marquee so it can never drift out of sync.
    value: software.length,
    label: 'toolsInUse',
  },
];
