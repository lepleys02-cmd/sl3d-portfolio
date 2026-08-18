import type { Lang } from '../i18n/config';

/**
 * General Terms & Conditions — the same text as business doc
 * `07-general-terms-conditions` (sl3d-business-docs). This page is the
 * canonical published copy (terhandstelling via art. 6:230c BW); the
 * downloadable PDFs in `public/` are built from the same source.
 *
 * `en` is the source of truth; `nl` must mirror its shape (same clause count,
 * same order). Strings are HTML fragments rendered with `set:html`.
 */

export interface TermsClause {
  heading: string;
  /** Bullet list rendered before the paragraphs (only used by Definitions). */
  bullets?: string[];
  paras: string[];
}

export interface TermsContent {
  /** Human-readable version date shown in the page header. */
  version: string;
  clauses: TermsClause[];
}

const en: TermsContent = {
  version: '18 August 2026',
  clauses: [
    {
      heading: 'Definitions',
      bullets: [
        '<strong>Contractor</strong> — SL3D, the eenmanszaak of Sam Lepley (KVK 42131264, BTW-id NL005520384B17).',
        '<strong>Client</strong> — the party commissioning services from the Contractor.',
        '<strong>Agreement</strong> — any quotation, order, service agreement or SOW accepted by both parties.',
        '<strong>Deliverables</strong> — the images, animations, 3D models or other output produced under the Agreement.',
        '<strong>Source files</strong> — editable working files (e.g. scene, project and model files) as distinct from rendered/exported Deliverables.',
        '<strong>AI-assisted Deliverables</strong> — Deliverables generated or substantially manipulated using generative AI tooling, identified as such in the Quotation or SOW, as distinct from <strong>CGI Deliverables</strong>, which are modelled and rendered by the Contractor.',
      ],
      paras: [],
    },
    {
      heading: 'Applicability',
      paras: [
        'These terms apply to every quotation, offer and agreement between the Contractor and the Client, and exclude any terms of the Client unless expressly accepted in writing by the Contractor. If any provision is void or annulled, the remaining provisions stay in force.',
        'The Contractor makes these terms available before or at the formation of the Agreement: they are published at <strong>sl3d.net/terms</strong>, referred to in every quotation, and sent free of charge on request. By accepting a quotation, or by instructing the Contractor to begin work, the Client accepts these terms.',
        'These terms are published in English and Dutch; the version in the language of the Agreement applies.',
        'These terms are directed at Clients acting in the course of a business or profession. Where the Client is a consumer, mandatory consumer law prevails over these terms to the extent they conflict, and — for agreements concluded at a distance — the Client’s statutory right of withdrawal ends when the Contractor, with the Client’s express consent, begins performance, and does not apply to Deliverables produced to the Client’s own specifications.',
      ],
    },
    {
      heading: 'Quotations and formation',
      paras: [
        'Quotations are valid for the period stated on them, or 14 days if none is stated, and are free of obligation. An Agreement is formed when the Client accepts a quotation in writing (including by email) or when the Contractor begins work at the Client’s request.',
      ],
    },
    {
      heading: 'Engaging third parties',
      paras: [
        'The Contractor may have the Agreement performed in whole or in part by third parties it engages, and remains the Client’s sole contracting party and point of contact. These terms may also be invoked by third parties the Contractor engages in the performance of the Agreement.',
      ],
    },
    {
      heading: 'Prices, deposit and additional work',
      paras: [
        'All prices are in euros and exclude BTW and third-party costs (e.g. stock assets, prints, travel) unless stated. The Contractor may require a deposit of up to 50% before starting.',
        'Work outside the agreed scope — including extra images, extra revision rounds, or changed source materials — is “additional work” and is charged at €65/hour (excl. BTW) or a separately agreed price, via a Change Order.',
      ],
    },
    {
      heading: 'Travel and site visits',
      paras: [
        'Site visits, on-site measuring and reference capture are charged as stated in the Quotation — normally as a half-day or full-day visit fee covering time door to door. Travel within 50 km of the Contractor’s base is included in that fee; beyond that, kilometres are charged for the round trip at the rate stated in the Quotation. Parking, tolls, public transport and any overnight stay are charged at cost where agreed in advance. BTW applies to on-charged travel at the rate of the main service.',
        'All travel and visit costs are set out in the Quotation <strong>before</strong> a visit is booked; the Contractor does not add travel costs afterwards. A booked visit cancelled less than 2 working days beforehand is charged at <strong>50%</strong> of the visit fee, plus any travel already incurred.',
      ],
    },
    {
      heading: 'Invoicing and payment',
      paras: [
        'Invoices are payable within <strong>14 days</strong> of the invoice date, without discount or set-off. The parties agree this term (the statutory fallback is 30 days, with a 60-day maximum for business clients).',
        'If the Client does not pay on time it is in default by operation of law, and owes the statutory commercial interest (wettelijke handelsrente, art. 6:119a BW) plus the extrajudicial collection costs (buitengerechtelijke incassokosten) set by the <em>Besluit vergoeding voor buitengerechtelijke incassokosten</em> — a statutory percentage of the sum due with a <strong>minimum of €40</strong>.',
        'Where the Client is a <strong>consumer</strong>, the Contractor will first send a 14-day notice (WIK-aanmaning) stating the collection-cost amount before charging those costs. For <strong>business</strong> clients the costs are due without such notice.',
        'The Contractor may suspend work and withhold Deliverables and licences while any invoice is overdue.',
      ],
    },
    {
      heading: 'Client cooperation',
      paras: [
        'The Client provides, in good time and free of charge, all materials, information, references and approvals the Contractor reasonably needs (e.g. CAD/drawings, dimensions, finishes, brand assets). The Client warrants it holds the rights to any materials it supplies and indemnifies the Contractor against third-party claims relating to them.',
      ],
    },
    {
      heading: 'Delivery, timelines and revisions',
      paras: [
        'Stated delivery dates are indicative and not fatal deadlines (fatale termijnen) unless expressly agreed in writing. The Contractor is not in default until given written notice and a reasonable period to perform.',
        'Each Deliverable includes 2 rounds of minor revisions. Approval of a Deliverable, or use of it, counts as acceptance. The Client is deemed to accept a Deliverable if it does not respond within 10 working days of delivery.',
      ],
    },
    {
      heading: 'Visualisations and their use in marketing',
      paras: [
        'All visualisations — renders, artist impressions, 360° panoramas and animations, whether CGI or AI-assisted — are an <strong>artistic impression</strong> of the subject. Colours, materials, textures, vegetation, lighting, reflections, scale, people and surroundings are indicative and non-binding. <strong>No rights can be derived from a visualisation</strong>; binding specifications follow only from the Client’s own technical documents, samples and product data.',
        'Colour and material reproduction differs between screens, print and physical products and is not guaranteed. Where exact colours matter, the colour codes (e.g. RAL) in the Client’s brief prevail over the on-screen or printed appearance.',
        'The Client is <strong>solely responsible</strong> for the way visualisations are used in its marketing, sales and other communication toward third parties, including attaching an appropriate disclaimer (e.g. “no rights can be derived from this image”) and complying with advertising and consumer-protection law. The Client indemnifies the Contractor against claims by third parties arising from the Client’s use or publication of visualisations.',
      ],
    },
    {
      heading: 'Technical drawings',
      paras: [
        'Technical (CAD) drawings are prepared on the basis of the information, dimensions and documents supplied by the Client, which the Client warrants to be correct and complete. The Contractor supplies <strong>drafting work</strong>, not engineering, structural or architectural advice.',
        'Before a drawing is used for production, fabrication or construction, the <strong>executing party must verify all dimensions and conditions on site</strong>. The Contractor does not warrant compliance with building regulations (Besluit bouwwerken leefomgeving/Bouwbesluit), NEN standards or permit requirements; obtaining permits and regulatory approval is the Client’s responsibility.',
      ],
    },
    {
      heading: 'Intellectual property and licence',
      paras: [
        'The <strong>copyright (auteursrecht)</strong> in the Deliverables and Source files belongs to the Contractor as maker. On <strong>full payment</strong>, the Contractor grants the Client a licence (gebruiksrecht) to use the <strong>final Deliverables</strong> for the purpose agreed in the Quotation/SOW, as further set out in clause 13. Any exclusive licence is granted only in writing.',
        'Copyright is <strong>not transferred by the Agreement</strong>. A transfer of copyright is only valid if agreed in a separate written deed (akte, art. 2 Auteurswet). <strong>Source files are not transferred</strong> and remain the Contractor’s property unless purchased separately under clause 14.',
        'The Contractor retains its personal (moral) rights, including the right to be named as maker (naamsvermelding, art. 25 Auteurswet).',
        '<strong>AI-assisted Deliverables.</strong> Copyright protection requires a human creative contribution. Where a Deliverable is generated or substantially manipulated by AI tooling, copyright may not subsist in it, or may cover only those parts reflecting the Contractor’s own creative choices. For such Deliverables the Contractor grants the Client a <strong>non-exclusive, worldwide, perpetual right of use</strong> for the agreed purpose, and gives <strong>no warranty</strong> as to copyright subsistence, originality, or that comparable imagery will not be produced by others. <strong>Exclusivity, buy-out and assignment are not available</strong> on AI-assisted Deliverables; they remain available on CGI Deliverables.',
      ],
    },
    {
      heading: 'Image usage licence',
      paras: [
        'On full payment the Contractor grants the Client a <strong>non-exclusive, worldwide, perpetual licence</strong> to reproduce, publish and display the final Deliverables for the purpose agreed in the Quotation/SOW. The licence includes minor cropping and resizing to fit the agreed media; no per-use fee is due within the agreed purpose. A project-specific licence with a different scope (media, territory, duration, exclusivity) may be agreed in the Quotation or in a separate Image Usage Licence, which then prevails for that project.',
        'The licence does <strong>not</strong> include: resale or redistribution of the Deliverables as a stand-alone product; sub-licensing to third parties without written consent; substantive alteration that materially changes the depicted design, or presenting an altered image as the Contractor’s work; or any use that is unlawful, misleading, or damaging to the Contractor’s reputation.',
        'The Client will not remove or obscure embedded metadata or signatures without consent, and credits the Contractor where reasonable (e.g. “Visualisation: SL3D”).',
        '<strong>Exclusivity or a full buy-out</strong> (assignment of rights) is available on CGI Deliverables only, is priced separately, and is valid only in writing — for an assignment, in a deed as required by art. 2 Auteurswet.',
        'The licence covers the elements of the Deliverables created by the Contractor. Third-party and stock assets embedded in a Deliverable (e.g. models, textures, HDRIs, vegetation) remain subject to their own licences, and the Contractor grants no rights beyond those licences. Generic, non-client-specific scene elements and techniques remain free for the Contractor to reuse in other work.',
      ],
    },
    {
      heading: 'Sale of source files',
      paras: [
        'Source files are not part of the Deliverables and are only supplied where this is expressly agreed, as a separately priced item in the Quotation or in a Source-File Transfer document. Source files are released only after the transfer fee and all related invoices are paid in full.',
        'On payment in full, the Contractor grants the Client a <strong>perpetual, worldwide, non-exclusive licence</strong> to use, modify, adapt and render the transferred files, for its own purposes and for those of its own clients, with no restriction on media, territory or term and no further fee due. Copyright and authorship in the files remain with the Contractor, who stays free to reuse the underlying models and techniques in its own work.',
        'Assets the Contractor does not own — purchased models, textures, HDRIs, plugins and fonts — are supplied only where their own licences allow, and remain subject to those licences. Some may be excluded or require the Client to hold its own licence.',
        'Source files are provided <strong>as-is</strong>. The Contractor is not responsible for the Client’s own edits or renders, or for compatibility with the Client’s software versions, and provides no support on transferred files unless separately agreed. Where the Client publishes work derived from the source files, it will not present unmodified Contractor content as its own original work.',
      ],
    },
    {
      heading: 'Archiving and file retention',
      paras: [
        'After delivery, the Contractor has <strong>no obligation to archive or retain</strong> working files, 3D scenes or Source files. The Contractor stores them at its own discretion and may delete them 12 months after delivery. The Client is responsible for storing the delivered files; re-supply, re-rendering or amendment after acceptance is a new, separately charged assignment.',
      ],
    },
    {
      heading: 'AI-assisted production and transparency',
      paras: [
        'The Contractor may use generative AI tooling in producing Deliverables. Where it does so, it identifies the affected Deliverables in the Quotation or SOW and, where <strong>art. 50 of Regulation (EU) 2024/1689 (the EU AI Act)</strong> applies, marks or labels them as artificially generated or manipulated. The Contractor keeps a per-project record of which Deliverables are AI-generated, AI-enhanced or fully modelled.',
        'AI-assisted Deliverables are supplied for concept, exploration and presentation purposes. The Contractor gives <strong>no warranty</strong> of dimensional accuracy, of exact reproduction of specified materials or finishes, or of consistency across a set, and such Deliverables are not intended for construction, fabrication, print production, specification or configurator/AR asset production. The Client is responsible for any onward disclosure obligations arising from its own publication of AI-assisted Deliverables.',
      ],
    },
    {
      heading: 'Portfolio and promotion',
      paras: [
        'Unless the parties agree otherwise in writing (e.g. under an NDA or an embargo period), the Contractor may display the Deliverables and describe the project in its portfolio, website and social channels, and use them for its own promotion.',
      ],
    },
    {
      heading: 'Confidentiality',
      paras: [
        'Each party treats the other’s non-public information as confidential and uses it only for the Agreement. Where a separate NDA is signed, that NDA governs confidentiality.',
      ],
    },
    {
      heading: 'Personal data',
      paras: [
        'Each party complies with applicable data-protection law (AVG/GDPR). Where the Contractor processes personal data on the Client’s behalf — for example persons recognisable in supplied photos or reference material — the Client warrants that it may lawfully provide that data and indemnifies the Contractor against claims relating to it; where required, the parties will conclude a data-processing agreement.',
      ],
    },
    {
      heading: 'Liability',
      paras: [
        'The Contractor’s total liability under an Agreement is limited to the amount invoiced (excl. BTW) for that Agreement, or the amount paid out by its insurer for the claim, whichever the Contractor chooses. The Contractor is not liable for indirect or consequential loss, including lost profit, missed savings or delay damage.',
        'The Client must report any defect in writing within 10 working days of discovery. Any claim lapses 12 months after delivery. These limits do not apply to damage caused by the Contractor’s intent or deliberate recklessness.',
      ],
    },
    {
      heading: 'Force majeure',
      paras: [
        'Neither party is liable for delay or failure caused by circumstances beyond its reasonable control (including illness, hardware or software failure, power or internet outage, and supplier failure). If force majeure lasts more than 30 days, either party may terminate the affected Agreement in writing, with work done to date payable.',
      ],
    },
    {
      heading: 'Suspension and termination',
      paras: [
        'The Contractor may suspend or terminate the Agreement if the Client is in default, becomes insolvent, or applies for a moratorium. On termination, work performed and costs incurred up to that point are immediately due.',
        'If the Client cancels an Agreement after acceptance, any deposit is non-refundable and all work performed and costs incurred up to the cancellation are payable.',
      ],
    },
    {
      heading: 'Complaints',
      paras: [
        'Complaints about an invoice must be made within the payment term; complaints about a Deliverable within the periods in clauses 9 and 20. A complaint does not suspend the Client’s payment obligation.',
      ],
    },
    {
      heading: 'Governing law and disputes',
      paras: [
        'All agreements are governed by the laws of the Netherlands. Disputes are submitted to the competent court in the district where the Contractor is established, unless mandatory law provides otherwise. The parties will first attempt to resolve disputes amicably.',
      ],
    },
  ],
};

