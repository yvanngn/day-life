# A Day in the Life — règles de travail

## Garde-fou tokens (prioritaire, vérifié AVANT d'exécuter chaque prompt)
Si un seuil est atteint : **ne rien exécuter**, répondre seulement par l'alerte (2-3 lignes) et attendre. En cas de doute, ne pas alerter.

**1. Historique trop lourd → nouvelle conversation** (un seul seuil suffit) : plus de ~40 échanges ; plus de ~15 lancements de tests ou ~30 lectures de fichiers ; historique résumé/compacté ou détail donné plus tôt introuvable.
Alerte : « ⚠️ Historique lourd : chaque prompt recharge tout. Ouvre une nouvelle conversation et repars du dépôt GitHub. » + résumé de reprise de 5 lignes max (partie en cours, dernières modifs, reste à faire).

**2. Prompt trop gourmand → le découper** (un seul seuil suffit) : plus de 6 demandes indépendantes ; plus de 3 pièces touchées à la fois ; texte collé de plus de ~2 pages, ou demande qui oblige à relire des fichiers entiers / lancer tous les tests sans nécessité.
Alerte : « ⚠️ Prompt coûteux : [raison]. Propose de découper en : 1) … 2) … » (rien d'exécuté).

Exception : si l'utilisateur écrit « force », exécuter quand même.

## Économie (priorité)
- Réponses courtes. Lire seulement les fichiers ou passages utiles (grep, sed -n), jamais tout le projet.
- Plusieurs modifications dans un prompt : tout coder d'abord, puis tester **une seule fois à la fin**.
- Tester **seulement la pièce modifiée** : `sh tester.sh salon` (groupes : menu chambre couloir bain salon complet). Moteur partagé (`src/js/moteur/`) modifié → ajouter `menu` et `complet`. `sh tester.sh` (tout, ~2 min) seulement sur demande ou après un changement du moteur partagé : GitHub Actions rejoue tout au push, sans coût en tokens.
- Filtrer la sortie : `sh tester.sh salon 2>&1 | grep -A3 "ÉCHEC\|vérifications"`.
- Tests longs : les déléguer à un sous-agent léger (`model: "haiku"`) qui ne renvoie que les échecs, si l'outil Agent existe.
- Pas de capture d'écran sauf nouveau décor ou demande explicite.
- **Sur demande seulement** : export des dialogues, zip du projet, skill empaqueté, republication sur claude.ai (le push sur `main` suffit).

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
- **Pas de tests** quand on ne fait que remplacer du texte, retoucher un dessin ou un son : `python3 build.py` suffit, puis push. Exception : un texte attendu par `tests/scenarios.py` (vérifier avec `grep`).
- Ne rejouer que les groupes modifiés dans ce prompt, jamais les autres « par sécurité ».
- Les attentes de dialogue/animation sont coûteuses : préparer l'état directement plutôt que rejouer chaque étape.

## Histoire
- Coder ce que l'utilisateur décrit, sans inventer d'énigmes ni de dialogues de mon initiative ; mes idées vont dans une section « Suggestions » et ne sont codées qu'après validation.
- Dialogues ajoutés de mon initiative : le signaler en une ligne et lister les nouvelles répliques dans la réponse pour relecture.

## Version et déploiement
- `VERSION` = majeure.mineure ; patch auto (commits depuis le dernier changement de `VERSION`). Nouveau chapitre → mineure +1. Affichée dans le menu.
- Push sur `main` → GitHub Actions : tests complets puis publication sur GitHub Pages (skill `deploiement-day-life`).

## Chapitres
1 Une matinée ordinaire (Magali) : chambre → couloir → salle de bain → salon. Codes : REVEIL, KIMONO, PACHA, CAFE.

## Interface (skill `interface-jeu`)
- Clic gauche sur une cible sans verbe : `parler` pour les personnages (`PERSOS`), sinon `examiner`. Clic droit sur la scène : roue des verbes en V2 seulement (`ouvrirRoue`, disque contrasté, nom en haut) ; en V1, clic droit = examiner directement. Contrôles expliqués par le narrateur à la fin de l'intro, selon la version. Testé dans le groupe couloir.
- Clic droit : jamais le menu du navigateur dans le jeu (écouteur `contextmenu` sur `#app`, dans `src/js/moteur/moteur.js`), sauf dans les champs de saisie. Testé dans le groupe du menu.

## Graphismes V1 / V2 (paramètre « Graphismes » du menu)
- Tout graphisme ajouté ou modifié existe en **deux versions** : V1 classique (pixel art d'origine) et V2 améliorée (haute définition : cellules d'une demi-unité sur le canvas 640×288, ombres, reflets, textures).
- Le choix suit la variable globale `HD` (`setHD`, mémorisé dans `localStorage` sous `dotl_hd`) ; CSS V2 préfixé par `body.hd`.
- Décor : `drawX()` reste la V1, et la V2 ajoute ses détails par-dessus dans `drawXHD()` appelée en fin de `drawX()` si `HD`. Sprites : `dbl(rows)` puis retouches. Aide `rh(x,y,w,h,c)` pour les demi-pixels.
- Dialogues V2 : en bas de l'écran avec le nom (`NOMS`), comme Sol-Rod ; V1 garde les bulles. Choix multiples : `await choose([[texte,valeur],…])` (liste en bas). Testé dans le groupe couloir.
- V2 redessinée à la main (style Low Kanta) : chaque pièce a sa fonction `drawX2()` complète (appelée en tête de `drawX()` si `HD`), avec les outils de `commun.js` (`bandes2`, `ovale2`, `panneau2`, `ombre2`, `door2`). Faites : chambre, couloir, salle de bain, salon. Reste : sprites de Magali et Shaggy.
