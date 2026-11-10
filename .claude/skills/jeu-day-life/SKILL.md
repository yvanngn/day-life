---
name: jeu-day-life
description: Développer et maintenir le jeu point and click « A Day in the Life » (Magali, pixel art, sources dans src/). À utiliser dès que l'utilisateur parle du jeu, d'une pièce, d'un chapitre, de Shaggy, d'un dialogue, d'un objet, d'une énigme, de la liste de tâches ou des tests.
---

# Jeu « A Day in the Life »

1. Lire `CLAUDE.md` : il fait foi (structure, conventions, tests).
2. Ne jamais éditer `dist/index.html` : `python3 build.py` le régénère depuis `src/`.
3. Coder toutes les demandes, puis `sh tester.sh <pièce>` une seule fois ; `sh tester.sh` complet avant de pousser.
4. Toute nouveauté = une vérification ajoutée dans `tests/scenarios.py`.
5. Pousser sur `main` publie le jeu (voir skill `deploiement-day-life`).
