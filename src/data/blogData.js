/**
 * blogData.js
 * -----------------------------------------------
 * Scopo: sorgente dati per gli articoli del blog.
 *        Esporta defaultArticles (hardcodati) e funzioni CRUD
 *        legacy che usano localStorage (residuo del sistema admin rimosso).
 * Dipendenze: localStorage (solo client-side, con guard try/catch)
 * Esporta: defaultArticles, getBlogArticles, getBlogArticleBySlug,
 *          saveBlogArticles, addBlogArticle, updateBlogArticle,
 *          deleteBlogArticle, authenticateAdmin
 *
 * Architettura:
 *   - defaultArticles: array statico dei 3 articoli ufficiali,
 *     usato direttamente da pages/blog/[slug].jsx via getStaticPaths.
 *     È l'unico approccio compatibile con output:'export' (SSG puro).
 *
 *   - getBlogArticles/CRUD/authenticateAdmin: logica localStorage
 *     del pannello admin rimosso. Mantenuta per non rompere import
 *     eventuali, ma non più usata in produzione. In un sito statico
 *     gli articoli creati via localStorage sarebbero visibili solo
 *     nel browser dell'autore, non agli altri visitatori.
 *
 * NOTA: se in futuro si vuole un CMS, sostituire defaultArticles
 *       con chiamate a un headless CMS (Contentful, Sanity, ecc.)
 *       e rigenerare il sito via CI/CD a ogni nuovo articolo.
 */

// Keys localStorage (non più in uso attivo)
const STORAGE_KEY = 'gdevents_blog_articles';
const AUTH_KEY = 'gdevents_blog_auth';

// Credenziali admin legacy (pannello rimosso — codice non raggiungibile in produzione)
const ADMIN_CREDENTIALS = {
  username: 'blog-admin',
  passwordHash: 'f8e9d4c2b5a7e3f1d6c8b2a5e9f3d7c1', // Hash simulato
};

/**
 * defaultArticles
 * Articoli del blog hardcodati — sorgente per getStaticPaths/getStaticProps.
 * Struttura di ogni articolo: id, slug, title, date, tag, excerpt,
 * image (path /images/ o URL), content (HTML string).
 */
