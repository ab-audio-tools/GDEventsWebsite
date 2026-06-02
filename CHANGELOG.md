# CHANGELOG — GD Events Website
> Documento tecnico rivolto allo sviluppatore che riprende in mano il progetto
> dopo una sessione di refactoring, migrazione e ottimizzazione SEO esterna.
> Data sessione: maggio 2026.

---

## Update 2026-06-02 — Performance & Accessibilità

### Ottimizzazione immagini WebP

| File originale | Peso prima | Peso dopo | Riduzione |
|---|---|---|---|
| `illum_arch.jpeg` | 1880 KB | 116 KB | −94% |
| `produzione_eventi.jpeg` | 272 KB | 66 KB | −76% |
| `stand_fiera.jpeg` | 162 KB | 76 KB | −53% |
| `convention.jpeg` | 153 KB | 29 KB | −81% |
| `vetrina.jpeg` | 144 KB | 77 KB | −47% |
| `fixed.jpeg` | 121 KB | 46 KB | −62% |
| `concert.jpeg` | 98 KB | 34 KB | −65% |
| `gde.png` | 24 KB | 3 KB | −88% |
| **Totale** | **2854 KB** | **447 KB** | **−84%** |

Tutte le immagini della gallery convertite da JPEG/PNG a WebP
e ridimensionate alle dimensioni reali di visualizzazione.
Aggiunto script `scripts/convert-images.js` (sharp) richiamabile
con `npm run convert-images` quando si aggiungono nuove immagini.

Impatto atteso: LCP mobile da 18,5s a ~3-5s.

### File aggiornati per WebP
- `src/data/servicesData.js` — 13 riferimenti .jpeg → .webp
- `src/components/Navigation.jsx` — gde.png → gde.webp
- `src/components/Header.jsx` — thumbnail.PNG → thumbnail.webp

### Cache headers Apache
- `public/.htaccess` — TTL da 15 minuti a 1 anno per
  immagini, font, JS e CSS (Next.js usa hash nel filename)
- HTML sempre no-cache per garantire contenuto aggiornato
- Risparmio stimato: 2748 KB per visita ripetuta

### Security headers Apache
- `public/.htaccess` — aggiunti:
  - `X-Frame-Options: SAMEORIGIN` (anti-clickjacking)
  - `X-Content-Type-Options: nosniff` (anti-MIME sniffing)
  - `Strict-Transport-Security: max-age=31536000` (HSTS)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Fix accessibilità (Accessibility score 88 → atteso 92+)
- `ServicesGallery.jsx` — aggiunto `<label>` visually-hidden
  sul `<select name="service">` (WCAG: form elements con label)
- `Contact.jsx` — stesso fix sul select servizio +
  `<h6>Location</h6>` → `<p className="contact-info-label">`
  (heading non sequenziale eliminato)
- `Contact.css` — selettori h6 aggiornati a .contact-info-label
- `Navigation.jsx` — aggiunti width={100} height={48} sul logo
  (previene layout shift CLS)

### GTM
Non presente nel progetto — solo tag GA4 diretto (G-TF90EZE3NB).
Nessuna modifica necessaria.

### Score atteso dopo deploy
| Metrica | Prima | Atteso |
|---|---|---|
| Prestazioni mobile | 61 | ~80-85 |
| Prestazioni desktop | 87 | ~95+ |
| Accessibilità | 88 | ~92 |
| SEO | 100 | 100 |

---

## Update 2026-06-02 — Responsive & UX Mobile

### Fix applicati

| File | Classe | Modifica |
|------|--------|----------|
| `src/styles/Header.css` | `.main-title` 480px | Regressione font-size: 3.5rem → 2rem |
| `src/styles/Header.css` | `.contactpic` | Touch target: 40px → 44px tutti i breakpoint |
| `src/styles/Header.css` | `.cta-button` | Aggiunto min-height: 44px |
| `src/styles/ServicesGallery.css` | input/select/textarea | font-size: 1rem + min-height: 48px mobile (fix zoom iOS) |
| `src/styles/Contact.css` | input/select/textarea | font-size: 1rem + min-height: 48px mobile (fix zoom iOS) |
| `src/styles/Contact.css` | `.icon` | Touch target: 40px → 44px mobile |
| `src/styles/index.css` | html, body | overflow-x: hidden + max-width: 100vw |
| `src/styles/index.css` | globale | @media prefers-reduced-motion aggiunto |
| `src/styles/Navigation.css` | `.navigation-close` | Touch target: 40px → 44px |
| `src/styles/Navigation.css` | `.menu-link` | Padding: 5px → 10px |
| `src/styles/Navigation.css` | breakpoint hamburger | Esteso da 768px a 1024px |
| `src/styles/Header.css` | `.social-media-links` | Nascosto nel range 768-1024px (fix sovrapposizione) |
| `src/styles/Header.css` | `.contact-links` | Nascosto nel range 768-1024px (fix sovrapposizione) |
| `src/styles/Services.css` | `.service-description p` | font-size: 0.9rem → 1rem mobile |
| `src/styles/Blog.css` | `.blog-card p` | font-size: 0.9rem → 1rem mobile |
| `src/styles/Blog.css` | `.blog-card-cta` | Aggiunto min-height: 44px mobile |
| `src/styles/ServicePage.css` | testi sezione | font-size: 0.9rem → 1rem mobile (4 classi) |
| `src/styles/ServicePage.css` | `.service-cta-button` | Aggiunto min-height: 44px |
| `src/styles/ServicePage.css` | `.service-back-button` | Aggiunto min-height: 44px |
| `src/styles/ServicePage.css` | `.service-bottom-cta` | Padding laterale: 0 → 16px mobile, 0 → 24px tablet |
| `src/styles/ServicePage.css` | `.service-bottom-cta-inner` | Override padding verticale su tablet |
| `src/styles/WhatsAppButton.css` | `.whatsapp-fab` | bottom: 20px → 24px, right: 20px → 16px |
| `src/components/WhatsAppButton.jsx` | nuovo componente | Pulsante WhatsApp fisso mobile, #25D366, 56px, solo ≤768px |
| `src/pages/_app.jsx` | import | WhatsAppButton aggiunto dopo Navigation |
| `src/components/Header.jsx` | useReducedMotion | Animazioni disabilitate se prefers-reduced-motion |
| `src/components/Services.jsx` | useReducedMotion | Animazioni disabilitate se prefers-reduced-motion |

