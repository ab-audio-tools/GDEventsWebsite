/**
 * servicesData.js
 * -----------------------------------------------
 * Scopo: sorgente dati per le 10 pagine servizio del sito.
 *        Ogni oggetto genera una pagina statica in /servizi/[slug]/
 *        tramite getStaticPaths/getStaticProps in pages/servizi/[slug].jsx.
 * Dipendenze: nessuna
 * Esporta: servicesData (array), getServiceBySlug (helper lookup)
 *
 * Struttura di ogni oggetto servizio:
 *   slug            {string}   - URL-friendly, usato da getStaticPaths
 *   name            {string}   - Nome visualizzato nel titolo e nav
 *   seoTitle        {string}   - Title tag SEO ottimizzato (49-60 chars).
 *                                Se assente, [slug].jsx genera il title da name.
 *   category        {string}   - Sottotitolo della hero section
 *   heroImage       {string}   - Path /images/ o URL assoluto (Unsplash)
 *   alt             {string}   - Alt text dell'immagine hero (SEO + accessibilità)
 *   shortDescription{string}   - Meta description della pagina (140-160 chars,
 *                                termina con CTA "Richiedi preventivo.")
 *   overview        {string}   - Testo introduttivo della sezione overview
 *   highlights      {string[]} - Lista di 4 bullet point USP
 *   sections        {object[]} - Array di sezioni approfondimento:
 *                                  title, text, image, imageAlign (left|right)
 */

