// ─── Site Content ────────────────────────────────────────────────────────────
//
// All editable content lives here.
// When integrating a CMS, replace these exports with API calls.
//
// ─────────────────────────────────────────────────────────────────────────────

export const event = {
  name: 'Better By Design',
  year: '2026',
  tagline: 'Public Service Design',
  subtag: 'Conference & Showcase',
  date: 'Thursday 26 June 2026',
  location: 'The Lighthouse, Dublin',
  ticketsUrl:
    'https://www.eventbrite.com/e/better-by-design-tickets-1988012336414?aff=oddtdtcreator',
  agendaUrl: '#', // Replace with actual PDF path, e.g. '/agenda.pdf'
}

export const navigation = [
  { label: 'Ministers', href: '#ministers', external: false },
  { label: 'Keynotes', href: '#keynotes', external: false },
  { label: 'Themes', href: '#themes', external: false },
  { label: 'Panellists', href: '#panellists', external: false },
]

export const partners = {
  heading: 'Partners & Supporters',
  body: 'Better By Design is supported by the Office of the Government Chief Information Officer and the Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation.',
  image: '/images/partners.png',
  imageAlt: 'Conference partners and supporting organisations',
}

export const partnerLogos = [
  { src: '/images/gov-ireland.svg', alt: 'Government of Ireland' },
  { src: '/images/shared-island.svg', alt: 'Shared Island Initiative' },
  { src: '/images/creative-ireland.svg', alt: 'Creative Ireland Programme' },
  { src: '/images/better-public-services.svg', alt: 'Better Public Services' },
  { src: '/images/idi-logo.svg', alt: 'Institute of Designers Ireland' },
]

// ─── Keynotes ────────────────────────────────────────────────────────────────
// Add image paths once assets are available (e.g. '/images/speakers/name.jpg')

export interface Keynote {
  id: number
  name: string
  role: string
  organisation: string
  image: string | null
}

export const keynotes: Keynote[] = [
  {
    id: 1,
    name: 'Trevor Vaugh',
    role: 'Public Sector Design Lead',
    organisation: 'DPER',
    image: null,
  },
  {
    id: 2,
    name: 'Ben Holliday',
    role: 'Chief Design Officer',
    organisation: 'TPXImpact',
    image: null,
  },
  {
    id: 3,
    name: 'Prof. Sabine Junginger',
    role: 'Professor of Design & Vice Chancellor\'s Fellow',
    organisation: 'Northumbria University',
    image: null,
  },
]

// ─── Ministers ───────────────────────────────────────────────────────────────

export interface Minister {
  id: number
  name: string
  role: string
  organisation: string
  image: string | null
}

export const ministers: Minister[] = [
  {
    id: 1,
    name: 'Jack Chambers TD',
    role: 'Minister for Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    organisation: '',
    image: null,
  },
  {
    id: 2,
    name: 'Patrick O\'Donovan TD',
    role: 'Minister for Culture, Communications and Sport',
    organisation: '',
    image: null,
  },
  {
    id: 3,
    name: 'Frank Feighan TD',
    role: 'Minister of State',
    organisation: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    image: null,
  },
]

// ─── Themes ──────────────────────────────────────────────────────────────────

export interface Theme {
  number: string
  title: string
  subtitle: string
  description: string
}

export const themes: Theme[] = [
  {
    number: '1',
    title: 'Principles to Practice',
    subtitle: 'Guidelines for Design Public Value',
    description: '',
  },
  {
    number: '2',
    title: 'Designing Digital',
    subtitle: 'Digital & Innovation at Scale',
    description: '',
  },
  {
    number: '3',
    title: 'Designing How We Work',
    subtitle: 'Workforce & Organisation of the Future',
    description: '',
  },
]

export const themesActionDescription =
  "Ireland's Action Plan for Designing Better Public Services provides a tangible, practical and comprehensive pathway for how Government will integrate design principles across the Public Service leading to more people-centred, inclusive, user-friendly and effective public services."

export const actionPlanUrl =
  'https://www.gov.ie/en/publication/105bc-the-action-plan-for-designing-better-public-services/'

// ─── Panellists ──────────────────────────────────────────────────────────────

export interface Panellist {
  id: number
  name: string
  role: string
  organisation: string
  image: string | null
}