### Standard applicati
- Touch target minimo 44px (Apple) / 48px (Google) su tutti gli elementi interattivi
- Font-size minimo 1rem (16px) su tutti gli input per prevenire zoom automatico iOS
- overflow-x: hidden globale per prevenire scroll orizzontale
- prefers-reduced-motion rispettato via CSS globale e Framer Motion
- Hero tablet (768-1024px): layout pulito, solo titolo + subtitle + CTA

---

## 1. PANORAMICA

### Prima
Il progetto era una **Single Page Application Vite + React** con routing lato client
gestito da `react-router-dom` (HashRouter). Tutte le pagine erano renderizzate
esclusivamente nel browser: i crawler di Google ricevevano un documento HTML quasi
vuoto (solo `<div id="root">`), senza meta tag, senza structured data e senza
contenuto indicizzabile. Gli URL usavano il frammento hash (`/#/servizi/convention`)
che Google ignora completamente ai fini dell'indicizzazione.

### Dopo
Il sito è ora costruito su **Next.js 14 (Pages Router) con `output: 'export'`**.
Viene generato un file HTML statico per ogni pagina a build time (SSG), per un
totale di **16 pagine pre-renderizzate**: homepage, 10 pagine servizio, 3 articoli
blog, 1 pagina 404. Ogni pagina ha i propri meta tag, Open Graph, Twitter Card e
blocchi JSON-LD per i rich result di Google. Il sito resta completamente statico
(nessun server Node.js necessario) ed è compatibile con hosting Apache standard.

---

## 2. STACK E DIPENDENZE

### Rimosso

| Pacchetto | Motivo rimozione |
|-----------|-----------------|
| `vite` | Sostituito da Next.js come bundler e framework |
| `@vitejs/plugin-react` | Dipendenza Vite, non più necessaria |
| `react-router-dom` | Routing gestito da Next.js Pages Router |
| `react-helmet-async` | Meta tag gestiti da `next/head` |
| `gsap` | Mai usato nel codice sorgente (`src/`); +150 KB di bundle inutili |

### Aggiunto

| Pacchetto | Scopo |
|-----------|-------|
| `next` (^16.2.6) | Framework SSG — build statica, routing, next/head, next/font |
| `next-sitemap` (^4.2.3) | Genera `sitemap.xml` e `robots.txt` automaticamente post-build |
| `next/font/google` | Self-hosting di Space Grotesk a build time (elimina CDN Google Fonts) |

### Rimasto invariato

| Pacchetto | Versione | Ruolo |
|-----------|----------|-------|
| `react` / `react-dom` | ^18.3.1 | UI library |
| `framer-motion` | ^10.16.16 | Animazioni e transizioni |
| `@emailjs/browser` | ^4.4.1 | Invio form contatto via EmailJS |
| `react-intersection-observer` | ^9.5.3 | Trigger animazioni on-scroll |
| `react-icons` | ^5.5.0 | Icone stat cards in Services.jsx |

---

## 3. STRUTTURA FILE — PRIMA E DOPO

### File eliminati

```
src/pages/admin/          — Pannello admin blog (login, CRUD articoli)
src/pages/admin/login.jsx
src/pages/admin/dashboard.jsx
src/styles/AdminBlog.css  — CSS del pannello admin (380 righe, 9 KB)
src/styles/Particles.css  — CSS per Particles.jsx (componente non montato da nessuna pagina)
vite.config.js            — Configurazione Vite
index.html                — Entry point Vite (sostituito da _document.jsx)
```

### File aggiunti

```
next.config.js            — Configurazione Next.js (output, trailingSlash, immagini)
next-sitemap.config.js    — Configurazione sitemap.xml e robots.txt
src/pages/_app.jsx        — Wrapper globale (font, CSS, Loader, Navigation)
src/pages/_document.jsx   — Documento HTML base (lang, charset, favicon)
src/pages/index.jsx       — Homepage (ex App.jsx mono-pagina)
src/pages/servizi/[slug].jsx  — Pagina dinamica servizio (SSG, 10 pagine)
src/pages/blog/[slug].jsx     — Pagina dinamica articolo blog (SSG, 3 pagine)
src/utils/seoHelpers.js   — Utility SEO: meta tag, JSON-LD schemas
public/.htaccess          — Regole Apache: HTTPS, www, SPA fallback
public/llms.txt           — Documento leggibile da AI (ChatGPT, Gemini, Claude)
CHANGELOG.md              — Questo file
```

### File rinominati / spostati

```
src/App.jsx → src/pages/index.jsx   (logica homepage migrata nella page)
public/index.html → eliminato       (Next.js usa _document.jsx)
```

### File modificati significativamente

