/**
 * faqData.js
 * -----------------------------------------------
 * Scopo: array di domande e risposte FAQ per GD Events.
 * Dipendenze: nessuna
 * Esporta: faqData
 *
 * Utilizzo doppio:
 *   1. UI — componente FAQ nella homepage (accordion visuale)
 *   2. SEO — getFAQSchema() in seoHelpers.js genera il JSON-LD FAQPage
 *      che abilita le risposte espanse direttamente in Google SERP
 *      e aumenta la probabilità di citazione da AI (SGE, Gemini, ChatGPT).
 *
 * Regola redazionale: ogni risposta deve restare sotto ~80 parole
 * per massimizzare la leggibilità e la citabilità da parte dei modelli AI.
 * Risposte più lunghe vengono troncate nei featured snippet.
 */
export const faqData = [
  {
    question: 'Quanto costa un service audio video luci per un evento a Milano?',
    answer: `Il costo dipende da tipo di evento, dimensioni della location, durata e attrezzature necessarie. Un service audio per una sala congressi fino a 200 persone ha esigenze diverse da un concerto o da uno stand fieristico. Per questo lavoriamo sempre con preventivi tecnici personalizzati, non con listini generici. Contattateci: rispondiamo entro 24 ore con una proposta su misura.`,
  },
  {
    question: 'Quali servizi offre GD Events?',
    answer: `GD Events offre soluzioni tecniche complete AVL (audio, video, luci) per convention, concerti, stand fieristici, illuminazione architetturale, installazioni fisse, produzione eventi, eventi aziendali, teatro, vetrine ed eventi privati come matrimoni.`,
  },
  {
    question: 'In quali zone operate?',
    answer: `Siamo basati a Settimo Milanese (MI) e operiamo principalmente a Milano e in tutta la Lombardia. Lavoriamo regolarmente anche in Piemonte, Veneto, Liguria e nelle zone di confine con la Svizzera. Contattateci per verificare la disponibilità.`,
  },
  {
    question: 'Come posso richiedere un preventivo?',
    answer: `Puoi compilare il modulo di contatto sul sito indicando tipo di evento e data, oppure chiamarci al +39 02 49452872 o scrivere a info@gd-events.it. Rispondiamo entro 24 ore lavorative.`,
  },
  {
    question: `Effettuate sopralluoghi tecnici prima dell'evento?`,
    answer: `Sì, per gli eventi di media e grande dimensione effettuiamo sempre un sopralluogo tecnico preliminare per verificare acustica, alimentazione elettrica, logistica e dimensioni dello spazio.`,
  },
  {
    question: 'Gestite eventi ibridi e streaming live?',
    answer: `Sì, siamo specializzati nella regia audio/video broadcast e nella gestione di eventi ibridi con partecipanti da remoto. Gestiamo contributi video, streaming su piattaforme custom e registrazione dell'evento.`,
  },
  {
    question: 'Che attrezzature tecniche utilizzate?',
    answer: `Disponiamo di 1800 m² di magazzino. Luci: fixture professionali tra cui ETC, ARRI e Clay Paky, console tra cui MA Lighting e ChamSys (180.000W totali). Audio: line array tra cui L-Acoustics e d&b audiotechnik, console tra cui DiGiCo e Yamaha, microfonia tra cui Shure e Sennheiser. Video: LED wall ad alta definizione, regia broadcast Blackmagic Design, telecamere Sony.`,
  },
  {
    question: `Offrite assistenza tecnica durante l'evento?`,
    answer: `Sì, tutti i nostri servizi includono tecnici specializzati presenti dall'allestimento al breakdown. Non lasciamo mai un evento senza supporto tecnico on-site.`,
  },
  {
    question: 'Con quanto anticipo devo contattarvi per un evento?',
    answer: `Prima ci contattate, meglio possiamo lavorare: idealmente almeno un mese prima per garantire la disponibilità delle attrezzature e il tempo necessario alla progettazione tecnica. Se i tempi sono stretti, valutiamo comunque ogni richiesta e facciamo il possibile per trovare una soluzione.`,
  },
  {
    question: 'Operate solo a Milano o anche in altre città?',
    answer: `Siamo basati a Settimo Milanese ma lavoriamo in tutta Italia settentrionale e oltre: dalla Svizzera alla Toscana, dalla Francia meridionale al Veneto. Contattateci per verificare la disponibilità nella vostra zona.`,
  },
  {
    question: 'Cosa include il sopralluogo tecnico?',
    answer: `Il sopralluogo è il momento in cui i nostri tecnici visitano la location per valutare acustica, alimentazione elettrica, dimensioni e vincoli strutturali. Serve a progettare una soluzione su misura per quello spazio specifico — non un'installazione standard, ma un sistema pensato per funzionare esattamente in quel contesto.`,
  },
  {
    question: 'Fornite solo le attrezzature o anche il personale tecnico?',
    answer: `Ogni progetto è seguito da tecnici professionisti del settore presenti dall'allestimento al breakdown. Non noleggiamo semplicemente attrezzature: gestiamo l'intero impianto tecnico, dall'installazione alla regia live, per garantire la resa migliore in ogni situazione.`,
  },
  {
    question: 'Lavorate solo con agenzie di eventi o anche con clienti diretti?',
    answer: `Lavoriamo con entrambi: agenzie di eventi, production house, venue e aziende da un lato; privati, associazioni culturali e organizzatori indipendenti dall'altro. Che si tratti di una convention da mille persone o di un matrimonio intimo, ogni progetto riceve la stessa attenzione tecnica.`,
  },
];
