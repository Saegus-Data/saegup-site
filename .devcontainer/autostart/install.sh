#!/usr/bin/env bash
# Construction de l'image (root) : installe le superviseur de démarrage de l'application.
set -euo pipefail

install -d /usr/local/share/app-autostart
install -m 0755 "$(dirname "$0")/entrypoint.sh" /usr/local/share/app-autostart/entrypoint.sh
install -m 0755 "$(dirname "$0")/supervise.sh" /usr/local/share/app-autostart/supervise.sh
