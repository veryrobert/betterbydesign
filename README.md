# Better By Design 2026

**Public Service Design — Conference & Showcase**

Thursday 26 June 2026
The Lighthouse, Dublin

A Shared Island event delivered by the Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation in partnership with Creative Ireland, and hosted by the Institute of Designers Ireland.

---

## About

Better By Design 2026 is Ireland's national public service design conference. Three years on from the launch of Ireland's Action Plan for Designing Better Public Services, the conference takes stock of what has been achieved and looks ahead — bringing together practitioners, researchers and leaders from across the Irish public service and beyond to share what's working, where the challenges are, and how we keep building.

Tickets: https://www.eventbrite.com/e/better-by-design-tickets-1988012336414

---

## Agenda

| Time  | Session |
|-------|---------|
| 08:30 | Registration — Tea, coffee and breakfast |
| 09:30 | Welcome — Charlotte Barker & Tania Banotti |
| 09:40 | Opening Address — Jack Chambers TD |
| 09:55 | Ministerial Welcome — Patrick O'Donovan TD |
| 10:15 | Keynote — Trevor Vaugh |
| 10:50 | Panel: Designing Digital — Digital and Innovation at Scale |
| 11:30 | Break |
| 12:00 | Keynote — Ben Holliday |
| 12:30 | Panel: Designing How We Work — Workforce and Organisation of the Future |
| 13:10 | Lunch |
| 14:10 | Keynote — Professor Sabine Junginger |
| 14:45 | Panel: Designing with Evidence — Evidence-Informed Policies and Services |
| 15:30 | Closing Remarks — Frank Feighan TD |

### Panels

**Designing Digital** — Digital and Innovation at Scale
Moderated by Angela Denning (Courts Service)
Speakers: Aidan O'Boyle, Alison Boland, Shivaali Scully, Kevin Horan, John McKeon

**Designing How We Work** — Workforce and Organisation of the Future
Moderated by Marianne Cassidy (DPER)
Speakers: Dr Caoimhe Mc Mahon, Malcolm Beattie, Jared Gormley, Lynne Whelan, Brenda Murphy

**Designing with Evidence** — Evidence-Informed Policies and Services
Moderated by Tomás Ó Ruairc (Department of Education and Youth)
Speakers: Shawna Coxon, Professor Sabine Junginger, Dr Rachael Singleton, Damian Cranney

---

## Themes

1. **Principles to Practice** — Guidelines for Designing for Public Value
2. **Designing Digital** — Digital & Innovation at Scale
3. **Designing How We Work** — Workforce & Organisation of the Future
4. **Designing with Evidence** — Evidence-Informed Policies and Services

---

## Keynote Speakers

**Trevor Vaugh** — Public Sector Design Lead, DPER
Led the development of Ireland's Government Design Principles and the Action Plan for Designing Better Public Services.

**Ben Holliday** — Chief Design Officer, TPXimpact
Over 25 years' experience supporting the transformation of organisations and public services. Previously at DWP and GDS.

**Professor Sabine Junginger** — Professor of Design & Vice Chancellor's Fellow, Northumbria University
Research focuses on human-centred design in government, policy making and implementation.

---

## Panellists

- Charlotte Barker — Chief Executive, The Institute of Designers in Ireland
- Tania Banotti — Director, Creative Ireland
- Aidan O'Boyle — Public Service Transformation Design Lead for Life Events, DPER
- Alison Boland — Head of Digital Transformation, Department of Housing, Local Government and Heritage
- Kevin Horan — Head of Design, HSE Communications and Public Affairs
- Shivaali Scully — Senior Design Advisor, Centre for Excellence in Universal Design, NDA
- Marianne Cassidy — Assistant Secretary, DPER
- Shawna Coxon — Deputy Commissioner, Policing Operations, An Garda Síochána
- Dr Rachael Singleton — Behavioural Science Lecturer, Ulster University
- Damian Cranney — Chief Executive, Big Motive
- Tomás Ó Ruairc — Assistant Secretary, Department of Education and Youth
- Brenda Murphy — City Innovation Broker, Belfast City Council
- Jared Gormley — Head of HSE Spark Innovation Programme, HSE Spark
- Lynne Whelan — Senior Change Management Professional, SETU
- Malcolm Beattie — Former Head of Northern Ireland Innovation Lab
- Dr Caoimhe Mc Mahon — Programme Lead, MA and Professional Diploma in Service Design, NCAD

---

## Partners & Supporters

Better By Design is supported by the Office of the Government Chief Information Officer and the Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation.

- Government of Ireland
- Shared Island Initiative
- Creative Ireland Programme
- Better Public Services
- Institute of Designers Ireland

---

## Development

Built with Next.js (static export), deployed to GitHub Pages at `/betterbydesign`.

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

Static output is generated to the `out/` directory.

### Deploy

Deployment is handled automatically via GitHub Actions on push to `main`. The site is published to GitHub Pages with the base path `/betterbydesign`.

### Image handling

All images live in `public/images/`. Because `next/image` with `unoptimized: true` and `output: 'export'` does not apply `basePath` to image URLs, all image `src` attributes are wrapped with the `img()` helper from `lib/img.ts`, which prefixes the path with `NEXT_PUBLIC_BASE_PATH` at build time.

### Content

All site content is in `content/site.ts`. To update copy, speakers, agenda items or themes, edit that file — no changes to components needed.
