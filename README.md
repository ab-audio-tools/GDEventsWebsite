# GD Events - React Application

## 🎉 Descrizione

Applicazione React moderna per GD Events con animazioni avanzate tramite Framer Motion e GSAP.

## 🚀 Caratteristiche Principali

- ⚡ **Performance**: Costruito con Vite per build veloci
- 🎨 **Animazioni Avanzate**: 
  - Framer Motion per transizioni fluide
  - GSAP per animazioni complesse
  - Effetti parallax e hover interattivi
  - Scroll animations con intersection observer
- 📱 **Responsive Design**: Ottimizzato per tutti i dispositivi
- 🎭 **UI/UX Moderna**: Design neon con effetti glassmorphism
- 🔄 **Navigation Fluida**: Transizioni smooth tra sezioni

## 📦 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Anteprima build
npm run preview
```

## 🏗️ Struttura del Progetto

```
src/
├── components/
│   ├── Loader.jsx          # Schermata di caricamento
│   ├── Cursor.jsx          # Cursore personalizzato
│   ├── Navigation.jsx      # Menu di navigazione
│   ├── Header.jsx          # Hero section
│   ├── Services.jsx        # Sezione skills
│   ├── ServicesGallery.jsx # Galleria servizi
│   ├── Contact.jsx         # Form contatti
│   └── Footer.jsx          # Footer
├── styles/
│   ├── index.css           # Stili globali
│   ├── App.css             # Stili app
│   ├── Loader.css          # Stili loader
│   ├── Cursor.css          # Stili cursore
│   ├── Navigation.css      # Stili navigation
│   ├── Header.css          # Stili header
│   ├── Services.css        # Stili services
│   ├── ServicesGallery.css # Stili gallery
│   ├── Contact.css         # Stili contact
│   └── Footer.css          # Stili footer
├── App.jsx                 # Componente principale
└── main.jsx               # Entry point

public/
└── images/                 # Risorse statiche
```

## 🎨 Animazioni Implementate

### Framer Motion
- **Page Transitions**: Transizioni fluide tra sezioni
- **Scroll Animations**: Animazioni al scroll con useInView
- **Hover Effects**: Effetti interattivi su hover
- **Stagger Animations**: Animazioni sequenziali per liste
- **Scale & Rotate**: Trasformazioni dinamiche

### GSAP
- **Loader Animation**: Animazione di caricamento
- **Timeline Sequences**: Sequenze complesse di animazioni

### CSS Animations
- **Neon Flicker**: Effetto neon per le lettere
- **Pulse Glow**: Pulsazione per elementi luminosi
- **Parallax**: Effetto parallasse su sfondo video

## 🔧 Tecnologie Utilizzate

- **React 18**: Framework UI
- **Vite**: Build tool ultra-veloce
- **Framer Motion**: Libreria animazioni React
- **GSAP**: Animazioni JavaScript avanzate
- **React Intersection Observer**: Lazy loading e scroll animations

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🎯 Funzionalità

### Header
- Video background con overlay
- Titolo animato con effetto neon
- CTA button con hover animation
- Social media links con rotazione
- Immagine hero con parallax

### Services
- Grid responsiva
- Card con hover effects
- Icone animate
- Effetto glow per elementi speciali

### Gallery
- Layout a mosaico
- Hover zoom con dettagli
- Form integrato sticky
- Colonne scrollabili indipendenti

### Contact
- Form con validazione
- Animazioni sui focus
- Info card interattive
- Icone rotate su hover

### Footer
- Layout multi-colonna
- Links con animazioni
- Info legali GDPR compliant
- Tagline animata

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Note per lo Sviluppo

- [ ] **Immagini**: Le immagini dovrebbero essere collocate in `public/images/` — attualmente molte risorse sono in `src/assets/images/`.
- [x] **Video**: `videobg.mp4` è presente in `src/assets/images/videobg.mp4`. (Opzione: spostare in `public/images/` per servirlo come risorsa statica.)
- [ ] **Performance**: Le animazioni dovrebbero usare GPU acceleration dove possibile (da verificare su componenti specifici).
- [ ] **Accessibilità**: Verificare che tutte le animazioni rispettino `prefers-reduced-motion` su tutti i componenti.

## 🎨 Personalizzazione Colori

Il colore primario (#00d4ff) può essere modificato in `src/styles/index.css` nella variabile `--color-primary`.

## 🚀 Deploy

Per il deploy su produzione:

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`.

## 📧 Contatti

- Email: info@gd-events.it
- Tel: +39 02 49452872
- Via: Via Galvani 36, Settimo Milanese

---

**Made with ❤️ for GD Events**
# gdevents_react
