#!/usr/bin/env bash
# Création de la VM : installe les dépendances, puis pose le marqueur « prêt »
# que le superviseur attend pour lancer l'application.
set -euo pipefail

npm ci --no-audit --no-fund
touch node_modules/.vm-test-ready
