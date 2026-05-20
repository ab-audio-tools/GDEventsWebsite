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
    answer: 'Il costo dipende da tipo di evento, dimensioni della location, durata ' +
      'e attrezzature necessarie. Un service audio per una sala congressi fino a 200 ' +
      'persone ha esigenze diverse da un concerto o da uno stand fieristico. ' +
      'Per questo lavoriamo sempre con preventivi tecnici personalizzati, non con ' +
      'listini generici. Contattateci: rispondiamo entro 24 ore con una proposta ' +
      'su misura per il vostro evento.',
  },
  {
    question: 'Quali servizi offre GD Events?',
    answer: 'GD Events offre soluzioni tecniche complete AVL (audio, video, luci) ' +
      'per convention, concerti, stand fieristici, illuminazione architetturale, ' +
      'installazioni fisse, produzione eventi, eventi aziendali, teatro, vetrine ' +
      'ed eventi privati come matrimoni.',
  },
  {
    question: 'In quali zone operate?',
    answer: 'Siamo basati a Settimo Milanese (MI) e operiamo principalmente a Milano ' +
      'e in tutta la Lombardia. Lavoriamo regolarmente anche in Piemonte, Veneto, ' +
      'Liguria e nelle zone di confine con la Svizzera. Contattateci per verificare ' +
      'la disponibilità.',
  },
  {
    question: 'Come posso richiedere un preventivo?',
    answer: 'Puoi compilare il modulo di contatto sul sito indicando tipo di evento ' +
      'e data, oppure chiamarci al +39 02 49452872 o scrivere a info@gd-events.it. ' +
      'Rispondiamo entro 24 ore lavorative.',
  },
  {
    question: "Effettuate sopralluoghi tecnici prima dell'evento?",
    answer: 'Sì, per gli eventi di media e grande dimensione effettuiamo sempre un ' +
      'sopralluogo tecnico preliminare per verificare acustica, alimentazione ' +
      'elettrica, logistica e dimensioni dello spazio.',
  },
  {
    question: 'Gestite eventi ibridi e streaming live?',
    answer: 'Sì, siamo specializzati nella regia audio/video broadcast e nella ' +
      'gestione di eventi ibridi con partecipanti da remoto. Gestiamo contributi ' +
      'video, streaming su piattaforme custom e registrazione dell\'evento.',
  },
  {
    question: 'Che attrezzature tecniche utilizzate?',
    answer: 'Disponiamo di 1800 m² di magazzino. ' +
      'Luci: fixture ETC, ARRI, Clay Paky e Robe, console MA Lighting e ChamSys (180.000W totali). ' +
      'Audio: line array L-Acoustics e d&b audiotechnik, console DiGiCo o Yamaha, ' +
      'microfonia wireless Shure e Sennheiser. ' +
      'Video: LED wall ad alta definizione, regia broadcast Blackmagic Design, telecamere Sony.',
  },
  {
    question: "Offrite assistenza tecnica durante l'evento?",
    answer: "Sì, tutti i nostri servizi includono tecnici specializzati presenti " +
      "dall'allestimento al breakdown. Non lasciamo mai un evento senza supporto " +
      "tecnico on-site.",
  },
];