export const servicesData = [
  {
    slug: 'convention',
    name: 'Convention',
    seoTitle: 'Service AVL Convention e Congressi Milano | GD Events',
    category: 'Soluzioni tecniche per convention e meeting aziendali',
    heroImage: '/images/convention.webp',
    alt: 'Service audio video luci per convention Milano — GD Events',
    shortDescription:
      'Regia audio, video e luci per convention e meeting aziendali a Milano. Sala plenaria, breakout e streaming coordinati da un unico team. Richiedi preventivo.',
    overview:
      `Dalla sala plenaria alle breakout room, progettiamo ogni dettaglio tecnico della tua convention perché il messaggio arrivi chiaro, potente e senza intoppi. Lavoriamo come un'estensione del tuo team: ti affianchiamo nella fase di concept, traduciamo le tue esigenze in impianti concreti e coordiniamo tutta la parte tecnica in loco.`,
    highlights: [
      'Regia audio/video broadcast con monitoraggio in tempo reale',
      'Scenografie luminose dinamiche per stage e platea',
      'Gestione contenuti multimediali, contributi da remoto e ibridi',
      `Assistenza tecnica continua durante l'evento`,
    ],
    sections: [
      {
        title: 'Service AVL completo per convention a Milano',
        text:
          `GD Events gestisce l'intero impianto tecnico per convention e congressi a Milano: sistemi audio line array, video wall ad alta definizione, illuminazione scenica programmabile e regia broadcast professionale. Dalla sala plenaria alle breakout room, un unico interlocutore tecnico per tutto l'evento.`,
        image: '/images/convention.webp',
        imageAlign: 'right',
      },
      {
        title: 'Audio e microfonia per ogni dimensione di sala',
        text:
          `La copertura audio uniforme è il parametro critico di ogni convention. Con sistemi line array e delay tower calibrati sulla geometria della sala, garantiamo chiarezza del parlato a ogni posto. Microfonia wireless professionale, tra cui sistemi Shure e Sennheiser, per relatori, tavole rotonde e sessioni Q&A fino a 12 canali simultanei.`,
        image: '/images/portfolio-second.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Regia video e streaming per eventi ibridi',
        text:
          `Le convention ibride richiedono una regia broadcast, non una semplice webcam. Gestiamo switching video multi-camera, streaming su piattaforme custom o aperte, registrazione multipista e collegamento verso sedi remote. La qualità percepita dai partecipanti da remoto è identica a quella in sala.`,
        image: '/images/post-one.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Scenografia luminosa per ogni format',
        text:
          `GD Events programma scenografie luminose per ogni fase della convention: apertura, panel, pausa, cerimonia di chiusura. Fixture professionali, tra cui ETC e ARRI, per la key light sui relatori; proiettori di grande formato per i contenuti video. Dal palco istituzionale alla convention creativa con video mapping integrato.`,
        image: '/images/portfolio-first.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'stand-fieristici',
    name: 'Stand fieristici',
    category: 'Luce, audio e video per stand che fermano le persone',
    heroImage: '/images/stand_fiera.webp',
    alt: 'Allestimento tecnico stand fieristico con illuminazione professionale',
    shortDescription:
      `Stand fieristici con illuminazione LED, schermi e audio calibrati per catturare l'attenzione in fiera. Service tecnico AVL a Milano. Richiedi preventivo.`,
    overview:
      `In fiera competi per pochi secondi di attenzione. Per questo progettiamo la parte tecnica dello stand come un'esperienza immersiva: luce che guida lo sguardo, contenuti video che spiegano senza annoiare, audio calibrato per essere presente ma mai invadente.`,
    highlights: [
      'Illuminazione architetturale e di prodotto con tecnologia LED',
      'Schermi, totem e videowall integrati nel progetto di stand',
      'Programmazione scenari luce per diverse fasi della giornata',
      'Supporto tecnico completo per tutta la durata della fiera',
    ],
    sections: [
      {
        title: 'Allestimento tecnico AVL per stand fieristici',
        text:
          `GD Events progetta e installa impianti audio, video e luci per stand fieristici a Milano — Fiera Milano Rho, Fiera Milano City, Superstudio e altri spazi espositivi. Illuminazione scenografica con fixture professionali, display LED e gestione multimediale centralizzata. Sopralluogo tecnico incluso nel servizio.`,
        image: '/images/stand_fiera.webp',
        imageAlign: 'left',
      },
      {
        title: 'Illuminazione che valorizza il prodotto',
        text:
          `La luce di uno stand non illumina lo spazio: illumina il prodotto. Progettiamo temperatura colore e direzione dell'illuminazione in base alla natura dell'oggetto esposto — materiali riflettenti, tessuti, schermi, superfici opache. Fixture professionali, tra cui ARRI e ETC, per key light e illuminazione perimetrale.`,
        image: '/images/vetrina.webp',
        imageAlign: 'right',
      },
      {
        title: 'Sistemi video e multimediale integrati',
        text:
          `GD Events integra sistemi video e multimediale per stand fieristici: video wall LED ad alta definizione per contenuti dinamici, monitor per presentazioni interattive, diffusione audio con sistemi a bassa dispersione. Controllo centralizzato aggiornabile in autonomia durante la fiera.`,
        image: '/images/portfolio-third.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'concerti',
    name: 'Concerti',
    seoTitle: 'Service Audio e Luci Concerti Live Milano | GD Events',
    category: 'Impianti audio, luci e video per live show',
    heroImage: '/images/concert.webp',
    alt: 'Service audio line array e luci per concerto live Milano',
    shortDescription:
      'Line array, luci motorizzate, video mapping e special effects per live show di qualità. Service audio video luci concerti a Milano. Richiedi preventivo.',
    overview:
      `Che si tratti di un piccolo palco o di un grande concerto, l'obiettivo è lo stesso: far vivere al pubblico uno show potente e pulito. Progettiamo impianti audio, luci e video su misura dello spazio, del genere musicale e del tipo di pubblico, coordinando tutta la parte tecnica con produzione e artisti.`,
    highlights: [
      'Impianti audio line array e monitoraggio palco',
      'Lighting design con teste mobili, beam, wash e special',
      'Schermi LED e contenuti video sincronizzati con la musica',
      'Tecnici specializzati in tour, festival e corporate show',
    ],
    sections: [
      {
        title: 'Service audio e luci per concerti live a Milano',
        text:
          `GD Events fornisce il service tecnico completo per concerti live a Milano e in Lombardia: line array dimensionato sulla venue, console digitale in FOH e monitor, teste mobili e wash professionali, console DMX per il disegno luci. Dall'indie club ai concerti open air da diverse migliaia di persone.`,
        image: '/images/concert.webp',
        imageAlign: 'right',
      },
      {
        title: 'Impianto audio su misura per ogni venue',
        text:
          `Un sistema audio per 300 persone è diverso da uno per 3.000. Calcoliamo la copertura SPL in base al volume della venue, al tempo di riverberazione e alla posizione del pubblico. Monitor, sidefill e delay per la coda del pubblico: ogni musicista sente esattamente quello che gli serve, ovunque si trovi sul palco.`,
        image: '/images/post-two.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Luci e video per il live show',
        text:
          `GD Events progetta il sistema luci e video per live show: teste mobili professionali, tra cui modelli Robe e Clay Paky, PAR LED per il wash, strobo e effetti per i momenti ad alto impatto. Video mapping su scenografie custom, LED wall dietro palco, ripresa multi-camera per l'IMAG.`,
        image: '/images/post-three.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Dalla produzione al post-show',
        text:
          `Collaboriamo con il tour manager dalla fase di advance: rider tecnico, planimetria palco, lista materiali e orari di carico. Tecnici dedicati per audio, monitor, luci e video. Per tour nazionali gestiamo date consecutive con lo stesso setup.`,
        image: '/images/post-four.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'illuminazione-architetturale',
    name: 'Illuminazione architetturale',
    category: 'Luce per facciate, edifici storici e installazioni urbane',
    heroImage: '/images/illum_arch.webp',
    alt: 'Illuminazione architetturale su edificio storico con LED RGB',
    shortDescription:
      'Progetti di illuminazione LED per facciate ed edifici a Milano e Lombardia. Scenari dinamici DMX e risparmio energetico certificato. Richiedi preventivo.',
    overview:
      `Un edificio illuminato bene cambia la percezione di uno spazio intero. Usiamo tecnologia LED, ottiche dedicate e controllo digitale per creare scenari statici o dinamici che rispettano l'architettura e valorizzano i dettagli.`,
    highlights: [
      'Studi di luce dedicati per facciate e volumi',
      'Progettazione di scenari fissi e dinamici DMX',
      'Soluzioni temporanee per eventi e installazioni permanenti',
      'Consulenza su consumi, manutenzione e affidabilità',
    ],
    sections: [
      {
        title: 'Illuminazione architetturale per edifici e spazi',
        text:
          `GD Events progetta e installa sistemi di illuminazione architetturale per facciate, monumenti, spazi pubblici e interni commerciali a Milano e in Lombardia. Fixture professionali, tra cui ETC e ARRI, per installazioni permanenti; sistemi LED RGB dinamici per effetti cromatici programmabili. Interventi da poche decine di metri quadri fino a edifici interi.`,
        image: '/images/illum_arch.webp',
        imageAlign: 'left',
      },
      {
        title: 'Progettazione illuminotecnica',
        text:
          `Un progetto architetturale inizia dall'analisi delle superfici: materiale, colore, orientamento e distanza dal proiettore. Elaboriamo rendering illuminotecnici in 3D prima di ogni installazione, calcoliamo illuminamento in lux e uniformità e ottimizziamo il consumo energetico. Documentazione tecnica completa fornita a fine lavori.`,
        image: '/images/portfolio-fourth.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Installazioni permanenti e scenografiche',
        text:
          `GD Events realizza installazioni luminose architetturali permanenti con fixture certificate IP65/IP67 per esterni, driver LED con vita stimata di 50.000 ore e sistemi di controllo DMX512 o DALI. Per eventi temporanei: proiezione GOBO su facciate, illuminazione RGB dinamica sincronizzata ed effetti speciali per inaugurazioni e opening.`,
        image: '/images/post-one.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'installazioni-fisse',
    name: 'Installazioni fisse',
    seoTitle: 'Impianti Audio Video Permanenti Milano | GD Events',
    category: 'Impianti permanenti per sale conferenze, teatri e spazi aziendali',
    heroImage: '/images/fixed.webp',
    alt: 'Impianto audio video fisso per auditorium Milano',
    shortDescription:
      'Impianti audio, luci e video permanenti per sale conferenze e auditorium a Milano. Progettazione, installazione e manutenzione incluse. Richiedi preventivo.',
    overview:
      `Quando un impianto è fisso, deve essere affidabile, semplice da usare e aggiornabile nel tempo. Ti accompagniamo dalla scelta delle tecnologie alla posa in opera, passando per la formazione del personale e la manutenzione programmata.`,
    highlights: [
      'Progettazione completa di impianti audio, luci e video',
      'Integrazione con sistemi di controllo esistenti',
      'Formazione del personale interno',
      'Assistenza e manutenzione nel tempo',
    ],
    sections: [
      {
        title: 'Impianti audio video fissi per spazi permanenti',
        text:
          `GD Events progetta e installa impianti audio, video e luci permanenti per auditorium, sale conferenze, spazi polifunzionali e luoghi di culto a Milano e in Lombardia. Sistemi line array, colonna o diffusori a soffitto, processori DSP, controllo remoto da tablet o pannello a muro. Garanzia e manutenzione incluse post-installazione.`,
        image: '/images/fixed.webp',
        imageAlign: 'right',
      },
      {
        title: 'Dal progetto alla manutenzione',
        text:
          `Non ci fermiamo al collaudo. Possiamo affiancarti anche dopo l'installazione con verifiche periodiche, aggiornamenti firmware e sostituzioni programmate, così l'impianto resta performante nel tempo.`,
        image: '/images/post-three.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'produzione-eventi',
    name: 'Produzione eventi',
    category: 'Regia tecnica completa per eventi aziendali e brand experience',
    heroImage: '/images/produzione_eventi.webp',
    alt: 'Regia tecnica eventi con sistema broadcast professionale',
    shortDescription:
      'Regia tecnica completa con un unico referente per coordinare audio, luci, video e fornitori a Milano. Dal brief alla messa in scena. Richiedi preventivo.',
    overview:
      `Quando l'evento cresce, cresce anche la complessità. Coordiniamo per te tutta la parte tecnica: audio, luci, video, strutture, tempi di allestimento e prove. Un unico interlocutore per trasformare la tua idea in un evento reale, solido e realizzabile.`,
    highlights: [
      'Sopralluoghi tecnici e studio di fattibilità',
      'Coordinamento di fornitori e maestranze',
      'Regia tecnica unica per tutte le fasi',
      'Reportistica e documentazione di sicurezza',
    ],
    sections: [
      {
        title: 'Direzione tecnica e produzione eventi',
        text:
          `GD Events si occupa della direzione tecnica completa per eventi di medio e grande formato a Milano: coordinamento audio, luci, video e scenografia da un unico referente tecnico. Gestione fornitori, planimetrie, rider, sopralluoghi, prove generali e regia live. Dal progetto su carta all'evento in piedi.`,
        image: '/images/post-four.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Un unico referente tecnico',
        text:
          `Durante l'evento, parli con una sola regia che coordina tutti: service audio con sistemi line array, luci, video con regia broadcast, venue e performer. Questo riduce errori, tempi morti e fraintendimenti, lasciandoti spazio per seguire ospiti e contenuti.`,
        image: '/images/post-five.jpg',
        imageAlign: 'right',
      },
    ],
  },
  {
    slug: 'eventi-aziendali',
    name: 'Eventi aziendali',
    category: 'Soluzioni tecniche per eventi corporate e format istituzionali',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
    alt: 'Service audio video per evento aziendale corporate Milano',
    shortDescription:
      'Audio, luci e video per eventi aziendali e meeting corporate a Milano. Regia tecnica, scenografie e brand experience su misura. Richiedi preventivo.',
    overview:
      `Meeting, convention interne, lanci prodotto o anniversari: ogni evento corporate ha obiettivi chiari e poco margine d'errore. Coordiniamo la parte tecnica con un approccio ordinato e misurabile, così tu puoi concentrarti sui contenuti e sui tuoi ospiti.`,
    highlights: [
      'Regia tecnica e coordinamento tempi di scaletta',
      'Impianti audio e video calibrati per speech e presentazioni',
      'Lighting design elegante e coerente con il brand',
      `Supporto tecnico on site per tutta la durata evento`,
    ],
    sections: [
      {
        title: 'Service tecnico AVL per eventi corporate',
        text:
          `GD Events gestisce audio, video e luci per eventi aziendali a Milano: lanci di prodotto, team building, cene di gala, presentazioni e opening. Sistema audio professionale, video proiezione o LED wall, regia audio digitale e illuminazione scenica programmabile. Dal briefing al breakdown, un solo referente.`,
        image: '/images/post-four.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Scenografia tecnica su brand',
        text:
          `Ogni evento aziendale ha un'identità visiva da rispettare. Declichiamo l'illuminazione sui colori del brand, integriamo contenuti video con motion graphic e loghi e costruiamo transizioni sceniche tra i momenti della serata. Per i lanci prodotto: rivelazione programmata, audio sincronizzato al video, effetti coordinati su schermo e ambiente.`,
        image: '/images/portfolio-third.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Coordinamento tecnico end-to-end',
        text:
          `Un unico referente tecnico GD Events coordina tutte le forniture: audio, luci, video e streaming. Nessuna frammentazione tra fornitori, nessun rimbalzo sugli imprevisti. Sopralluogo tecnico incluso, rider disponibile per agenzie e venue, assistenza on-site dall'allestimento al breakdown.`,
        image: '/images/post-five.jpg',
        imageAlign: 'right',
      },
    ],
  },
  {
    slug: 'teatro',
    name: 'Teatro',
    seoTitle: 'Service Luci e Audio per Teatro Milano | GD Events',
    category: 'Luci, audio e video per spettacoli teatrali e performance live',
    heroImage: 'https://images.unsplash.com/photo-1558970439-add78fc68990?q=80&w=1600',
    alt: 'Illuminazione scenica programmabile per spettacolo teatrale Milano',
    shortDescription:
      'Lighting design, regia audio e supporto tecnico per spettacoli a Milano. Scene DMX programmabili e tecnici presenti a ogni replica. Richiedi preventivo.',
    overview:
      `Nel teatro la tecnica deve esaltare la narrazione senza sovrastarla. Studiamo la luce come parte della regia artistica e garantiamo un audio pulito, controllato e coerente con il lavoro della compagnia.`,
    highlights: [
      'Lighting design con scene dinamiche e atmosfere dedicate',
      'Microfonia e rinforzo voce per dialoghi sempre intelligibili',
      'Regia tecnica in sinergia con regista e direttore di scena',
      'Supporto prove e repliche con team tecnico dedicato',
    ],
    sections: [
      {
        title: 'Service tecnico per teatro e spettacoli dal vivo',
        text:
          `GD Events fornisce service audio, luci e video per spettacoli teatrali a Milano: impianto PA con diffusori a bassa visibilità, console digitale per il mix front-of-house, illuminazione scenica con fixture professionali — tra cui ETC e Robe — e console DMX per la programmazione delle scene. Tecnici presenti a ogni replica.`,
        image: '/images/post-one.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Disegno luci e programmazione scenica',
        text:
          `Un disegno luci teatrale richiede decine di scene memorizzate e richiamate con precisione. Programmiamo fixture profilati per key e backlight, teste mobili per effetti dinamici, ciclorama LED per i fondali cromatici. Showfile dedicato allo spettacolo, consegnato al teatro al termine delle prove.`,
        image: '/images/post-two.jpg',
        imageAlign: 'right',
      },
    ],
  },
  {
    slug: 'vetrine',
    name: 'Vetrine',
    seoTitle: 'Illuminazione Vetrine e Retail Milano | GD Events',
    category: 'Illuminazione retail per valorizzare prodotti e brand identity',
    heroImage: '/images/vetrina.webp',
    alt: 'Illuminazione LED professionale per vetrina retail Milano',
    shortDescription:
      `Illuminazione LED per vetrine retail a Milano: luce d'accento, RGB e scenari stagionali programmabili. Valorizza prodotti e brand identity. Richiedi preventivo.`,
    overview:
      `La vetrina è il primo contatto con il cliente. Disegniamo soluzioni di illuminazione LED con fixture professionali, scenari dinamici che esaltano materiali, colori e storytelling del brand, ottimizzando consumi e manutenzione.`,
    highlights: [
      `Illuminazione d'accento per prodotti e manichini`,
      'Gestione colori RGB per campagne stagionali',
      'Ottiche dedicate per ridurre abbagliamento e riflessi',
      'Soluzioni a basso consumo e alta affidabilità',
    ],
    sections: [
      {
        title: 'Illuminazione professionale per vetrine e retail',
        text:
          `GD Events progetta e installa l'illuminazione per vetrine, showroom e spazi retail a Milano: fixture professionali, tra cui ARRI e ETC, per la key light sul prodotto; LED strip per l'ambientazione perimetrale; sistemi di controllo centralizzato DALI o DMX. Sopralluogo incluso, installazione rapida, documentazione tecnica per il team del punto vendita.`,
        image: '/images/portfolio-second.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Scenari luce per campagne e stagioni',
        text:
          `Con sistemi di controllo digitale puoi cambiare atmosfera in base a promozioni o periodi dell'anno. La vetrina resta sempre attuale senza interventi invasivi.`,
        image: '/images/portfolio-fourth.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'eventi-privati',
    name: 'Eventi privati',
    category: 'Allestimenti tecnici per matrimoni, feste e celebrazioni',
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80',
    alt: 'Service audio e luci per matrimoni ed eventi privati Milano',
    shortDescription:
      'Audio, luci e scenografie per matrimoni e cerimonie a Milano. Atmosfere personalizzate, allestimenti eleganti e tecnici discreti. Richiedi preventivo.',
    overview:
      `Un evento privato deve essere personale e impeccabile. Ci occupiamo di audio, luci e scenografie con un approccio sartoriale, valorizzando location e stile dell'evento senza trasformarlo in un set "freddo".`,
    highlights: [
      `Luci d'atmosfera e scenari personalizzati`,
      'Audio calibrato per musica, speech e momenti speciali',
      'Soluzioni discrete per location storiche o residenziali',
      `Assistenza tecnica completa durante l'evento`,
    ],
    sections: [
      {
        title: 'Service audio, luci e video per matrimoni',
        text:
          `GD Events cura l'impianto tecnico per matrimoni ed eventi privati a Milano e in Lombardia: audio ambientale per la cerimonia, sistema audio per il ricevimento, illuminazione d'atmosfera con fixture professionali, microfonia wireless per gli speech. Coordinamento diretto con location, fotografo e wedding planner.`,
        image: '/images/post-three.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Illuminazione che racconta la serata',
        text:
          `La luce di un matrimonio cambia con il ritmo della sera: calda e soffusa durante la cena, dinamica e cromatica per il ballo. Scene memorizzate e richiamate al momento giusto — uplighting perimetrale, wash colore sulle pareti, effetti sul dancefloor. Ogni ambiente è progettato nel dettaglio prima del giorno.`,
        image: '/images/post-five.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Audio per ogni momento',
        text:
          `GD Events gestisce l'audio per ogni momento del matrimonio: microfonia wireless a doppio canale per gli speech, diffusione audio distribuita per la cerimonia, sistema DJ per il ricevimento calibrato sulla venue. Nessun feedback, nessuna sorpresa tecnica.`,
        image: '/images/post-two.jpg',
        imageAlign: 'left',
      },
    ],
  },
];

/**
 * getServiceBySlug
 * Cerca e restituisce un oggetto servizio dallo slug URL.
 * Usato in getStaticProps di pages/servizi/[slug].jsx.
 *
 * @param {string} slug - Slug del servizio (es. 'convention')
 * @returns {object|undefined} Oggetto servizio o undefined se non trovato
 */
export function getServiceBySlug(slug) {
  return servicesData.find((service) => service.slug === slug);
}
