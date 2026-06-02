/**
 * WhatsAppButton.jsx — Pulsante WhatsApp fisso su mobile
 * -----------------------------------------------
 * Scopo: FAB (Floating Action Button) visibile solo su mobile (≤768px).
 *        Canale di conversione B2C diretto — apre chat WhatsApp con GD Events.
 * Visibilità: controllata via CSS (display:none su desktop, flex su mobile).
 * Link: https://wa.me/390249452872
 */

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/390249452872"
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      title="Scrivici su WhatsApp"
    >
      {/* SVG logo WhatsApp ufficiale */}
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.474 2.027 7.783L0 32l8.418-2.005A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.282 13.282 0 0 1-6.788-1.858l-.487-.288-5.003 1.192 1.22-4.867-.317-.5A13.265 13.265 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.908c-.398-.199-2.356-1.162-2.72-1.295-.364-.133-.629-.199-.894.199-.265.398-1.028 1.295-1.26 1.561-.232.265-.464.298-.862.1-.398-.199-1.68-.619-3.2-1.974-1.183-1.055-1.98-2.358-2.213-2.756-.232-.398-.025-.613.175-.811.18-.178.398-.464.597-.696.199-.232.265-.398.398-.663.133-.265.066-.497-.033-.696-.1-.199-.894-2.154-1.225-2.949-.322-.773-.65-.668-.894-.68l-.762-.013c-.265 0-.696.1-1.061.497-.364.398-1.393 1.361-1.393 3.317s1.426 3.847 1.625 4.112c.199.265 2.808 4.286 6.803 6.014.951.411 1.693.656 2.271.84.954.303 1.823.26 2.51.158.766-.114 2.356-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.364-.265-.762-.464z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
