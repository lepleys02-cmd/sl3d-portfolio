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
  /** Optional before/after pairing shown above the gallery.
      Filenames are relative to the project's asset folder. Labels default to
      the drawing-vs-render story ('Drawn'/'Rendered'). */
  process?: {
    before: string;
    after: string;
    caption: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
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
    slug: 'ai',
    title: 'AI-Assisted Production',
    kicker: 'Collection',
    discipline: 'Scene revival · photoreal regrades · generative motion',
    description:
      'Existing renders and product imagery taken further with AI — regraded, relit and set in motion, with every output checked against the real model.',
    intro:
      'A production pipeline, not a shortcut. Finished CGI work from the studio archive is taken further with AI — flat renders regraded into photographic light, product stills placed in living scenes, and still imagery set in motion. Every output is art-directed and verified against the accurate 3D model it started from; the tools change, the standard does not.',
    facets: [
      'Brief & art direction',
      'Accurate 3D base model',
      'AI iteration & regrade',
      'Human selection & correction',
      'Verified finish & delivery',
    ],
  },
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
      { k: 'Role', v: 'In-house 3D artist — every render from model to post' },
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
      { k: 'Role', v: 'In-house 3D artist' },
      { k: 'Deliverables', v: 'Product stills · environment scenes' },
    ],
    description:
      'Product and environment visualisation for Outdoor Life Group (OLG) — created in-house.',
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
      { k: 'Role', v: 'Solo project — survey, drawings and renders' },
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
      { k: 'Role', v: 'All modelling, animation and editing' },
      { k: 'Format', v: '1080p MP4' },
    ],
    description:
      'From a virtual 3D product to motion — turntables, assembly sequences and product reveals.',
    brief:
      'Some products are easier to sell in motion: how a veranda goes together, how a garden building sits in evening light.',
    approach:
      'Animations are built from the same accurate product models as the stills — assembly sequences on clean white for clarity, lifestyle shots in full scenes for atmosphere.',
    // SL3D brand ident loop as the card cover animation (the static cover at
    // assets/covers/product-animations.jpg is this clip's poster frame).
    previewVideo: '/video/hero-loop-wide.mp4',
    headerVideo: '/video/showreel-product-animations.mp4',
    videos: [
      '/video/product-anim-01.mp4',
      '/video/product-anim-02.mp4',
      '/video/product-anim-04-v2.mp4',
      // Bicycle shed placed low in the grid — kept in the portfolio but not
      // featured (not the card cover, hero, or a scroll feature).
      '/video/product-anim-03-v2.mp4',
      '/video/product-anim-05-v2.mp4',
    ],
  },
  {
    slug: 'ai-revival',
    title: 'Scene Revival',
    year: '2026',
    discipline: 'AI-assisted visualisation',
    collection: 'ai',
    facts: [
      { k: 'Studio', v: 'SL3D' },
      { k: 'Role', v: 'Art direction, base models and every regrade pass' },
      { k: 'Source', v: 'Existing CGI renders' },
      { k: 'Deliverables', v: 'Photoreal regrades · lifestyle scenes' },
    ],
    description:
      'Finished CGI renders from the archive, taken further — flat daylight regraded into photographic golden hour, clean product scenes lifted into believable places.',
    brief:
      'A render that was state of the art two years ago can look dated next to what is possible now. Rather than rebuilding every scene from scratch, the archive becomes raw material: the geometry, composition and product accuracy are already right — the image just needs to catch up.',
    approach:
      'Each revival starts from the original accurate render, is taken through an AI regrade under tight art direction, then checked back against the source model — proportions, materials and product detail must survive the process untouched. What changes is the light and the atmosphere; what the client is buying stays exact.',
    process: {
      before: 'before.jpg',
      after: 'after.jpg',
      beforeLabel: 'Original render',
      afterLabel: 'AI regrade',
      caption:
        'Hardinxveld garden room — the original CGI render (left) and its AI-assisted regrade (right): same geometry, same product, photographic light.',
    },
  },
  {
    slug: 'ai-motion',
    title: 'Still to Motion',
    year: '2026',
    discipline: 'AI-assisted animation',
    collection: 'ai',
    facts: [
      { k: 'Studio', v: 'SL3D' },
      { k: 'Role', v: 'Direction, generation and the final cut' },
      { k: 'Source', v: 'Product stills & scenes' },
      { k: 'Format', v: '1080p MP4' },
    ],
    description:
      'Product stills and finished scenes set in motion with AI — camera moves, atmosphere and product reveals generated from a single accurate frame.',
    brief:
      'Full 3D animation is the gold standard, but not every product or campaign carries its production time. When an accurate still already exists, motion can now start from that frame instead of from an empty timeline.',
    approach:
      'Each clip begins from a finished, dimensionally accurate still. Camera movement and atmosphere are generated over it in short, directed passes, and anything that drifts from the real product is cut — the clip below is one that survived.',
    videos: ['/video/ai-motion-01.mp4'],
  },
  {
    slug: 'park24-bulkheads',
    title: 'Park 24 Bulkheads',
    year: '2026',
    discipline: 'AI-assisted interior visualisation',
    collection: 'ai',
    facts: [
      { k: 'Studio', v: 'SL3D' },
      { k: 'Role', v: 'Rebuilt the drawings in 3D, directed the finish' },
      { k: 'Source', v: '2017 construction drawings' },
      { k: 'Rooms', v: 'Kitchen · dining · two bedroom options' },
    ],
    description:
      'A 2017 bulkhead drawing set brought back as photoreal interiors — the ceiling details rebuilt in 3D to their drawn dimensions, then staged and finished with AI.',
    brief:
      'A construction drawing tells a contractor where the bulkhead goes; it tells a homeowner nothing about how the room will feel. Years after the drawings were issued, the question was whether an archive drawing set could become the marketing imagery it never had.',
    process: {
      before: 'drawing.jpg',
      after: '04.jpg',
      beforeLabel: 'Drawing set',
      afterLabel: 'AI-finished interior',
      caption:
        'Park 24 — the bulkhead detail sheet (left) and the dining room bulkhead delivered from it (right): the same detail drawn, dimensioned, rebuilt in 3D, and finished.',
    },
    approach:
      'The bulkhead details were rebuilt as an accurate 3D model straight from the original drawings — drops, shadow gaps and cove positions at their drawn dimensions — then each room was staged, lit and finished through the studio’s AI pipeline. The two bedroom schemes show the same detail resolved in two temperatures — one cove lit cool, the other warm.',
  },
  {
    slug: 'loftus-box',
    title: 'Old Mutual Box',
    year: '2026',
    discipline: 'AI-assisted interior visualisation',
    collection: 'ai',
    facts: [
      { k: 'Studio', v: 'SL3D' },
      { k: 'Role', v: 'Measured survey, 3D model and art direction' },
      { k: 'Venue', v: 'Loftus Versfeld, Pretoria' },
      { k: 'Space', v: 'Corporate hospitality box' },
    ],
    description:
      'A corporate hospitality box at Loftus Versfeld, surveyed and drawn, rebuilt as a 3D model at its drawn dimensions, then staged and finished with AI — with match day beyond the glass.',
    brief:
      'A hospitality box is sold on how it feels on match day, and a survey drawing says nothing about that. The box existed as an A101 sheet — plan, south elevation, door and window legend — and a rough model; the question was whether an archive survey could become the imagery a suite like this is sold on.',
    process: {
      before: 'drawing.jpg',
      after: '04.jpg',
      beforeLabel: 'Drawing sheet',
      afterLabel: 'AI-finished interior',
      caption:
        'Old Mutual Box — the A101 survey sheet (left) and the servery bulkhead delivered from it (right): the same detail drawn, dimensioned, rebuilt in 3D, and finished.',
    },
    approach:
      'The box was drawn from a measured survey — plan, south elevation and a door and window legend on an A101 sheet — then rebuilt as a 3D model at those dimensions: face-brick piers, oak counters over white shaker cabinetry, a dropped bulkhead over the servery with recessed linear light and cove. Each zone was then staged, lit and finished through the studio’s AI pipeline. The light strategy carries the room — warm interior pools against the cooler daylight coming off the pitch — and the stadium beyond the glazing is the real Loftus bowl, never an invented one.',
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
      { k: 'Role', v: 'Surveyed and drew the full set myself' },
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
        label: 'A103 · Space Plan & Furniture Layout',
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
