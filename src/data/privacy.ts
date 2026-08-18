import type { Lang } from '../i18n/config';

/**
 * Privacy policy — website-only scope (decided 2026-08-18): what sl3d.net
 * itself processes. Claims below are verified against the codebase — the site
 * has NO analytics or tracking; keep this file honest if that ever changes
 * (adding any tracker means updating section 4 first).
 *
 * `en` is the source of truth; `nl` must mirror its shape.
 */

export interface PrivacySection {
  heading: string;
  paras: string[];
}

export interface PrivacyContent {
  version: string;
  sections: PrivacySection[];
}

const en: PrivacyContent = {
  version: '18 August 2026',
  sections: [
    {
      heading: 'Who is responsible',
      paras: [
        'This website, <strong>sl3d.net</strong>, is operated by SL3D, the eenmanszaak of Sam Lepley (KVK 42131264), established in Delft, the Netherlands. For anything related to your personal data, contact <a href="mailto:sam@sl3d.net">sam@sl3d.net</a>.',
      ],
    },
    {
      heading: 'Contact form',
      paras: [
        'When you use the contact form, the name, email address and message you enter are delivered to SL3D by <strong>FormSubmit</strong> (formsubmit.co), a form-forwarding service that passes your message on to the SL3D mailbox. Your details are used only to respond to your enquiry and for any project that follows from it (legal basis: taking steps prior to entering into a contract, art. 6(1)(b) GDPR/AVG).',
        'Messages are kept as ordinary business correspondence for as long as relevant to the enquiry or project, and are not shared with anyone else or used for marketing.',
      ],
    },
    {
      heading: 'Hosting and technical data',
      paras: [
        'The site is hosted on <strong>GitHub Pages</strong> (GitHub, Inc.), which may log IP addresses of visitors for security and operational purposes. The site loads its fonts from <strong>Google Fonts</strong> and its animation library from the <strong>jsDelivr</strong> CDN; when your browser fetches those files, your IP address is sent to those services. SL3D itself receives no visitor data from any of these.',
      ],
    },
    {
      heading: 'No tracking',
      paras: [
        'This site uses <strong>no analytics, no advertising and no tracking cookies</strong>. It stores one entry in your browser’s local storage (<code>sl3d:lang-hint</code>) to remember that you dismissed the language suggestion; that value never leaves your browser.',
      ],
    },
    {
      heading: 'Your rights',
      paras: [
        'Under the GDPR (AVG) you may request access to, correction or deletion of your personal data, restrict or object to its processing, and request a copy in portable form. Email <a href="mailto:sam@sl3d.net">sam@sl3d.net</a> and you will get a response within one month. You also have the right to lodge a complaint with the Dutch supervisory authority, the <strong>Autoriteit Persoonsgegevens</strong>.',
      ],
    },
    {
      heading: 'Changes',
      paras: [
        'If the way this website handles data changes — for example if analytics were ever added — this policy will be updated first, with a new version date shown above.',
      ],
    },
  ],
};

const nl: PrivacyContent = {
  version: '18 augustus 2026',
  sections: [
    {
      heading: 'Wie is verantwoordelijk',
      paras: [
        'Deze website, <strong>sl3d.net</strong>, wordt beheerd door SL3D, de eenmanszaak van Sam Lepley (KVK 42131264), gevestigd in Delft. Voor alles rond uw persoonsgegevens kunt u terecht bij <a href="mailto:sam@sl3d.net">sam@sl3d.net</a>.',
      ],
    },
    {
      heading: 'Contactformulier',
      paras: [
        'Gebruikt u het contactformulier, dan worden de naam, het e-mailadres en het bericht dat u invult aan SL3D bezorgd via <strong>FormSubmit</strong> (formsubmit.co), een dienst die formulierberichten doorstuurt naar de mailbox van SL3D. Uw gegevens worden uitsluitend gebruikt om uw vraag te beantwoorden en voor een eventueel daaruit volgend project (grondslag: precontractuele maatregelen, art. 6 lid 1 sub b AVG).',
        'Berichten worden bewaard als gewone zakelijke correspondentie zolang dat voor de vraag of het project relevant is, en worden niet met anderen gedeeld of voor marketing gebruikt.',
      ],
    },
    {
      heading: 'Hosting en technische gegevens',
      paras: [
        'De site wordt gehost op <strong>GitHub Pages</strong> (GitHub, Inc.), dat IP-adressen van bezoekers kan loggen voor beveiligings- en beheerdoeleinden. De site laadt zijn lettertypen van <strong>Google Fonts</strong> en zijn animatiebibliotheek via de CDN van <strong>jsDelivr</strong>; wanneer uw browser die bestanden ophaalt, wordt uw IP-adres aan die diensten doorgegeven. SL3D ontvangt zelf van geen van deze partijen bezoekersgegevens.',
      ],
    },
    {
      heading: 'Geen tracking',
      paras: [
        'Deze site gebruikt <strong>geen analytics, geen advertenties en geen tracking-cookies</strong>. Er wordt één waarde in de lokale opslag van uw browser bewaard (<code>sl3d:lang-hint</code>) om te onthouden dat u de taalsuggestie heeft gesloten; die waarde verlaat uw browser nooit.',
      ],
    },
    {
      heading: 'Uw rechten',
      paras: [
        'Op grond van de AVG kunt u inzage, correctie of verwijdering van uw persoonsgegevens vragen, de verwerking laten beperken of er bezwaar tegen maken, en een kopie in overdraagbare vorm opvragen. Mail <a href="mailto:sam@sl3d.net">sam@sl3d.net</a>; u krijgt binnen een maand antwoord. U heeft ook het recht een klacht in te dienen bij de <strong>Autoriteit Persoonsgegevens</strong>.',
      ],
    },
    {
      heading: 'Wijzigingen',
      paras: [
        'Verandert de manier waarop deze website met gegevens omgaat — bijvoorbeeld als er ooit analytics zou worden toegevoegd — dan wordt eerst dit beleid bijgewerkt, met een nieuwe versiedatum hierboven.',
      ],
    },
  ],
};

export const privacy: Record<Lang, PrivacyContent> = { en, nl };