export const defaultArticles = [
  {
    id: '1',
    slug: 'scegliere-impianto-audio-evento-aziendale',
    title: 'Come scegliere l\'impianto audio perfetto per un evento aziendale',
    date: '2026-02-05',
    dateModified: '2026-05-10',
    tag: 'Audio',
    excerpt:
      'Line array o diffusori compatti? Ecco i criteri tecnici per garantire copertura uniforme e chiarezza del parlato.',
    content: `
      <h2>L'audio è il 50% del successo di un evento</h2>
      <p>Quando organizzi una convention, un meeting o una presentazione aziendale, puoi avere le slide più belle del mondo e i contenuti più interessanti: se il pubblico non sente bene, l'evento fallisce. L'audio non è un dettaglio tecnico, è la spina dorsale della comunicazione.</p>
      
      <p>Eppure spesso ci si accorge del problema solo in fase di allestimento, quando è troppo tardi per cambiare strategia. In questo articolo ti spieghiamo come scegliere l\'impianto audio giusto <strong>prima</strong> di arrivare in sala, analizzando i parametri che fanno davvero la differenza.</p>

      <h2>Line array o diffusori compatti: quale scegliere?</h2>
      
      <h3>Line array: per grandi spazi e pubblico esteso</h3>
      <p>Un sistema line array è composto da più cabinet allineati verticalmente, progettati per coprire lunghe distanze mantenendo un volume uniforme. È la scelta ideale quando:</p>
      <ul>
        <li>La sala supera i 200 posti a sedere</li>
        <li>La profondità della platea è maggiore di 20 metri</li>
        <li>Serve un controllo preciso della direttività sonora</li>
        <li>L'acustica della location presenta criticità (riverberazione eccessiva, soffitti alti)</li>
      </ul>
      
      <p><strong>Vantaggio principale:</strong> copertura omogenea anche nelle file posteriori, senza aumentare il volume nelle prime file. Questo si traduce in maggiore intelligibilità del parlato e meno affaticamento per chi ascolta.</p>

      <h3>Diffusori compatti: per meeting e sale riunioni</h3>
      <p>Sistemi point-source o compatti sono perfetti per eventi più contenuti:</p>
      <ul>
        <li>Sale fino a 150 persone</li>
        <li>Presentazioni con un solo speaker o panel ridotto</li>
        <li>Budget più contenuti</li>
        <li>Setup e smontaggio rapidi</li>
      </ul>
      
      <p><strong>Vantaggio principale:</strong> installazione veloce, minor ingombro scenico, ottimo rapporto qualità/prezzo per eventi brevi.</p>

      <h2>I 5 parametri tecnici da valutare</h2>
      
      <h3>1. Dimensioni e acustica dello spazio</h3>
      <p>Non basta conoscere il numero di posti: serve una planimetria della sala con altezza del soffitto, materiali delle pareti, presenza di tendaggi o superfici riflettenti. Un auditorium rivestito in legno ha un comportamento acustico completamente diverso da una sala congressi con moquette e pannelli fonoassorbenti.</p>
      
      <h3>2. Numero e disposizione dei partecipanti</h3>
      <p>Un pubblico distribuito a platea richiede un'altra strategia rispetto a un setup con tavoli rotondi o disposizione a ferro di cavallo. La distanza tra diffusori e ascoltatori determina la pressione sonora necessaria e il tipo di processamento del segnale.</p>

      <h3>3. Tipologia di contenuti audio</h3>
      <p>Un discorso istituzionale ha bisogno di chiarezza sulle medie frequenze. Una presentazione con video e musica richiede un sistema full-range con subwoofer. Un panel con microfoni wireless necessita di un mixer digitale con gestione anti-feedback avanzata.</p>

      <h3>4. Durata e formato dell'evento</h3>
      <p>Un evento di più giorni richiede affidabilità e ridondanza dei componenti. Un singolo intervento può permettersi un setup più leggero. La presenza di traduzione simultanea implica un impianto completamente diverso.</p>

      <h3>5. Budget disponibile</h3>
      <p>Un impianto audio professionale per una convention di 500 persone può costare da 3.000 a 15.000 euro, in base a tecnologia, durata del noleggio e complessità del servizio. Il budget va definito in fase di progettazione, non il giorno prima dell'evento.</p>

      <h2>Errori da evitare nella scelta dell'impianto</h2>
      
      <h3>Sottovalutare il sopralluogo tecnico</h3>
      <p>Affidarsi a planimetrie generiche o foto della sala può portare a scelte sbagliate. Un sopralluogo tecnico con misurazioni acustiche permette di prevedere problemi e progettare il sistema in modo accurato.</p>

      <h3>Scegliere solo in base al prezzo</h3>
      <p>Un sistema economico può sembrare conveniente, ma se non copre l'intera sala o genera feedback continui, l'evento viene percepito come di bassa qualità. Il pubblico non perdona l'audio scadente.</p>

      <h3>Non considerare il backup</h3>
      <p>Cosa succede se un diffusore si guasta a metà evento? Sistemi professionali includono sempre componenti di riserva e percorsi audio ridondanti. È la differenza tra un fornitore serio e un improvvisato.</p>

      <h2>Il valore di affidarsi a professionisti</h2>
      <p>Scegliere l'impianto audio giusto non significa solo guardare le schede tecniche: serve esperienza sul campo, conoscenza delle location, capacità di prevedere i problemi e risolverli in tempo reale.</p>
      
      <p>Un service audio professionale non si limita a "portare le casse": progetta il sistema, lo installa, lo calibra in base all'acustica reale della sala, gestisce la regia durante l'evento e risolve eventuali criticità senza che il pubblico se ne accorga.</p>

      <p><strong>Risultato:</strong> un evento dove ogni parola è chiara, ogni intervento è valorizzato e il pubblico è concentrato sui contenuti, non sui problemi tecnici.</p>

      <h2>Vuoi un preventivo personalizzato?</h2>
      <p>Contattaci per un sopralluogo tecnico gratuito. Analizziamo la tua location, capiamo gli obiettivi dell'evento e ti proponiamo la soluzione audio più adatta al tuo budget.</p>
      
      <div class="blog-contact-form">
        <h3>Richiedi un preventivo</h3>
        <form class="contact-form-inline">
          <input type="text" placeholder="Nome e Cognome" required />
          <input type="email" placeholder="Email aziendale" required />
          <input type="tel" placeholder="Telefono" required />
          <textarea placeholder="Descrivi il tuo evento (location, numero partecipanti, data)" rows="4" required></textarea>
          <button type="submit" class="cta-button">Richiedi sopralluogo gratuito</button>
        </form>
      </div>
    `,
    image: '/images/convention.webp',
  },
  {
    id: '2',
    slug: 'luci-architetturali-errori-comuni',
    title: 'Luci architetturali: tre errori che fanno perdere valore a una facciata',
    date: '2026-01-28',
    dateModified: '2026-05-03',
    tag: 'Lighting',
    excerpt:
      'Dall\'angolo di proiezione alla temperatura colore: le scelte che trasformano un edificio in un\'icona notturna.',
    content: `
      <h2>Un edificio illuminato male è invisibile</h2>
      <p>L'illuminazione architettonica non è solo una questione estetica: è un investimento che valorizza patrimoni immobiliari, attira visitatori, racconta la storia di un luogo. Un palazzo storico, un hotel, un museo o una sede aziendale illuminati nel modo giusto diventano punti di riferimento urbani, aumentano la percezione di qualità e si distinguono dalla concorrenza.</p>
      
      <p>Eppure basta un errore di progettazione per vanificare tutto: angoli di proiezione sbagliati, temperature colore inadeguate, scenari statici che diventano invisibili dopo pochi mesi. In questo articolo analizziamo i tre errori più comuni e come evitarli.</p>

      <h2>Errore 1: Angolo di proiezione sbagliato</h2>
      
      <h3>Il problema</h3>
      <p>Proiettare la luce dal basso verso l'alto senza analizzare la geometria dell'edificio porta a due conseguenze:</p>
      <ul>
        <li><strong>Ombre innaturali:</strong> elementi architettonici come cornici, balconi o lesene creano ombre dure che frammentano la facciata invece di valorizzarla</li>
        <li><strong>Perdita di dettaglio:</strong> zone importanti restano in ombra, mentre altre vengono sovraesposte</li>
        <li><strong>Effetto "fantasma":</strong> su edifici storici con statue o decorazioni, una luce dal basso crea un effetto inquietante invece che elegante</li>
      </ul>

      <h3>La soluzione</h3>
      <p>Ogni facciata richiede un <strong>studio illuminotecnico dedicato</strong>:</p>
      <ul>
        <li>Analisi della geometria architettonica con rilievi fotogrammetrici</li>
        <li>Identificazione degli elementi da valorizzare (finestre, portali, materiali)</li>
        <li>Scelta di ottiche asimmetriche per evitare dispersione luminosa</li>
        <li>Posizionamento strategico dei proiettori con angoli calibrati</li>
      </ul>
      
      <p><strong>Esempio pratico:</strong> su una facciata neoclassica con colonne e timpano, serve un mix di luce radente per le colonne (esalta il volume) e luce diretta per il timpano (evidenzia i rilievi). Un unico angolo non basta.</p>

      <h2>Errore 2: Temperatura colore inadeguata</h2>
      
      <h3>Il problema</h3>
      <p>La scelta della temperatura colore (misurata in Kelvin) influenza drasticamente la percezione dei materiali:</p>
      <ul>
        <li><strong>Luce fredda (5000-6000K) su pietra calda:</strong> snatura il colore naturale del materiale, facendolo sembrare grigio o artificiale</li>
        <li><strong>Luce calda (2700-3000K) su materiali moderni:</strong> su vetro e acciaio può risultare obsoleta e poco contemporanea</li>
        <li><strong>Temperatura non uniforme:</strong> mix di LED con tonalità diverse creano macchie cromatiche antiestetiche</li>
      </ul>

      <h3>La soluzione</h3>
      <p>Serve un <strong>equilibrio tra fedeltà cromatica e atmosfera</strong>:</p>
      <ul>
        <li>Test su campione di materiale prima dell'installazione definitiva</li>
        <li>LED con CRI (Color Rendering Index) superiore a 90 per rispettare i colori originali</li>
        <li>Temperatura colore variabile su controller DMX per scenari diversi</li>
        <li>Uniformità cromatica certificata tra tutti i proiettori</li>
      </ul>
      
      <p><strong>Caso pratico:</strong> per un edificio in mattone rosso storico, una temperatura di 3000K esalta le tonalità naturali senza snaturarle. Per una facciata in vetro contemporanea, 4000K mantiene la modernità del progetto.</p>

      <h2>Errore 3: Assenza di scenari dinamici</h2>
      
      <h3>Il problema</h3>
      <p>Un'illuminazione statica, sempre uguale, diventa invisibile nel giro di poche settimane. Il cervello umano si abitua agli stimoli costanti e smette di notarli. Risultato: l'investimento perde efficacia rapidamente.</p>
      
      <p>Inoltre, un'unica scena non può adattarsi a:</p>
      <ul>
        <li>Eventi speciali (festività, manifestazioni, celebrazioni)</li>
        <li>Cambio di stagione (inverno/estate, alba diversa)</li>
        <li>Branding temporaneo (campagne promozionali, sponsor)</li>
      </ul>

      <h3>La soluzione</h3>
      <p>Progettare un <strong>sistema di controllo dinamico programmabile</strong>:</p>
      <ul>
        <li>Controller DMX con scenari preimpostati gestibili da remoto</li>
        <li>Transizioni graduali tra scenari (fade in/out programmati)</li>
        <li>RGB per eventi speciali senza modificare l'impianto</li>
        <li>Timer astronomico per accensione/spegnimento automatico</li>
        <li>Integrazione con sistemi domotici esistenti</li>
      </ul>
      
      <p><strong>Vantaggi:</strong> mantieni alta l'attenzione, comunichi messaggi diversi in momenti diversi, massimizzi il ritorno dell'investimento nel tempo.</p>

      <h2>Consumi, manutenzione e ROI</h2>
      
      <h3>Tecnologia LED: investimento che si ripaga</h3>
      <p>I LED per illuminazione architettonica hanno costi iniziali più alti rispetto a tecnologie obsolete, ma:</p>
      <ul>
        <li><strong>Durata:</strong> 50.000+ ore di vita utile (oltre 10 anni di funzionamento notturno)</li>
        <li><strong>Consumi:</strong> fino al 70% in meno rispetto a lampade alogene o ioduri metallici</li>
        <li><strong>Manutenzione:</strong> nessuna sostituzione lampade, costi operativi quasi nulli</li>
        <li><strong>Impatto ambientale:</strong> nessun inquinamento luminoso verso il cielo se progettati bene</li>
      </ul>

      <h3>Calcolo del ritorno dell'investimento</h3>
      <p>Per un palazzo storico con 20 proiettori LED da 50W (1000W totali):</p>
      <ul>
        <li>Consumo annuo: circa 3.650 kWh (10 ore/notte x 365 giorni)</li>
        <li>Costo energia: circa 730€/anno a 0,20€/kWh</li>
        <li>Risparmio vs tecnologia tradizionale: oltre 2.000€/anno</li>
        <li>Ammortamento impianto LED in 3-4 anni</li>
      </ul>

      <h2>Chi dovrebbe investire in illuminazione architettonica?</h2>
      <ul>
        <li><strong>Enti pubblici:</strong> valorizzazione patrimonio artistico, attrattività turistica</li>
        <li><strong>Hotel e hospitality:</strong> visibilità notturna, immagine premium, identità riconoscibile</li>
        <li><strong>Retail e catene commerciali:</strong> brand visibility, aumento del traffico pedonale</li>
        <li><strong>Aziende e sedi corporate:</strong> comunicazione valori, modernità, sostenibilità</li>
        <li><strong>Residenze di prestigio:</strong> valorizzazione immobiliare, sicurezza percepita</li>
      </ul>

      <h2>Il nostro approccio alla progettazione</h2>
      <p>Ogni progetto di illuminazione architettonica parte da un sopralluogo notturno e diurno per comprendere:</p>
      <ul>
        <li>Contesto urbano e illuminazione circostante</li>
        <li>Materiali e stato di conservazione dell'edificio</li>
        <li>Punti di alimentazione elettrica disponibili</li>
        <li>Vincoli architettonici o paesaggistici</li>
        <li>Obiettivi comunicativi e budget disponibile</li>
      </ul>
      
      <p>Solo dopo questa fase proponiamo un progetto illuminotecnico con render fotorealistici, calcoli di consumo e piano di manutenzione pluriennale.</p>

      <h2>Trasforma il tuo edificio in un'icona</h2>
      <p>Contattaci per un sopralluogo tecnico e una proposta progettuale. Ti mostriamo come valorizzare la tua facciata con un investimento sostenibile e misurabile.</p>
      
      <div class="blog-contact-form">
        <h3>Richiedi un progetto illuminotecnico</h3>
        <form class="contact-form-inline">
          <input type="text" placeholder="Nome e Cognome" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Telefono" required />
          <select required>
            <option value="">Tipo di edificio</option>
            <option value="storico">Edificio storico/monumentale</option>
            <option value="hotel">Hotel/Hospitality</option>
            <option value="retail">Retail/Negozio</option>
            <option value="corporate">Sede aziendale</option>
            <option value="residenziale">Residenza privata</option>
            <option value="altro">Altro</option>
          </select>
          <textarea placeholder="Descrivi il progetto e gli obiettivi" rows="4" required></textarea>
          <button type="submit" class="cta-button">Richiedi sopralluogo + preventivo</button>
        </form>
      </div>
    `,
    image: '/images/illum_arch.webp',
  },
  {
    id: '3',
    slug: 'regia-evento-referente-unico',
    title: 'Regia evento: perché un solo referente tecnico fa la differenza',
    date: '2026-01-15',
    dateModified: '2026-04-28',
    tag: 'Produzione',
    excerpt:
      'Coordinare audio, luci, video e tempistiche riduce costi e imprevisti. Ecco come impostare la regia.',
    content: `
      <h2>Il problema degli eventi frammentati</h2>
      <p>Immagina questa scena: sei alla regia del tuo evento aziendale. Il fornitore audio dice che i microfoni sono pronti, ma il tecnico luci sta ancora programmando le scene. Il videomaker aspetta il via per lanciare il loop sugli schermi, ma manca il segnale dal computer. Lo scenografo chiede di spostare un diffusore perché copre un elemento decorativo. Il cliente chiede quando si parte.</p>
      
      <p><strong>Risultato:</strong> 40 minuti di ritardo, nervosismo generale, pubblico che aspetta in sala. L'evento parte male e recuperare è difficile.</p>

      <p>Questo accade quando ogni fornitore lavora in autonomia, senza una regia tecnica unica che coordini tempi, spazi e priorità. In questo articolo ti spieghiamo perché un referente tecnico unico è la chiave per eventi fluidi e professionali.</p>

      <h2>Cos'è un referente tecnico unico (e cosa NON è)</h2>
      
      <h3>Non è un semplice coordinatore</h3>
      <p>Un referente tecnico non si limita a smistare telefonate tra fornitori. È un professionista con competenze trasversali su <strong>audio, luci, video, scenografia e timing</strong>, che progetta l'evento nella sua interezza e ne gestisce la regia operativa.</p>

      <h3>È un direttore tecnico di scena</h3>
      <p>Le sue responsabilità includono:</p>
      <ul>
        <li>Sopralluogo tecnico e planimetria impianti</li>
        <li>Coordinamento fornitori e maestranze</li>
        <li>Timeline allestimento e prove tecniche</li>
        <li>Gestione scaletta e tempistiche live</li>
        <li>Problem solving in tempo reale</li>
        <li>Interfaccia unica con il cliente</li>
      </ul>

      <h2>I vantaggi di avere un unico interlocutore tecnico</h2>
      
      <h3>1. Riduzione drastica dei tempi morti</h3>
      <p>Quando ogni fornitore lavora in autonomia, si creano inevitabili sovrapposizioni e attese:</p>
      <ul>
        <li>Il tecnico audio deve aspettare che le luci finiscano per testare i microfoni</li>
        <li>Il videomaker non può cablare gli schermi perché l'area è occupata dagli scenografi</li>
        <li>Le prove con i relatori slittano perché manca il coordinamento tra regia audio e video</li>
      </ul>
      
      <p><strong>Con una regia unica:</strong> tutte le attività vengono sequenziate in modo efficiente. Ogni fornitore sa esattamente quando e dove intervenire. L'allestimento che richiederebbe 8 ore viene completato in 5.</p>

      <h3>2. Comunicazione più efficace</h3>
      <p>Invece di gestire 5-6 interlocutori diversi (audio, luci, video, scenografia, hostess, catering), il cliente parla con <strong>una sola persona</strong> che coordina tutto il resto. Questo significa:</p>
      <ul>
        <li>Meno riunioni di allineamento</li>
        <li>Decisioni più rapide</li>
        <li>Nessun fraintendimento tra fornitori</li>
        <li>Un unico preventivo integrato</li>
      </ul>

      <h3>3. Gestione ottimizzata del budget</h3>
      <p>Un referente tecnico unico può:</p>
      <ul>
        <li>Evitare duplicazioni di attrezzature (es. due fornitori che portano mixer diversi)</li>
        <li>Ottimizzare i noleggi in base alle reali necessità</li>
        <li>Negoziare pacchetti integrati più convenienti</li>
        <li>Proporre alternative tecniche che riducono i costi senza compromettere la qualità</li>
      </ul>
      
      <p><strong>Esempio concreto:</strong> invece di noleggiare tre set di casse separate (una per l'audio speech, una per il video, una per la musica), un'unica regia integrata progetta un sistema audio coerente che serve tutti gli usi, riducendo i costi del 30-40%.</p>

      <h3>4. Risoluzione rapida degli imprevisti</h3>
      <p>Durante un evento possono succedere mille cose:</p>
      <ul>
        <li>Un microfono si guasta a metà presentazione</li>
        <li>Il video promozionale ha un codec incompatibile</li>
        <li>Un relatore arriva in ritardo e la scaletta va modificata</li>
        <li>La luce del sole entra in sala e rende illeggibili gli schermi</li>
      </ul>
      
      <p><strong>Con fornitori separati:</strong> ognuno aspetta che l'altro risolva il suo pezzo, i tempi si allungano, il cliente va nel panico.</p>
      
      <p><strong>Con regia unica:</strong> il referente tecnico identifica subito il problema, coordina la soluzione (es. cambia microfono, ricodifica il video, riorganizza le luci) e informa il cliente una sola volta, quando è già risolto.</p>

      <h2>Come scegliere il referente tecnico giusto</h2>
      
      <h3>Competenze tecniche trasversali</h3>
      <p>Non basta essere bravi con l'audio o con le luci. Serve esperienza su:</p>
      <ul>
        <li><strong>Audio:</strong> microfonia, mixer digitali, sistemi conference, traduzione simultanea</li>
        <li><strong>Luci:</strong> illuminazione scenica, architetturale, gobos, LED wall</li>
        <li><strong>Video:</strong> regia live, streaming, proiezioni multi-schermo, grafica real-time</li>
        <li><strong>Scenografia:</strong> allestimenti, carpenteria, sicurezza strutturale</li>
      </ul>

      <h3>Esperienza su eventi simili</h3>
      <p>Un referente che ha gestito 50 convention sa esattamente cosa può andare storto e come prevenirlo. Cerca professionisti con:</p>
      <ul>
        <li>Portfolio documentato di eventi nella tua categoria</li>
        <li>Referenze verificabili di clienti precedenti</li>
        <li>Team tecnico stabile (non improvvisato evento per evento)</li>
      </ul>

      <h3>Capacità di leadership</h3>
      <p>Coordinare 10-15 tecnici richiede autorevolezza e chiarezza. Il referente deve saper:</p>
      <ul>
        <li>Prendere decisioni rapide sotto pressione</li>
        <li>Gestire conflitti tra fornitori</li>
        <li>Comunicare con il cliente in modo trasparente</li>
        <li>Anticipare i problemi prima che diventino critici</li>
      </ul>

      <h2>Il processo di lavoro di una regia tecnica efficace</h2>
      
      <h3>Fase 1: Briefing e sopralluogo (4-8 settimane prima)</h3>
      <p>Il referente tecnico incontra il cliente, comprende gli obiettivi, visita la location e redige:</p>
      <ul>
        <li>Planimetria tecnica con posizionamento impianti</li>
        <li>Timeline dettagliata di allestimento e smontaggio</li>
        <li>Elenco attrezzature necessarie</li>
        <li>Preventivo integrato con tutte le voci tecniche</li>
      </ul>

      <h3>Fase 2: Coordinamento fornitori (2-4 settimane prima)</h3>
      <p>Vengono coinvolti i fornitori specializzati (se necessari) e definiti:</p>
      <ul>
        <li>Ordini di servizio per ogni fornitore</li>
        <li>Orari di accesso in location</li>
        <li>Responsabilità specifiche e punti di interfaccia</li>
        <li>Materiali condivisi (energia, strutture, cavi)</li>
      </ul>

      <h3>Fase 3: Allestimento e prove (giorno -1 o mattina evento)</h3>
      <p>Il referente coordina:</p>
      <ul>
        <li>Sequenza di montaggio per evitare sovrapposizioni</li>
        <li>Test integrati audio + video + luci</li>
        <li>Prove con relatori e gestione microfoni</li>
        <li>Check finale scaletta e timing</li>
      </ul>

      <h3>Fase 4: Regia live</h3>
      <p>Durante l'evento, il referente:</p>
      <ul>
        <li>Gestisce la scaletta e coordina i cambi scena</li>
        <li>Comunica con tecnici via intercom</li>
        <li>Risolve imprevisti senza coinvolgere il cliente</li>
        <li>Adatta il timing in base all'andamento reale</li>
      </ul>

      <h3>Fase 5: Smontaggio e reportistica</h3>
      <p>Al termine:</p>
      <ul>
        <li>Smontaggio coordinato e rapido</li>
        <li>Restituzione location in condizioni originali</li>
        <li>Report tecnico con eventuali criticità emerse</li>
        <li>Documentazione fotografica/video per archivio cliente</li>
      </ul>

      <h2>Quanto costa una regia tecnica unificata?</h2>
      <p>Il costo di un referente tecnico varia in base a:</p>
      <ul>
        <li><strong>Complessità dell'evento:</strong> un meeting da 50 persone richiede meno coordinamento di una convention da 1000</li>
        <li><strong>Durata:</strong> eventi di più giorni necessitano di presenza continuativa</li>
        <li><strong>Numero di fornitori coinvolti:</strong> più fornitori = più coordinamento</li>
      </ul>
      
      <p><strong>Range indicativi:</strong></p>
      <ul>
        <li>Piccolo evento (50-100 persone): 500-1.000€</li>
        <li>Evento medio (100-300 persone): 1.500-3.000€</li>
        <li>Grande evento (300+ persone): 3.000-8.000€</li>
      </ul>
      
      <p>Questo costo va visto come <strong>investimento</strong>, non come spesa: i risparmi derivanti da ottimizzazione tempi, riduzione imprevisti e migliore gestione fornitori ripagano ampiamente il servizio.</p>

      <h2>Quando NON serve un referente unico</h2>
      <p>Per piccoli eventi semplici (es. presentazione aziendale con 20 persone, solo audio e slide) può bastare un singolo fornitore audio/video. La regia unificata diventa necessaria quando:</p>
      <ul>
        <li>Ci sono 3+ fornitori tecnici coinvolti</li>
        <li>L'evento dura più di 4 ore</li>
        <li>Serve coordinamento con catering, hostess, security</li>
        <li>Il budget supera i 10.000€</li>
      </ul>

      <h2>Affida il tuo evento a chi sa gestirlo</h2>
      <p>Abbiamo coordinato oltre 300 eventi negli ultimi 5 anni, da convention aziendali a festival musicali. Sappiamo esattamente cosa serve per far funzionare tutto alla perfezione, senza sorprese.</p>
      
      <p>Contattaci per un incontro di consulenza gratuito: analizziamo il tuo evento e ti proponiamo la soluzione tecnica più efficace.</p>
      
      <div class="blog-contact-form">
        <h3>Richiedi una consulenza per il tuo evento</h3>
        <form class="contact-form-inline">
          <input type="text" placeholder="Nome e Cognome" required />
          <input type="email" placeholder="Email aziendale" required />
          <input type="tel" placeholder="Telefono" required />
          <input type="text" placeholder="Tipo di evento" required />
          <input type="date" placeholder="Data evento (se già definita)" />
          <textarea placeholder="Descrivi l'evento: numero partecipanti, location, durata, obiettivi" rows="4" required></textarea>
          <button type="submit" class="cta-button">Richiedi consulenza gratuita</button>
        </form>
      </div>
    `,
    image: '/images/produzione_eventi.webp',
  },
];