const nl: TermsContent = {
  version: '18 augustus 2026',
  clauses: [
    {
      heading: 'Definities',
      bullets: [
        '<strong>Opdrachtnemer</strong> — SL3D, de eenmanszaak van Sam Lepley (KVK 42131264, BTW-id NL005520384B17).',
        '<strong>Opdrachtgever</strong> — de partij die de Opdrachtnemer opdracht geeft tot dienstverlening.',
        '<strong>Overeenkomst</strong> — elke offerte, opdracht, dienstverleningsovereenkomst of SOW die door beide partijen is aanvaard.',
        '<strong>Producten</strong> — de beelden, animaties, 3D-modellen of andere output die onder de Overeenkomst worden vervaardigd.',
        '<strong>Bronbestanden</strong> — bewerkbare werkbestanden (bijv. scène-, project- en modelbestanden) in tegenstelling tot de gerenderde/geëxporteerde Producten.',
        '<strong>AI-ondersteunde Producten</strong> — Producten die met generatieve AI-tooling zijn gegenereerd of ingrijpend zijn gemanipuleerd en als zodanig in de Offerte of SOW zijn aangemerkt, in tegenstelling tot <strong>CGI-Producten</strong>, die door de Opdrachtnemer worden gemodelleerd en gerenderd.',
      ],
      paras: [],
    },
    {
      heading: 'Toepasselijkheid',
      paras: [
        'Deze voorwaarden zijn van toepassing op elke offerte, aanbieding en overeenkomst tussen de Opdrachtnemer en de Opdrachtgever, en sluiten eventuele voorwaarden van de Opdrachtgever uit, tenzij deze uitdrukkelijk schriftelijk door de Opdrachtnemer zijn aanvaard. Indien enige bepaling nietig is of wordt vernietigd, blijven de overige bepalingen van kracht.',
        'De Opdrachtnemer stelt deze voorwaarden vóór of bij de totstandkoming van de Overeenkomst ter beschikking: ze zijn gepubliceerd op <strong>sl3d.net/nl/terms</strong>, worden in elke offerte genoemd en worden op verzoek kosteloos toegezonden. Door een offerte te aanvaarden, of door de Opdrachtnemer opdracht te geven met de werkzaamheden aan te vangen, aanvaardt de Opdrachtgever deze voorwaarden.',
        'Deze voorwaarden zijn gepubliceerd in het Nederlands en het Engels; de versie in de taal van de Overeenkomst is van toepassing.',
        'Deze voorwaarden zijn gericht op Opdrachtgevers die handelen in de uitoefening van een beroep of bedrijf. Is de Opdrachtgever een consument, dan gaat dwingend consumentenrecht vóór op deze voorwaarden voor zover deze daarmee strijden, en eindigt — bij overeenkomsten op afstand — het wettelijke herroepingsrecht wanneer de Opdrachtnemer met uitdrukkelijke instemming van de Opdrachtgever met de uitvoering aanvangt; het herroepingsrecht geldt niet voor Producten die volgens specificaties van de Opdrachtgever worden vervaardigd.',
      ],
    },
    {
      heading: 'Offertes en totstandkoming',
      paras: [
        'Offertes zijn geldig gedurende de daarop vermelde termijn, of 14 dagen indien geen termijn is vermeld, en zijn vrijblijvend. Een Overeenkomst komt tot stand wanneer de Opdrachtgever een offerte schriftelijk (waaronder per e-mail) aanvaardt of wanneer de Opdrachtnemer op verzoek van de Opdrachtgever met de werkzaamheden aanvangt.',
      ],
    },
    {
      heading: 'Inschakelen van derden',
      paras: [
        'De Opdrachtnemer mag de Overeenkomst geheel of gedeeltelijk laten uitvoeren door derden die hij inschakelt, en blijft daarbij de enige contractspartij en het aanspreekpunt voor de Opdrachtgever. Deze voorwaarden kunnen ook worden ingeroepen door derden die de Opdrachtnemer bij de uitvoering van de Overeenkomst inschakelt.',
      ],
    },
    {
      heading: 'Prijzen, aanbetaling en meerwerk',
      paras: [
        'Alle prijzen zijn in euro’s en exclusief BTW en kosten van derden (bijv. stockmateriaal, prints, reiskosten), tenzij anders vermeld. De Opdrachtnemer kan een aanbetaling van maximaal 50% verlangen voordat met de werkzaamheden wordt aangevangen.',
        'Werkzaamheden buiten de overeengekomen omvang — waaronder extra beelden, extra revisierondes, of gewijzigde bronmaterialen — gelden als “meerwerk” en worden in rekening gebracht tegen €65/uur (excl. BTW) of een afzonderlijk overeengekomen prijs, via een Meerwerkopdracht.',
      ],
    },
    {
      heading: 'Reiskosten en bezoeken op locatie',
      paras: [
        'Bezoeken op locatie, inmeten en het vastleggen van referentiemateriaal worden in rekening gebracht zoals vermeld in de Offerte — doorgaans als een dagdeel- of dagtarief dat de tijd van deur tot deur dekt. Reizen binnen 50 km van de vestigingsplaats van de Opdrachtnemer is bij dat tarief inbegrepen; daarbuiten worden kilometers voor de heen- en terugreis berekend tegen het in de Offerte vermelde tarief. Parkeerkosten, tolgelden, openbaar vervoer en een eventuele overnachting worden tegen kostprijs doorberekend, mits vooraf overeengekomen. Over doorberekende reiskosten is btw verschuldigd tegen het tarief van de hoofddienst.',
        'Alle reis- en bezoekkosten worden <strong>vóór</strong> het inplannen van een bezoek in de Offerte vastgelegd; de Opdrachtnemer brengt reiskosten niet achteraf in rekening. Een ingepland bezoek dat minder dan 2 werkdagen van tevoren wordt geannuleerd, wordt voor <strong>50%</strong> van het bezoektarief in rekening gebracht, vermeerderd met reeds gemaakte reiskosten.',
      ],
    },
    {
      heading: 'Facturering en betaling',
      paras: [
        'Facturen dienen te worden voldaan binnen <strong>14 dagen</strong> na de factuurdatum, zonder korting of verrekening. Partijen komen deze termijn overeen (de wettelijke standaard is 30 dagen, met een maximum van 60 dagen voor zakelijke opdrachtgevers).',
        'Betaalt de Opdrachtgever niet op tijd, dan is hij van rechtswege in verzuim en is hij de wettelijke handelsrente (art. 6:119a BW) verschuldigd, plus de buitengerechtelijke incassokosten volgens het <em>Besluit vergoeding voor buitengerechtelijke incassokosten</em> — een wettelijk percentage van het verschuldigde bedrag met een <strong>minimum van € 40</strong>.',
        'Is de Opdrachtgever een <strong>consument</strong>, dan stuurt de Opdrachtnemer eerst een veertiendagenbrief (WIK-aanmaning) waarin het bedrag aan incassokosten wordt vermeld, voordat die kosten in rekening worden gebracht. Bij <strong>zakelijke</strong> opdrachtgevers zijn de kosten zonder zo’n aanmaning verschuldigd.',
        'De Opdrachtnemer kan de werkzaamheden opschorten en Producten en licenties achterhouden zolang een factuur openstaat.',
      ],
    },
    {
      heading: 'Medewerking opdrachtgever',
      paras: [
        'De Opdrachtgever verstrekt tijdig en kosteloos alle materialen, informatie, referenties en goedkeuringen die de Opdrachtnemer redelijkerwijs nodig heeft (bijv. CAD/tekeningen, afmetingen, afwerkingen, merkmateriaal). De Opdrachtgever staat ervoor in dat hij over de rechten op de door hem aangeleverde materialen beschikt en vrijwaart de Opdrachtnemer tegen aanspraken van derden met betrekking daartoe.',
      ],
    },
    {
      heading: 'Oplevering, termijnen en revisies',
      paras: [
        'Vermelde opleverdata zijn indicatief en gelden niet als fatale termijnen, tenzij uitdrukkelijk schriftelijk overeengekomen. De Opdrachtnemer is niet in verzuim voordat hij schriftelijk in gebreke is gesteld en een redelijke termijn heeft gekregen om na te komen.',
        'Elk Product omvat 2 rondes kleine revisies. Goedkeuring van een Product, of het gebruik ervan, geldt als aanvaarding. De Opdrachtgever wordt geacht een Product te hebben aanvaard indien hij niet binnen 10 werkdagen na oplevering reageert.',
      ],
    },
    {
      heading: 'Visualisaties en het gebruik ervan in marketing',
      paras: [
        'Alle visualisaties — renders, artist impressions, 360°-panorama’s en animaties, zowel CGI als AI-ondersteund — zijn een <strong>kunstzinnige impressie</strong> van het onderwerp. Kleuren, materialen, texturen, beplanting, verlichting, reflecties, schaal, personen en omgeving zijn indicatief en niet bindend. <strong>Aan een visualisatie kunnen geen rechten worden ontleend</strong>; bindende specificaties volgen uitsluitend uit de eigen technische documenten, monsters en productgegevens van de Opdrachtgever.',
        'De weergave van kleuren en materialen verschilt tussen beeldschermen, drukwerk en fysieke producten en wordt niet gegarandeerd. Waar exacte kleuren van belang zijn, gaan de kleurcodes (bijv. RAL) in de briefing van de Opdrachtgever vóór op de weergave op scherm of in druk.',
        'De Opdrachtgever is <strong>als enige verantwoordelijk</strong> voor de wijze waarop visualisaties worden gebruikt in zijn marketing, verkoop en overige communicatie richting derden, waaronder het aanbrengen van een passende disclaimer (bijv. “aan deze afbeelding kunnen geen rechten worden ontleend”) en de naleving van reclame- en consumentenrecht. De Opdrachtgever vrijwaart de Opdrachtnemer tegen aanspraken van derden die voortvloeien uit het gebruik of de publicatie van visualisaties door de Opdrachtgever.',
      ],
    },
    {
      heading: 'Technische tekeningen',
      paras: [
        'Technische (CAD-)tekeningen worden vervaardigd op basis van de informatie, maten en documenten die de Opdrachtgever aanlevert; de Opdrachtgever staat in voor de juistheid en volledigheid daarvan. De Opdrachtnemer levert <strong>tekenwerk</strong>, geen ingenieurs-, constructie- of architectenadvies.',
        'Voordat een tekening wordt gebruikt voor productie, fabricage of uitvoering, dient de <strong>uitvoerende partij alle maten en omstandigheden ter plaatse te controleren</strong>. De Opdrachtnemer garandeert geen naleving van bouwregelgeving (Besluit bouwwerken leefomgeving/Bouwbesluit), NEN-normen of vergunningseisen; het verkrijgen van vergunningen en goedkeuringen is de verantwoordelijkheid van de Opdrachtgever.',
      ],
    },
    {
      heading: 'Intellectuele eigendom en licentie',
      paras: [
        'Het <strong>auteursrecht</strong> op de Producten en Bronbestanden berust bij de Opdrachtnemer als maker. Na <strong>volledige betaling</strong> verleent de Opdrachtnemer de Opdrachtgever een licentie (gebruiksrecht) om de <strong>definitieve Producten</strong> te gebruiken voor het in de Offerte/SOW overeengekomen doel, zoals nader uitgewerkt in artikel 13. Een exclusieve licentie wordt uitsluitend schriftelijk verleend.',
        'Het auteursrecht wordt door de Overeenkomst <strong>niet overgedragen</strong>. Overdracht van auteursrecht is alleen geldig indien vastgelegd in een afzonderlijke, daartoe bestemde akte (art. 2 Auteurswet). <strong>Bronbestanden worden niet overgedragen</strong> en blijven eigendom van de Opdrachtnemer, tenzij afzonderlijk aangekocht op grond van artikel 14.',
        'De Opdrachtnemer behoudt zijn persoonlijkheidsrechten, waaronder het recht op naamsvermelding (art. 25 Auteurswet).',
        '<strong>AI-ondersteunde Producten.</strong> Auteursrechtelijke bescherming veronderstelt een menselijke creatieve inbreng. Waar een Product door AI-tooling is gegenereerd of ingrijpend is gemanipuleerd, kan daarop geen auteursrecht rusten, of slechts op die onderdelen waarin de eigen creatieve keuzes van de Opdrachtnemer tot uitdrukking komen. Voor dergelijke Producten verleent de Opdrachtnemer de Opdrachtgever een <strong>niet-exclusief, wereldwijd en eeuwigdurend gebruiksrecht</strong> voor het overeengekomen doel, en geeft hij <strong>geen garantie</strong> omtrent het bestaan van auteursrecht, de oorspronkelijkheid, of dat vergelijkbaar beeld niet door anderen zal worden vervaardigd. <strong>Exclusiviteit, afkoop en overdracht zijn niet beschikbaar</strong> op AI-ondersteunde Producten; deze blijven beschikbaar op CGI-Producten.',
      ],
    },
    {
      heading: 'Beeldgebruikslicentie',
      paras: [
        'Na volledige betaling verleent de Opdrachtnemer de Opdrachtgever een <strong>niet-exclusieve, wereldwijde, eeuwigdurende licentie</strong> om de definitieve Producten te verveelvoudigen, te publiceren en te tonen voor het in de Offerte/SOW overeengekomen doel. De licentie omvat beperkt bijsnijden en schalen om binnen de overeengekomen media te passen; binnen het overeengekomen doel is geen vergoeding per gebruik verschuldigd. Een projectspecifieke licentie met een andere omvang (media, territorium, duur, exclusiviteit) kan in de Offerte of in een afzonderlijke Beeldgebruikslicentie worden overeengekomen; die gaat dan voor dat project voor.',
        'De licentie omvat <strong>niet</strong>: doorverkoop of herdistributie van de Producten als zelfstandig product; sublicentiëring aan derden zonder schriftelijke toestemming; ingrijpende bewerking die het afgebeelde ontwerp wezenlijk verandert, of het presenteren van een bewerkt beeld als werk van de Opdrachtnemer; of gebruik dat onrechtmatig of misleidend is, of de reputatie van de Opdrachtnemer schaadt.',
        'De Opdrachtgever verwijdert of maskeert geen ingebedde metadata of signaturen zonder toestemming, en vermeldt de Opdrachtnemer waar redelijk (bijv. “Visualisatie: SL3D”).',
        '<strong>Exclusiviteit of volledige afkoop</strong> (overdracht van rechten) is uitsluitend beschikbaar op CGI-Producten, wordt afzonderlijk geprijsd en is alleen schriftelijk geldig — bij overdracht in een akte zoals vereist door art. 2 Auteurswet.',
        'De licentie ziet op de door de Opdrachtnemer gecreëerde onderdelen van de Producten. In een Product verwerkte assets van derden en stockmateriaal (bijv. modellen, texturen, HDRI’s, beplanting) blijven onderworpen aan hun eigen licenties; de Opdrachtnemer verleent geen rechten die verder gaan dan die licenties. Generieke, niet-opdrachtgeverspecifieke scène-elementen en technieken blijven vrij voor hergebruik door de Opdrachtnemer in ander werk.',
      ],
    },
    {
      heading: 'Verkoop van bronbestanden',
      paras: [
        'Bronbestanden maken geen deel uit van de Producten en worden uitsluitend geleverd indien dit uitdrukkelijk is overeengekomen, als afzonderlijk geprijsde post in de Offerte of in een document Bronbestandsoverdracht. Bronbestanden worden pas vrijgegeven nadat de overdrachtsvergoeding en alle bijbehorende facturen volledig zijn voldaan.',
        'Na volledige betaling verleent de Opdrachtnemer de Opdrachtgever een <strong>eeuwigdurende, wereldwijde, niet-exclusieve licentie</strong> om de overgedragen bestanden te gebruiken, te bewerken, aan te passen en te renderen, voor eigen doeleinden en voor die van zijn eigen opdrachtgevers, zonder beperking naar media, territorium of duur en zonder verdere vergoeding. Het auteursrecht en het makerschap van de bestanden blijven bij de Opdrachtnemer, die vrij blijft de onderliggende modellen en technieken in eigen werk te hergebruiken.',
        'Materiaal dat geen eigendom is van de Opdrachtnemer — aangekochte modellen, texturen, HDRI’s, plugins en fonts — wordt uitsluitend meegeleverd voor zover de eigen licenties dat toestaan, en blijft aan die licenties onderworpen. Sommige onderdelen kunnen worden uitgesloten of vereisen dat de Opdrachtgever een eigen licentie aanschaft.',
        'Bronbestanden worden <strong>as-is</strong> geleverd. De Opdrachtnemer is niet verantwoordelijk voor de eigen bewerkingen of renders van de Opdrachtgever, of voor compatibiliteit met de softwareversies van de Opdrachtgever, en biedt geen ondersteuning op overgedragen bestanden tenzij afzonderlijk overeengekomen. Publiceert de Opdrachtgever werk dat van de bronbestanden is afgeleid, dan presenteert hij ongewijzigd werk van de Opdrachtnemer niet als eigen origineel werk.',
      ],
    },
    {
      heading: 'Archivering en bewaring van bestanden',
      paras: [
        'Na oplevering rust op de Opdrachtnemer <strong>geen bewaarplicht</strong> voor werkbestanden, 3D-scènes of Bronbestanden. De Opdrachtnemer bewaart deze naar eigen inzicht en mag ze 12 maanden na oplevering verwijderen. De Opdrachtgever is verantwoordelijk voor het bewaren van de opgeleverde bestanden; heraanlevering, opnieuw renderen of aanpassing na aanvaarding geldt als een nieuwe, afzonderlijk te betalen opdracht.',
      ],
    },
    {
      heading: 'AI-ondersteunde productie en transparantie',
      paras: [
        'De Opdrachtnemer kan bij het vervaardigen van Producten generatieve AI-tooling inzetten. Doet hij dat, dan merkt hij de betreffende Producten als zodanig aan in de Offerte of SOW en voorziet hij deze, waar <strong>art. 50 van Verordening (EU) 2024/1689 (de EU AI-verordening)</strong> van toepassing is, van een markering of label als kunstmatig gegenereerd of gemanipuleerd. De Opdrachtnemer houdt per project bij welke Producten AI-gegenereerd, AI-verbeterd of volledig gemodelleerd zijn.',
        'AI-ondersteunde Producten worden geleverd voor concept-, verkennings- en presentatiedoeleinden. De Opdrachtnemer geeft <strong>geen garantie</strong> op maatvoering, op exacte weergave van gespecificeerde materialen of afwerkingen, of op consistentie binnen een serie, en dergelijke Producten zijn niet bestemd voor uitvoering, fabricage, drukwerkproductie, bestekdoeleinden of productie van configurator-/AR-assets. De Opdrachtgever is zelf verantwoordelijk voor eventuele eigen informatieverplichtingen die voortvloeien uit zijn openbaarmaking van AI-ondersteunde Producten.',
      ],
    },
    {
      heading: 'Portfolio en promotie',
      paras: [
        'Tenzij partijen schriftelijk anders overeenkomen (bijv. onder een NDA of een embargoperiode), mag de Opdrachtnemer de Producten tonen en het project beschrijven in zijn portfolio, op zijn website en op zijn socialmediakanalen, en deze gebruiken voor zijn eigen promotie.',
      ],
    },
    {
      heading: 'Geheimhouding',
      paras: [
        'Elke partij behandelt de niet-openbare informatie van de andere partij als vertrouwelijk en gebruikt deze uitsluitend voor de Overeenkomst. Waar een afzonderlijke NDA is ondertekend, beheerst die NDA de geheimhouding.',
      ],
    },
    {
      heading: 'Persoonsgegevens',
      paras: [
        'Elke partij leeft de toepasselijke privacywetgeving (AVG) na. Verwerkt de Opdrachtnemer persoonsgegevens ten behoeve van de Opdrachtgever — bijvoorbeeld herkenbare personen in aangeleverde foto’s of referentiemateriaal — dan staat de Opdrachtgever ervoor in dat hij die gegevens rechtmatig mag verstrekken en vrijwaart hij de Opdrachtnemer tegen aanspraken die daarmee verband houden; waar vereist sluiten partijen een verwerkersovereenkomst.',
      ],
    },
    {
      heading: 'Aansprakelijkheid',
      paras: [
        'De totale aansprakelijkheid van de Opdrachtnemer uit hoofde van een Overeenkomst is beperkt tot het voor die Overeenkomst gefactureerde bedrag (excl. BTW), of tot het bedrag dat door zijn verzekeraar voor de betreffende aanspraak wordt uitgekeerd, naar keuze van de Opdrachtnemer. De Opdrachtnemer is niet aansprakelijk voor indirecte schade of gevolgschade, waaronder gederfde winst, gemiste besparingen of vertragingsschade.',
        'De Opdrachtgever dient elk gebrek binnen 10 werkdagen na ontdekking schriftelijk te melden. Elke aanspraak vervalt 12 maanden na oplevering. Deze beperkingen gelden niet voor schade die is veroorzaakt door opzet of bewuste roekeloosheid van de Opdrachtnemer.',
      ],
    },
    {
      heading: 'Overmacht',
      paras: [
        'Geen van beide partijen is aansprakelijk voor vertraging of tekortkoming die wordt veroorzaakt door omstandigheden buiten haar redelijke invloed (waaronder ziekte, hardware- of softwarestoringen, stroom- of internetuitval, en tekortkomingen van leveranciers). Indien de overmacht langer dan 30 dagen voortduurt, kan elke partij de betreffende Overeenkomst schriftelijk ontbinden, waarbij het tot dan toe verrichte werk verschuldigd is.',
      ],
    },
    {
      heading: 'Opschorting en ontbinding',
      paras: [
        'De Opdrachtnemer kan de Overeenkomst opschorten of ontbinden indien de Opdrachtgever in verzuim is, insolvent raakt, of surseance van betaling aanvraagt. Bij ontbinding zijn de verrichte werkzaamheden en de tot dat moment gemaakte kosten onmiddellijk opeisbaar.',
        'Annuleert de Opdrachtgever een Overeenkomst na aanvaarding, dan is een eventuele aanbetaling niet restitueerbaar en zijn alle tot de annulering verrichte werkzaamheden en gemaakte kosten verschuldigd.',
      ],
    },
    {
      heading: 'Klachten',
      paras: [
        'Klachten over een factuur dienen binnen de betalingstermijn te worden gemeld; klachten over een Product binnen de termijnen genoemd in de artikelen 9 en 20. Een klacht schort de betalingsverplichting van de Opdrachtgever niet op.',
      ],
    },
    {
      heading: 'Toepasselijk recht en geschillen',
      paras: [
        'Op alle overeenkomsten is het Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar de Opdrachtnemer is gevestigd, tenzij dwingend recht anders bepaalt. Partijen zullen eerst trachten geschillen in der minne op te lossen.',
      ],
    },
  ],
};

export const terms: Record<Lang, TermsContent> = { en, nl };