```
src/pages/_app.jsx          — Pattern Loader, next/font, import CSS centralizzati
src/data/servicesData.js    — shortDescriptions SEO, brand mentions, fix smart quotes
src/data/faqData.js         — Risposta attrezzature con brand reali e specifiche tecniche
src/data/blogData.js        — JSDoc, password admin redatta
src/utils/seoHelpers.js     — Riscrittura completa: DEFAULT_SEO, 6 funzioni schema
src/utils/getAssetPath.js   — Guard anti-doppio-prefisso /images/images/
src/components/Header.jsx   — visually-hidden h1 + span "dal 2013", preload="none"
src/components/Services.jsx — Stat cards aggiornate (1800m², Dal 2013, 180.000W, 200+)
src/components/Contact.jsx  — JSDoc EmailJS env vars e mapping campi
src/components/Footer.jsx   — Tel e email convertiti in link <a> cliccabili
src/styles/index.css        — Rimosso @import Google Fonts CDN (riga 1)
package.json                — Rimosso gsap; script build = "next build && next-sitemap"
```

---

## 4. MODIFICHE PER FILE

---

### `src/pages/_app.jsx`

**Prima:** non esisteva. La SPA Vite montava tutto in `src/main.jsx` → `src/App.jsx`.

**Ora:** wrapper globale Next.js. Ogni pagina vi passa attraverso.

**Responsabilità:**
- Importa tutti i CSS globali (Next.js impone che i CSS globali siano importati
  solo da `_app.jsx`, non dai componenti — build error altrimenti)
- Carica Space Grotesk via `next/font/google` (self-hosted, woff2 locale)
- Applica `spaceGrotesk.className` al `<div id="all">` radice
- Gestisce il Loader come **overlay** (pattern critico — vedi sezione Bug Risolti)

**Perché è cambiato:** necessario per Next.js Pages Router.

> ⚠️ **NON toccare il pattern Loader.**
> Il Loader è `{isLoading && <Loader />}` in parallelo a `<Component />`, non in
> alternativa. Se torni al ternario `isLoading ? <Loader/> : <Component/>`,
> Next.js esclude `<Component/>` dall'HTML statico generato a build time (SSG),
> perché `isLoading` è `true` al momento della pre-renderizzazione e `useEffect`
> non gira durante la build. Risultato: meta tag assenti, body vuoto per Google.

---

### `src/pages/_document.jsx`

**Prima:** non esisteva. L'HTML base era `public/index.html` (Vite).

**Ora:** definisce il documento HTML base per tutte le pagine.

**Contenuto critico:**
- `<Html lang="it">` — lingua per i crawler
- `<meta charSet="utf-8" />`
- `<meta name="theme-color" content="#00d4ff" />`
- `<link rel="icon" href="/favicon.png" />`

**Perché è cambiato:** Next.js usa `_document.jsx` invece di `public/index.html`.

> ⚠️ I tag `<link rel="preconnect">` e `<link rel="stylesheet">` per Google Fonts
> CDN sono stati **rimossi** da qui — il font ora è self-hosted via `next/font`.
> Non reintrodurli: creerebbero un round-trip DNS ridondante.

---

### `src/pages/index.jsx`

**Prima:** non esisteva. La homepage era `src/App.jsx` (routing HashRouter).

**Ora:** pagina principale del sito. Inietta tutti i meta tag e 3 blocchi JSON-LD.

**Structured data presenti:**
1. `Organization` — Knowledge Panel Google, logo, contatti in SERP
2. `LocalBusiness` — Local Pack Google Maps, indirizzo NAP, geo-coordinate
3. `FAQPage` — FAQ espanse in SERP, citazione da AI (SGE, Gemini)

**Meta tag:**
- Title: `Service Audio Video Luci Milano | AVL Professionale — GD Events` (63 chars)
- Description: 152 chars con CTA "Richiedi preventivo."
- Canonical: `https://www.gd-events.it/`
- OG + Twitter Card completi

**Perché è cambiato:** il routing hash non permetteva URL reali indicizzabili.

---

### `src/pages/servizi/[slug].jsx`

**Prima:** non esisteva. Le pagine servizio erano componenti caricati
da React Router con URL tipo `/#/servizi/convention`.

**Ora:** genera 10 pagine HTML statiche a build time tramite `getStaticPaths` +
`getStaticProps`. Ogni pagina ha:
- Title pattern: `{service.name} — Service AVL Milano | GD Events`
- Description: `service.shortDescription` (140-160 chars con CTA)
- Keywords: `getServiceKeywords(slug)` — keyword geo/transazionali per slug
- Canonical con trailing slash
- JSON-LD: `Service` schema + `BreadcrumbList` [Home → Servizio]

**Come aggiungere un nuovo servizio:** vedi Sezione 5 — Architettura SEO.

> ⚠️ `fallback: false` in `getStaticPaths` significa che qualsiasi slug non
> dichiarato in `servicesData.js` restituisce 404. Aggiungere sempre il servizio
> a `servicesData.js` prima di fare build.

---

### `src/pages/blog/[slug].jsx`

**Prima:** non esisteva. Gli articoli blog erano visualizzati come
componente SPA (stato locale), non come pagine URL reali.

**Ora:** genera 3 pagine HTML statiche per i 3 articoli in `defaultArticles`.
Inietta `Article` schema con:
- `author: { '@type': 'Person', name: 'Staff GD Events' }` (E-E-A-T)
- `publisher: Organization` con logo
- `datePublished` dall'articolo
- `og:type = 'article'` per anteprima social corretta

**Perché `defaultArticles` e non `getBlogArticles()`:**
`getBlogArticles()` legge da `localStorage` che non è disponibile a build time
(ambiente Node.js). Solo `defaultArticles` (array hardcodato) è accessibile
durante `getStaticProps`. Usare `getBlogArticles()` in `getStaticPaths` causa
build error o genera zero pagine.

**Come aggiungere un nuovo articolo:** vedi Sezione 5 — Architettura SEO.

---

### `src/utils/seoHelpers.js`

**Prima:** esisteva una versione parziale, sovrascritta parzialmente in corso
d'opera, con funzioni mancanti e NAP incoerente (Milano vs Settimo Milanese).

