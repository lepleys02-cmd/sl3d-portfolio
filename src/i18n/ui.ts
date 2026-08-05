import type { Lang } from './config';

/**
 * Every user-facing string that lives in markup rather than in `projects.ts`.
 *
 * Rules for adding to this file:
 *  - `en` is the source of truth; `nl` must mirror its shape exactly.
 *  - Quotations from real people are translated but the citation carries
 *    "(vertaald uit het Engels)" — a translated quote is no longer verbatim
 *    and should never be presented as if it were.
 *  - Anything with inline emphasis is stored as `…Html` and rendered with
 *    `set:html`, so the accent word can sit in a different place per language.
 */
export const ui = {
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      contact: 'Contact',
      ariaMain: 'Main navigation',
      ariaLanguage: 'Language',
      switchTo: 'Bekijk deze pagina in het Nederlands',
    },

    // Shown on ENGLISH pages to a visitor whose browser asks for Dutch — so
    // the copy is Dutch on purpose. Same inversion as notFound.crossLangHtml.
    langHint: {
      aria: 'Taalkeuze',
      text: 'Deze site is ook in het Nederlands beschikbaar.',
      link: 'Ga naar de Nederlandse site →',
      dismiss: 'Melding sluiten',
    },

    footer: {
      kicker: 'Get in touch',
      headingLead: 'Have a project that needs clarity?',
      headingLink: 'Let’s talk.',
      availability:
        'Available for freelance projects and full-time roles — Netherlands / remote.',
      locality: 'South of the Netherlands',
      portfolioPdf: 'Portfolio (PDF)',
    },

    marquee: {
      kicker: 'Tools of the trade',
      aria: 'Software I work with',
    },

    numbers: {
      aria: 'Studio numbers',
      yearsExperience: 'years experience',
      industries: 'industries',
      toolsInUse: 'tools in daily use',
    },

    card: {
      peekProject: 'View case study →',
      peekCollection: 'View collection →',
      /** `${title}` is substituted at the call site. */
      ariaProject: (title: string) => `View ${title} project`,
      ariaCollection: (title: string, count: number) => `View ${title} — ${count} projects`,
      badge: (count: number) => `Collection · ${count} projects`,
    },

    home: {
      title: 'Sam Lepley — SL3D | 3D Visualisation & CAD',
      description:
        'Sam Lepley (SL3D) — 3D visualisation, photorealistic rendering, CAD floor plans and product animation from the south of the Netherlands. Clarity you can build from.',
      ariaIntro: 'Introduction',
      kicker: 'Sam Lepley — CAD Specialist',
      tagline: 'Clarity you can build from.',
      heroSub:
        'Photorealistic 3D visualisation and 2D CAD drawings for exterior and interior living, architectural projects and product development — from technical drawing to webshop-ready content.',
      selectedWorkLink: 'Selected work ↓',
      ariaShowreel: 'Showreel: garden animations, technical drawings and renders',
      showreel: 'Showreel',
      showreelMeta: 'Animations · drawings · renders',

      showcaseHeading: 'Measured, modelled, marketable',
      showcaseLede:
        'A cross-section of the work — drawings measured for approval, a 3D model built for future reference, and the renders and content that make it sellable.',

      ariaPair: 'One model, two deliverables',
      seamPair: 'one model<br />two deliverables',
      seamMotion: 'giving life to the product<br />through basic animation',

      capApple: '5 Apple Road',
      capLife: 'Giving the product life',
      capAtmosphere: 'Adapting products to different atmospheric environments',
      capAiEnhance: 'AI enhancements',
      capAiUpgrade: 'AI upgrades for past projects',

      disciplines: {
        drawing: 'Drawing',
        render: 'Render',
        animation: 'Animation',
        aiRegrade: 'AI regrade',
        aiUpgrade: 'AI upgrade',
      },

      tiles: {
        sheet: {
          title: 'Technical drawing sheet',
          alt: 'Ground floor plan, 3D study and stair section on a technical sheet for 5 Apple Road',
          note: 'Ground floor plan, a 3D study and a stair section on one sheet — accurate technical drawings a contractor can build from.',
        },
        street: {
          title: 'Photoreal street view',
          alt: 'Photorealistic street-view render of the same 5 Apple Road building',
          note: 'The same model rendered as a photorealistic street view, adapted for a typical European setting.',
        },
        veranda: {
          title: 'Lakeside veranda, golden hour',
          alt: 'Golden-hour render of a wooden veranda beside a pond with a swan',
          note: 'A webshop product staged in an evening garden scene by the water — a marketing-ready shot without the photography budget behind it.',
        },
        verandaMotion: {
          title: 'Lakeside veranda — reveal',
          note: 'The same scene, now in motion — a slow zoom onto the product through the evening rays of light.',
        },
        norway: {
          title: 'Norwegian terrace at night',
          alt: 'Night render of an aluminium pergola with LED lighting on a timber deck, fjord and mountains behind',
          note: 'An imported aluminium pergola, with the content adapted for the Norwegian market.',
        },
        pergola: {
          title: 'Pergola courtyard, overcast',
          alt: 'AI-regraded render of a timber pergola with a lounge set against a brick wall in a courtyard garden',
          note: "A webshop pergola render taken through the studio's AI regrade — CGI daylight traded for soft overcast light and weathered timber.",
        },
        bedroom: {
          title: 'Bedroom, refreshed with AI',
          alt: 'AI-upgraded render of a bedroom with a recessed LED ceiling cove and open wardrobe',
          note: 'The same old work, pushed to a modern standard through AI, without starting over.',
        },
      },

      workHeading: 'Selected work',

      ariaReference: 'Reference',
      pullQuote:
        '“Bringing new services to the company such as <em>2D and 3D CAD drawings and designs</em>, which have improved communication and understanding of certain contracts tremendously.”',
      pullQuoteCite: 'Employer’s reference — Fixed Cost Property Maintenance, Johannesburg',
      allReferences: 'All references →',

      processHeading: 'How I work',
      steps: [
        {
          title: 'Measured',
          text: 'It starts with a brief. I visit the site and take the measurements myself, or work from drawings supplied by the client, supplier, architect or interior designer — whatever gets the dimensions right.',
        },
        {
          title: 'Modelled',
          text: 'I build everything myself — the 3D models, the 2D plans, all the geometry a project needs, drawn accurately and ready to generate content from.',
        },
        {
          title: 'Marketable',
          text: 'Renders and animation finished to a high photorealistic standard, ready for online sales, showroom displays and marketing.',
        },
      ],

      ariaAbout: 'About Sam Lepley',
      aboutKicker: 'About',
      aboutQuote:
        'From construction management and design in South Africa to CAD mastery in the Netherlands. A leap most people wouldn’t take. <em>He who dares, wins.</em>',
      aboutLink: 'Read the full story →',
      portraitAlt: 'Portrait of Sam Lepley',
    },

    about: {
      title: 'About — Sam Lepley | SL3D',
      description:
        'About Sam Lepley — from construction management and design in South Africa to CAD mastery in the Netherlands.',
      kicker: 'About',
      heading: 'He who dares, wins.',
      portraitCaption: 'Sam Lepley — South of the Netherlands',
      prose: [
        'I’ve been drawn to design for as long as I can remember — first with LEGO, and later through building real projects as a <strong>construction company manager</strong>.',
        'In South Africa, I realised we were spending unnecessary time and money outsourcing floor plans. I was the middleman, coordinating architects for drawings I knew I could learn to produce myself. So I did — bringing CAD drawings in-house, reducing costs for clients, and improving our tender success rate.',
        'That’s when I caught the <strong>“CAD bug”</strong>. What started as a practical solution became a passion — because CAD sits perfectly at the crossroads of two things I love: technology and understanding how things are built.',
        'So I bet on it. I sold everything I had, moved to Europe and enrolled in a hospitality design school in Switzerland — committing fully to the work I wanted to master.',
        'It paid off. Today I live in the south of the Netherlands with more than ten years of experience behind me — from construction and property projects in Johannesburg to product design and 3D visualisation in the Netherlands — a career, and a life, that feels genuinely mine.',
      ],
      skillsKicker: 'My skills',
      skills: [
        {
          title: '3D Rendering',
          text: 'High-quality, photorealistic 3D renders as well as 360° panoramic views, created with various 3D modelling software and render engines.',
        },
        {
          title: '2D / 3D Floor Plans',
          text: 'Simple and clear bird’s-eye-view floor plans, furniture layouts and space planning, as well as technical drawings and elevations.',
        },
        {
          title: 'Product Animations',
          text: 'From a virtual 3D product to motion — turntables, walkthroughs, assembly sequences and product reveals.',
        },
      ],
      referencesKicker: 'References',
      ariaReferences: 'References',
      testimonials: [
        {
          quote:
            'He seized the tasks that were put before him … bringing new services to the company such as <em>2D and 3D CAD drawings and designs</em>, which have improved communication and understanding of certain contracts tremendously. … I believe he would be an asset to any organisation who employs him.',
          cite: 'Employer’s reference — Fixed Cost Property Maintenance (Pty) Ltd, Johannesburg',
        },
        {
          quote:
            'I was simply blown away by the workload that Mr Lepley was able to handle yet remaining perfectly pleasant. … We were <em>kept well informed throughout and felt extremely valued</em>. … I really struggle to think of when I’ve enjoyed such a fine example of excellence.',
          cite: 'Corporate guest, in a letter to the General Manager — Sheraton Heathrow, London',
        },
      ],
    },

    contact: {
      title: 'Contact — Sam Lepley | SL3D',
      description:
        'Get in touch with Sam Lepley (SL3D) for 3D visualisation, CAD floor plans and product animation.',
      kicker: 'Contact',
      headingHtml: 'Tell me what you’re <em>building</em>.',
      intro: 'Send a message or email directly — I usually reply within one working day.',
      emailBtn: 'Email →',
      linkedinAria: 'Sam Lepley on LinkedIn',
      based: 'Based in the south of the Netherlands — working remotely across Europe.',
      formSubject: 'New enquiry via sl3d portfolio (EN)',
      labelName: 'Name',
      labelEmail: 'Email',
      labelProject: 'Project',
      submit: 'Send message →',
    },

    hub: {
      ariaFacets: 'What this collection covers',
      ariaPipeline: 'Production pipeline',
      ariaBack: 'Back to work',
      backLabel: '← All work',
      backName: 'Selected work',
      ariaProjects: (title: string) => `${title} projects`,
      aiStageNotes: [
        'What the image has to say, and for whom.',
        'Every scene starts from geometry built to real product dimensions.',
        'Light, atmosphere and grade are pushed in short, directed passes.',
        'Most iterations are discarded. The keepers are corrected by hand.',
        'The result is checked against the source model before it ships.',
      ],
    },

    project: {
      briefLabel: 'Brief',
      approachLabel: 'Approach',
      drawn: 'Drawn',
      rendered: 'Rendered',
      still: 'Still',
      motion: 'Motion',
      prev: '← Previous',
      next: 'Next →',
      ariaCase: 'Case study',
      ariaBeforeAfter: 'Before and after comparison',
      ariaDrawingSet: 'Drawing set',
      ariaStillMotion: 'Still and the clip generated from it',
      ariaNav: 'Project navigation',
      ariaShowreel: (title: string) => `${title} showreel`,
      ariaSheets: (title: string) => `${title} drawing set`,
      ariaGallery: (title: string) => `${title} gallery`,
      ariaVideos: (title: string) => `${title} videos`,
      altGallery: (title: string, i: number) => `${title} visualisation ${i}`,
      altSheet: (title: string, i: number) => `${title} drawing ${i}`,
      altSourceStill: (title: string) => `${title} — the source still`,
      altMotionClip: (title: string) => `${title} — the clip generated from the still`,
      titleSuffix: '— Sam Lepley | SL3D',
    },

    scrollScrub: {
      kicker: 'Assembly, step by step',
    },

    notFound: {
      title: 'Page not found — Sam Lepley | SL3D',
      description: 'This page doesn’t exist — the work does. Back to SL3D.',
      kicker: '404',
      heading: 'Nothing drawn here.',
      lede: 'This page doesn’t exist — or it moved. The work is still where it should be.',
      ariaLinks: 'Recovery links',
      linkWork: 'Selected work →',
      linkAbout: 'About →',
      linkContact: 'Contact →',
      // Written in the OTHER language on purpose: GitHub Pages serves this one
      // 404 for every unknown path, including Dutch ones, so the way out has
      // to be readable by the reader who is lost.
      crossLangHtml: 'Liever Nederlands? Ga naar de <a href="/nl">Nederlandse site</a>.',
    },
  },

  nl: {
    nav: {
      work: 'Werk',
      about: 'Over',
      contact: 'Contact',
      ariaMain: 'Hoofdnavigatie',
      ariaLanguage: 'Taal',
      switchTo: 'View this page in English',
    },

    langHint: {
      aria: 'Language choice',
      text: 'This site is also available in English.',
      link: 'Go to the English site →',
      dismiss: 'Dismiss',
    },

    footer: {
      kicker: 'Neem contact op',
      headingLead: 'Heb je een project dat helderheid nodig heeft?',
      headingLink: 'Laten we praten.',
      availability:
        'Beschikbaar voor freelanceopdrachten en vaste functies — Nederland / remote.',
      locality: 'Zuid-Nederland',
      portfolioPdf: 'Portfolio (pdf)',
    },

    marquee: {
      kicker: 'Gereedschap van het vak',
      aria: 'Software waarmee ik werk',
    },

    numbers: {
      aria: 'Cijfers van de studio',
      yearsExperience: 'jaar ervaring',
      industries: 'branches',
      toolsInUse: 'tools in dagelijks gebruik',
    },

    card: {
      peekProject: 'Bekijk case study →',
      peekCollection: 'Bekijk collectie →',
      ariaProject: (title: string) => `Bekijk project ${title}`,
      ariaCollection: (title: string, count: number) => `Bekijk ${title} — ${count} projecten`,
      badge: (count: number) => `Collectie · ${count} projecten`,
    },

    home: {
      title: 'Sam Lepley — SL3D | 3D-visualisatie & CAD',
      description:
        'Sam Lepley (SL3D) — 3D-visualisatie, fotorealistisch renderen, CAD-plattegronden en productanimatie vanuit Zuid-Nederland. Helderheid waarop je kunt bouwen.',
      ariaIntro: 'Introductie',
      kicker: 'Sam Lepley — CAD-specialist',
      tagline: 'Helderheid waarop je kunt bouwen.',
      heroSub:
        'Fotorealistische 3D-visualisatie en 2D CAD-tekeningen voor buiten- en binnenleven, architectuurprojecten en productontwikkeling — van technische tekening tot webshopklare content.',
      selectedWorkLink: 'Geselecteerd werk ↓',
      ariaShowreel: 'Showreel: tuinanimaties, technische tekeningen en renders',
      showreel: 'Showreel',
      showreelMeta: 'Animaties · tekeningen · renders',

      showcaseHeading: 'Ingemeten, gemodelleerd, verkoopbaar',
      showcaseLede:
        'Een dwarsdoorsnede van het werk — tekeningen ingemeten voor goedkeuring, een 3D-model gebouwd voor toekomstig gebruik, en de renders en content die het verkoopbaar maken.',

      ariaPair: 'Eén model, twee eindproducten',
      seamPair: 'één model<br />twee eindproducten',
      seamMotion: 'het product tot leven brengen<br />met eenvoudige animatie',

      capApple: '5 Apple Road',
      capLife: 'Het product tot leven brengen',
      capAtmosphere: 'Producten aanpassen aan verschillende sferen en omgevingen',
      capAiEnhance: 'AI-verbeteringen',
      capAiUpgrade: 'AI-upgrades voor eerder werk',

      disciplines: {
        drawing: 'Tekening',
        render: 'Render',
        animation: 'Animatie',
        aiRegrade: 'AI-regrade',
        aiUpgrade: 'AI-upgrade',
      },

      tiles: {
        sheet: {
          title: 'Technisch tekenblad',
          alt: 'Begane-grondplattegrond, 3D-studie en trapdoorsnede op een technisch blad voor 5 Apple Road',
          note: 'Begane-grondplattegrond, een 3D-studie en een trapdoorsnede op één blad — nauwkeurige technische tekeningen waarmee een aannemer kan bouwen.',
        },
        street: {
          title: 'Fotorealistisch straatbeeld',
          alt: 'Fotorealistische straatbeeldrender van hetzelfde gebouw aan 5 Apple Road',
          note: 'Hetzelfde model gerenderd als fotorealistisch straatbeeld, aangepast aan een typisch Europese omgeving.',
        },
        veranda: {
          title: 'Veranda aan het water, gouden uur',
          alt: 'Render bij gouden uur van een houten veranda aan een vijver met een zwaan',
          note: 'Een webshopproduct geënsceneerd in een avondlijke tuinscène aan het water — een marketingklare opname zonder het fotografiebudget erachter.',
        },
        verandaMotion: {
          title: 'Veranda aan het water — reveal',
          note: 'Dezelfde scène, nu in beweging — een langzame zoom naar het product door de avondzon.',
        },
        norway: {
          title: 'Noors terras bij nacht',
          alt: 'Nachtrender van een aluminium pergola met ledverlichting op een houten terras, met fjord en bergen erachter',
          note: 'Een geïmporteerde aluminium pergola, met de content aangepast aan de Noorse markt.',
        },
        pergola: {
          title: 'Pergola op een binnenplaats, bewolkt',
          alt: 'Met AI geregradeerde render van een houten pergola met loungeset tegen een bakstenen muur in een binnentuin',
          note: 'Een webshop-pergolarender door de AI-regrade van de studio — CGI-daglicht ingeruild voor zacht bewolkt licht en verweerd hout.',
        },
        bedroom: {
          title: 'Slaapkamer, opgefrist met AI',
          alt: 'Met AI opgewaardeerde render van een slaapkamer met een verlaagde ledkoof en open kledingkast',
          note: 'Hetzelfde oude werk, met AI naar een moderne standaard getild, zonder opnieuw te beginnen.',
        },
      },

      workHeading: 'Geselecteerd werk',

      ariaReference: 'Referentie',
      pullQuote:
        '“Hij bracht nieuwe diensten naar het bedrijf, zoals <em>2D- en 3D-CAD-tekeningen en -ontwerpen</em>, die de communicatie over en het begrip van bepaalde contracten enorm hebben verbeterd.”',
      pullQuoteCite:
        'Referentie van werkgever — Fixed Cost Property Maintenance, Johannesburg (vertaald uit het Engels)',
      allReferences: 'Alle referenties →',

      processHeading: 'Hoe ik werk',
      steps: [
        {
          title: 'Ingemeten',
          text: 'Het begint met een briefing. Ik kom zelf ter plaatse en meet in, of werk vanuit tekeningen die de klant, leverancier, architect of interieurontwerper aanlevert — wat de maten maar kloppend maakt.',
        },
        {
          title: 'Gemodelleerd',
          text: 'Ik bouw alles zelf — de 3D-modellen, de 2D-plattegronden, alle geometrie die een project nodig heeft, nauwkeurig getekend en klaar om er content uit te genereren.',
        },
        {
          title: 'Verkoopbaar',
          text: 'Renders en animaties afgewerkt op een hoog fotorealistisch niveau, klaar voor online verkoop, showroompresentaties en marketing.',
        },
      ],

      ariaAbout: 'Over Sam Lepley',
      aboutKicker: 'Over',
      aboutQuote:
        'Van bouwmanagement en ontwerp in Zuid-Afrika tot CAD-vakmanschap in Nederland. Een sprong die de meeste mensen niet zouden wagen. <em>Wie durft, wint.</em>',
      aboutLink: 'Lees het hele verhaal →',
      portraitAlt: 'Portret van Sam Lepley',
    },

    about: {
      title: 'Over — Sam Lepley | SL3D',
      description:
        'Over Sam Lepley — van bouwmanagement en ontwerp in Zuid-Afrika tot CAD-vakmanschap in Nederland.',
      kicker: 'Over',
      heading: 'Wie durft, wint.',
      portraitCaption: 'Sam Lepley — Zuid-Nederland',
      prose: [
        'Ontwerpen trekt me al zolang ik me kan herinneren — eerst met LEGO, later door het bouwen van echte projecten als <strong>manager van een bouwbedrijf</strong>.',
        'In Zuid-Afrika merkte ik dat we onnodig veel tijd en geld kwijt waren aan het uitbesteden van plattegronden. Ik was de tussenpersoon die architecten aanstuurde voor tekeningen waarvan ik wist dat ik ze zelf kon leren maken. Dus deed ik dat — ik haalde het CAD-tekenwerk in huis, verlaagde de kosten voor klanten en verhoogde onze slagingskans bij aanbestedingen.',
        'Toen kreeg ik de <strong>“CAD-bug”</strong> te pakken. Wat begon als een praktische oplossing werd een passie — want CAD ligt precies op het snijvlak van twee dingen waar ik van hou: technologie en begrijpen hoe dingen gebouwd worden.',
        'Dus zette ik erop in. Ik verkocht alles wat ik had, verhuisde naar Europa en schreef me in bij een hospitality-designopleiding in Zwitserland — volledig toegewijd aan het vak dat ik wilde beheersen.',
        'Het heeft zich uitbetaald. Vandaag woon ik in het zuiden van Nederland met ruim tien jaar ervaring achter me — van bouw- en vastgoedprojecten in Johannesburg tot productontwerp en 3D-visualisatie in Nederland — een carrière, en een leven, die echt van mij voelen.',
      ],
      skillsKicker: 'Mijn vaardigheden',
      skills: [
        {
          title: '3D-rendering',
          text: 'Hoogwaardige, fotorealistische 3D-renders en 360°-panorama’s, gemaakt met uiteenlopende 3D-modelleersoftware en renderengines.',
        },
        {
          title: '2D / 3D plattegronden',
          text: 'Heldere plattegronden in vogelvlucht, meubelindelingen en ruimte-indeling, plus technische tekeningen en aanzichten.',
        },
        {
          title: 'Productanimaties',
          text: 'Van een virtueel 3D-product naar beweging — turntables, walkthroughs, montagevolgordes en productreveals.',
        },
      ],
      referencesKicker: 'Referenties',
      ariaReferences: 'Referenties',
      testimonials: [
        {
          quote:
            'Hij pakte elke taak aan die op zijn pad kwam … en bracht nieuwe diensten naar het bedrijf, zoals <em>2D- en 3D-CAD-tekeningen en -ontwerpen</em>, die de communicatie over en het begrip van bepaalde contracten enorm hebben verbeterd. … Ik denk dat hij een aanwinst zou zijn voor elke organisatie die hem in dienst neemt.',
          cite: 'Referentie van werkgever — Fixed Cost Property Maintenance (Pty) Ltd, Johannesburg (vertaald uit het Engels)',
        },
        {
          quote:
            'Ik was simpelweg overdonderd door de hoeveelheid werk die de heer Lepley aankon, terwijl hij volstrekt aangenaam bleef. … We werden gedurende het hele traject <em>goed geïnformeerd en voelden ons enorm gewaardeerd</em>. … Ik kan me nauwelijks herinneren wanneer ik zo’n mooi voorbeeld van uitmuntendheid heb meegemaakt.',
          cite: 'Zakelijke gast, in een brief aan de General Manager — Sheraton Heathrow, Londen (vertaald uit het Engels)',
        },
      ],
    },

    contact: {
      title: 'Contact — Sam Lepley | SL3D',
      description:
        'Neem contact op met Sam Lepley (SL3D) voor 3D-visualisatie, CAD-plattegronden en productanimatie.',
      kicker: 'Contact',
      headingHtml: 'Vertel me wat je <em>bouwt</em>.',
      intro: 'Stuur een bericht of mail direct — ik reageer meestal binnen één werkdag.',
      emailBtn: 'E-mail →',
      linkedinAria: 'Sam Lepley op LinkedIn',
      based: 'Gevestigd in het zuiden van Nederland — werkt op afstand door heel Europa.',
      formSubject: 'Nieuwe aanvraag via sl3d portfolio (NL)',
      labelName: 'Naam',
      labelEmail: 'E-mail',
      labelProject: 'Project',
      submit: 'Bericht versturen →',
    },

    hub: {
      ariaFacets: 'Wat deze collectie omvat',
      ariaPipeline: 'Productiepijplijn',
      ariaBack: 'Terug naar werk',
      backLabel: '← Al het werk',
      backName: 'Geselecteerd werk',
      ariaProjects: (title: string) => `Projecten in ${title}`,
      aiStageNotes: [
        'Wat het beeld moet vertellen, en voor wie.',
        'Elke scène begint met geometrie gebouwd op echte productafmetingen.',
        'Licht, sfeer en grade worden in korte, geregisseerde passes opgevoerd.',
        'De meeste iteraties gaan de prullenbak in. Wat blijft, wordt met de hand gecorrigeerd.',
        'Het resultaat wordt tegen het bronmodel gecontroleerd voordat het de deur uit gaat.',
      ],
    },

    project: {
      briefLabel: 'Opdracht',
      approachLabel: 'Aanpak',
      drawn: 'Getekend',
      rendered: 'Gerenderd',
      still: 'Still',
      motion: 'Beweging',
      prev: '← Vorige',
      next: 'Volgende →',
      ariaCase: 'Case study',
      ariaBeforeAfter: 'Voor-en-na-vergelijking',
      ariaDrawingSet: 'Tekeningenset',
      ariaStillMotion: 'Still en de clip die eruit is gegenereerd',
      ariaNav: 'Projectnavigatie',
      ariaShowreel: (title: string) => `Showreel van ${title}`,
      ariaSheets: (title: string) => `Tekeningenset van ${title}`,
      ariaGallery: (title: string) => `Galerij van ${title}`,
      ariaVideos: (title: string) => `Video’s van ${title}`,
      altGallery: (title: string, i: number) => `${title} visualisatie ${i}`,
      altSheet: (title: string, i: number) => `${title} tekening ${i}`,
      altSourceStill: (title: string) => `${title} — de bronstill`,
      altMotionClip: (title: string) => `${title} — de clip gegenereerd uit de still`,
      titleSuffix: '— Sam Lepley | SL3D',
    },

    scrollScrub: {
      kicker: 'Montage, stap voor stap',
    },

    notFound: {
      title: 'Pagina niet gevonden — Sam Lepley | SL3D',
      description: 'Deze pagina bestaat niet — het werk wel. Terug naar SL3D.',
      kicker: '404',
      heading: 'Hier is niets getekend.',
      lede: 'Deze pagina bestaat niet — of is verplaatst. Het werk staat nog gewoon waar het hoort.',
      ariaLinks: 'Herstelkoppelingen',
      linkWork: 'Geselecteerd werk →',
      linkAbout: 'Over →',
      linkContact: 'Contact →',
      crossLangHtml: 'Prefer English? Go to the <a href="/">English site</a>.',
    },
  },
} as const;

export type UI = (typeof ui)['en'];

export function t(lang: Lang): UI {
  return ui[lang] as UI;
}