// ─── Funzioni CRUD legacy (sistema admin rimosso) ─────────────────────────────
// Queste funzioni non sono più invocate dal codice di produzione.
// Mantenute per evitare errori di import se altri file le referenziano.

/**
 * getBlogArticles
 * Legge gli articoli da localStorage (admin legacy) o restituisce
 * defaultArticles come fallback. Il try/catch gestisce ambienti
 * senza localStorage (SSR, crawler, privacy mode).
 *
 * @returns {object[]} Array di articoli (localStorage o default)
 */
export const getBlogArticles = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {
    // localStorage non disponibile (crawler, privacy mode)
  }
  return defaultArticles;
};

/**
 * getBlogArticleBySlug
 * @param {string} slug - Slug dell'articolo
 * @returns {object|undefined} Articolo trovato o undefined
 */
export const getBlogArticleBySlug = (slug) => {
  const articles = getBlogArticles();
  return articles.find((article) => article.slug === slug);
};

/**
 * saveBlogArticles — persiste l'array in localStorage
 * @param {object[]} articles - Array completo di articoli da salvare
 */
export const saveBlogArticles = (articles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

/**
 * addBlogArticle — aggiunge un articolo in cima all'array
 * @param {object} article - Dati articolo (senza id e date, generati qui)
 * @returns {object} Nuovo articolo con id e date assegnati
 */
export const addBlogArticle = (article) => {
  const articles = getBlogArticles();
  const newArticle = {
    ...article,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
  };
  articles.unshift(newArticle);
  saveBlogArticles(articles);
  return newArticle;
};

/**
 * updateBlogArticle — aggiorna un articolo esistente per id
 * @param {string} id - ID dell'articolo da aggiornare
 * @param {object} updatedArticle - Campi da aggiornare (merge parziale)
 * @returns {object|null} Articolo aggiornato o null se non trovato
 */
export const updateBlogArticle = (id, updatedArticle) => {
  const articles = getBlogArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index !== -1) {
    articles[index] = { ...articles[index], ...updatedArticle };
    saveBlogArticles(articles);
    return articles[index];
  }
  return null;
};

/**
 * deleteBlogArticle — rimuove un articolo per id
 * @param {string} id - ID dell'articolo da eliminare
 */
export const deleteBlogArticle = (id) => {
  saveBlogArticles(getBlogArticles().filter((a) => a.id !== id));
};

// Funzioni di autenticazione
const simpleHash = (str) => {
  // Hash semplice per demo (in produzione usare bcrypt o simili)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

export const authenticateAdmin = (username, password) => {
  // PASSWORD REDATTA — pannello admin rimosso, questa funzione non è raggiungibile in produzione.
  // Non ripristinare la password reale nel codice sorgente: usare variabile d'ambiente o rimuovere il blocco.
  const expectedHash = simpleHash('REDACTED');
  const providedHash = simpleHash(password);
  
  if (username === ADMIN_CREDENTIALS.username && providedHash === expectedHash) {
    const token = `${Date.now()}-${Math.random().toString(36)}`;
    sessionStorage.setItem(AUTH_KEY, token);
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem(AUTH_KEY);
};

export const logout = () => {
  sessionStorage.removeItem(AUTH_KEY);
};
