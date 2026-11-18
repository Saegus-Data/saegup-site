# VM de test (GitHub Codespaces)

Cette VM fait tourner Saegus City sur la branche ouverte, pour voir le changement
d'une PR sans rien déployer.

- **Depuis AI Studio** (ticket ITSM → « Tester ») : la ville s'ouvre directement ;
  « Terminer le test » supprime la VM.
- **Depuis VS Code** : le terminal affiche le journal du serveur (port 5173) ; l'appli
  est dans l'onglet **Ports** → « Saegus City » → globe.
- **Le bandeau d'idées** n'est pas branché ici (aucun secret) : il répond « non branché ».
- **Premier démarrage** : 1 à 2 min (`npm ci`). Les suivants sont immédiats.

Relancer le serveur s'il a été arrêté : `bash .devcontainer/start.sh`.
