# Configurazione EmailJS per Form di Contatto

## Step 1: Registrazione su EmailJS

1. Vai su [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea un account gratuito (fino a 200 email/mese)
3. Verifica la tua email

## Step 2: Configurazione Email Service

1. Nel dashboard, vai su **"Email Services"**
2. Clicca **"Add New Service"**
3. Scegli il provider email (consigliato: Gmail o qualsiasi SMTP)
4. Configura con l'account **info@gd-events.it**
5. Copia il **Service ID** generato

## Step 3: Creazione Template per Notifica Admin

1. Vai su **"Email Templates"**
2. Clicca **"Create New Template"**
3. Configura così:

**Template Name:** `admin_notification`

**Subject:** `Nuova richiesta preventivo - {{from_name}}`

**Content:**
```
Hai ricevuto una nuova richiesta di preventivo da:

Nome: {{from_name}}
Email: {{from_email}}
Servizio richiesto: {{service}}

Messaggio:
{{message}}

---
Rispondi direttamente a: {{reply_to}}
```

4. Copia il **Template ID**

## Step 4: Creazione Template per Risposta Automatica

1. Crea un secondo template
2. Configura così:

**Template Name:** `customer_autoresponse`

**Subject:** `Richiesta ricevuta - GD Events`

**Content:**
```
Ciao {{to_name}},

Grazie per averci contattato!

Abbiamo ricevuto la tua richiesta per il servizio: **{{service}}**

Il nostro team sta elaborando la tua richiesta e ti risponderemo entro 24 ore lavorative con un preventivo dettagliato.

Nel frattempo, se hai domande urgenti puoi contattarci:
📞 +39 02 49452872
📧 info@gd-events.it
📍 Via Galvani 36, Settimo Milanese

A presto!

---
**GD Events**
Il tuo partner per eventi indimenticabili
www.gd-events.it
```

3. Copia il **Template ID**

## Step 5: Public Key

1. Vai su **"Account"** → **"General"**
2. Copia la **Public Key**

## Step 6: Configura le variabili d'ambiente

1. Apri il file `.env` nella root del progetto
2. Inserisci i tuoi ID copiati:

```env
VITE_EMAILJS_SERVICE_ID=il_tuo_service_id
VITE_EMAILJS_TEMPLATE_ID=il_tuo_template_id_admin
VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID=il_tuo_template_id_autoresponse
VITE_EMAILJS_PUBLIC_KEY=la_tua_public_key
```

3. Salva il file
4. **IMPORTANTE**: Il file `.env` è già nel `.gitignore` e NON verrà caricato su Git
5. Riavvia il server di sviluppo (`npm run dev`) per caricare le nuove variabili

## Step 7: Test

1. Salva il file
2. Compila il form sul sito
3. Controlla:
   - Email ricevuta su info@gd-events.it
   - Email di conferma ricevuta dal cliente

## Nota Sicurezza

✅ **Le credenziali sono al sicuro!**
- Sono nel file `.env` che è nel `.gitignore`
- NON vengono caricate su Git
- Usa `.env.example` come riferimento per altri sviluppatori
- In produzione (Netlify/Vercel) configura le variabili nell'ambiente di deploy

⚠️ **Ricorda:**
- Copia `.env.example` in `.env` e compila con i tuoi dati
- Non condividere mai il file `.env`
- Ogni ambiente (dev, staging, prod) ha il proprio `.env`

## Alternative (se preferisci backend)

Se preferisci non usare EmailJS, puoi:
1. Creare un backend Node.js con Nodemailer
2. Usare serverless functions (Netlify/Vercel)
3. Integrare con SendGrid o Mailgun API

## Supporto

EmailJS docs: https://www.emailjs.com/docs/
