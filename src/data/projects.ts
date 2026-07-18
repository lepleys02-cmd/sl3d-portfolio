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
  /** Autoplaying muted showreel shown as the project-page header (path under /public). */
  headerVideo?: string;
  /** Projects without an image gallery list videos from /public/video instead. */
  videos?: string[];
  /** Drawing-led case study: render the gallery as matted documentation sheets
      (mat + hairline border + sheet label) instead of edge-to-edge images. */
  documentation?: boolean;
  /** Per-sheet label + caption, in the same order as the sorted asset files.
      Only used when `documentation` is true. */
  sheets?: { label: string; caption: string }[];
  /** Slug of the collection this project belongs to. Collection members are
      grouped behind a single hub card on the home page instead of appearing
      individually, and cycle prev/next within the collection. */
  collection?: string;
  /** Pinned scroll-progress feature shown above the plain video grid — a
      sticky video panel with a chapter rail driven by scroll fraction
      (see ScrollScrub.astro). `video` is excluded from the plain grid below
      to avoid showing the same clip twice. */
  scrollFeature?: {
    video: string;
    poster?: string;
    /** `at` is a 0–1 fraction of scroll progress through the section. */
    chapters: { at: number; label: string }[];
  };
}

/** A themed grouping of projects, surfaced as one hub page + one home card. */
export interface Collection {
  slug: string;
  title: string;
  /** Small kicker above the hub title. */
  kicker: string;
  /** Short label shown under the collection's home card. */
  discipline: string;
  /** One-line summary for the home card + meta description. */
  description: string;
  /** Hub-page intro paragraph. */
  intro: string;
  /** The three facets the discipline covers, shown as a strip on the hub. */
  facets: string[];
}

export const collections: Collection[] = [
  {
    slug: 'architecture',
    title: 'Architectural Planning & Visualisation',
    kicker: 'Collection',
    discipline: 'Space planning · documentation · visualisation',
    description:
      'Buildings taken from measured space plan to coordinated drawing set to photoreal image.',
    intro:
      'The architectural side of the studio — commercial and residential buildings taken from a measured space plan, through a coordinated drawing set a contractor can build from, to the photoreal image that sells it. One model drives all three.',
    facets: [
      'Space planning & measured survey',
      'Coordinated CAD documentation',
      'Photoreal architectural visualisation',
    ],
  },
];

// TODO(sam): real case-study numbers still missing — e.g. how many product
// variants / webshop scenes at Nubuiten, catalogue size at OLG. Add them to
// `facts` or weave into `approach` when known; do not invent numbers.
export const projects: Project[] = [
  {
    slug: 'nubuiten',
    title: 'Nubuiten',
    year: '2024',
    discipline: 'Product & environment visualisation',
    facts: [
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
    title: '5 Apple Road',
    year: '2024',
    discipline: 'Architectural visualisation',
    collection: 'architecture',
    facts: [
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
      { k: 'Discipline', v: '3D animation' },
      { k: 'Format', v: '1080p MP4' },
    ],
    description:
      'From a virtual 3D product to motion — turntables, assembly sequences and product reveals.',
    brief:
      'Some products are easier to sell in motion: how a bicycle shed opens, how a veranda goes together, how a garden building sits in evening light.',
    approach:
      'Animations are built from the same accurate product models as the stills — assembly sequences on clean white for clarity, lifestyle shots in full scenes for atmosphere.',
    previewVideo: '/video/preview-product-animations-v2.mp4',
    headerVideo: '/video/showreel-product-animations.mp4',
    videos: [
      '/video/product-anim-01.mp4',
      '/video/product-anim-02.mp4',
      '/video/product-anim-03-v2.mp4',
      '/video/product-anim-04-v2.mp4',
      '/video/product-anim-05-v2.mp4',
    ],
    scrollFeature: {
      video: '/video/product-anim-03-v2.mp4',
      poster: '/video/product-anim-03-v2-poster.jpg',
      chapters: [
        { at: 0, label: 'Closed' },
        { at: 0.33, label: 'Lid travel' },
        { at: 0.66, label: 'Clearances' },
        { at: 0.9, label: 'Open' },
      ],
    },
  },
  {
    slug: 'bcd-travel',
    title: 'BCD Travel',
    year: '2020',
    discipline: 'Commercial space planning & CAD documentation',
    collection: 'architecture',
    facts: [
      { k: 'Client', v: 'BCD Travel S.A' },
      { k: 'Site', v: 'Travel Campus, Johannesburg' },
      { k: 'Deliverables', v: 'Space plans · elevations · schedules' },
    ],
    description:
      'A full office fit-out documentation set for the BCD Travel campus in Johannesburg — space planning, elevations, reflected ceiling plans and schedules, drawn to be built.',
    brief:
      'A global travel-management company refitting a Johannesburg office floor needs a coordinated drawing set: how the space is zoned and furnished, how it is lit, and how every door and window is specified — enough for a contractor to price and build without a phone call.',
    approach:
      'One coordinated model drives the whole set — colour-coded space plans and furniture layouts, four measured elevations, and a reflected ceiling plan with its luminaire schedule, all keyed to door and window schedules and drawn to real dimensions verified on site.',
    documentation: true,
    sheets: [
      {
        label: 'A101 · Office Layout',
        caption:
          'Every space typed, colour-coded and counted against a room legend, with door and window schedules keyed back to the plan.',
      },
      {
        label: 'Space Plan · Furniture Layout',
        caption:
          'Departments, circulation and every workstation set out to scale across the H-shaped floor plate — the fit-out the client actually signs off.',
      },
      {
        label: 'A104 · Reflected Ceiling Plan',
        caption:
          'Ceiling grid and luminaire layout with a fitting schedule — parabolic troffers and downlights located over the plan.',
      },
      {
        label: 'A102 · Elevations',
        caption:
          'Four measured elevations — east, north, south and west — with ceiling and floor datums and numbered gridlines.',
      },
    ],
  },
];
