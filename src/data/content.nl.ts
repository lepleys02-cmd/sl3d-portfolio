/**
 * Dutch copy for `projects.ts`, keyed by slug.
 *
 * English in `projects.ts` stays the source of truth — this file only carries
 * overrides, so adding a project never silently half-translates: anything with
 * no entry here falls back to English and is visibly untranslated rather than
 * missing.
 *
 * Structural fields (slug, year, image filenames, video paths, collection
 * membership, `documentation`) are intentionally absent — they are not copy.
 * Array overrides are matched BY INDEX against the English arrays, so keep the
 * order identical when either side changes.
 */

export interface ProjectCopy {
  title?: string;
  discipline?: string;
  description?: string;
  brief?: string;
  approach?: string;
  facts?: { k: string; v: string }[];
  process?: { caption?: string; beforeLabel?: string; afterLabel?: string };
  pairs?: { caption?: string; beforeLabel?: string; afterLabel?: string }[];
  stillToMotion?: { caption?: string; stillLabel?: string; motionLabel?: string };
  sheets?: { label?: string; caption?: string }[];
  /** Scroll-feature chapter labels, in order. */
  chapters?: string[];
}

export interface CollectionCopy {
  title?: string;
  kicker?: string;
  discipline?: string;
  description?: string;
  intro?: string;
  facets?: string[];
}