**Ora:** riscrittura completa. È la **sorgente unica di verità** per NAP e schemi.

**Esporta:**

| Funzione | Schema abilitato | Pagine |
|----------|-----------------|--------|
| `DEFAULT_SEO` | — | Tutti i file che importano da qui |
| `generatePageMeta()` | — | Tutte le pagine |
| `getOrganizationSchema()` | Organization | Homepage |
| `getLocalBusinessSchema()` | LocalBusiness | Homepage |
| `getServiceSchema()` | Service | `/servizi/[slug]` × 10 |
| `getBreadcrumbSchema()` | BreadcrumbList | `/servizi/[slug]` × 10 |
| `getFAQSchema()` | FAQPage | Homepage |
| `getServiceKeywords()` | — (meta keywords) | `/servizi/[slug]` × 10 |

> ⚠️ **NAP (Name, Address, Phone):** modificare l'indirizzo o il telefono solo
> in `DEFAULT_SEO` — si propaga automaticamente a tutti gli schemi. Non duplicare
> i dati NAP in altri file.

> ⚠️ **`sameAs: []`** in `getOrganizationSchema()`: va popolato con gli URL reali
> dei profili social verificati (LinkedIn, Instagram, Facebook...) quando
> disponibili. Un `sameAs` vuoto è corretto ma non sfrutta il potenziale di
> Knowledge Panel.

---

### `src/utils/getAssetPath.js`

**Prima:** esisteva, ma mancava il guard anti-doppio-prefisso.
Alcuni componenti passavano path già assoluti (`/images/hero.jpg`) e la funzione
anteponeva comunque `/images/`, generando `/images/images/hero.jpg` → 404.

**Ora:** guard in ordine di priorità:
1. Path vuoto → `''`
2. URL `http/https` → passato invariato (immagini esterne)
3. Path che inizia con `/images/` → passato invariato (già corretto)
4. Tutto il resto → antepone `/images/`

**Perché è cambiato:** bug che causava immagini rotte su diverse sezioni del sito.

---

### `src/data/servicesData.js`

**Prima:** array di 10 servizi con descrizioni generiche, senza ottimizzazione
SEO, senza brand mentions, con alcune stringhe delimitate da smart quote
(U+2018/U+2019) che causavano build error con Turbopack.

**Ora:**
- `shortDescription` per tutti i 10 servizi: 140-160 caratteri con CTA
  "Richiedi preventivo." — usata come meta description di ogni pagina servizio
- Brand mentions nei testi delle sezioni (L-Acoustics, d&b, ETC, Clay Paky,
  Robe, ADJ, MA Lighting, ChamSys, DiGiCo, Yamaha, Shure, Sennheiser,
  Blackmagic Design, Sony, ARRI) — segnali E-E-A-T per Google
- Stringhe con apostrofi italiani convertite a template literals backtick
  (previene il bug smart-quote delimiter)

> ⚠️ **Smart quotes:** se scrivi testi in italiano con apostrofi nelle stringhe,
> usa **sempre** backtick `` ` `` come delimitatore di stringa, non virgolette
> singole `'`. L'apostrofo italiano (U+2019) è identico a `'` e chiude la stringa
> prematuramente, causando `SyntaxError` a build time. Esempio:
> ```js
> // ✅ Corretto
> description: `L'evento più bello dell'anno`
> // ❌ Errore build
> description: 'L'evento più bello dell'anno'
> ```

---

### `src/data/faqData.js`

**Prima:** risposte FAQ generiche, risposta "attrezzature" senza brand specifici.

**Ora:**
- Risposta "Che attrezzature tecniche utilizzate?" aggiornata con brand reali
  e specifiche (ETC, ARRI, Clay Paky, Robe, 180.000W, L-Acoustics, d&b,
  DiGiCo, Yamaha, Shure, Sennheiser, LED wall HD, Blackmagic Design, Sony)
- Tutte le risposte sotto 80 parole (limite per featured snippet e citazione AI)

**Utilizzo doppio:** le FAQ alimentano sia il componente visuale accordion
in homepage, sia `getFAQSchema()` → JSON-LD `FAQPage` → rich result in SERP.

> ⚠️ Mantenere ogni risposta sotto **80 parole**: risposte più lunghe vengono
> troncate nei featured snippet di Google e nei riassunti AI.

---

### `src/data/blogData.js`

**Prima:** conteneva la password admin in chiaro: `simpleHash('Daniele15!')`.
La funzione `authenticateAdmin` era residuo del pannello admin rimosso.

**Ora:**
- Password sostituita con placeholder: `simpleHash('REDACTED')`
- Commento esplicativo aggiunto sulla riga
- Funzioni CRUD legacy (`getBlogArticles`, `addBlogArticle`, ecc.) mantenute
  per evitare errori di import, ma non più invocate in produzione
- `defaultArticles` è l'unico array usato da `getStaticPaths` a build time

> ⚠️ **`getStaticPaths` usa `defaultArticles`, non `getBlogArticles()`.**
> Per aggiungere un articolo al sito, modificare `defaultArticles` e rifare build.
> Il localStorage è inaccessibile a build time (Node.js).

> ✅ **Storia git:** la password `'Daniele15!'` è stata rimossa dal codice
> corrente e da tutti i commit della storia git con `git filter-repo`
> (completato il 19 maggio 2026 — nessuna occorrenza rimasta).

---

### `src/components/Header.jsx`

**Prima:** background GIF animata (pesante, bloccante per LCP). Subtitle
hardcodato come testo visibile. Nessun segnale SEO machine-readable nel hero.

**Ora:**
- Background: **video MP4** con `preload="none"` e `poster="thumbnail.PNG"` —
  la thumbnail viene mostrata immediatamente, il video si carica dopo