export const panellistsIntro =
  'Better By Design 2026 brings together practitioners, researchers and leaders from across the Irish public service and beyond — all working to make public services better through design.'

export const panellists: Panellist[] = [
  { id: 1,  name: 'Charlotte Barker',      role: 'Public Service Transformation Design Lead', organisation: 'DPER',                                                    image: null },
  { id: 2,  name: 'Tania Banotti',         role: 'Public Service Transformation Design Lead', organisation: 'DPER',                                                    image: null },
  { id: 3,  name: 'Aidan O\'Boyle',        role: 'Public Service Transformation Design Lead', organisation: 'DPER',                                                    image: null },
  { id: 4,  name: 'Alison Boland',         role: 'Head of Digital Transformation',            organisation: 'Department of Housing, Local Government and Heritage',    image: null },
  { id: 5,  name: 'Kevin Horan',           role: 'Head of Design, Digital Team for HSE Communications and Public Affairs', organisation: 'HSE',                       image: null },
  { id: 6,  name: 'Shivaali Scully',       role: 'Senior Design Advisor, Products, Services\u00a0&\u00a0Systems', organisation: 'CEUD and NDA',                         image: null },
  { id: 7,  name: 'Marianne Cassidy',      role: 'Assistant Secretary',                       organisation: 'DPER',                                                    image: null },
  { id: 8,  name: 'Shawna Coxon',          role: 'Deputy Commissioner, Policing Operations',  organisation: 'An Garda Síochána',                                       image: null },
  { id: 9,  name: 'Dr Rachael Singleton',  role: 'Behavioural Scientist Lecturer',            organisation: 'Ulster University',                                       image: null },
  { id: 10, name: 'Marianne Cassidy',      role: 'Chief Executive',                           organisation: 'Big Motive',                                              image: null },
  { id: 11, name: 'Tomás Ó Ruairc',        role: 'Assistant Secretary',                       organisation: 'Department of Education and Youth',                       image: null },
  { id: 12, name: 'Brenda Murphy',         role: 'City Innovation Broker',                    organisation: 'Belfast City Council',                                    image: null },
  { id: 13, name: 'Jared Gormley',         role: 'Head of HSE Spark Innovation Programme',    organisation: 'HSE Spark',                                               image: null },
  { id: 14, name: 'Lynne Whelan',          role: 'Senior Change Management Professional',     organisation: 'SETU',                                                    image: null },
  { id: 15, name: 'Malcolm Beattie',       role: 'Former Head of Northern Ireland Innovation Lab', organisation: '',                                                   image: null },
  { id: 16, name: 'Dr. Caoimhe Mc Mahon', role: 'Programme Lead for the MA and Professional Diploma in Service Design', organisation: 'National College of Art and Design', image: null },
]

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerDescription = {
  intro: 'A Shared Island event delivered by the ',
  org1: { label: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation', href: 'https://www.gov.ie/en/organisation/department-of-public-expenditure-and-reform/' },
  mid1: ' in partnership with ',
  org2: { label: 'Creative Ireland', href: 'https://www.creativeireland.gov.ie/' },
  mid2: ', and hosted by the ',
  org3: { label: 'Institute of Designers Ireland', href: 'https://www.idi-design.ie/' },
  end: '.',
}

// ─── Social ──────────────────────────────────────────────────────────────────

export const social = [
  {
    platform: 'Instagram' as const,
    href: '#',
    label: 'Better By Design on Instagram',
  },
  {
    platform: 'LinkedIn' as const,
    href: '#',
    label: 'Better By Design on LinkedIn',
  },
  {
    platform: 'YouTube' as const,
    href: '#',
    label: 'Better By Design on YouTube',
  },
]

export const govSocials = {
  youtube: 'https://www.youtube.com/@governmentofireland',
  linkedin: 'https://www.linkedin.com/company/governmentofireland',
  instagram: 'https://www.instagram.com/govie',
}

export const dperSocials = {
  youtube: 'https://www.youtube.com/@IRLDeptPER',
  linkedin: 'https://www.linkedin.com/company/department-of-public-expenditure-and-reform/',
  instagram: 'https://www.instagram.com/ourpublicservice/',
}
