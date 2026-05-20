#!/bin/bash

### CONFIG ###
PROJECT_DIR="/Users/antoniobosco/Desktop/DEVELOPER/GDEvents sito/2263351-1598004300631_Willy Wonka portfolio Template free/Willy Wonka portfolio Template free/GD events React cursor"
BUILD_DIR="www"
FTP_HOST="ftp.cluster131.hosting.ovh.net"
FTP_USER="gdevenc"
FTP_PASS="Matteoartusa1992"
FTP_REMOTE_DIR="/"
BUILD_LOG="/tmp/build.log"
FTP_LOG="/tmp/ftp_upload.log"
################

clear

echo "==> Entro nel progetto"
cd "$PROJECT_DIR" || exit 1

echo "==> Avvio build (npm run build)"
rm -f "$BUILD_LOG"
npm run build 2>&1 | tee "$BUILD_LOG"

if [ ! -d "$BUILD_DIR" ]; then
  echo "ERRORE: cartella build non trovata: $BUILD_DIR"
  exit 1
fi

echo "==> Upload cartella build su FTP: $FTP_HOST$FTP_REMOTE_DIR"
rm -f "$FTP_LOG"

lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF | tee "$FTP_LOG"
set ssl:verify-certificate no
set ftp:ssl-allow yes
set net:max-retries 2
set net:timeout 20
set cmd:fail-exit yes

mirror -R --verbose --delete --only-newer \
  --exclude-glob "www.old" \
  --exclude-glob "www.old/**" \
  "$BUILD_DIR" "$FTP_REMOTE_DIR"
bye
EOF

echo "==> Build log: $BUILD_LOG"
echo "==> FTP log: $FTP_LOG"
echo "==> Deploy build completato"