- `<h1 className="visually-hidden">`: testo
  `"Service Audio Video Luci a Milano — GD Events"` — leggibile dai crawler,
  invisibile visivamente (il logo "GD EVENTS" è solo estetico, non testo)
- `<span className="visually-hidden">`: testo
  `"Service audio video luci professionale dal 2013"` — segnale E-E-A-T
  (credenziale temporale), leggibile da crawler e screen reader
- Subtitle visivo: `"La tua visione, eventi indimenticabili"` (invariato)
- Social links: attualmente `<div>` non linkati (href mancanti — vedi TODO)

> ⚠️ **Non rimuovere** le classi `visually-hidden`. Sono segnali SEO strutturali,
> non testo ridondante. Rimuoverle non migliora l'UX ma peggiora il ranking.

---

### `src/components/Contact.jsx`

**Prima:** form con campo `tipo_evento` duplicato (bug), gestione EmailJS
senza verifica variabili d'ambiente, nessuna documentazione dei template.

**Ora:**
- Campo duplicato rimosso
- Verifica esplicita delle 4 variabili d'ambiente prima dell'invio
- Mapping documentato: campi form → variabili template EmailJS
- Invia 2 email: (1) notifica a `info@gd-events.it`, (2) autoresponse al cliente

**Variabili `.env` richieste:**
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

> ⚠️ Il campo `data_evento` del form non è ancora incluso nel template EmailJS
> (vedi TODO Sezione 8). Aggiungere `{{data_evento}}` al template su emailjs.com.

---

### `src/components/Services.jsx`

**Prima:** stat cards con dati generici (watt non specificati, icone non pertinenti).

**Ora:** 4 stat cards con dati reali e verificabili:

| Icon | Titolo | Testo |
|------|--------|-------|
| FaWarehouse | `1800 m²` | Magazzino attrezzatura |
| FaCalendarDays | `Dal 2013` | Credenziale temporale E-E-A-T |
| HiLightBulb | `180.000W` | Potenza totale impianto luci |
| FaAward | `200+ eventi` | Portfolio eventi realizzati |

Import aggiornati: rimossi `FaFileCircleXmark`, `MdHighQuality`;
aggiunti `FaCalendarDays`, `FaAward` da `react-icons`.

---

### `src/components/Navigation.jsx`

**Prima:** usava `react-router-dom` Link + navigate per la navigazione.
HashRouter rendeva gli URL tipo `/#/servizi/convention` non indicizzabili.

**Ora:** usa `useRouter` di Next.js. La logica `handleAnchorClick`:
- Se pathname è `/`, scrolla all'ancora target con `scrollIntoView`
- Se pathname è diverso (es. `/servizi/convention`), naviga prima a `/` +
  ancora con `router.push('/' + href)`

I link social nel menu fullscreen sono `<div>` con immagini, senza `href` —
in attesa degli URL reali (vedi TODO Sezione 8).

---

### `next.config.js`

**Prima:** non esisteva (Vite usava `vite.config.js`).

**Ora:** 3 opzioni critiche e interdipendenti:

```js
output: 'export'       // Build statica in /out/ — no Node.js runtime
trailingSlash: true    // Ogni pagina → /pagina/index.html
images: { unoptimized: true }  // Obbligatorio con output:'export'
```

> ⚠️ **`trailingSlash: true`** è criticamente interconnesso con:
> - Tutti i canonical URL nel sito (`/servizi/convention/` non `/servizi/convention`)
> - La sitemap.xml generata da next-sitemap
> - Il SPA fallback in `.htaccess` (riscrive su `/index.html`)
> - `generatePageMeta()` in seoHelpers.js (normalizza il path con trailing slash)
>
> Rimuovere questa opzione significa cambiare la forma di tutti gli URL.
> Google tratterebbe le vecchie URL come 404 e ricomincerebbe ad indicizzare
> le nuove — perdita temporanea di ranking.

> ⚠️ **`output: 'export'`** disabilita: ISR, middleware, API routes,
> ottimizzazione immagini server-side. Se si vuole tornare a un server Next.js,
> rimuovere questa opzione e aggiornare il hosting da Apache a Node.js.

---

### `next-sitemap.config.js`

**Prima:** non esisteva.

**Ora:** genera `sitemap.xml` e `robots.txt` in `/out/` post-build.

**Priorità per tipo di pagina:**

| Pagina | Priorità | Frequenza |
|--------|----------|-----------|
| Homepage `/` | 1.0 | weekly |
| `/servizi/*` | 0.9 | monthly |
| `/blog/*` | 0.7 | monthly |
| Altre | 0.7 | monthly |
| `/404` | esclusa | — |

> ⚠️ Lo script `build` in `package.json` è `"next build && next-sitemap"`.
> Se si lancia solo `next build`, la sitemap non viene rigenerata.
> Usare sempre `npm run build`.

---

### `public/.htaccess`

**Prima:** non esisteva (Vite usa un dev server Node.js, non Apache).

**Ora:** 3 blocchi di regole in ordine di priorità:

1. **Forza HTTPS** — redirect 301 da HTTP a HTTPS
2. **Forza www** — redirect 301 da `gd-events.it` a `www.gd-events.it` (canonical)
3. **SPA fallback** — qualsiasi URL non corrispondente a file fisico → `/index.html`
   (necessario per il routing Next.js statico con trailingSlash)

> ⚠️ **L'ordine delle regole è importante.** La regola HTTPS deve venire prima
> della regola www, altrimenti si generano redirect loop. Non invertirle.
> Non rimuovere il SPA fallback: senza di esso, navigare direttamente a
> `/servizi/convention/` restituisce 404 Apache invece di caricare Next.js.

---

### `public/llms.txt`

**Prima:** non esisteva.

