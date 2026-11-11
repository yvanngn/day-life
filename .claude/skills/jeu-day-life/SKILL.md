---
name: jeu-day-life
description: Développer et maintenir le jeu point and click « A Day in the Life » (Magali, pixel art, sources dans src/). À utiliser dès que l'utilisateur parle du jeu, d'une pièce, d'un chapitre, de Shaggy, d'un dialogue, d'un objet, d'une énigme, de la liste de tâches ou des tests.
---

# Jeu « A Day in the Life »

1. Lire `CLAUDE.md` : il fait foi (structure, conventions, tests). Vérifier d'abord son **garde-fou tokens** (alerte au lieu d'exécuter si l'historique ou le prompt est trop lourd).
2. Ne jamais éditer `dist/index.html` : `python3 build.py` le régénère depuis `src/`.
3. Coder toutes les demandes, puis `sh tester.sh <pièce>` une seule fois (sortie filtrée `2>&1 | grep -A3 "ÉCHEC\|vérifications"`). Texte, dessin ou son seulement : `python3 build.py` suffit. Le parcours complet tourne dans GitHub Actions au push.
4. Toute nouveauté = une vérification ajoutée dans `tests/scenarios.py`.
5. Réponses courtes, lecture ciblée (grep, sed -n). Exports et republication sur claude.ai seulement sur demande.
6. Pousser sur `main` publie le jeu (voir skill `deploiement-day-life`).
