# A Day in the Life — règles de travail

## Économie (priorité)
- Réponses courtes. Lire seulement les fichiers ou passages utiles (grep, sed -n), jamais tout le projet.
- Plusieurs modifications dans un prompt : tout coder d'abord, puis tester **une seule fois à la fin**.
- Tester **seulement la pièce modifiée** : `sh tester.sh salon` (groupes : menu chambre couloir bain salon complet). Moteur partagé (`src/js/moteur/`) modifié → ajouter `menu` et `complet`. `sh tester.sh` (tout, ~2 min) avant chaque push.
- Filtrer la sortie : `sh tester.sh salon 2>&1 | grep -A3 "ÉCHEC\|vérifications"`.
- Tests longs : les déléguer à un sous-agent léger (`model: "haiku"`) qui ne renvoie que les échecs, si l'outil Agent existe.
- Pas de capture d'écran sauf nouveau décor ou demande explicite.

## Structure
- `src/` = sources ; `dist/index.html` est **généré** par `python3 build.py` (jamais à éditer, non versionné).
- `src/ordre.txt` : ordre de concaténation des scripts (un seul `<script>` à la fin : les fonctions sont globales).
- `src/js/moteur/` : état et sauvegarde (`etat.js`), dessin et sprites, interface (inventaire, liste, verbes), moteur (bulles, marche, clics, `act`), boucle, audio, musique, menu.
- `src/js/scenes/` : une pièce par fichier (`drawX()` + `ROOMS.x={walk,draw,spots}`), `commun.js` (portes, textes, `catWith`), `actions.js` (séquences scénarisées), `intro.js`.
- `src/js/donnees/icones.js` : icônes 12×12 de l'inventaire. Tout est dessiné par le code, musiques et sons synthétisés.

## Conventions du moteur
- Objet de pièce : `{id,name,r:[x,y,w,h],w:[x,y] (point de marche),vis(),exit(),ouvrir/examiner/prendre/utiliser(),with:{objet:()=>…}}`.
- Drapeaux dans `S.f` (déclarer tout nouveau drapeau dans `defF()`), tâches = clés de `TASKS` validées par `check('tX')`.
- Voix : `say('mag'|'narr'|'cat'|'matou'|'tv'|'tub',texte)`.
- Nouvelle pièce : fichier dans `src/js/scenes/`, ligne dans `ordre.txt`, entrées dans `START`, `ROOMMUS`, et un code dans `CODES`/`ROOMCODE`.

## Tests
- Chaque nouvelle fonctionnalité = une vérification dans le scénario de sa pièce (`tests/scenarios.py`, table `GROUPES`).
- Aides : `T.act(verbe,id,objet)`, `T.inv(verbe,id)`, `T.code('CAFE')`. Préparer l'état par un code plutôt que rejouer toute la partie.
- Ne jamais tester l'absence d'un élément supprimé.

## Histoire
- Coder ce que l'utilisateur décrit, sans inventer d'énigmes ni de dialogues de mon initiative ; mes idées vont dans une section « Suggestions » et ne sont codées qu'après validation.

## Version et déploiement
- `VERSION` = majeure.mineure ; patch auto (commits depuis le dernier changement de `VERSION`). Nouveau chapitre → mineure +1. Affichée dans le menu.
- Push sur `main` → GitHub Actions : tests complets puis publication sur GitHub Pages (skill `deploiement-day-life`).

## Chapitres
1 Une matinée ordinaire (Magali) : chambre → couloir → salle de bain → salon. Codes : REVEIL, KIMONO, PACHA, CAFE.