**Ora:** documento strutturato in markdown leggibile dai modelli AI
(ChatGPT, Gemini, Claude, Perplexity). Contiene:
- NAP aziendale completo, credenziali (dal 2013, 1800m², 200+ eventi)
- Elenco attrezzature con brand per categoria (luci, audio, video)
- 10 servizi con shortDescription e URL canonici
- 3 articoli blog con excerpt e URL
- 5 FAQ
- Contatti

Serve per aumentare la probabilità che i modelli AI citino GD Events
nelle risposte a domande su "service AVL Milano" e argomenti correlati.

---

## 5. ARCHITETTURA SEO

### Sistema meta tag

Ogni pagina Next.js usa `<Head>` da `next/head` per iniettare i meta tag
nell'`<head>` HTML generato staticamente. Il pattern è:

```jsx
// In ogni page file (index.jsx, [slug].jsx, ecc.)
import Head from 'next/head';

export default function MyPage() {
  return (
    <>
      <Head>
        <title>...</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="..." />
        {/* OG, Twitter Card, JSON-LD */}
      </Head>
      {/* Componenti UI */}
    </>
  );
}
```

Per le pagine dinamiche, i meta tag vengono costruiti con `generatePageMeta()`
da `seoHelpers.js` e poi applicati nel `<Head>`.

### Sistema JSON-LD (Structured Data)

```
seoHelpers.js
  └── getOrganizationSchema()    → Homepage
  └── getLocalBusinessSchema()   → Homepage
  └── getFAQSchema(faqData)      → Homepage
  └── getServiceSchema()         → /servizi/[slug] × 10
  └── getBreadcrumbSchema()      → /servizi/[slug] × 10
  └── (Article schema inline)    → /blog/[slug] × 3
```

Il JSON-LD viene iniettato nel `<Head>` tramite:
```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### Schemi attivi per pagina

| Pagina | Schemi JSON-LD |
|--------|---------------|
| `/` | Organization + LocalBusiness + FAQPage |
| `/servizi/[slug]/` | Service + BreadcrumbList |
| `/blog/[slug]/` | Article |

### Come aggiungere una nuova pagina

1. Creare `src/pages/nuova-pagina.jsx`
2. Importare `Head` da `next/head` e `generatePageMeta` da `seoHelpers.js`
3. Definire title (50-65 chars), description (140-160 chars con CTA)
4. Aggiungere canonical con trailing slash: `https://www.gd-events.it/nuova-pagina/`
5. Aggiungere lo schema JSON-LD appropriato (Service? Organization?)
6. Fare `npm run build` — la nuova pagina compare in `sitemap.xml` automaticamente

### Come aggiungere un nuovo servizio (step by step)

1. **`src/data/servicesData.js`** — aggiungere l'oggetto servizio all'array:
   ```js
   {
     slug: 'nome-slug',           // kebab-case, senza slash
     name: 'Nome Servizio',
     shortDescription: '...',    // 140-160 chars, finisce con "Richiedi preventivo."
     // ... altri campi (sections, gallery, ecc.)
   }
   ```
2. **`src/utils/seoHelpers.js`** → `getServiceKeywords()` — aggiungere la entry:
   ```js
   'nome-slug': 'keyword geo, keyword transazionale, preventivo servizio',
   ```
3. **`npm run build`** — Next.js genera automaticamente `/servizi/nome-slug/index.html`
   e lo aggiunge a `sitemap.xml`
4. Verificare la nuova pagina con `npx serve out` su `localhost:3001`

### Come aggiungere un nuovo articolo blog (step by step)

1. **`src/data/blogData.js`** → array `defaultArticles` — aggiungere l'oggetto:
   ```js
   {
     id: '4',                      // Incrementale, stringa
     slug: 'titolo-articolo',      // kebab-case
     title: 'Titolo articolo',
     date: 'YYYY-MM-DD',
     tag: 'Audio' | 'Lighting' | 'Produzione',
     excerpt: '...',               // 140-160 chars — usato come meta description
     content: `<h2>...</h2><p>...</p>`, // HTML string
     image: '/images/nome.jpeg',
   }
   ```
2. Aggiungere l'immagine in `public/images/`
3. **`npm run build`** — genera `/blog/titolo-articolo/index.html` + sitemap
4. Nessuna modifica ad altri file necessaria

---

## 6. BUG RISOLTI

### HashRouter → URL non indicizzabili
**Problema:** React Router usava `HashRouter` → URL tipo `/#/servizi/convention`.
Google ignora tutto ciò che viene dopo `#` nell'URL. Nessuna pagina servizio
né articolo blog era indicizzabile.
**Soluzione:** migrazione a Next.js Pages Router con URL reali e HTML pre-renderizzato.

### Loader ternario → contenuto invisibile ai crawler
**Problema:** `isLoading ? <Loader /> : <Component />` — durante la build SSG,
`isLoading` è sempre `true` (valore iniziale di `useState`), e `useEffect`
non gira in Node.js. Next.js generava HTML con solo il Loader, senza contenuto.
Meta tag assenti, body vuoto per Google.
**Soluzione:** Loader come overlay `position:fixed` in parallelo a `<Component />`,
sempre presente nel DOM.

### GIF background → LCP critico
**Problema:** il video di sfondo dell'header era una GIF animata. Le GIF non
supportano compressione video efficiente: dimensione 10-30× maggiore di un MP4
equivalente, nessun supporto `preload="none"`, blocco del rendering.
**Soluzione:** convertito in video MP4 con `preload="none"` e `poster` thumbnail.
Il browser mostra il poster immediatamente senza scaricare il video.

### `/images/images/` doppio prefisso
**Problema:** `getAssetPath()` anteponeva sempre `/images/` al path. I componenti
che già passavano `/images/nome.jpg` generavano `/images/images/nome.jpg` → 404.
**Soluzione:** guard in `getAssetPath()` — se il path inizia già con `/images/`,
viene restituito invariato.

