export interface Project {
  slug: string;
  title: string;
  year: string;
  discipline: string;
  /** Fact rows shown on the project page (cepezed-style key/value). */
  facts: { k: string; v: string }[];
  description: string;
  /** Case study: what the work had to achieve. */
  brief?: string;
  /** Case study: how it was made. */
  approach?: string;
  /** Optional drawing-vs-render pairing shown above the gallery.
      Filenames are relative to the project's asset folder. */
  process?: { before: string; after: string; caption: string };
  /** Short muted MP4 played on card hover (path under /public). */
  previewVideo?: string;
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
      { k: 'Studio', v: 'Nubuiten' },
      { k: 'Deliverables', v: 'Webshop stills · lifestyle scenes' },
    ],
    description:
      'Photorealistic product renders and lifestyle scenes for outdoor living — created in-house at Nubuiten.',
    brief:
      'An outdoor-living webshop sells verandas, garden rooms and fencing that are configured, not photographed — every variant needs believable imagery long before it exists in a warehouse.',
    approach:
      'Each product is modelled to its real manufacturing dimensions, then placed in Dutch garden scenes with materials and lighting treated like product photography — so the render can stand where a photo shoot never happened.',
  },
  {
    slug: 'outdoor-life-group',
    title: 'Outdoor Life Group',
    year: '2026',
    discipline: 'Product & environment visualisation',
    facts: [
      { k: 'Year', v: '2026' },
      { k: 'Studio', v: 'Outdoor Life Group' },
      { k: 'Deliverables', v: 'Product stills · environment scenes' },
    ],
    description:
      'Product and environment visualisation for Outdoor Life Group (OLG) — ongoing in-house work.',
    brief:
      'A product group covering multiple outdoor-living brands needs a steady stream of consistent, photoreal imagery across a wide catalogue.',
    approach:
      'A reusable scene- and material-library keeps every render on brand, while individual products are built accurately from their technical drawings.',
  },
  {
    slug: 'archviz',
    title: 'ArchViz',
    year: '2024',
    discipline: 'Architectural visualisation',
    facts: [
      { k: 'Year', v: '2024' },
      { k: 'Studio', v: 'Independent' },
      { k: 'Deliverables', v: 'Plans · elevations · photoreal stills' },
    ],
    description:
      'Architectural visualisation and technical documentation — from measured drawing sets to the final photoreal image.',
    brief:
      'Architecture clients need both sides of the story: the measured drawing set that gets a building approved and built, and the photoreal image that sells it.',
    approach:
      'One model drives everything. The 5 Apple Road showroom below was documented as a full drawing set — plans, elevations, sections — and rendered as a photoreal street view from the same geometry.',
    process: {
      before: '02.jpg',
      after: '01.jpg',
      caption:
        '5 Apple Road — one model, two deliverables: the technical elevation sheet (left) and the photoreal street view (right).',
    },
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
    brief:
      'Some products are easier to sell in motion: how a bicycle shed opens, how a veranda goes together, how a garden building sits in evening light.',
    approach:
      'Animations are built from the same accurate product models as the stills — assembly sequences on clean white for clarity, lifestyle shots in full scenes for atmosphere.',
    previewVideo: '/video/preview-product-animations.mp4',
    videos: [
      '/video/product-anim-01.mp4',
      '/video/product-anim-02.mp4',
      '/video/product-anim-03.mp4',
      '/video/product-anim-04.mp4',
      '/video/product-anim-05.mp4',
    ],
  },
];
