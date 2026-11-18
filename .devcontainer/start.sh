#!/usr/bin/env bash
# Serveur de développement de la VM de test.
#
# - `--background` : démarre le serveur s'il ne tourne pas, puis rend la main. Appelé toutes
#   les 5 s par le superviseur du conteneur (.devcontainer/autostart) : l'application
#   démarre sans qu'on ouvre VS Code (bouton « Tester » d'AI Studio).
# - sans option (postAttachCommand, ou à la main) : idem, puis affiche le journal.
set -euo pipefail

PORT=5173
LOG=/tmp/dev-server.log

listening() {
  (echo >"/dev/tcp/127.0.0.1/${PORT}") 2>/dev/null
}

if ! listening; then
  echo "Démarrage de Saegus City sur le port ${PORT}…" >"$LOG"
  setsid nohup npm run dev -- --host 0.0.0.0 >>"$LOG" 2>&1 </dev/null &
fi

if [[ "${1:-}" == "--background" ]]; then
  exit 0
fi

echo "Journal du serveur (Ctrl+C pour le quitter, le serveur continue) :"
exec tail -n 50 -f "$LOG"
