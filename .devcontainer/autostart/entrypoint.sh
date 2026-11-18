#!/usr/bin/env bash
# Point d'entrée du conteneur : lance le superviseur en arrière-plan, puis rend la main à la
# commande du conteneur (obligatoire pour une feature : `exec "$@"`).
nohup /usr/local/share/app-autostart/supervise.sh >/tmp/app-autostart.log 2>&1 &
exec "$@"