### Canonical senza trailing slash
**Problema:** alcune canonical URL erano `/servizi/convention` (senza slash finale),
ma `next.config.js` con `trailingSlash: true` genera i file come
`/servizi/convention/index.html`, serviti all'URL `/servizi/convention/`.
Canonical e URL effettivo non coincidevano — segnale negativo per Google.
**Soluzione:** `generatePageMeta()` normalizza tutti i path con trailing slash.

### `localStorage` in `getBlogArticles` → blog invisibile ai crawler
**Problema:** `getStaticPaths` per blog/[slug] chiamava `getBlogArticles()`,
che a build time (Node.js) non trova localStorage e restituisce... ma il vero
problema era che gli articoli "admin" erano solo in localStorage del browser
dell'autore, non visibili agli altri visitatori né indicizzabili.
**Soluzione:** `getStaticPaths` usa direttamente `defaultArticles` (array hardcodato).

### BreadcrumbList senza Home
**Problema:** lo schema BreadcrumbList aveva come primo elemento il servizio,
senza la voce "Home" come radice. Schema non valido secondo le linee guida Google
(la lista breadcrumb deve partire dalla homepage).
**Soluzione:** `getBreadcrumbSchema()` riceve sempre `[{ name: 'Home', path: '/' }, ...]`
come primo elemento dell'array.

### `react-helmet-async` non installato
**Problema:** il codice importava `react-helmet-async` per gestire i meta tag,
ma il pacchetto non era in `package.json`. Build error immediato.
**Soluzione:** rimosso completamente, sostituito con `next/head`.

### `seoHelpers.js` sovrascritto parzialmente
**Problema:** in una fase intermedia del refactoring, il file `seoHelpers.js`
era stato riscritto parzialmente con funzioni mancanti. Le pagine che importavano
funzioni non ancora migrate causavano build error.
**Soluzione:** riscrittura completa e atomica del file con tutte le 7 funzioni
esportate in una sola operazione.

### NAP Milano vs Settimo Milanese
**Problema:** l'indirizzo aziendale era indicato come "Milano" in alcuni punti
e "Settimo Milanese" in altri. Incoerenza NAP — segnale negativo per Local SEO.
Google penalizza i business con NAP inconsistente tra le varie occorrenze web.
**Soluzione:** `DEFAULT_SEO` in `seoHelpers.js` è la sorgente unica di verità:
`addressLocality: 'Settimo Milanese'`. Il file `llms.txt` e il componente
`Contact.jsx` sono stati allineati di conseguenza.

### Social link `href="#"` — link morti
**Problema:** i link social (Instagram, Facebook, LinkedIn, Twitter) puntavano
a `href="#"` — link placeholder non funzionanti. Google considera link rotti
un segnale negativo e gli utenti non possono raggiungere i profili social.
**Stato attuale:** i social link in `Header.jsx` e `Navigation.jsx` sono
per ora `<div>` senza href, in attesa degli URL reali (vedi TODO Sezione 8).

### `tipo_evento` duplicato nel form contatto
**Problema:** il form in `Contact.jsx` aveva il campo `tipo_evento` (select)
duplicato — due select con lo stesso name nel DOM. Solo il secondo veniva inviato.
**Soluzione:** rimosso il campo duplicato.

### Password admin in chiaro nel codice sorgente
**Problema:** `authenticateAdmin()` in `blogData.js` conteneva la password
`'Daniele15!'` in chiaro. Visibile a chiunque leggesse il repository.
**Soluzione:** sostituita con placeholder `'REDACTED'` + commento esplicativo.
La funzione rimane nel file (per non rompere import) ma non può autenticare nessuno.

### GSAP incluso nel bundle ma mai usato
**Problema:** `gsap` era in `package.json` ma nessun file in `src/` lo importava.
Contribuiva +150 KB (minificato) al bundle JavaScript senza alcun beneficio.
**Soluzione:** rimosso da `package.json` + `npm uninstall gsap`.

### Google Fonts caricato da CDN
**Problema:** `_document.jsx` e `index.css` caricavano Space Grotesk da
`fonts.googleapis.com` — 2 round-trip DNS bloccanti (preconnect + stylesheet).
Impatto diretto su LCP (Largest Contentful Paint).
**Soluzione:** migrato a `next/font/google` in `_app.jsx`. I file woff2 vengono
scaricati a build time e serviti localmente. Eliminati i tag CDN da `_document.jsx`
e la riga `@import` da `index.css`.

### CSS orfani caricati globalmente
**Problema:** `_app.jsx` importava `AdminBlog.css` (9 KB, 380 righe) e
`Particles.css` — entrambi completamente orfani. `AdminBlog.css` era il CSS
del pannello admin rimosso; `Particles.css` era il CSS di un componente
mai montato in nessuna pagina. Peso CSS inutile in ogni pagina.
**Soluzione:** `AdminBlog.css` eliminato fisicamente; `import Particles.css`
rimosso da `_app.jsx`.

---

## 7. COSA NON TOCCARE

### Il pattern Loader in `_app.jsx`
```jsx
{isLoading && <Loader />}   // ✅ Overlay
<Component {...pageProps} />  // sempre nel DOM
```
**Non tornare al ternario** `isLoading ? <Loader/> : <Component/>`.
Vedere Bug Risolti → "Loader ternario" per la spiegazione completa.

### `trailingSlash: true` in `next.config.js`
Interdipendente con canonical URL, sitemap, `.htaccess`, `generatePageMeta()`.
Rimuoverlo cambia la forma di tutti i 16 URL del sito — Google registra
le vecchie URL come 404 e deve reindicizzare le nuove da zero.