export const projectsNl: Record<string, ProjectCopy> = {
  nubuiten: {
    discipline: 'Product- en omgevingsvisualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'Vaste 3D-artist — beheerde de renderfarm, stuurde een partner-CG-studio in Oekraïne aan en hielp de 3D-productgenerator van de webshop bouwen',
      },
      {
        k: 'Opgeleverd',
        v: 'Productrenders met studio- en omgevingsachtergronden · animaties · 2D- en 3D-technische tekeningen en documentatie',
      },
    ],
    description:
      'Fotorealistische productrenders en omgevingsscènes voor buitenleven — in eigen huis gemaakt bij Nubuiten.',
    brief:
      'Nubuiten is een webshop voor buitenleven die veranda’s, tuinkamers en schuttingen verkoopt, binnen een assortiment van ruwweg 10.000 producten. Renders maken de voorverkoop mogelijk — een product kan verkocht worden voordat het ooit gebouwd is, en er komt veel meer van het assortiment online dan fotografie zou aankunnen.',
    approach:
      'Ik moest elk product op exacte maat modelleren en het vervolgens in een passende omgeving plaatsen — een tuinscène of een studioachtergrond. Uit diezelfde modellen kwam ook de technische documentatie: montagehandleidingen, onderdelenlijsten en alles wat het product verder nodig had.',
  },

  'outdoor-life-group': {
    discipline: 'Productvisualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'Vaste 3D-artist voor alle merken van de groep — Woodvision, Hillhout, Royal Well, Lasita Maja en Weka — nam het teken- en contentwerk over nadat de vorige tekenaar met pensioen ging en beheerde een gedeelde renderbibliotheek voor consistentie in de hele catalogus',
      },
      {
        k: 'Opgeleverd',
        v: 'Catalogusrenders in studio- en tuinsettings · animaties · 2D- en 3D-technische tekeningen, onderdelenlijsten en handleidingen · ondersteuning bij de 3D-configurator',
      },
    ],
    description: 'Productvisualisatie voor Outdoor Life Group (OLG) — in eigen huis gemaakt.',
    brief:
      'Outdoor Life Group is het hoofdbedrijf van de groep en levert producten voor buitenleven aan grote retailers zoals Intergamma, Karwei en Hornbach. Hun tekenaar was met pensioen gegaan, de contentproductie liep achter, en een catalogus van duizenden producten moest worden bijgewerkt — technische tekeningen, onderdelenlijsten, handleidingen en renders.',
    approach:
      'Ik kwam over van Nubuiten om het werk over te nemen. Elk product had zijn eigen specifieke eisen — van technische tekeningen, onderdelenlijsten en handleidingen tot 2D-tekeningen en 3D-renders in tuin- en studio-omgevingen. In mijn tijd daar heb ik bijna 600 renders gemaakt, naast het werk aan de 3D-configurator en het aanpassen van de AI-structuur van het bedrijf om te verkennen waar die verder ingezet kon worden.',
    stillToMotion: {
      stillLabel: 'Render',
      motionLabel: 'Beweging',
      caption:
        'Kastanjehouten schapenhek voor Outdoor Life Group — de afgewerkte productrender (links) en een korte clip die uit dat ene frame is gegenereerd (rechts): hetzelfde hek, dezelfde palen, dezelfde weide, met een stilstaande camera waarbij alleen de wind en de schapen erachter bewegen.',
    },
  },

  archviz: {
    discipline: 'Architectuurvisualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'Soloproject — de locatie ingemeten, het gebouw gemodelleerd en de volledige tekeningenset plus fotorealistische renders geproduceerd',
      },
      {
        k: 'Opgeleverd',
        v: 'Inmeting · plattegronden, aanzichten en doorsneden · fotorealistische straatbeeldrender',
      },
    ],
    description:
      'Architectuurvisualisatie en technische documentatie — van ingemeten tekeningensets tot het uiteindelijke fotorealistische beeld.',
    brief:
      'Een terugkerende klant in Johannesburg had een bestaand pand gekocht om als showroom voor zijn producten te gebruiken. Het gebouw stond er al, dus er hoefde niets ontworpen te worden — wat ontbrak was een nauwkeurige set tekeningen: gemaatvoerde plannen waarmee de aannemers konden werken, en een blijvende vastlegging van het gebouw voor later.',
    approach:
      'Eén model stuurt alles aan. Ik heb het gebouw ingemeten zoals het er stond, het vanuit die opmeting gemodelleerd en de volledige tekeningenset gemaakt — plattegronden, aanzichten en doorsneden. Het fotorealistische straatbeeld komt uit diezelfde geometrie, geplaatst in een Europese straat in plaats van de oorspronkelijke Johannesburgse.',
    process: {
      caption:
        '5 Apple Road — één model, twee eindproducten: het technische aanzichtblad (links) en het fotorealistische straatbeeld (rechts).',
    },
  },

  'product-animations': {
    title: 'Productanimaties',
    discipline: '3D-productanimatie',
    facts: [
      {
        k: 'Rol',
        v: 'Elk product gemodelleerd, de montagevolgorde shot voor shot uitgedacht, en daarna de uiteindelijke films geanimeerd, gemonteerd en gegradeerd',
      },
      {
        k: 'Opgeleverd',
        v: 'Montagefilms met close-ups van de bevestigingen · productturntables · lifestyle-reveals · videohandleidingen via QR-code, meegeleverd met het product',
      },
    ],
    description:
      'Van productmodel naar beweging — turntables, montagefilms, en een bouwhandleiding die klanten kunnen kijken in plaats van lezen.',
    brief:
      'De houtbedrijven waarvoor ik werkte verkopen veranda’s, carports en tuingebouwen — producten die vrijwel niemand in de markt in beweging liet zien; de meeste concurrenten hadden niet eens goede stills. Zij wilden marketingcontent die hen onderscheidde. En hun klanten liepen bij elke levering tegen dezelfde drempel aan: een dik gedrukt boekwerk voor een constructie waar twee mensen een weekend aan bouwen.',
    approach:
      'Elke film begint vanuit hetzelfde nauwkeurige productmodel als de stills. Ik heb elke montagevolgorde uitgedacht zoals een monteur de constructie daadwerkelijk bouwt — paal voor paal, balk voor balk — met close-up cutaways van de bevestigingen precies op de stappen waar het misgaat. De montage loopt op strak wit zodat niets afleidt van de bouwvolgorde; lifestyle-reveals zetten het eindproduct in volledige scènes met echt licht. De montagefilm verving vervolgens het grootste deel van de gedrukte handleiding: producten worden nu geleverd met een dun boekje en een QR-code naar de video. Klanten kijken de bouw in plaats van hem te ontcijferen, en het bedrijf hoefde geen zware handleidingen meer te drukken en versturen. Niemand hoeft te gokken hoe het in elkaar zit.',
  },

  'ai-revival': {
    discipline: 'AI-ondersteunde visualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'Op eigen initiatief, in eigen tijd en op eigen kosten — elke regrade geregisseerd en elk resultaat gecontroleerd tegen het originele productmodel',
      },
      {
        k: 'Opgeleverd',
        v: 'Voor-en-na-beeldsets · fotorealistische regrades met vernieuwd licht en sfeer · een werkbare regel voor waar AI thuishoort',
      },
    ],
    description:
      'Een experiment op eigen kosten met mijn eigen archief: afgeronde CGI-renders verder gebracht — vlak daglicht geregradeerd naar fotografisch gouden uur, strakke productscènes getild naar geloofwaardige plekken.',
    brief:
      'Niemand heeft hierom gevraagd. Ik wilde weten wat de nieuwe AI-modellen echt met een afgeronde render kunnen doen, dus deed ik het experiment zelf — eigen tijd, eigen budget, mijn eigen archief als testmateriaal. Een render die twee jaar geleden state of the art was, kan gedateerd ogen naast wat nu kan, en archiefwerk is het ideale testmateriaal: de geometrie, compositie en productnauwkeurigheid kloppen al, dus het enige dat nog verandert is het beeld.',
    approach:
      'Elke render gaat onder strakke art direction door een AI-regrade en gaat daarna direct terug naast de bron — verhoudingen, materialen en productdetail moeten ongeschonden blijven. De resultaten zijn indrukwekkend, en ze komen met een eerlijke grens: de winst in realisme is echt, de controle niet. Je kunt een AI-regrade regisseren, maar je houdt hem niet op de millimeter zoals je een model op de millimeter houdt. Daarom houd ik het hier — conceptwerk en postproductie — en alles waar een klant op moet bouwen blijft gemodelleerd.',
    pairs: [
      {
        beforeLabel: 'Originele render',
        afterLabel: 'AI-regrade',
        caption:
          'Tuinkamer Hardinxveld — de originele CGI-render (links) en de AI-ondersteunde regrade (rechts): dezelfde geometrie, hetzelfde product, fotografisch licht.',
      },
      {
        beforeLabel: 'Originele render',
        afterLabel: 'AI-regrade',
        caption:
          'Pergola Garden 40 — de originele webshoprender (links) en de AI-regrade (rechts): dezelfde pergola, dezelfde binnenplaats, maar de CGI-lucht, het frisse hout en de strakke bestrating maken plaats voor zacht bewolkt licht, verweerd hout en versleten klinkers.',
      },
    ],
  },

  'ai-motion': {
    discipline: 'AI-ondersteunde animatie',
    facts: [
      {
        k: 'Rol',
        v: 'De camerabeweging en sfeer vanuit elke afgeronde still geregisseerd, elke productafwijking afgekeurd en de uiteindelijke clips gemonteerd',
      },
      {
        k: 'Opgeleverd',
        v: 'Korte productfilms gemaakt uit afgeronde stills · gecontroleerde camerabeweging · sfeervolle beweging',
      },
    ],
    description:
      'Productstills en afgeronde scènes in beweging gebracht met AI — camerabewegingen, sfeer en productreveals gegenereerd uit één nauwkeurig frame.',
    brief:
      'Volledige 3D-animatie is de gouden standaard, maar niet elk product of elke campagne draagt de productietijd ervan. Als er al een nauwkeurige still bestaat, kan beweging nu vanuit dat frame beginnen in plaats van vanuit een lege tijdlijn.',
    approach:
      'Elke clip begint bij een afgeronde still. Camerabeweging en sfeer worden er in korte, geregisseerde passes overheen gegenereerd, en alles wat afwijkt van het echte product gaat eruit — het paar hieronder is er een dat het haalde: links de still, rechts de clip die eruit ontstond.',
    stillToMotion: {
      stillLabel: 'Still',
      motionLabel: 'Beweging',
      caption:
        'Kastanjehouten schapenhek — de afgewerkte still (links) en de clip die eruit is gegenereerd (rechts): hetzelfde hek, dezelfde palen, dezelfde weide, met een stilstaande camera waarbij alleen de wind en de schapen erachter bewegen.',
    },
  },

  'park24-bulkheads': {
    discipline: 'AI-ondersteunde interieurvisualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'De kamers op locatie ingemeten, voor elke ruimte een koof ontworpen en de detailset getekend die de offerte droeg — daarna elk detail opnieuw in 3D opgebouwd en de kamers geregisseerd rond hun licht',
      },
      {
        k: 'Opgeleverd',
        v: 'Inmeting en volledige koventekeningenset · offerte per ruimte, te controleren tegen de tekeningen · vier fotorealistische interieurs — keuken, eetkamer en twee slaapkamers',
      },
    ],
    description:
      'Een koofontwerp uit 2017 — ingemeten, getekend en per ruimte geoffreerd — teruggebracht als fotorealistische interieurs waarin de getekende details het licht maken.',
    brief:
      'De klant was eigenaar van het huis en wilde in elke ruimte een koof — schaduwvoegen met ledverlichting door het hele huis. Hij vroeg een offerte; ik ben naar de locatie gegaan, heb elke ruimte zelf ingemeten en voor elke ruimte een koof ontworpen. Op papier is een koof een reeks verlagingen en maten, maar in een afgewerkte ruimte is het vooral licht — waar de koof het plafond aanstraalt, waar de schaduwvoeg zijn lijn trekt.',
    process: {
      beforeLabel: 'Tekeningenset',
      caption:
        'Park 24 — het koofdetailblad uit 2017 waaruit de kamers zijn herbouwd: elke verlaging, schaduwvoeg en koof getekend en van maten voorzien.',
    },
    approach:
      'Ik heb de volledige detailset getekend zodat de klant niet blind hoefde te prijzen: elke verlaging, schaduwvoeg en koof van maten voorzien, en een offerte die hij regel voor regel tegen de tekeningen kon controleren. Het was specialistisch werk — het led-elektrawerk lag bij onze elektricien, de rest kon in eigen beheer worden gebouwd — en door de tekeningen keken klant en vakmensen naar hetzelfde plafond. Onlangs ben ik naar die set teruggekeerd en heb elk detail exact zoals getekend opnieuw in 3D opgebouwd, waarna elke ruimte is geënsceneerd rond wat de koof daar het beste doet — de koof boven het kookeiland, het zwevende kader in de eetkamer, en twee slaapkamers, elk met een eigen koofontwerp. De tekeningen beschreven dat licht al jaren; nu is het te zien.',
  },

  'loftus-box': {
    discipline: 'Interieurinmeting, documentatie & renovatie',
    facts: [
      {
        k: 'Rol',
        v: 'Het interieur van de skybox ingemeten en getekend voor een van de grootste klanten van het bureau, vooruitlopend op een volledige renovatie om de suite gereed te maken voor hun belangrijkste gasten',
      },
      {
        k: 'Opgeleverd',
        v: 'Complete tekeningenset die de skybox vastlegt voor toekomstig gebruik · volledige renovatie van de suite — algemeen onderhoud, opnieuw schilderen en vernissen',
      },
    ],
    description:
      'Een zakelijke skybox in Loftus Versfeld — ingemeten en getekend voor een van de grootste klanten van het bureau, vastgelegd als volledige tekeningenset en doorgevoerd tot een complete renovatie van de suite.',
    brief:
      'Dit project was persoonlijk — Loftus Versfeld was mijn oude thuisbasis uit mijn schoolrugbyjaren in Pretoria, en nu liep ik er binnen met meetapparatuur. De opdracht begon als een inspectie: loop de hospitality-box van Old Mutual door, documenteer elke beschadiging en kom terug met een volledige tekeningenset en een offerte voor het herstel. De box was er slecht aan toe — en een skybox staat of valt met hoe hij aanvoelt op wedstrijddag.',
    process: {
      beforeLabel: 'Inmeetblad',
      afterLabel: 'Interieurvisualisatie',
      caption:
        'Old Mutual Box — het A101-inmeetblad (links) en een visualisatie van het interieur die daaruit is gemaakt (rechts): hetzelfde detail ingemeten, getekend en van maten voorzien, daarna gemodelleerd en gepresenteerd.',
    },
    approach:
      'Ik heb de box ingemeten en vastgelegd op een A101-blad — plattegrond, zuidgevel en een deur- en raamlegenda — en het herstel daartegen geoffreerd. Daarna ging ik een stap verder dan de inspectie vroeg: naast de tekeningen heb ik de box gemodelleerd en gerenderd hoe de suite eruit kon zien zodra alles hersteld was — penanten in schoon metselwerk, eiken bladen boven witte shaker-kasten, een verlaagde koof met verzonken lijnverlichting boven de buffetzone. Die renders wonnen het contract. Vervolgens hebben we de renovatie uitgevoerd: een nieuw plafond, nieuw schilderwerk, het metselwerk gelakt en netjes afgewerkt, nieuwe vloerbedekking, elke beschadiging hersteld — van vloer tot plafond. Old Mutual zorgde zelf voor meubilair en styling; onze taak was een box terug te geven waarin ze hun belangrijkste gasten weer konden ontvangen.',
  },

  'schultz-mmuoe': {
    discipline: 'AI-ondersteunde interieurvisualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'De kantoren opgemeten, de renovatieplannen getekend en de interieurvisuals gemaakt waar onze eigen vaklieden en de klant allebei naar werkten',
      },
      {
        k: 'Opgeleverd',
        v: 'Renovatieplannen · interieurvisuals — bestuurskamer, directiekantoor en gang',
      },
    ],
    description:
      'Een kantooropfrissing uit 2017 voor een advocatenkantoor — uitgetekend en gevisualiseerd zodat de vaklieden precies wisten wat er moest gebeuren, en waar.',
    brief:
      'Schultz Mmuoe Inc is een advocatenkantoor waarvan de kantoren zo’n vijf jaar niet waren aangepakt. Wat ze in 2017 vroegen was eenvoudig: alles opnieuw schilderen, schades herstellen, nieuwe verlichting, en een algehele opfrissing zodat het er weer professioneel uitzag. Ze vroegen niet om tekeningen, plannen of visuals — alleen om het werk.',
    approach:
      'Ik heb het toch uitgetekend. De renovatie werd uitgevoerd door onze eigen vaklieden, en zo’n klus loopt alleen soepel als iedereen naar hetzelfde beeld werkt — dus maakte ik plannen en visuals samen: de plannen die zeiden wat er moest gebeuren en waar, de visuals die lieten zien hoe elke ruimte er na afloop uit moest zien. De vaklieden bouwden daarnaar in plaats van naar een mondelinge briefing, en het kantoor kon een ruimte goedkeuren voordat er een muur geschilderd was. De beelden hier zijn die oorspronkelijke plannen en visuals uit 2017, opgewaardeerd naar de huidige standaard.',
  },

  'sa-business-coach': {
    title: 'Zuid-Afrikaanse business coach',
    discipline: 'AI-ondersteunde interieurvisualisatie',
    facts: [
      {
        k: 'Rol',
        v: 'Het kantoor gemodelleerd en de schilderschema’s in eigen huis gevisualiseerd naast de indeling van de ontwerper — daarna het model in 2026 herbouwd als kaal casco en elke AI-pass tot een fotografische afwerking gebracht',
      },
      {
        k: 'Opgeleverd',
        v: 'Vier schilderschema-previews waaruit de klant koos vóór het schilderen · fotorealistische interieurs in alle vier de schema’s',
      },
    ],
    description:
      'Een kantoorrestauratie uit 2018 voor een business-coachingpraktijk — de schilderschema’s op de wanden gevisualiseerd voordat er een kwast werd opgepakt, in 2026 opnieuw tot leven gebracht in fotografische afwerking.',
    brief:
      'De business coach liet zijn kantoren restaureren en had al een indeling van een interieurontwerper. Wat de ontwerper niet had geleverd, was het schilderwerk: hoe de ruimtes gekleurd moesten worden, en hoe dat er op de wanden uit zou zien. Dat werd onze extra vraag — dus terwijl wij de indeling van de ontwerper bouwden, heb ik het kantoor gemodelleerd en de schilderschema’s in eigen huis gevisualiseerd: dezelfde ruimtes op vier manieren, rode V-chevrons en kleurvlakken op accentwanden boven één doorlopend donkergroen tapijt — rood voor groepsenergie in de trainingsruimtes, geelgroen voor focus in de kantoren. De klant kon voor elke optie gaan staan en kiezen voordat er ook maar één wand geschilderd was.',
    approach:
      'In 2026 heb ik het project teruggehaald om te laten zien wat zo’n archief kan dragen. Het model van 60 MB is teruggebracht tot een casco van 0,6 MB — wanden, vloeren, ramen, rode deuren en de betapijte trap — waarbij elk geschilderd vlak precies bleef waar de studie uit 2018 het neerzette. Elk camera-aanzicht is vervolgens via geregisseerde AI-passes tot fotografische afwerking gebracht: licht, materiaal en meubilair rond het casco toegevoegd, de chevrons, diagonalen en het tapijt steeds aan het model gehouden. Niet alleen plattegronden en aanzichten — ook kleurschema’s, paletten en moodboards, tot het punt waarop een klant de afgewerkte ruimte ziet.',
  },

  'bcd-travel': {
    discipline: 'Commerciële ruimte-indeling & CAD-documentatie',
    facts: [
      {
        k: 'Rol',
        v: 'De locatie ingemeten en de volledige documentatieset getekend — indelingsplannen, aanzichten, verlaagd-plafondplannen en staten, gecoördineerd voor uitvoering',
      },
      {
        k: 'Opgeleverd',
        v: 'Indelingsplannen · aanzichten · verlaagd-plafondplannen · deur- en raamstaten',
      },
    ],
    description:
      'Een volledige documentatieset voor de kantoorinrichting van de BCD Travel-campus in Johannesburg — ruimte-indeling, aanzichten, verlaagd-plafondplannen en staten, getekend om gebouwd te worden.',
    brief:
      'Een wereldwijd travel-managementbedrijf dat een kantoorverdieping in Johannesburg herinricht, heeft een gecoördineerde tekeningenset nodig: hoe de ruimte is ingedeeld en ingericht, hoe die wordt verlicht, en hoe elke deur en elk raam is gespecificeerd — genoeg om een aannemer te laten prijzen en bouwen zonder één telefoontje.',
    approach:
      'Kleurgecodeerde indelingsplannen en meubelplattegronden, vier ingemeten aanzichten en een verlaagd-plafondplan — allemaal gekoppeld aan deur- en raamstaten en ter plaatse geverifieerd tegen het gebouw.',
    sheets: [
      {
        label: 'A101 · Kantoorindeling',
        caption:
          'Elke ruimte getypeerd, kleurgecodeerd en geteld tegen een ruimtelegenda, met deur- en raamstaten teruggekoppeld aan de plattegrond.',
      },
      {
        label: 'A103 · Indelingsplan & meubelplattegrond',
        caption:
          'Afdelingen, looproutes en elke werkplek op schaal uitgezet over de H-vormige verdieping.',
      },
      {
        label: 'A104 · Verlaagd-plafondplan',
        caption:
          'Plafondraster — parabolische armaturen en downlights ingemeten over de plattegrond.',
      },
      {
        label: 'A102 · Aanzichten',
        caption:
          'Vier ingemeten aanzichten — oost, noord, zuid en west — met plafond- en vloerpeilen en genummerde stramienlijnen.',
      },
    ],
  },
};

