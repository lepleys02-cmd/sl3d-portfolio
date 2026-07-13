export interface Project {
  slug: string;
  title: string;
  year: string;
  discipline: string;
  /** Fact rows shown on the project page (cepezed-style key/value). */
  facts: { k: string; v: string }[];
  description: string;
  /** Projects without an image gallery list videos from /public/video instead. */
  videos?: string[];
}

export const projects: Project[] = [
  {
    slug: 'nubuiten',
    title: 'Nubuiten',
    year: '2024',
    discipline: 'Product & environment visualisation',
    facts: [
      { k: 'Year', v: '2024' },
      { k: 'Discipline', v: 'Product & environment visualisation' },
      { k: 'Studio', v: 'Nubuiten' },
    ],
    description:
      'Samples of products and environments created whilst working at Nubuiten — photorealistic product renders and lifestyle scenes for outdoor living.',
  },
  {
    slug: 'outdoor-life-group',
    title: 'Outdoor Life Group',
    year: '2026',
    discipline: 'Product & environment visualisation',
    facts: [
      { k: 'Year', v: '2026' },
      { k: 'Discipline', v: 'Product & environment visualisation' },
      { k: 'Studio', v: 'Outdoor Life Group' },
    ],
    description:
      'Samples of products and environments created whilst working at Outdoor Life Group (OLG).',
  },
  {
    slug: 'archviz',
    title: 'ArchViz',
    year: '2024',
    discipline: 'Architectural visualisation',
    facts: [
      { k: 'Year', v: '2024' },
      { k: 'Discipline', v: 'Architectural visualisation' },
      { k: 'Studio', v: 'Independent' },
    ],
    description:
      'Architectural visualisation studies — interiors, exteriors, materials and light.',
  },
  {
    slug: 'product-animations',
    title: 'Product Animations',
    year: '2024',
    discipline: '3D product animation',
    facts: [
      { k: 'Year', v: '2024' },
      { k: 'Discipline', v: '3D animation' },
      { k: 'Format', v: '1080p MP4' },
    ],
    description:
      'From a virtual 3D product to motion — turntables, assembly sequences and product reveals.',
    videos: [
      '/video/product-anim-01.mp4',
      '/video/product-anim-02.mp4',
      '/video/product-anim-03.mp4',
      '/video/product-anim-04.mp4',
      '/video/product-anim-05.mp4',
    ],
  },
];
