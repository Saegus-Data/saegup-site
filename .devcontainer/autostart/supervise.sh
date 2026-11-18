#!/usr/bin/env bash
# Superviseur (root, toute la vie du conteneur) : dès que l'installation du dépôt est finie
# (marqueur posé par setup.sh), démarre l'application et la relance si elle s'arrête.
# Générique : il cherche `.devcontainer/start.sh` dans le dépôt monté.

READY_MARKER=node_modules/.vm-test-ready

while true; do
  for repo in /workspaces/*/; do
    [[ -f "${repo}.devcontainer/start.sh" && -f "${repo}${READY_MARKER}" ]] || continue
    runuser -u node -- bash -c "cd '${repo}' && bash .devcontainer/start.sh --background"
  done
  sleep 5
done