export const collectionsNl: Record<string, CollectionCopy> = {
  ai: {
    title: 'AI-ondersteunde productie',
    kicker: 'Collectie',
    discipline: 'Scene revival · fotorealistische regrades · generatieve beweging',
    description:
      'Bestaande renders en productbeelden verder gebracht met AI — geregradeerd, opnieuw belicht en in beweging gezet, met elk resultaat gecontroleerd tegen het echte model.',
    intro:
      'Een productiepijplijn, geen shortcut. Afgerond CGI-werk uit het studioarchief wordt verder gebracht met AI — vlakke renders geregradeerd naar fotografisch licht, productstills geplaatst in levende scènes, en stilstaand beeld in beweging gezet. De gereedschappen veranderen, en de normen ook.',
    facets: [
      'Opdracht & art direction',
      'Nauwkeurig 3D-basismodel',
      'AI-iteratie & regrade',
      'Menselijke selectie & correctie',
      'Geverifieerde afwerking & oplevering',
    ],
  },

  architecture: {
    title: 'Interieurontwerp, architectuurvisualisatie & documentatie',
    kicker: 'Collectie',
    discipline: 'Ruimte-indeling · interieurontwerp · documentatie · visualisatie',
    description:
      'Gebouwen en interieurs van ingemeten indelingsplan en inrichtingsdetaillering, via een gecoördineerde tekeningenset, naar fotorealistisch beeld.',
    intro:
      'De gebouwen-en-interieurskant van de studio — commerciële en residentiële ruimte van inmeting, via de interieurinrichting en een gecoördineerde tekeningenset waarmee een aannemer kan bouwen, tot het fotorealistische beeld dat het verkoopt.',
    facets: [
      'Ruimte-indeling & inmeting',
      'Interieurontwerp & inrichtingsdetaillering',
      'Gecoördineerde CAD-documentatie',
      'Fotorealistische architectuur- en interieurvisualisatie',
    ],
  },
};
