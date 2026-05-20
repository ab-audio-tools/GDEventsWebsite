#!/bin/bash

### CONFIG ###
PROJECT_DIR="/Users/antoniobosco/Desktop/DEVELOPER/GDEvents sito/2263351-1598004300631_Willy Wonka portfolio Template free/Willy Wonka portfolio Template free/GD events React cursor"
DEV_PORT=5000
HTML_FILE="/tmp/link.html"

FTP_HOST="antoss.ftp.tb-hosting.com"
FTP_USER="antonioboscoit@antonioboscoit"
FTP_PASS="Antoniobosco01!"
FTP_REMOTE_PATH="/www/link.html"
################

clear

echo "➡️ Entro nel progetto"
cd "$PROJECT_DIR" || exit 1

echo "🛑 Controllo se la porta $DEV_PORT è già in uso..."
if lsof -ti:$DEV_PORT > /dev/null 2>&1; then
  echo "⚠️  Porta $DEV_PORT occupata, termino i processi..."
  lsof -ti:$DEV_PORT | xargs kill -9
  echo "✅ Processi terminati"
  sleep 2
else
  echo "✅ Porta $DEV_PORT libera"
fi

echo "🚀 Avvio npm run dev sulla porta $DEV_PORT"
npm run dev -- --port $DEV_PORT > /tmp/dev.log 2>&1 &
DEV_PID=$!
echo "📌 PID dev server: $DEV_PID"

echo "⏳ Attendo avvio dev server..."
sleep 5
echo "📊 Controllo log dev server:"
tail -n 5 /tmp/dev.log

echo "🌍 Avvio cloudflared tunnel"
cloudflared tunnel --url http://localhost:$DEV_PORT 2>&1 | tee /tmp/cloudflared.log &
CF_PID=$!
echo "📌 PID cloudflared: $CF_PID"

echo "⏳ Attendo URL da cloudflared..."

while true; do
  URL=$(grep -oE 'https://[a-zA-Z0-9.-]+\.trycloudflare.com' /tmp/cloudflared.log | tail -n 1)
  if [ -n "$URL" ]; then
    break
  fi
  sleep 1
done

if [ -z "$URL" ]; then
  echo "❌ URL non trovato"
  echo "📊 Log cloudflared:"
  cat /tmp/cloudflared.log
  exit 1
fi

echo "✅ URL trovato: $URL"

echo "📝 Creo file HTML in $HTML_FILE"
cat <<EOF > "$HTML_FILE"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dev link</title>
</head>
<body>
  <h1>Link ambiente di sviluppo</h1>
  <p><a href="$URL">$URL</a></p>
</body>
</html>
EOF

echo "📄 Contenuto file HTML creato:"
cat "$HTML_FILE"

echo "📤 Upload via FTP a $FTP_HOST$FTP_REMOTE_PATH"
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF
put $HTML_FILE -o $FTP_REMOTE_PATH
bye
EOF

echo "🎉 Deploy completato!"
echo "📍 Dev server PID: $DEV_PID"
echo "📍 Cloudflared PID: $CF_PID"
echo "🌐 URL pubblico: $URL"
echo ""
echo "ℹ️  Per fermare i servizi usa:"
echo "   kill $DEV_PID $CF_PID"
