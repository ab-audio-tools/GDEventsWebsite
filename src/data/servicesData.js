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
 *   category        {string}   - Sottotitolo della hero section
 *   heroImage       {string}   - Path /images/ o URL assoluto (Unsplash)
 *   shortDescription{string}   - Meta description della pagina (140-160 chars,
 *                                termina con CTA "Richiedi preventivo.")
 *   overview        {string}   - Testo introduttivo della sezione overview
 *   highlights      {string[]} - Lista di 4 bullet point USP
 *   sections        {object[]} - Array di 2 sezioni approfondimento:
 *                                  title, text, image, imageAlign (left|right)
 */

export const servicesData = [
  {
    slug: 'convention',
    name: 'Convention',
    category: 'Soluzioni tecniche per convention e meeting aziendali',
    heroImage: '/images/convention.jpeg',
    shortDescription:
      'Regia audio, video e luci per convention e meeting aziendali a Milano. Sala plenaria, breakout e streaming coordinati da un unico team. Richiedi preventivo.',
    overview:
      'Dalla sala plenaria alle breakout room, progettiamo ogni dettaglio tecnico della tua convention perché il messaggio arrivi chiaro, potente e senza intoppi. Lavoriamo come un’estensione del tuo team: ti affianchi nella fase di concept, traduciamo le tue esigenze in impianti concreti e coordiniamo tutta la parte tecnica in loco.',
    highlights: [
      'Regia audio/video broadcast con monitoraggio in tempo reale',
      'Scenografie luminose dinamiche per stage e platea',
      'Gestione contenuti multimediali, contributi da remoto e ibridi',
      'Assistenza tecnica continua durante l’evento',
    ],
    sections: [
      {
        title: 'Un palco che funziona come una regia TV',
        text:
          'Per una convention non basta “sentire” e “vedere” bene. Serve coerenza tra contenuti, luce, audio e tempi. Progettiamo il palco come se fosse un set televisivo: regia tecnica dedicata, scaletta condivisa, controllo puntuale di ogni intervento. Così chi è in sala percepisce un evento fluido, professionale, senza tempi morti.',
        image: '/images/convention.jpeg',
        imageAlign: 'right',
      },
      {
        title: 'Tecnologia silenziosa, esperienza memorabile',
        text:
          `Dietro ogni convention di successo c’è una tecnologia che non si nota, ma fa la differenza: microfonia wireless Shure o Sennheiser per relatori e tavole rotonde, distribuzione video su più schermi, regia broadcast con switcher Blackmagic Design per streaming e registrazione. Ci occupiamo di tutto noi, dalla progettazione ai test pre-evento, fino al supporto live.`,
        image: '/images/portfolio-second.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'stand-fieristici',
    name: 'Stand fieristici',
    category: 'Luce, audio e video per stand che fermano le persone',
    heroImage: '/images/stand_fiera.jpeg',
    shortDescription:
      "Stand fieristici con illuminazione LED, schermi e audio calibrati per catturare l’attenzione in fiera. Service tecnico AVL a Milano. Richiedi preventivo.",
    overview:
      'In fiera competi per pochi secondi di attenzione. Per questo progettiamo la parte tecnica dello stand come un’esperienza immersiva: luce che guida lo sguardo, contenuti video che spiegano senza annoiare, audio calibrato per essere presente ma mai invadente.',
    highlights: [
      'Illuminazione architetturale e di prodotto con tecnologia LED',
      'Schermi, totem e videowall integrati nel progetto di stand',
      'Programmazione scenari luce per diverse fasi della giornata',
      'Supporto tecnico completo per tutta la durata della fiera',
    ],
    sections: [
      {
        title: 'Valorizziamo prodotti e materiali',
        text:
          'Ogni prodotto ha bisogno della luce giusta per rendere al meglio. Studiamo temperatura colore, intensità e angoli di proiezione per valorizzare superfici, finiture e volumi. L’obiettivo è uno: fermare le persone davanti al tuo stand e farle restare.',
        image: '/images/vetrina.jpeg',
        imageAlign: 'left',
      },
      {
        title: 'Esperienze multimediali integrate',
        text:
          'Non ci limitiamo a “portare schermi”. Disegniamo flussi di contenuti coerenti con il tuo brand: LED wall ad alta definizione, loop video e motion graphics gestiti da regia Blackmagic Design, pensati per accompagnare il lavoro del tuo staff commerciale.',
        image: '/images/portfolio-third.jpg',
        imageAlign: 'right',
      },
    ],
  },
  {
    slug: 'concerti',
    name: 'Concerti',
    category: 'Impianti audio, luci e video per live show',
    heroImage: '/images/concert.jpeg',
    shortDescription:
      'Line array, luci motorizzate, video mapping e special effects per live show di qualità. Service audio video luci concerti a Milano. Richiedi preventivo.',
    overview:
      'Che si tratti di un piccolo palco o di un grande concerto, l’obiettivo è lo stesso: far vivere al pubblico uno show potente e pulito. Progettiamo impianti audio, luci e video su misura dello spazio, del genere musicale e del tipo di pubblico, coordinando tutta la parte tecnica con produzione e artisti.',
    highlights: [
      'Impianti audio line array e monitoraggio palco',
      'Lighting design con teste mobili, beam, wash e special',
      'Schermi LED e contenuti video sincronizzati con la musica',
      'Tecnici specializzati in tour, festival e corporate show',
    ],
    sections: [
      {
        title: 'Un suono che arriva ovunque',
        text:
          `Analizziamo il luogo del concerto e modelliamo la diffusione sonora perché ogni persona, dalla prima all’ultima fila, riceva un ascolto equilibrato. Utilizziamo line array L-Acoustics o d&b audiotechnik, gestiti da console DiGiCo o Yamaha. Dal dimensionamento al tuning finale, seguiamo tutto in modo calibrato.`,
        image: '/images/post-one.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Luci che seguono la musica',
        text:
          'Costruiamo un light design che dialoga con la scaletta: fixture Clay Paky e Robe per beam e wash, programmati su console GrandMA. Accenti sui momenti chiave, gestione live in regia: il risultato è uno show dove luce, musica e video sono realmente sincronizzati.',
        image: '/images/post-two.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'illuminazione-architetturale',
    name: 'Illuminazione architetturale',
    category: 'Luce per facciate, edifici storici e installazioni urbane',
    heroImage: '/images/illum_arch.jpeg',
    shortDescription:
      'Progetti di illuminazione LED per facciate ed edifici a Milano e Lombardia. Scenari dinamici DMX e risparmio energetico certificato. Richiedi preventivo.',
    overview:
      'Un edificio illuminato bene cambia la percezione di uno spazio intero. Usiamo tecnologia LED, ottiche dedicate e controllo digitale per creare scenari statici o dinamici che rispettano l’architettura e valorizzano i dettagli.',
    highlights: [
      'Studi di luce dedicati per facciate e volumi',
      'Progettazione di scenari fissi e dinamici DMX',
      'Soluzioni temporanee per eventi e installazioni permanenti',
      'Consulenza su consumi, manutenzione e affidabilità',
    ],
    sections: [
      {
        title: 'Valorizzare senza snaturare',
        text:
          `Partiamo sempre dall’architettura: linee, materiali, storia del luogo. Utilizziamo fixture LED ETC e ARRI per esaltare superfici e volumi con luce precisa e uniforme, disegnando una nuova atmosfera rispettosa dei dettagli e d’impatto visivo.`,
        image: '/images/illum_arch.jpeg',
        imageAlign: 'left',
      },
      {
        title: 'Controllo digitale e scenari dinamici',
        text:
          'Grazie a centraline DMX e sistemi di controllo da remoto, è possibile programmare scene diverse per orari, eventi speciali o stagioni. Cambia il racconto visivo dell’edificio con un click, mantenendo sempre coerenza progettuale.',
        image: '/images/portfolio-fourth.jpg',
        imageAlign: 'right',
      },
    ],
  },
  {
    slug: 'installazioni-fisse',
    name: 'Installazioni fisse',
    category: 'Impianti permanenti per sale conferenze, teatri e spazi aziendali',
    heroImage: '/images/fixed.jpeg',
    shortDescription:
      'Impianti audio, luci e video permanenti per sale conferenze e auditorium a Milano. Progettazione, installazione e manutenzione incluse. Richiedi preventivo.',
    overview:
      'Quando un impianto è fisso, deve essere affidabile, semplice da usare e aggiornabile nel tempo. Ti accompagniamo dalla scelta delle tecnologie alla posa in opera, passando per la formazione del personale e la manutenzione programmata.',
    highlights: [
      'Progettazione completa di impianti audio, luci e video',
      'Integrazione con sistemi di controllo esistenti',
      'Formazione del personale interno',
      'Assistenza e manutenzione nel tempo',
    ],
    sections: [
      {
        title: 'Tecnologia al servizio degli spazi',
        text:
          `Ogni sala ha esigenze diverse: conferenze, spettacoli, meeting ibridi, formazione. Selezioniamo componenti adatti all’uso reale: diffusori d&b audiotechnik per un audio uniforme, microfonia Shure integrata e sistemi di controllo semplici da gestire ogni giorno.`,
        image: '/images/fixed.jpeg',
        imageAlign: 'right',
      },
      {
        title: 'Dal progetto alla manutenzione',
        text:
          'Non ci fermiamo al collaudo. Possiamo affiancarti anche dopo l’installazione con verifiche periodiche, aggiornamenti firmware e sostituzioni programmate, così l’impianto resta performante nel tempo.',
        image: '/images/post-three.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'produzione-eventi',
    name: 'Produzione eventi',
    category: 'Regia tecnica completa per eventi aziendali e brand experience',
    heroImage: '/images/produzione_eventi.jpeg',
    shortDescription:
      'Regia tecnica completa con un unico referente per coordinare audio, luci, video e fornitori a Milano. Dal brief alla messa in scena. Richiedi preventivo.',
    overview:
      'Quando l’evento cresce, cresce anche la complessità. Coordiniamo per te tutta la parte tecnica: audio, luci, video, strutture, tempi di allestimento e prove. Un unico interlocutore per trasformare la tua idea in un evento reale, solido e realizzabile.',
    highlights: [
      'Sopralluoghi tecnici e studio di fattibilità',
      'Coordinamento di fornitori e maestranze',
      'Regia tecnica unica per tutte le fasi',
      'Reportistica e documentazione di sicurezza',
    ],
    sections: [
      {
        title: 'Dal brief alla messa in scena',
        text:
          'Partiamo dal tuo brief e lo traduciamo in una pianta tecnica, una timeline e una lista di attrezzature. Ogni scelta è condivisa, trasparente e motivata, così sai sempre dove stanno andando budget e risorse.',
        image: '/images/post-four.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Un unico referente tecnico',
        text:
          `Durante l’evento, parli con una sola regia che coordina tutti: service audio con line array L-Acoustics, luci, video con switcher Blackmagic Design, venue e performer. Questo riduce errori, tempi morti e fraintendimenti, lasciandoti spazio per seguire ospiti e contenuti.`,
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
    shortDescription:
      'Audio, luci e video per eventi aziendali e meeting corporate a Milano. Regia tecnica, scenografie e brand experience su misura. Richiedi preventivo.',
    overview:
      'Meeting, convention interne, lanci prodotto o anniversari: ogni evento corporate ha obiettivi chiari e poco margine d’errore. Coordiniamo la parte tecnica con un approccio ordinato e misurabile, così tu puoi concentrarti sui contenuti e sui tuoi ospiti.',
    highlights: [
      'Regia tecnica e coordinamento tempi di scaletta',
      'Impianti audio e video calibrati per speech e presentazioni',
      'Lighting design elegante e coerente con il brand',
      'Supporto tecnico on site per tutta la durata evento',
    ],
    sections: [
      {
        title: 'Focus sulla comunicazione',
        text:
          'Ogni parola deve arrivare chiara, ogni slide deve essere leggibile. Lavoriamo con microfonia wireless Shure e Sennheiser per relatori e panel, diffusori d&b audiotechnik calibrati sulla sala e LED wall ad alta definizione, visibili anche con luci ambiente accese.',
        image: '/images/post-four.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Scenografie sobrie ma d’impatto',
        text:
          'Un evento corporate efficace è elegante, pulito e riconoscibile. Creiamo scenografie luminose e layout tecnici coerenti con la brand identity, senza eccessi ma con un forte senso di qualità percepita.',
        image: '/images/portfolio-third.jpg',
        imageAlign: 'left',
      },
    ],
  },
  {
    slug: 'teatro',
    name: 'Teatro',
    category: 'Luci, audio e video per spettacoli teatrali e performance live',
    heroImage: 'https://images.unsplash.com/photo-1558970439-add78fc68990?q=80&w=1600',
    shortDescription:
      'Lighting design, regia audio e supporto tecnico per spettacoli a Milano. Scene DMX programmabili e tecnici presenti a ogni replica. Richiedi preventivo.',
    overview:
      'Nel teatro la tecnica deve esaltare la narrazione senza sovrastarla. Studiamo la luce come parte della regia artistica e garantiamo un audio pulito, controllato e coerente con il lavoro della compagnia.',
    highlights: [
      'Lighting design con scene dinamiche e atmosfere dedicate',
      'Microfonia e rinforzo voce per dialoghi sempre intelligibili',
      'Regia tecnica in sinergia con regista e direttore di scena',
      'Supporto prove e repliche con team tecnico dedicato',
    ],
    sections: [
      {
        title: 'Luci che raccontano',
        text:
          'Ogni cambio scena è un passaggio emotivo. Lavoriamo con fixture ETC e Clay Paky, programmati su console ChamSys o GrandMA, per costruire cue luce con sfumature e contrasti che valorizzano volti, costumi e scenografie.',
        image: '/images/post-one.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Audio pulito, presenza naturale',
        text:
          'Gestiamo microfonia wireless Sennheiser e diffusione sonora in modo trasparente: il pubblico deve percepire la voce come naturale, senza perdere parole né dinamiche. Questo richiede tarature precise e presenza tecnica costante a ogni replica.',
        image: '/images/post-two.jpg',
        imageAlign: 'right',
      },
    ],
  },
  {
    slug: 'vetrine',
    name: 'Vetrine',
    category: 'Illuminazione retail per valorizzare prodotti e brand identity',
    heroImage: '/images/vetrina.jpeg',
    shortDescription:
      "Illuminazione LED per vetrine retail a Milano: luce d'accento, RGB e scenari stagionali programmabili. Valorizza prodotti e brand identity. Richiedi preventivo.",
    overview:
      'La vetrina è il primo contatto con il cliente. Disegniamo soluzioni di illuminazione LED con fixture ADJ ed ETC, scenari dinamici che esaltano materiali, colori e storytelling del brand, ottimizzando consumi e manutenzione.',
    highlights: [
      'Illuminazione d’accento per prodotti e manichini',
      'Gestione colori RGB per campagne stagionali',
      'Ottiche dedicate per ridurre abbagliamento e riflessi',
      'Soluzioni a basso consumo e alta affidabilità',
    ],
    sections: [
      {
        title: 'Il prodotto al centro',
        text:
          'Studiamo angoli e intensità per mettere in risalto texture e forme. L’illuminazione diventa una guida visiva che orienta lo sguardo e rende i prodotti desiderabili.',
        image: '/images/portfolio-second.jpg',
        imageAlign: 'right',
      },
      {
        title: 'Scenari luce per campagne e stagioni',
        text:
          'Con sistemi di controllo digitale puoi cambiare atmosfera in base a promozioni o periodi dell’anno. La vetrina resta sempre attuale senza interventi invasivi.',
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
    shortDescription:
      'Audio, luci e scenografie per matrimoni e cerimonie a Milano. Atmosfere personalizzate, allestimenti eleganti e tecnici discreti. Richiedi preventivo.',
    overview:
      'Un evento privato deve essere personale e impeccabile. Ci occupiamo di audio, luci e scenografie con un approccio sartoriale, valorizzando location e stile dell’evento senza trasformarlo in un set “freddo”.',
    highlights: [
      'Luci d’atmosfera e scenari personalizzati',
      'Audio calibrato per musica, speech e momenti speciali',
      'Soluzioni discrete per location storiche o residenziali',
      'Assistenza tecnica completa durante l’evento',
    ],
    sections: [
      {
        title: 'Atmosfere su misura',
        text:
          'Dal primo brindisi al taglio torta, ogni momento ha la sua luce e il suo suono. Lavoriamo con fixture ADJ per le atmosfere e microfonia Shure per speech e musica, così nulla si perde e niente stona. Ogni scena è studiata per valorizzare spazi e persone.',
        image: '/images/post-three.jpg',
        imageAlign: 'left',
      },
      {
        title: 'Tecnica discreta, risultato elegante',
        text:
          'La tecnologia non deve rubare la scena. Utilizziamo cablaggi nascosti, apparecchi compatti e setup puliti per mantenere l’eleganza della location.',
        image: '/images/post-five.jpg',
        imageAlign: 'right',
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

