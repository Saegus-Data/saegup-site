# Démo Saegup — la boucle ITSM en live

Créneau : « Vibe Office : la boucle ITSM en live ». Objectif : une idée de la salle devient,
en quelques minutes, un élément de Saegus City, codé par Claude et visible dans la VM du ticket.

## Mise en service (une fois, avant le jour J)

- [ ] **Catalogue ITSM** : projet « Saegup Site » créé dans AI Studio, `github_repo` =
      `Saegus-Data/saegup-site`, statut GitHub « vérifié ».
- [ ] **App GitHub** `vibe-office-itsm-loop` installée sur `saegup-site` (aujourd'hui :
      seulement `vibeoffice` et `poc-revue-compte`).
- [ ] **Routine Claude Code** : `saegup-site` dans les dépôts accessibles à la routine.
- [ ] **Vercel** (projet `saegup-site`, Production) : `ITSM_INTAKE_URL`, `ITSM_INTAKE_SECRET`,
      `ITSM_PROJECT`, `ITSM_URGENCE=critique`, puis redéployer. La salle peut alors proposer
      depuis son téléphone (QR code vers https://saegup-site.vercel.app).
- [ ] **Répétition complète** au moins une fois (J-2) avec un ticket de test, puis fermer la PR.
- [ ] **Pré-chauffage** : ouvrir une VM « Tester » sur la PR de répétition, pour avoir déjà
      autorisé l'App GitHub (écran d'autorisation au premier clic seulement).

## Le timing (pourquoi on « pousse » le tick à la main)

La boucle avance au rythme d'un tick toutes les 10 min ; un ticket `critique` déclenche une
synthèse éclair (3 max par jour). En live, on appelle le tick soi-même après chaque geste :

```bash
curl -s -X POST https://aistudio.saegus.com/api/itsm/loop/tick \
  -H "Authorization: Bearer $ITSM_LOOP_TICK_SECRET" | jq '{flash, dispatched, errors}'
```

| Étape | Geste | Durée |
| --- | --- | --- |
| 1 | Idée déposée depuis le bandeau (téléphone ou laptop) | 30 s |
| 2 | Tick → synthèse éclair → groupe à décider | ~30 s |
| 3 | Accepter le groupe sur le kanban / DecisionBoard | 15 s |
| 4 | Tick → envoi à la routine Claude Code | ~10 s |
| 5 | La routine code, teste, ouvre la PR | 3–6 min |
| 6 | « Tester » sur le ticket → VM Codespaces | ~2 min |

Pendant l'étape 5 (le « temps mort »), montrer la session de la routine en direct, puis le
diff de la PR : un seul fichier `src/scene/elements/…tsx`, lisible en 20 lignes.

## Idées testées (pour la salle, ou en secours)

Choisies pour être très visibles et faciles à dessiner en SVG :

- « Une **fusée** qui décolle du toit de la tour Saegus, avec des flammes » (ciel)
- « Une **montgolfière** aux couleurs de Saegus qui traverse le ciel » (ciel)
- « Passe la ville **de nuit**, avec les fenêtres allumées et des étoiles » (ambiance)
- « Fais **tomber la neige** sur la ville » (premier-plan)
- « Un **dirigeable** qui traîne une banderole “Bienvenue au Saegup” » (ciel)
- « Une **grande roue** qui tourne à côté de la tour » (ville)

À éviter en live : idées vagues (« rends ça plus joli »), multi-éléments, ou qui touchent au
bandeau / à la config (chemins interdits à la routine).

## Plan B

- **La routine est lente** : continuer le pitch, revenir sur le ticket à la fin du créneau.
- **La routine échoue / la PR est ratée** : ouvrir la PR de secours préparée la veille
  (branche `demo/fusee`, même parcours « Tester ») — « voilà ce qu'elle a fait hier soir ».
- **La VM ne démarre pas** : `git fetch && git switch <branche de la PR>` sur le laptop, le
  serveur de dev recharge la ville tout seul.
- **Le réseau de la salle bloque** : capture vidéo de la répétition.

## Après la démo

Fusionner les PR réussies : la ville garde les contributions de la salle et grandit à chaque
Saegup (compteur « éléments · contributeurs » en haut à gauche).
