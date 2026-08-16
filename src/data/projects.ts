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
      the drawing-vs-render story ('Drawn'/'Rendered'). Omit `after` to show
      the drawing alone at a larger size. */
  process?: {
    before: string;
    after?: string;
    caption: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
  /** Multiple before/after pairs (Scene Revival-style page built entirely of
      comparisons). Takes precedence over `process` when set. */
  pairs?: {
    before: string;
    after?: string;
    caption: string;
    beforeLabel?: string;
    afterLabel?: string;
  }[];
  /** The seed still and the clip generated from it, shown side by side so the
      one reads as the other frozen. `still` is a filename in the project's
      asset folder (and is kept out of the gallery below); `video` is a path
      under /public. Sources should share an aspect ratio — the pair only
      works if the two frames match. */
  stillToMotion?: {
    still: string;
    video: string;
    caption: string;
    stillLabel?: string;
    motionLabel?: string;
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
  /** The facets the discipline covers, shown as a strip on the hub. */
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
      'A production pipeline, not a shortcut. Finished CGI work from the studio archive is taken further with AI — flat renders regraded into photographic light, product stills placed in living scenes, and still imagery set in motion. The tools change, and so do the standards.',
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
    title: 'Interior Design, Architectural Visualisation & Documentation',
    kicker: 'Collection',
    discipline: 'Space planning · interior design · documentation · visualisation',
    description:
      'Buildings and interiors taken from measured space plan and fit-out detailing to coordinated drawing set to photoreal image.',
    intro:
      'The buildings-and-interiors side of the studio — commercial and residential space taken from a measured survey, through the interior fit-out and a coordinated drawing set a contractor can build from, to the photoreal image that sells it.',
    facets: [
      'Space planning & measured survey',
      'Interior design & fit-out detailing',
      'Coordinated CAD documentation',
      'Photoreal architectural & interior visualisation',
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
      {
        k: 'Role',
        v: 'In-house 3D artist — managed the render farm, supervised a partner CG studio in Ukraine, and helped build the webshop\'s 3D product generator',
      },
      {
        k: 'Deliverables',
        v: 'Product renders with studio and environmental backgrounds · animations · 2D and 3D technical drawings and documentation',
      },
    ],
    description:
      'Photorealistic product renders and environmental scenes for outdoor living — created in-house at Nubuiten.',
    brief:
      'Nubuiten is an outdoor-living webshop selling verandas, garden rooms and fencing among a range of roughly 10,000 products. Renders make the presales possible — a product can be sold before it is ever built, and far more of the range gets online than photography could cover.',
    approach:
      'I had to model every product to exact scale dimensions, then place it in a suitable setting — either a garden scene or a studio background. The same models also produced the technical documentation: assembly manuals, parts lists and any other technical paperwork the product needed.',
  },
  {
    slug: 'outdoor-life-group',
    title: 'Outdoor Life Group',
    year: '2026',
    discipline: 'Product visualisation',
    facts: [
      {
        k: 'Role',
        v: 'In-house 3D artist across the group\'s brands — Woodvision, Hillhout, Royal Well, Lasita Maja and Weka — took over the drawing and content work after the previous draughtsman retired, and maintained a shared render library for catalogue-wide consistency',
      },
      {
        k: 'Deliverables',
        v: 'Catalogue renders in studio and garden settings · animations · 2D and 3D technical drawings, parts lists and manuals · support on the 3D configurator',
      },
    ],
    description:
      'Product visualisation for Outdoor Life Group (OLG) — created in-house.',
    brief:
      'Outdoor Life Group is the head company of the group, supplying outdoor-living products to large retailers such as Intergamma, Karwei and Hornbach. Their draughtsman had retired, content creation was falling behind, and a catalogue of thousands of products needed updating — technical drawings, parts lists, manuals and renders alike.',
    approach:
      'I came across from Nubuiten to take the work over. Each product had its own specific requirements — anything from technical drawings, parts lists and manuals to 2D drawings and 3D renders staged in garden and studio environments. I produced close to 600 renders in my time there, alongside work on the 3D configurator and adapting the company’s AI setup to see where else it could be used.',
    stillToMotion: {
      still: 'fence-still.jpg',
      video: '/video/ai-motion-01.mp4',
      stillLabel: 'Render',
      motionLabel: 'Motion',
      caption:
        'Chestnut paling fence for Outdoor Life Group — the finished product render (left) and a short clip generated from that single frame (right): same fence, same posts, same paddock, with the camera locked off and only the wind and the sheep behind it moving.',
    },
  },
  {
    slug: 'archviz',
    title: '5 Apple Road',
    year: '2024',
    discipline: 'Architectural visualisation',
    collection: 'architecture',
    facts: [
      {
        k: 'Role',
        v: 'Solo project — measured the site, modelled the building, and produced the full drawing set and photoreal renders',
      },
      {
        k: 'Deliverables',
        v: 'Measured survey · plans, elevations and sections · photoreal street-view render',
      },
    ],
    description:
      'Architectural visualisation and technical documentation — from measured drawing sets to the final photoreal image.',
    brief:
      'A returning client in Johannesburg had bought an existing building to use as a showroom for their products. It was already built, so nothing needed designing — what they lacked was an accurate set of plans: dimensioned drawings their contractors could work from, and a permanent record of the building for future reference.',
    approach:
      'One model drives everything. I measured the building as it stood, modelled it from that survey, and produced the full drawing set — plans, elevations and sections. The photoreal street view comes from the same geometry, staged in a European street rather than the Johannesburg original.',
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
      {
        k: 'Role',
        v: 'Modelled each product, planned the camera movement and assembly sequence, then animated and edited the final films',
      },
      {
        k: 'Deliverables',
        v: 'Product turntables · assembly animations showing how each structure goes together · short lifestyle reveals',
      },
    ],
    description:
      'From a virtual 3D product to motion — turntables, assembly sequences and product reveals.',
    brief:
      'Some products are easier to sell in motion: how a veranda goes together, how a garden building sits in evening light.',
    approach:
      'Animations are built from the same accurate product models as the stills — assembly sequences on clean white for clarity, lifestyle shots in full scenes for atmosphere.',
    // Card hover: the SL3D snowboard ident, GPU-enhanced 29 Jul 2026 (blur
    // pillarbox cropped off, Real-ESRGAN 2x upscale, RIFE 48fps, winter filmic
    // grade — full-res master in result_masters/hero-ident-v2.mp4). The static
    // cover at assets/covers/product-animations.jpg is a matching frame so the
    // crossfade is seamless.
    previewVideo: '/video/preview-ident.mp4',
    // Alternate lifestyle, exploded-view, turntable and assembly clips so
    // similar work does not bunch together. The strongest garden scene opens.
    // The technical clips share the same warm paper grade.
    videos: [
      '/video/product-anim-04-v2.mp4',
      '/video/explosion-sussex.mp4',
      // Norwegian terrace at night — depth+parallax montage of the pergola
      // render (project page only; deliberately not on the home page).
      '/video/product-anim-06.mp4',
      '/video/explosion-tuinkantoor.mp4',
      '/video/product-anim-03-v2.mp4',
      '/video/product-anim-02-v3.mp4',
      '/video/explosion-c5zb.mp4',
      '/video/product-anim-01-v3.mp4',
    ],
  },
  {
    slug: 'ai-revival',
    title: 'Scene Revival',
    year: '2026',
    discipline: 'AI-assisted visualisation',
    collection: 'ai',
    facts: [
      {
        k: 'Role',
        v: 'Returned to finished archive renders, directed each regrade and checked every result against the original product model',
      },
      {
        k: 'Deliverables',
        v: 'Before-and-after image sets · photoreal regrades with updated light and atmosphere',
      },
    ],
    description:
      'Finished CGI renders from the archive, taken further — flat daylight regraded into photographic golden hour, clean product scenes lifted into believable places.',
    brief:
      'A render that was state of the art two years ago can look dated next to what is possible now. Rather than rebuilding every scene from scratch, the archive becomes raw material: the geometry, composition and product accuracy are already right — the image just needs to catch up.',
    approach:
      'Each revival is taken through an AI regrade under tight art direction, then checked back against the source render — proportions, materials and product detail must survive the process untouched. What changes is the light and the atmosphere; what the client is buying stays exact.',
    pairs: [
      {
        before: 'before.jpg',
        after: 'after.jpg',
        beforeLabel: 'Original render',
        afterLabel: 'AI regrade',
        caption:
          'Hardinxveld garden room — the original CGI render (left) and its AI-assisted regrade (right): same geometry, same product, photographic light.',
      },
      {
        before: 'garden40-before.jpg',
        after: 'garden40-after.jpg',
        beforeLabel: 'Original render',
        afterLabel: 'AI regrade',
        caption:
          'Garden 40 pergola — the original webshop render (left) and its AI regrade (right): same pergola, same courtyard, but the CGI sky, fresh timber and clean pavers give way to soft overcast light, weathered wood and worn brick paving.',
      },
    ],
  },
  {
    slug: 'ai-motion',
    title: 'Still to Motion',
    year: '2026',
    discipline: 'AI-assisted animation',
    collection: 'ai',
    facts: [
      {
        k: 'Role',
        v: 'Directed the camera movement and atmosphere from each finished still, rejected any product drift and edited the final clips',
      },
      {
        k: 'Deliverables',
        v: 'Short product films created from finished stills · controlled camera movement · atmospheric motion',
      },
    ],
    description:
      'Product stills and finished scenes set in motion with AI — camera moves, atmosphere and product reveals generated from a single accurate frame.',
    brief:
      'Full 3D animation is the gold standard, but not every product or campaign carries its production time. When an accurate still already exists, motion can now start from that frame instead of from an empty timeline.',
    approach:
      'Each clip begins from a finished still. Camera movement and atmosphere are generated over it in short, directed passes, and anything that drifts from the real product is cut — the pair below is one that survived: the still on the left, and the clip it became on the right.',
    stillToMotion: {
      still: 'still.jpg',
      video: '/video/ai-motion-01.mp4',
      stillLabel: 'Still',
      motionLabel: 'Motion',
      caption:
        'Chestnut sheep fence — the finished still (left) and the clip generated from it (right): same fence, same posts, same paddock, with the camera locked off and only the wind and the sheep behind it moving.',
    },
  },
  {
    slug: 'park24-bulkheads',
    title: 'Park 24 Bulkheads',
    year: '2026',
    discipline: 'AI-assisted interior visualisation',
    collection: 'ai',
    facts: [
      {
        k: 'Role',
        v: 'Returned to FCPM’s 2017 bulkhead drawings, rebuilt each ceiling detail in 3D and directed the rooms around the lighting each one creates',
      },
      {
        k: 'Deliverables',
        v: 'Rebuilt 3D model · four photoreal interiors — kitchen, dining room and two bedroom schemes',
      },
    ],
    description:
      'A 2017 bulkhead drawing set brought back as photoreal interiors, where the drawn ceiling details — drops, shadow gaps and LED coves — do the lighting.',
    brief:
      'On paper, a bulkhead is a set of drops and dimensions. In a finished room it is mostly light — where the cove washes the ceiling, where the shadow gap draws its line. The drawings had described that light for years; nobody had ever seen it.',
    process: {
      before: 'drawing.jpg',
      beforeLabel: 'Drawing set',
      caption:
        'Park 24 — the 2017 bulkhead detail sheet the rooms were rebuilt from: every drop, shadow gap and cove drawn and dimensioned.',
    },
    approach:
      'The ceiling details were rebuilt in 3D exactly as drawn, then each room was staged around what its bulkhead does best — the kitchen’s cove over the island, the dining room’s floating frame, and one bedroom resolved twice: the same detail lit cool in one scheme and warm in the other, so the client chooses a temperature, not a redesign.',
  },
  {
    slug: 'loftus-box',
    title: 'Old Mutual Box',
    year: '2026',
    discipline: 'Interior survey, documentation & renovation',
    collection: 'architecture',
    facts: [
      {
        k: 'Role',
        v: 'Surveyed and drew the interior of the hospitality box for one of the practice\'s largest clients, ahead of a full renovation to ready the suite for hosting their most important guests',
      },
      {
        k: 'Deliverables',
        v: 'Completed drawing set documenting the box for future reference · full renovation of the suite — general maintenance, repainting and revarnishing',
      },
    ],
    description:
      'A corporate hospitality box at Loftus Versfeld — surveyed and drawn for one of the practice\'s largest clients, documented as a full drawing set, and taken through to a complete renovation of the suite.',
    brief:
      'A hospitality box lives or dies on how it feels on match day. Old Mutual needed their suite at Loftus brought back up to standard for hosting their most important guests — work that started with an accurate survey of the existing box and a coordinated drawing set the renovation could be run from.',
    process: {
      before: 'drawing.jpg',
      after: '04.jpg',
      beforeLabel: 'Survey sheet',
      afterLabel: 'Interior visualisation',
      caption:
        'Old Mutual Box — the A101 survey sheet (left) and a visualisation of the box interior produced from it (right): the same detail surveyed, drawn and dimensioned, then modelled and presented.',
    },
    approach:
      'The existing box was surveyed and captured as an A101 sheet — plan, south elevation, and a door and window legend — then modelled from those drawings to show the interior: face-brick piers, oak counters over white shaker cabinetry, and a dropped bulkhead with recessed linear light over the servery. With the box documented for future reference, the project proceeded to a full renovation of the suite: general maintenance throughout, with the joinery and finishes repainted and revarnished.',
  },
  {
    slug: 'schultz-mmuoe',
    title: 'Schultz Mmuoe Inc',
    year: '2026',
    discipline: 'AI-assisted interior visualisation',
    collection: 'architecture',
    facts: [
      {
        k: 'Role',
        v: 'Surveyed the offices, drew the renovation plans, and produced the interior visuals our in-house trades and the client both worked from',
      },
      {
        k: 'Deliverables',
        v: 'Renovation plans · interior visuals — boardroom, private office and corridor',
      },
    ],
    description:
      'A 2017 office refresh for an attorneys’ practice — planned and visualised so the trades knew exactly what to do, and where.',
    brief:
      'Schultz Mmuoe Inc is an attorneys’ practice whose offices hadn’t been touched in about five years. What they asked for in 2017 was basic: repaint throughout, make good the damage, new lighting, and an overall brightening and clean-up so the place read as professional again. They didn’t ask for drawings, plans or visuals — just the work.',
    approach:
      'I drew it up anyway. The renovation was carried out by our own in-house trades, and a job like that only runs cleanly when everyone is working to the same picture — so I produced plans and visuals together: the plans saying what had to happen and where, the visuals showing what each room should look like once it was done. The trades built from those instead of from a verbal brief, and the practice could sign off a room before a wall was painted. The images here are those original 2017 plans and visuals brought up to current standard.',
  },
  {
    slug: 'sa-business-coach',
    title: 'South African Business Coach',
    year: '2026',
    discipline: 'AI-assisted interior visualisation',
    collection: 'architecture',
    facts: [
      {
        k: 'Role',
        v: 'Rebuilt the 2018 model as a bare shell, set the cameras, and drove every AI pass to a photographic finish',
      },
      {
        k: 'Deliverables',
        v: 'Photoreal interiors across four colour schemes',
      },
    ],
    description:
      'A 2018 office colour study for a business-coaching practice — the same rooms painted four ways, stripped back to a bare shell and taken to photographic finish.',
    brief:
      'The model arrived as a colour-scheme study — "painting options" — the same office repainted in four schemes and presented as dollhouse renders: red V-chevrons and colour-blocked accent walls over one continuous dark green carpet. The colour logic was the design, red for group energy in the training spaces and yellow-green for focus in the offices, but the renders were never photographic. Eight years on, the question was whether that painted geometry could reach a finished interior without repainting a single wall.',
    approach:
      'The 60 MB model was stripped to a 0.6 MB shell — walls, floors, windows, red doors and the carpeted stair, no ceilings, no furniture — with every painted plane kept exactly where the 2018 study put it. Each camera view was then driven through directed AI passes to photographic finish: light, material and furniture were added around the shell, and the chevrons, diagonals and carpet were held to the model throughout.',
  },
  {
    slug: 'bcd-travel',
    title: 'BCD Travel',
    year: '2020',
    discipline: 'Commercial space planning & CAD documentation',
    collection: 'architecture',
    facts: [
      {
        k: 'Role',
        v: 'Surveyed the site and drew the full documentation set — space plans, elevations, suspended ceiling plans and schedules, coordinated for construction',
      },
      {
        k: 'Deliverables',
        v: 'Space plans · elevations · suspended ceiling plans · door and window schedules',
      },
    ],
    description:
      'A full office fit-out documentation set for the BCD Travel campus in Johannesburg — space planning, elevations, suspended ceiling plans and schedules, drawn to be built.',
    brief:
      'A global travel-management company refitting a Johannesburg office floor needs a coordinated drawing set: how the space is zoned and furnished, how it is lit, and how every door and window is specified — enough for a contractor to price and build without a phone call.',
    approach:
      'Colour-coded space plans and furniture layouts, four measured elevations, and a suspended ceiling plan — all keyed to door and window schedules and verified against the building on site.',
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
          'Departments, circulation and every workstation set out to scale across the H-shaped floor plate.',
      },
      {
        label: 'A104 · Suspended Ceiling Plan',
        caption:
          'Suspended ceiling grid — parabolic troffers and downlights located over the plan.',
      },
      {
        label: 'A102 · Elevations',
        caption:
          'Four measured elevations — east, north, south and west — with ceiling and floor datums and numbered gridlines.',
      },
    ],
  },
];
