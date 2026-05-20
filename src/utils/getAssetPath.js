/**
 * getAssetPath.js
 * -----------------------------------------------
 * Scopo: risolve il percorso pubblico di un asset in /public/images/.
 *        Previene il doppio prefisso /images/images/ che si generava
 *        quando alcuni componenti passavano path già assoluti.
 * Dipendenze: nessuna
 * Esporta: getAssetPath
 */

/**
 * getAssetPath
 * Converte un nome file o path parziale nel percorso pubblico corretto
 * per gli asset statici serviti da /public/images/.
 *
 * Guard logic (in ordine):
 *   1. Path vuoto → stringa vuota (evita src="" nel DOM)
 *   2. URL assoluto http/https → passato invariato (immagini Unsplash, CDN)
 *   3. Path che inizia con /images/ → già corretto, non aggiunge prefisso
 *      (previene /images/images/... generato da chiamate inconsistenti)
 *   4. Qualsiasi altro path → normalizza e antepone /images/
 *
 * @param {string} path - Nome file ('hero.jpg'), path relativo ('/hero.jpg')
 *                        o URL assoluto ('https://...')
 * @returns {string} Percorso pubblico corretto per l'attributo src
 */
export const getAssetPath = (path) => {
  if (!path) return '';
  // Percorsi assoluti esterni (http/https) passano invariati
  if (/^https?:\/\//.test(path)) return path;
  // Guard: se il percorso inizia già con /images/ non aggiungere il prefisso
  // (previene il bug /images/images/ quando il dato è già normalizzato)
  if (path.startsWith('/images/')) return path;
  // Normalizza: rimuove eventuale slash iniziale, poi aggiunge /images/
  const filename = path.replace(/^\/+/, '');
  return `/images/${filename}`;
};