### `output: 'export'` in `next.config.js`
Rimuovere questa opzione converte il sito da statico a server-side.
Richiede un server Node.js e rende incompatibile l'hosting Apache attuale.
Se si vuole un server: aggiornare hosting, rimuovere `.htaccess`, riconfigurare tutto.

### L'ordine delle regole in `public/.htaccess`
HTTPS prima di www, poi SPA fallback. Invertire HTTPS e www genera redirect loop.
Rimuovere il SPA fallback causa 404 Apache su navigazione diretta alle sottopagine.

### Lo script `build` in `package.json`
```json
"build": "next build && next-sitemap"
```
Il `&& next-sitemap` genera `sitemap.xml` e `robots.txt` in `/out/`.
Non usare solo `next build`: la sitemap non verrebbe rigenerata con le nuove pagine.

### Le classi `visually-hidden` in `Header.jsx`
```jsx
<h1 className="visually-hidden">Service Audio Video Luci a Milano — GD Events</h1>
<span className="visually-hidden">Service audio video luci professionale dal 2013</span>
```
Sono segnali SEO (h1 machine-readable, credenziale E-E-A-T temporale) leggibili
da crawler e screen reader ma invisibili visivamente. Non sono ridondanza — il logo
animato "GD EVENTS" non è testo machine-readable. Rimuoverli peggiora il ranking.

### `sameAs: []` in `getOrganizationSchema()`
L'array vuoto è corretto sintatticamente. Non rimuovere la proprietà:
va popolata con URL social reali non appena disponibili (vedi TODO Sezione 8).

---

## 8. COSA FARE ANCORA (TODO)

### 🔴 Alta priorità

**Aggiungere URL social in `seoHelpers.js` → `sameAs`**
```js
// seoHelpers.js → getOrganizationSchema()
sameAs: [
  'https://www.instagram.com/gdevents',
  'https://www.linkedin.com/company/gd-events',
  // ...
],
```
Contestualmente, ripristinare i tag `<a href="...">` nei link social di
`Header.jsx` e `Navigation.jsx` (ora sono `<div>` senza href).

**Campo `data_evento` nel template EmailJS**
Aggiungere `{{data_evento}}` al template su emailjs.com.
Il campo è già inviato dal form (`formData.data_evento || 'Non specificata'`)
ma non compare nell'email ricevuta perché mancante nel template.

**Google Search Console**
1. Verificare la proprietà `https://www.gd-events.it/`
2. Inviare la sitemap: `https://www.gd-events.it/sitemap.xml`
3. Monitorare copertura index e Core Web Vitals dopo il deploy

**Google Business Profile**
Ottimizzare la scheda con:
- Indirizzo: Via Galvani 36, Settimo Milanese (20019 MI)
- Categoria: "Servizio di assistenza tecnica per eventi"
- Telefono: +39 02 49452872
- Foto eventi recenti
- Elenco servizi con descrizioni

### 🟡 Media priorità

**Contenuti ad alto impatto SEO**
- Pagina `/chi-siamo/` — storia aziendale dal 2013, team, filosofia
- Portfolio lavori — case study con foto degli eventi realizzati
- Loghi clienti (con autorizzazione) — trust signal visivo
- Testimonianze clienti — E-E-A-T, review structured data
- Landing page geografiche: `/service-avl-milano/`, `/service-avl-lombardia/`

**Ottimizzazione post-deploy**
- Immagini: conversione in WebP/AVIF (risparmio 30-60% peso)
- Audit INP (Interaction to Next Paint) su mobile
- Consolidamento CSS: ridurre numero di file separati

### 🟢 Bassa priorità

**~~Rimuovere la password dalla storia git~~** ✅ COMPLETATO — 19 maggio 2026
```bash
# Eseguito con:
# pip install git-filter-repo --break-system-packages
# git filter-repo --replace-text replacements.txt --force
# (replacements.txt: "literal:Daniele15!==>literal:REDACTED")
# Verifica: git log --all -p | grep 'Daniele15!' → output vuoto
# NOTA: il remote 'origin' è stato rimosso da git-filter-repo (comportamento atteso).
# Prima di fare push al remote, riaggiungere con:
# git remote add origin https://github.com/ab-audio-tools/gdevents_react.git
```

---

## 9. COMANDI UTILI

### Sviluppo
```bash
npm run dev
# → http://localhost:3000
# Hot reload, ma NON simula il comportamento statico reale.
# Usare per sviluppo UI, non per testare routing/meta.
```

### Build + sitemap
```bash
npm run build
# → next build (compila 16 pagine statiche in /out/)
# → next-sitemap (genera /out/sitemap.xml e /out/robots.txt)
# Usare sempre questo, non "next build" da solo.
```

### Preview build statico
```bash
npx serve out -p 3001
# → http://localhost:3001
# Simula il comportamento reale del sito su Apache.
# Usare QUESTO (non npm run dev) per testare routing, redirect,
# meta tag, structured data, e comportamento SPA fallback.
```

### Aggiungere un servizio
```bash
# 1. Modificare src/data/servicesData.js (aggiungere oggetto all'array)
# 2. Modificare src/utils/seoHelpers.js (aggiungere entry in getServiceKeywords)
# 3. npm run build
# 4. npx serve out  →  verificare /servizi/nuovo-slug/
```

### Aggiungere un articolo blog
```bash
# 1. Aggiungere immagine in public/images/
# 2. Modificare src/data/blogData.js (aggiungere oggetto a defaultArticles)
# 3. npm run build
# 4. npx serve out  →  verificare /blog/nuovo-slug/
```

### Verificare structured data
```
# Tool Google per testare i rich result:
https://search.google.com/test/rich-results

# Tool Schema.org per validare il JSON-LD:
https://validator.schema.org/

# Incollare l'URL della pagina locale (npx serve out) o l'HTML statico.
```

---

*Fine CHANGELOG — ultima modifica: maggio 2026*
